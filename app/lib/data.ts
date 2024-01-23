import { User, FilmTable } from "./definitions";
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
