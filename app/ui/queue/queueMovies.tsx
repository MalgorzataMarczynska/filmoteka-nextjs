import CardsWrapper from "../cardswrapper";
import Card from "../cards";
import { fetchMovieDetails, fetchMovieIdsByStatus } from "@/app/lib/data";
import NotFoundQueue from "./not-found";

export default async function QueueMoviesChart({
  currentPage,
  userId,
}: {
  currentPage: number;
  userId: string;
}) {
  const ids = await fetchMovieIdsByStatus(
    "queue",
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
        <NotFoundQueue />
      )}
    </>
  );
}
