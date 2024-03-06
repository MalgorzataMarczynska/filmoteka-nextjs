import CardsWrapper from "../cardswrapper";
import Card from "../cards";
import TvCard from "../tvCards";
import { fetchSimilarWithGenreNames } from "@/app/lib/data";
import FindTitle from "./findTitle";

export default async function SimilarMovies({
  id,
  currentPage,
  type,
}: {
  id: number;
  currentPage: number;
  type: string;
}) {
  const movies = await fetchSimilarWithGenreNames(id, currentPage, type);
  return (
    <>
      <FindTitle id={id} type={type} />
      <CardsWrapper>
        {type === "movie" ? (
          <Card movies={movies} />
        ) : (
          <TvCard series={movies} />
        )}
      </CardsWrapper>
    </>
  );
}
