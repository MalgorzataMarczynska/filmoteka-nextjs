import { User, LibraryMovie } from "./definitions";
import { movies } from "./placeholder-data";
import { unstable_noStore as noStore } from "next/cache";

const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = process.env.MOVIEDB_API;
export async function fetchTrendingMovies(pageNo = 1) {
  noStore();
  try {
    const response = await fetch(
      `${API_URL}trending/movie/week?api_key=${API_KEY}&page=${pageNo}`
    );
    const movies = await response.json();
    return movies;
  } catch (error) {
    console.error("Fetching error:", error);
    throw new Error("Failed to fetch trending movies");
  }
}
export async function fetchGenres() {
  noStore();
  try {
    const response = await fetch(
      `${API_URL}genre/movie/list?api_key=${API_KEY}`
    );
    const genres = await response.json();
    return genres.genres;
  } catch (error) {
    console.error("Fetching error:", error);
    throw new Error("Failed to fetch genres");
  }
}

export async function fetchSearchedMovies(search: string, pageNo: number) {
  noStore();
  try {
    const response = await fetch(
      `${API_URL}search/movie?api_key=${API_KEY}&query=${search}&page=${pageNo}`
    );
    const movies = await response.json();
    return movies;
  } catch (error) {
    console.error("Fetching error:", error);
    throw new Error("Failed to fetch searched movies");
  }
}
export async function fetchTrendingMoviesWithGenreNames(pageNo: number) {
  noStore();
  const [genres, trendingMovies] = await Promise.all([
    fetchGenres(),
    fetchTrendingMovies(pageNo),
  ]);
  const { page, results, total_pages } = trendingMovies;
  for (const result of results) {
    const names = genres
      .filter((el: { id: number; name: string }) =>
        result.genre_ids.includes(el.id)
      )
      .map((el: { id: number; name: string }) => el.name);
    result.genre_ids = [...names];
  }
  return results;
}
export async function fetchSearchedMoviesWithGenreNames(
  searchValue: string,
  pageNum: number
) {
  noStore();
  const [genres, searchedMovies] = await Promise.all([
    fetchGenres(),
    fetchSearchedMovies(searchValue, pageNum),
  ]);
  const { page, results, total_pages } = searchedMovies;
  for (const result of results) {
    const names = genres
      .filter((el: { id: number; name: string }) =>
        result.genre_ids.includes(el.id)
      )
      .map((el: { id: number; name: string }) => el.name);
    result.genre_ids = [...names];
  }
  return results;
}
export async function fetchTotalPages(query: string, page = 1) {
  if (query) {
    const { movies, total_pages } = await fetchSearchedMovies(query, page);
    return total_pages;
  }
  const { movies, total_pages } = await fetchTrendingMovies();
  return total_pages;
}
export async function fetchMovieById(id: number) {
  noStore();
  try {
    const response = await fetch(`${API_URL}movie/${id}?api_key=${API_KEY}`);
    const movie = await response.json();
    return movie;
  } catch (error) {
    console.error("Fetching error:", error);
    throw new Error("Failed to fetch searched movie");
  }
}
export async function fetchMovieIdsByStatus(status: string, user: string) {
  noStore();
  try {
    //baza danych zamiast movies
    const statusMovies = movies.filter(
      (movie) => movie.status === status && movie.userId === user
    );
    const moviesIds = statusMovies.map((movie) => movie.movieId);
    return moviesIds;
  } catch (error) {
    console.error("Fetching error:", error);
    throw new Error(`Failed to fetch ${status} ids from database`);
  }
}
export async function fetchMovieDetails(ids: number[]) {
  try {
    const details = [];
    if (ids.length === 0) {
      return;
    }
    for (const id of ids) {
      const movie = await fetchMovieById(id);
      movie.genre_ids = movie.genres.map(
        (genre: { id: number; name: string }) => genre.name
      );
      details.push(movie);
    }
    return details;
  } catch (error) {
    console.error("Fetching error:", error);
    throw new Error(`Failed to fetch library movies from database`);
  }
}
export async function countMovies(status: string, user: string) {
  noStore();
  const limitPerPage = 20;
  try {
    const amountOfMovies = movies.filter(
      (movie) => movie.status === status && movie.userId === user
    ).length;
    const totalPages =
      amountOfMovies > limitPerPage ? amountOfMovies / limitPerPage : 1;
    return totalPages;
  } catch (error) {
    console.error("Fetching error:", error);
    throw new Error(`Failed to count ${status} movies from database`);
  }
}
