"use server";
import { users, movies } from "./placeholder-data";
import { LibraryMovie } from "./definitions";

const userId = users[0].id;
const date = new Date().toISOString().split("T")[0];

export async function addToQueue(movieId: number, userId: string) {
  const duplicateMovie = movies?.find(
    (movie) =>
      movie.movie_id === movieId &&
      movie.user_id === userId &&
      movie.status === "queue"
  );
  const differentStatusMovie = movies?.find(
    (movie) =>
      movie.movie_id === movieId &&
      movie.user_id === userId &&
      movie.status === "watched"
  );

  try {
    if (duplicateMovie) {
      throw new Error("You have already added this movie to queue.");
    }
    if (differentStatusMovie) {
      console.log(" I am changing status to queue");
      differentStatusMovie.status = "queue";
    }
    console.log(`I am saving queue data ${userId}, ${movieId}`);
    movies.push({
      user_id: userId,
      movie_id: movieId,
      status: "queue",
      date: date,
    });
    console.log("movies", movies);
    return movies;
  } catch (error) {
    console.error("Saving error:", error);
    throw new Error("Failed to add to queue");
  }
}
export async function addToWatched(movieId: number, userId: string) {
  const duplicateMovie = movies?.find(
    (movie) =>
      movie.movie_id === movieId &&
      movie.user_id === userId &&
      movie.status === "queue"
  );
  const differentStatusMovie = movies?.find(
    (movie) =>
      movie.movie_id === movieId &&
      movie.user_id === userId &&
      movie.status === "queue"
  );

  try {
    if (duplicateMovie) {
      throw new Error("You have already added this movie to watched.");
    }
    if (differentStatusMovie) {
      console.log(" I am changing status to watched");
      differentStatusMovie.status = "watched";
    }
    console.log(" I am saving watched data");
    movies.push({
      user_id: userId,
      movie_id: movieId,
      status: "watched",
      date: date,
    });
    return movies;
  } catch (error) {
    console.error("Saving error:", error);
    throw new Error("Failed to add to watched");
  }
}
