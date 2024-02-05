"use server";
import { users, movies } from "./placeholder-data";
import { LibraryMovie } from "./definitions";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const userId = users[0].id;
const date = new Date().toISOString().split("T")[0];

export async function addToQueue(movieId: number, userId: string) {
  const duplicatedMovie =
    await sql<LibraryMovie>`SELECT movies.movie_id FROM movies WHERE movies.user_id = ${userId} AND movies.movie_id = ${movieId} AND movies.status = 'queue'`;
  const differentStatusMovie =
    await sql<LibraryMovie>`SELECT movies.movie_id FROM movies WHERE movies.user_id = ${userId} AND movies.movie_id = ${movieId} AND movies.status = 'watched'`;
  const data = await Promise.all([duplicatedMovie, differentStatusMovie]);
  const duplicated = data[0].rows.length;
  const differentStatus = data[1].rows.length;

  try {
    if (duplicated !== 0) {
      throw new Error("You have already added this movie to queue.");
    }
    if (differentStatus !== 0) {
      console.log(" I am changing status to queue");
      await sql`UPDATE movies SET status = 'queue' WHERE user_id = ${userId} AND movie_id = ${movieId}`;
      revalidatePath("/library/queue");
      revalidatePath("/library/watched");
      return;
    }
    console.log(`I am saving queue data ${userId}, ${movieId}`);
    await sql`INSERT INTO movies (user_id, movie_id, status, date) VALUES (${userId}, ${movieId}, 'queue', ${date})`;
    revalidatePath("/library/queue");
  } catch (error) {
    console.error("Saving error:", error);
    throw new Error("Failed to add to queue");
  }
}
export async function addToWatched(movieId: number, userId: string) {
  const duplicatedMovie =
    await sql<LibraryMovie>`SELECT movies.movie_id FROM movies WHERE movies.user_id = ${userId} AND movies.movie_id = ${movieId} AND movies.status = 'watched'`;
  const differentStatusMovie =
    await sql<LibraryMovie>`SELECT movies.movie_id FROM movies WHERE movies.user_id = ${userId} AND movies.movie_id = ${movieId} AND movies.status = 'queue'`;
  const data = await Promise.all([duplicatedMovie, differentStatusMovie]);
  const duplicated = data[0].rows.length;
  const differentStatus = data[1].rows.length;

  try {
    if (duplicated !== 0) {
      throw new Error("You have already added this movie to watched.");
    }
    if (differentStatus !== 0) {
      console.log(" I am changing status to watched");
      await sql`UPDATE movies SET status = 'watched' WHERE user_id = ${userId} AND movie_id = ${movieId}`;
      revalidatePath("/library/watched");
      revalidatePath("/library/queue");
      return;
    }
    console.log(" I am saving watched data");
    await sql`INSERT INTO movies (user_id, movie_id, status, date) VALUES (${userId}, ${movieId}, 'watched', ${date})`;
    revalidatePath("/library/watched");
  } catch (error) {
    console.error("Saving error:", error);
    throw new Error("Failed to add to watched");
  }
}
