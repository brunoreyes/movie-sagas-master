const express = require('express');
const pool = require('../modules/pool');
const { default: Axios } = require('axios');
const { query } = require('../modules/pool');
const router = express.Router();
require('dotenv').config();

// return all favorite images
router.get('/', (req, res) => {
  const displayQuery = `SELECT * FROM movies ORDER BY title ASC;`;
  // const queryText = `SELECT movies.id, title, description, poster, array_agg(genres.name)
  // FROM movies
  // JOIN movie_genre on movies.id = movie_genre.movie_id
  // JOIN genres ON movie_genre.genre_id = genres.id
  // GROUP BY movies.id
  // ORDER BY title ASC;`;
  //pool is our connection to the database
  //we are going to query a queryString command to pool (database)
  pool
    .query(displayQuery)
    .then((response) => {
      // console.log('Sending response:', response.rows);
      res.send(response.rows);
    })
    .catch((error) => {
      console.log('Error in get:', error);
      res.sendStatus(500);
    });
});

// return all selected movies images
router.get('/detail/:id', (req, res) => {
  const queryText = 'SELECT * FROM movies WHERE id=$1;';

  pool
    .query(queryText, [req.params.id])
    .then((response) => {
      // console.log('Sending response:', response.rows);
      res.send(response.rows);
    })
    .catch((err) => {
      console.log('Error completing SELECT movie query', err);
      res.sendStatus(500);
    });
});

// // update given favorite with a category id
// router.put('/', async (req, res) => {
//   //we want to see information
//   console.log('In Edit Put')
//   console.log('req.body', req.body);

//   const client = Number(req.body.value);
//   const id = req.body.id;
// console.log(category_id);
// console.log(id);

// let queryString = `UPDATE favorite SET category_id=$1 WHERE id=$2;`;
// pool.query(queryString, [category_id, id])
//   .then(response=>{
//     console.log('Response from db', response)
//     res.sendStatus(201);
//   })
//   .catch(err=>{
//     console.log('Error from db', err)
//     res.sendStatus(500);
//   })
// });


// save the user's changes to movie title and description
router.post('/', async (req, res) => {
  const client = await pool.connect();
  try {
    const { title, description, movie_id } = req.body;
    await client.query('BEGIN');

    await client.query(
      `UPDATE movies
        SET title = $1,
            description = $2
        WHERE id = $3;`,
      [title, description, movie_id]
    );
    await client.query('COMMIT');
    res.sendStatus(201);
  } catch (error) {
    await client.query('ROLLBACK');
    console.log('Error POST /api/order', error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

module.exports = router;
