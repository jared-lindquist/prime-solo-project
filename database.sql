Create a new database called `prime_app`
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "recipes" (
    "id" SERIAL PRIMARY KEY,
    "user_id" SERIAL FOREIGN KEY,
    "coffee" VARCHAR(255) NOT NULL,
    "roast_level" VARCHAR(255) NOT NULL,
    "brew_method" VARCHAR(255) NOT NULL,
    "input" INT,
    "output" INT,
    "comments" VARCHAR (255)
);