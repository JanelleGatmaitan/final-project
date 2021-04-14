require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const pg = require('pg');
const jsonMiddleware = express.json();
const ClientError = require('./client-error'); // eslint-disable-line
const errorMiddleware = require('./error-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);

app.use(jsonMiddleware);

app.get('/api/gardenStats', (req, res, next) => {
  const sql = `
    select *
      from "gardenStats"
  `;
  db.query(sql)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/plantsInGarden/:plantId', (req, res, next) => {
  const plantId = req.params.plantId;
  const sql = `
  select *
    from "plantsInGarden"
  where "plantId" = $1
  `;
  const params = [plantId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0]) {
        res.status(200).json({
          plantInGarden: false
        });
      }
      result.rows[0].plantInGarden = true;
      res.status(200).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.post('/api/gardenStats', (req, res, next) => {
  const { gardenInfo } = req.body;
  if (!gardenInfo.soil || !gardenInfo.sun || !gardenInfo.size) {
    throw new ClientError(400, 'soil, sun, and size required fields');
  }
  const newGardenSql = `
    insert into "gardenStats" ("soil", "sun", "size", "notes")
    values ($1, $2, $3, $4)
    returning *
  `;
  const newGardenParams = [gardenInfo.soil, gardenInfo.sun, gardenInfo.size, gardenInfo.notes];
  if (req.body.plantAdded) {
    const { plantAdded } = req.body;
    const plantSql = `
    insert into "plantsInGarden" ("plantId", "dateAdded", "expectedHarvestDate", "gardenId")
    values ($1, $2, $3, $4)
    returning *
    `;
    db.query(newGardenSql, newGardenParams)
      .then(result => {
        const gardenInfo = result.rows[0];
        const newPlantParams = [plantAdded.plantId, plantAdded.dateAdded, plantAdded.expectedHarvest, gardenInfo.gardenId];
        db.query(plantSql, newPlantParams);
      })
      .then(plantAdded => {
        res.status(200).json({ plantAdded: true, data: plantAdded });
      })
      .catch(err => next(err));
  }
});

app.post('/api/plantsInGarden', (req, res, next) => {
  const plantAdded = req.body;
  if (!plantAdded.plantId || !plantAdded.dateAdded || !plantAdded.expectedHarvest) {
    throw new ClientError(400, 'plantId, date added, expected harvest date are required');
  }
  const sql = `
  insert into "plantsInGarden" ("plantId", "dateAdded", "expectedHarvestDate", "gardenId")
  values ($1, $2, $3, $4)
  returning *
  `;
  const params = [plantAdded.plantId, plantAdded.dateAdded, plantAdded.expectedHarvest, plantAdded.gardenId];
  db.query(sql, params)
    .then(result => {
      const plantAdded = result.rows;
      res.status(200).json({ added: true, data: plantAdded });
    })
    .catch(err => next(err));
});

app.delete('/api/plantsInGarden/:plantId', (req, res, next) => {
  const plantId = req.params.plantId;
  const sql = `
  delete from "plantsInGarden"
  where "plantId" = $1
  returning *
  `;
  const params = [plantId];
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
