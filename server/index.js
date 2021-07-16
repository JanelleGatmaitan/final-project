require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const pg = require('pg');
const jsonMiddleware = express.json();
const ClientError = require('./client-error'); // eslint-disable-line
const errorMiddleware = require('./error-middleware');
const fetch = require('node-fetch');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);

app.use(jsonMiddleware);

app.post('/api/growStuff', async (req, res, next) => {
  const url = `https://www.growstuff.org/crops/${req.body.plant}.json`;
  const response = await fetch(url)
    .then(res => res.json())
    .catch(err => next(err));
  res.status(200).json(response.median_days_to_first_harvest);
});

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
      insert into "users" ("username", "hashedPassword")
      values ($1, $2)
      returning "userId", "username"
    `;
      const params = [username, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  const sql = `
    select "userId",
           "hashedPassword"
      from "users"
     where "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.get('/api/gardenStats/:username', (req, res, next) => {
  const sql = `
    select *
      from "gardenStats"
      where "username" = $1
  `;
  const params = [req.params.username];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        res.status(200).json({ gardenCreated: false });
      }
      const gardenStats = result.rows[0];
      res.status(200).json({
        gardenCreated: true,
        gardenStats
      });
    })
    .catch(err => next(err));
});

app.get('/api/plantsInGarden/:gardenId', (req, res, next) => {
  const sql = `
  select *
    from "plantsInGarden"
    where "gardenId" = $1
  `;
  const params = [req.params.gardenId];
  db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/plantsInGarden/:gardenId/:plantId', (req, res, next) => {
  const { gardenId, plantId } = req.params;
  const sql = `
  select *
    from "plantsInGarden"
  where "gardenId" = $1
  and "plantId" = $2
  `;
  const params = [gardenId, plantId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        res.status(200).json({ plantInGarden: false });
      }
      result.rows[0].plantInGarden = true;
      res.status(200).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/tasksCompleted/:gardenId', (req, res, next) => {
  const sql = `
    select *
      from "tasksCompleted"
    where "gardenId" = $1
  `;
  const params = [req.params.gardenId];
  db.query(sql, params)
    .then(result => {
      res.status(200).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.post('/api/gardenStats', (req, res, next) => {
  const { plantAdded, gardenInfo, username } = req.body;
  // if (!gardenInfo.soil || !gardenInfo.sun || !gardenInfo.size) {
  //   // throw new ClientError(400, 'soil, sun, and size required fields');

  // }
  const newGardenSql = `
    insert into "gardenStats" ("soil", "sun", "size", "notes", "username")
    values ($1, $2, $3, $4, $5)
    returning *
  `;
  const tasksSql = `
  insert into "tasksCompleted" ("gardenId")
  values ($1)
  `;
  const newGardenParams = [gardenInfo.soil, gardenInfo.sun, gardenInfo.size, gardenInfo.notes, username];
  const plantSql = `
    insert into "plantsInGarden" ("plantId", "dateAdded", "expectedHarvestDate", "gardenId", "name")
    values ($1, $2, $3, $4, $5)
    returning *
    `;
  db.query(newGardenSql, newGardenParams)
    .then(result => {
      const gardenInfo = result.rows[0];
      const gardenId = gardenInfo.gardenId;
      const tasksParams = [gardenId];
      const newPlantParams = [plantAdded.plantId, plantAdded.dateAdded,
        plantAdded.expectedHarvest, gardenId, plantAdded.name];
      if (plantAdded) {
        db.query(plantSql, newPlantParams);
        db.query(tasksSql, tasksParams);
      }
      res.status(200).json({
        plantAdded: true,
        plant: plantAdded,
        gardenId: gardenId
      });
    })
    .catch(err => next(err));
});

app.post('/api/plantsInGarden/:gardenId', (req, res, next) => {
  const plantAdded = req.body;
  if (!plantAdded.plantId || !plantAdded.dateAdded || !plantAdded.expectedHarvest) {
    throw new ClientError(400, 'plantId, date added, expected harvest date are required');
  }
  const sql = `
  insert into "plantsInGarden" ("plantId", "dateAdded", "expectedHarvestDate", "gardenId", "name")
  values ($1, $2, $3, $4, $5)
  returning *
  `;
  const params = [plantAdded.plantId, plantAdded.dateAdded,
    plantAdded.expectedHarvest, plantAdded.gardenId, plantAdded.name];
  db.query(sql, params)
    .then(result => {
      const plantAdded = result.rows;
      res.status(200).json({ added: true, data: plantAdded });
    })
    .catch(err => next(err));
});

app.put('/api/tasksCompleted/:gardenId', (req, res, next) => {
  const gardenId = req.params.gardenId;
  const taskStatus = req.body;
  const sql = `
  update "tasksCompleted"
  set "Water" = $1,
  "Prune" = $2,
  "Compost" = $3
  where "gardenId" = $4
  returning *;
  `;
  const params = [taskStatus.Water, taskStatus.Prune, taskStatus.Compost, gardenId];
  db.query(sql, params)
    .then(result => {
      res.status(200).json({ edited: true, newEntry: result.rows[0] });
    })
    .catch(err => next(err));
});

app.put('/api/gardenStats/:gardenId', (req, res, next) => {
  const gardenId = req.params.gardenId;
  const edits = req.body;
  const sql = `
  update "gardenStats"
  set "soil" = $1,
  "sun" = $2,
  "size" = $3,
  "notes" = $4
  where "gardenId" = $5
  returning *;
  `;
  const params = [edits.soil, edits.sun, edits.size, edits.notes, gardenId];
  db.query(sql, params)
    .then(result => {
      res.status(200).json({ edited: true, gardenInfo: result.rows[0] });
    });
});

app.delete('/api/plantsInGarden/:gardenId/:plantId', (req, res, next) => {
  const { gardenId, plantId } = req.params;
  const sql = `
  delete from "plantsInGarden"
  where "gardenId" = $1
  and "plantId" = $2
  returning *
  `;
  const params = [gardenId, plantId];
  db.query(sql, params)
    .then(result => {
      const deletedPlant = result.rows[0];
      res.status(200).json({ deleted: deletedPlant });
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
