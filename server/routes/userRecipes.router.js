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

    pool.query(`SELECT * FROM "recipes" WHERE "user_id" = $1`, [userId])
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

module.exports = userRecipesRouter;
