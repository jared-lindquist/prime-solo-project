const express = require('express');
const pool = require('../modules/pool');
const userRecipesRouter = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const { query } = require('express');

// /**
//  * GET route template
//  */
userRecipesRouter.get('/', rejectUnauthenticated, (req, res) => {
    console.log('in recipeRouter.get for user recipes')
    console.log('is authenticated?', req.isAuthenticated());
    console.log('req.user', req.user);

    const userId = req.user.id;
    const queryText = `SELECT "recipes"."id", "recipes"."title", "recipes"."coffee", "recipes"."roast_level", 
    "recipes"."brew_method", "recipes"."input", "recipes"."output", "recipes"."comments", "recipes"."image", "user"."username" 
    FROM "recipes"
    INNER JOIN "user" 
    ON "recipes"."user_id" = "user"."id" 
    WHERE "user_id" = $1
    ORDER BY "recipes"."id" DESC;`;
    // SELECT * FROM "recipes" WHERE "user_id" = $1
    pool.query(queryText, [userId])
    .then((results) => res.send(results.rows))
    .catch((error) => {
        console.log('error selecting user recipes', error);
        res.sendStatus(500);
    });
});

userRecipesRouter.get('/:id', (req, res) => {
    console.log('in userRecipesRouter.get for details:');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('req.user', req.user);

    // const queryText = 'SELECT * FROM "recipes" WHERE "recipes"."id" = $1;';

    const  queryText = `SELECT "recipes"."id", "recipes"."title", "recipes"."coffee", "recipes"."roast_level", 
    "recipes"."brew_method", "recipes"."input", "recipes"."output", "recipes"."comments", "recipes"."image", "user"."username" 
    FROM "recipes"
    INNER JOIN "user" 
    ON "recipes"."user_id" = "user"."id"
    WHERE "recipes"."id" = $1;`;

    pool.query(queryText, [req.params.id])
    .then((results) => res.send(results.rows))
    .catch((error) => {
        console.log('error getting recipe details', error);
        res.sendStatus(500);
    });
});


//post route goes here


userRecipesRouter.delete('/:id', rejectUnauthenticated, (req, res) => {

    console.log('in userRecipesRouter delete', req.params.id, req.user.id);

    pool.query(`DELETE FROM "recipes" WHERE "id" = $1 AND "user_id" = $2`, [req.params.id, req.user.id])
    .then ((results) => res.sendStatus(200))
    .catch((error) => res.sendStatus(500));
    //endpoint functionality
});

userRecipesRouter.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log('in userRecipesRouter PUT', req.body, req.params.id);

    let queryParams = [req.body.title, req.body.coffee, req.body.roast_level, req.body.input, req.body.output, req.body.comments, req.body.brew_method, req.body.id];
    let queryText = `
    UPDATE "recipes"
    SET "title" = $1, "coffee" = $2, "roast_level" = $3, "input" = $4, "output" = $5, "comments" = $6, "brew_method" = $7
    WHERE "id" = $8;`;

    pool.query(queryText, queryParams)
    .then((results) => res.sendStatus(200))
    .catch((error) => res.sendStatus(500));
});

module.exports = userRecipesRouter;
