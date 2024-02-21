import CardsWrapper from "../cardswrapper";
import Card from "../cards";
import { fetchMovieDetails, fetchMovieIdsByStatus } from "@/app/lib/data";
import { getUserId } from "@/app/lib/actions";
import NotFoundQueue from "./not-found";

export default async function QueueMoviesChart({
  currentPage,
}: {
  currentPage: number;
}) {
  const userData = await getUserId();
  const user = userData?.id;
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
