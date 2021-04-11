require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const pg = require('pg');
const jsonMiddleware = express.json();

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);

app.use(jsonMiddleware);

app.get('/api/gardenStats', (req, res) => {
  const sql = `
    select *
      from "gardenStats"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.post('/api/gardenStats', (req, res) => {
  const { soil, sun, size, notes } = req.body;
  if (!soil || !sun || !size || !notes) {
    res.status(400).json({
      error: 'soil, sun, size, and notes are required fields'
    });
    return;
  }
  const sql = `
    insert into "gardenStats" ("soil", "sun", "size", "notes")
    values ($1, $2, $3, $4)
    returning *
  `;
  const params = [soil, sun, size, notes];
  db.query(sql, params)
    .then(result => {
      const gardenInfo = result.rows;
      res.status(200).json(gardenInfo);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
