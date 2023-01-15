const express = require('express');
const pool = require('../modules/pool');
const userRecipesRouter = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const { query } = require('express');

//GET user recipes from DB
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

    pool.query(queryText, [userId])
        .then((results) => res.send(results.rows))
        .catch((error) => {
            console.log('error selecting user recipes', error);
            res.sendStatus(500);
        });
});

//Get user favorites from DB
userRecipesRouter.get('/favorites', rejectUnauthenticated, (req, res) => {
    console.log('in recipeRouter.get for user favorites')
    console.log('is authenticated?', req.isAuthenticated());
    console.log('req.user', req.user);

    const userId = req.user.id;
    const queryText = `
    SELECT "favorites"."fav_recipe_id", "recipes"."title", "recipes"."coffee", 
    "recipes"."roast_level", "recipes"."brew_method", "recipes"."input", 
    "recipes"."output", "recipes"."comments", "recipes"."image"
    FROM "favorites"
    INNER JOIN "recipes" ON "favorites"."fav_recipe_id" = "recipes"."id"
    WHERE "favorites"."user_id" = $1`;

    pool.query(queryText, [userId])
        .then((results) => res.send(results.rows))
        .catch((error) => {
            console.log('error getting favorites', error);
            res.sendStatus(500);
        });
});

//post route for adding a recipe to favorites
userRecipesRouter.post('/addToFavorites', rejectUnauthenticated, (req, res) => {
    console.log('in userRecipeRouter.post to add to favorites', req.body[0].id);
    console.log('is authenticated?', req.isAuthenticated());
    console.log('req.user', req.user.id);
    
    const userId = req.user.id;

    const queryText = `INSERT INTO "favorites" ("user_id", "fav_recipe_id")
                        VALUES ($1, $2)`;

    pool.query(queryText, [userId, req.body[0].id])
        .then(() => res.sendStatus(201))
        .catch((error) => {
            console.log('error adding to favorites', error);
            res.sendStatus(500);
        })
})

//post route for getting the details of the recipe clicked on
userRecipesRouter.get('/:id', (req, res) => {
    console.log('in userRecipesRouter.get for details:');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('req.user', req.user);

    const queryText = `SELECT "recipes"."id", "recipes"."title", "recipes"."coffee", "recipes"."roast_level", 
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


//post route for adding a new recipe
userRecipesRouter.post('/', (req, res) => {

    const recipeDetails = [req.user.id, req.body.title, req.body.coffee, req.body.roast,
    req.body.method, req.body.input, req.body.output, req.body.comments, req.body.image];

    console.log('req.user, recipe details:', req.user, recipeDetails);

    const queryText = `
    INSERT INTO "recipes" ("user_id", "title", "coffee", "roast_level", "brew_method", "input", "output", "comments","image")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
    `;

    pool.query(queryText, recipeDetails)
        .then(() => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('error adding recipe: ', error);
            res.sendStatus(500);
        })
});

//route for deleting a recipe
userRecipesRouter.delete('/:id', rejectUnauthenticated, (req, res) => {

    console.log('in userRecipesRouter delete', req.params.id, req.user.id);

    pool.query(`DELETE FROM "recipes" WHERE "id" = $1 AND "user_id" = $2`, [req.params.id, req.user.id])
        .then((results) => res.sendStatus(200))
        .catch((error) => res.sendStatus(500));
});

userRecipesRouter.put('/:id', rejectUnauthenticated, (req, res) => {
    console.log('in userRecipesRouter PUT', req.body, req.params.id);

    let queryParams = [req.body.title, req.body.coffee, req.body.roast_level, req.body.input, req.body.output, req.body.comments, req.body.brew_method, req.body.image, req.body.id];
    let queryText = `
    UPDATE "recipes"
    SET "title" = $1, "coffee" = $2, "roast_level" = $3, "input" = $4, "output" = $5, "comments" = $6, "brew_method" = $7, "image" = $8
    WHERE "id" = $9;`;

    pool.query(queryText, queryParams)
        .then((results) => res.sendStatus(200))
        .catch((error) => res.sendStatus(500));
});

userRecipesRouter.post('/method', rejectUnauthenticated, (req, res) => {
    console.log('in userRecipesRouter/method GET', req.body.brew_method);

    //let queryText = 'SELECT * FROM "recipes" WHERE "recipes"."brew_method" = $1'

    let queryText = `SELECT "recipes"."id", "recipes"."title", "recipes"."coffee", "recipes"."roast_level", 
    "recipes"."brew_method", "recipes"."input", "recipes"."output", "recipes"."comments", "recipes"."image", "user"."username" 
    FROM "recipes"
    INNER JOIN "user" 
    ON "recipes"."user_id" = "user"."id"
    WHERE "recipes"."brew_method" = $1
    ORDER BY "recipes"."id" DESC;`;
    pool.query(queryText, [req.body.brew_method])
        .then((results) => res.send(results.rows))
        .catch((error) => res.sendStatus(500));
})

module.exports = userRecipesRouter;
