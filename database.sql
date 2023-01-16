Create a new database called `prime_app`

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "recipes" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user",
    "coffee" VARCHAR(255) NOT NULL,
    "roast_level" VARCHAR(255) NOT NULL,
    "brew_method" VARCHAR(255) NOT NULL,
    "input" INT,
    "output" INT,
    "comments" VARCHAR (255),
    "image" VARHCAR (120)
);

CREATE TABLE "favorites" (
	"user_id" SERIAL REFERENCES "user",
	"fav_recipe_id" SERIAL REFERENCES "recipes"
);