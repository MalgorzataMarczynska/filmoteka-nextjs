import CardsWrapper from "../cardswrapper";
import Card from "../cards";
import { fetchMovieDetails, fetchMovieIdsByStatus } from "@/app/lib/data";
import { users } from "../../lib/placeholder-data";
import NotFoundWatched from "./not-found";
import { getUserId } from "@/app/lib/actions";

export default async function WatchedMoviesChart({
  currentPage,
}: {
  currentPage: number;
}) {
  const userData = await getUserId();
  const user = userData?.id;
  const ids = await fetchMovieIdsByStatus("watched", user, currentPage);
  const movies = ids ? await fetchMovieDetails(ids) : undefined;
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
