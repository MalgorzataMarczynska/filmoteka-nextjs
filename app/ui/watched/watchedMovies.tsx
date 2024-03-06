import CardsWrapper from "../cardswrapper";
import Card from "../cards";
import {
  fetchMovieDetails,
  fetchMovieIdsByStatus,
  countMovies,
} from "@/app/lib/data";
import NotFoundWatched from "./not-found";
import Link from "next/link";
import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { Suspense } from "react";
import Pagination from "../pagination";

export default async function WatchedMoviesChart({
  currentPage,
  userId,
}: {
  currentPage: number;
  userId: string;
}) {
  const ids = await fetchMovieIdsByStatus(
    "watched",
    userId,
    currentPage,
    "movie"
  );
  const movies = ids ? await fetchMovieDetails(ids, "movie") : undefined;

  return (
    <>
      {movies ? (
        <CardsWrapper>
          <Card movies={movies} />
        </CardsWrapper>
      ) : (
        <NotFoundWatched />
      )}
    </>
  );
}
