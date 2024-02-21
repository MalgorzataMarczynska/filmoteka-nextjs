import { LibraryMovie } from "./definitions";
import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = process.env.MOVIEDB_API;
const ITEMS_PER_PAGE = 20;

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
export async function fetchUpcomingMovies(pageNo: number) {
  noStore();
  const dayInMs = 24 * 60 * 60 * 1000;
  const threeMonthsInMs = 3 * 31 * dayInMs;
  const todayDate = new Date();
  const startDate = new Date();
  const endDate = new Date();
  startDate.setTime(todayDate.getTime() + dayInMs);
  endDate.setTime(todayDate.getTime() + threeMonthsInMs);
  try {
    const response = await fetch(
      `${API_URL}discover/movie?api_key=${API_KEY}&page=${pageNo}&primary_release_date.gte=${startDate}&primary_release_date.lte=${endDate}&sort_by=popularity.desc`
    );
    const movies = await response.json();
    return movies;
  } catch (error) {
    console.error("Fetching error:", error);
    throw new Error("Failed to fetch upcoming movies");
  }
}
export async function fetchSimilarMovies(id: number, pageNo: number) {
  noStore();
  try {
    const response = await fetch(
      `${API_URL}movie/${id}/similar?api_key=${API_KEY}&page=${pageNo}`
    );
    const movies = await response.json();
    return movies;
  } catch (error) {
    console.error("Fetching error:", error);
    throw new Error("Failed to fetch similar movies");
  }
}
export async function fetchCast(id: number) {
  try {
    const response = await fetch(
      `${API_URL}movie/${id}/credits?api_key=${API_KEY}&language=en-US`
    );
    const cast = await response.json();
    return cast.cast;
  } catch (error) {
    console.error("Fetching error:", error);
    throw new Error("Failed to fetch movie's cast");
  }
}
export async function fetchReviews(id: number, page: number) {
  noStore();
  try {
    const response = await fetch(
      `${API_URL}movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=${page}`
    );
    const reviews = await response.json();
    return reviews;
  } catch (error) {
    console.error("Fetching error:", error);
    throw new Error("Failed to fetch movie's reviews");
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
export async function fetchUpcomingMoviesWithGenreNames(pageNo: number) {
  noStore();
  const [genres, upcomingMovies] = await Promise.all([
    fetchGenres(),
    fetchUpcomingMovies(pageNo),
  ]);
  const { page, results, total_pages } = upcomingMovies;
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
export async function fetchSimilarMoviesWithGenreNames(
  id: number,
  pageNum: number
) {
  noStore();
  const [genres, similarMovies] = await Promise.all([
    fetchGenres(),
    fetchSimilarMovies(id, pageNum),
  ]);
  const { page, results, total_pages } = similarMovies;
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
export async function fetchTotalPagesUpcomingMovies(page = 1) {
  const { movies, total_pages } = await fetchUpcomingMovies(page);
  return total_pages;
}
export async function fetchTotalPagesSimilarMovies(id: number, page = 1) {
  if (!id) {
    return 0;
  }
  const { movies, total_pages } = await fetchSimilarMovies(id, page);
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

export async function fetchMovieIdsByStatus(
  status: string,
  user: string,
  currentPage: number
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const moviesIds =
      await sql<LibraryMovie>`SELECT movies.movie_id FROM movies WHERE movies.user_id = ${user} AND movies.status = ${status} ORDER BY movies.movie_id ASC LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}`;
    const moviesIdsArray = moviesIds.rows.map((movie) => movie.movie_id);
    return moviesIdsArray;
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
  try {
    const moviesCount =
      await sql`SELECT COUNT(*) FROM movies WHERE movies.user_id = ${user} AND movies.status = ${status}`;
    const numberOfMovies = Number(moviesCount.rows[0].count ?? "0");
    const totalPages =
      numberOfMovies > ITEMS_PER_PAGE
        ? Math.ceil(numberOfMovies / ITEMS_PER_PAGE)
        : 1;
    return totalPages;
  } catch (error) {
    console.error("Fetching error:", error);
    throw new Error(`Failed to count ${status} movies from database`);
  }
}
export async function fetchDirector(id: number) {
  noStore();
  try {
    const response = await fetch(
      `${API_URL}movie/${id}/credits?api_key=${API_KEY}&language=en-US`
    );
    const cast = await response.json();
    const crew = cast.crew;
    const director = crew
      .filter(
        ({ name, job }: { name: string; job: string }) => job === "Director"
      )
      .map(({ name, job }: { name: string; job: string }) => name);
    console.log("director in func", director);
    return director;
  } catch (error) {
    console.error("Fetching error:", error);
    throw new Error("Failed to fetch movie's cast");
  }
}
