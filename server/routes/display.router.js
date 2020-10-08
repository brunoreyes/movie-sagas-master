const express = require('express');
const pool = require('../modules/pool');
const { default: Axios } = require('axios');
const { query } = require('../modules/pool');
const router = express.Router();
require('dotenv').config();

// return all favorite images
router.get('/', (req, res) => {
  // const displayQuery = `SELECT * FROM movies ORDER BY title ASC;`;
  const displayQuery = `SELECT movies.id, title, description, poster, cover, director, duration, rating, trailer, json_agg(genres.name) AS genres
  FROM movies
  JOIN movie_genre on movies.id = movie_genre.movie_id
  JOIN genres ON movie_genre.genre_id = genres.id
  GROUP BY movies.id
  ORDER BY title ASC;`;
  //pool is our connection to the database
  //we are going to query a queryString command to pool (database)
  pool
    .query(displayQuery)
    .then((response) => {
      // console.log('Sending response:', response.rows);
      res.send(response.rows);
    })
    .catch((error) => {
      // console.log('Error in get:', error);
      res.sendStatus(500);
    });
});

// save the user's changes to movie title and description
router.put('/', (req, res) => {
  console.log('req.body is', req.body);
  const queryText = `UPDATE movies SET title=$1, description=$2 WHERE id=$3;`;
  const queryValues = [req.body.title, req.body.description, req.body.id];
  pool
    .query(queryText, queryValues)
    .then((result) => {
      console.log('in /api/display/edit PUT');
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`PUT error:`, error);
      res.sendStatus(500);
    });
});

module.exports = router;
