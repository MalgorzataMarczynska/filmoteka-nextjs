import CardsWrapper from "../cardswrapper";
import Card from "../cards";
import { fetchMovieDetails, fetchMovieIdsByStatus } from "@/app/lib/data";
import { users } from "../../lib/placeholder-data";
import NotFoundQueue from "./not-found";

const user = users[0].id;
export default async function QueueMoviesChart({
  currentPage,
}: {
  currentPage: number;
}) {
  const ids = await fetchMovieIdsByStatus("queue", user, currentPage);
  const movies = ids ? await fetchMovieDetails(ids) : undefined;
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
