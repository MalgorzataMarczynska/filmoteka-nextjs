import CardsWrapper from "../cardswrapper";
import Card from "../cards";
import { fetchMovieDetails, fetchMovieIdsByStatus } from "@/app/lib/data";
import { users } from "../../lib/placeholder-data";
import NotFoundWatched from "./not-found";

const user = users[0].id;
export default async function WatchedMoviesChart() {
  const ids = await fetchMovieIdsByStatus("watched", user);
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
