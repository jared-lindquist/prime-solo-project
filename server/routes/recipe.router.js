const express = require('express');
const pool = require('../modules/pool');
const recipeRouter = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/**
 * GET route template
 */
recipeRouter.get('/', (req, res) => {
  // GET route code here
    const queryText = `SELECT "recipes"."title", "recipes"."coffee", "recipes"."roast_level", 
    "recipes"."brew_method", "recipes"."input", "recipes"."output", "recipes"."comments", 
    "user"."username" 
    FROM "recipes" 
    INNER JOIN "user" 
    ON "recipes"."user_id" = "user"."id"
    ORDER BY "recipes"."id" DESC;`;

    pool.query(queryText).then((results) => {
        res.send(results.rows);
    }).catch((error) => {
        console.log('Error getting recipes from DB', error);
        res.sendStatus(500);
    })
});

recipeRouter.get('/', rejectUnauthenticated, (req, res) => {
    console.log('in recipeRouter.get for user recipes')
    console.log('is authenticated?', req.isAuthenticated());
    console.log('req.user', req.user);

    const userId = req.user.id;

    pool.query(`SELECT * FROM "recipes" WHERE "user_id" = $1`, [userId])
    .then((results) => res.send(results.rows))
    .catch((error) => {
        console.log('error selecting user recipes', error);
        res.sendStatus(500);
    });
});

// `SELECT * FROM "recipes" ORDER BY "id" DESC;`


/**
 * POST route template
 */
recipeRouter.post('/', (req, res) => {
  // POST route code here
    
    const recipeDetails = [req.user.id, req.body.title, req.body.coffee, req.body.roast,
        req.body.method, req.body.input, req.body.output, req.body.comments];
    
    console.log('req.user, recipe details:', req.user, recipeDetails);
    
    const queryText = `
    INSERT INTO "recipes" ("user_id", "title", "coffee", "roast_level", "brew_method", "input", "output", "comments")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `;
    
    pool.query(queryText, recipeDetails)
    .then (() => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('error adding recipe: ', error);
        res.sendStatus(500);
    })
});

module.exports = recipeRouter;
