const express = require('express');
const pool = require('../modules/pool');
const userRecipesRouter = express.Router();
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// /**
//  * GET route template
//  */
userRecipesRouter.get('/',  (req, res) => {
    console.log('in recipeRouter.get for user recipes')
    console.log('is authenticated?', req.isAuthenticated());
    console.log('req.user', req.user);

    const userId = req.user.id;
    const queryText = `SELECT "recipes"."id", "recipes"."title", "recipes"."coffee", "recipes"."roast_level", 
    "recipes"."brew_method", "recipes"."input", "recipes"."output", "recipes"."comments", "user"."username" 
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

// /**
//  * POST route template
//  */
// router.post('/', (req, res) => {
//   // POST route code here
// });

userRecipesRouter.delete('/:id', (req, res) => {

    console.log('in userRecipesRouter delete', req.params.id, req.user.id);

    pool.query(`DELETE FROM "recipes" WHERE "id" = $1 AND "user_id" = $2`, [req.params.id, req.user.id])
    .then ((results) => res.sendStatus(200))
    .catch((error) => res.sendStatus(500));
    //endpoint functionality
})

module.exports = userRecipesRouter;
