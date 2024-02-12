import CardsWrapper from "../cardswrapper";
import Card from "../cards";
import { fetchSimilarMoviesWithGenreNames } from "@/app/lib/data";
import FindTitle from "./findTitle";

export default async function SimilarMovies({
  id,
  currentPage,
}: {
  id: number;
  currentPage: number;
}) {
  const movies = await fetchSimilarMoviesWithGenreNames(id, currentPage);
  return (
    <>
      <FindTitle id={id} />
      <CardsWrapper>
        <Card movies={movies} />
      </CardsWrapper>
    </>
  );
}
