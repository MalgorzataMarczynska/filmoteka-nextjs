import CardsWrapper from "../cardswrapper";
import TvCard from "../tvCards";
import { fetchMovieDetails, fetchMovieIdsByStatus } from "@/app/lib/data";
import NotFoundWatched from "./not-found";

export default async function WatchedSeriesChart({
  currentPage,
  userId,
}: {
  currentPage: number;
  userId: string;
}) {
  const ids = await fetchMovieIdsByStatus("watched", userId, currentPage, "tv");
  const movies = ids ? await fetchMovieDetails(ids, "tv") : undefined;

  return (
    <>
      {movies ? (
        <CardsWrapper>
          <TvCard series={movies} />
        </CardsWrapper>
      ) : (
        <NotFoundWatched />
      )}
    </>
  );
}
