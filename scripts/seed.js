const { db } = require("@vercel/postgres");
const { users, movies } = require("../app/lib/placeholder-data.js");
const bcrypt = require("bcrypt");

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY, name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL);`;
    console.log(`Created "users" table`);
    //console.log("users placeholder", users);
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`INSERT INTO users (id, name, email, password) VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}) ON CONFLICT (id) DO NOTHING;`;
      })
    );
    console.log(`Seeded ${insertedUsers.length} users`);
    return { createTable, users: insertedUsers };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}
async function seedMovies(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable =
      await client.sql`CREATE TABLE IF NOT EXISTS movies (user_id UUID NOT NULL, movie_id INT NOT NULL, status VARCHAR(255) NOT NULL, date DATE NOT NULL);`;
    console.log(`Created "movies" table`);
    const insertedMovies = await Promise.all(
      movies.map(
        (movie) =>
          client.sql`INSERT INTO movies (user_id, movie_id, status, date) VALUES (${movie.user_id}, ${movie.movie_id}, ${movie.status}, ${movie.date});`
      )
    );
    console.log(`Seeded ${insertedMovies.length} movies`);
    return { createTable, movies: insertedMovies };
  } catch (error) {
    console.error("Error seeding movies:", error);
    throw error;
  }
}
async function main() {
  const client = await db.connect();
  await seedUsers(client);
  await seedMovies(client);

  await client.end();
}
main().catch((err) => {
  console.error("An error occured while attempting to seed the database:", err);
});
