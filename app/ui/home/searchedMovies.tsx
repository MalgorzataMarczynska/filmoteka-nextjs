import CardsWrapper from "../cardswrapper";
import Card from "../cards";
import { fetchSearchedMoviesWithGenreNames } from "@/app/lib/data";

export default async function SearchedMovieChart({
  search,
  pageNo,
}: {
  search: string;
  pageNo: number;
}) {
  const movies = await fetchSearchedMoviesWithGenreNames(search, pageNo);
  return (
    <CardsWrapper>
      <Card movies={movies} />
    </CardsWrapper>
  );
}
