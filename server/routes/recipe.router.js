const express = require('express');
const pool = require('../modules/pool');
const recipeRouter = express.Router();

/**
 * GET route template
 */
recipeRouter.get('/', (req, res) => {
  // GET route code here
    const queryText = `SELECT * FROM "recipes" ORDER BY "id" DESC;`;

    pool.query(queryText).then((results) => {
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error getting recipes from DB', error);
        res.sendStatus(500);
    })
});

// /**
//  * POST route template
//  */
// recipeRouter.post('/', (req, res) => {
//   // POST route code here
// });

module.exports = recipeRouter;
