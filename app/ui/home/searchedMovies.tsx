import CardsWrapper from "../cardswrapper";
import Card from "../cards";
import { fetchSearchedWithGenreNames } from "@/app/lib/data";

export default async function SearchedMovieChart({
  search,
  pageNo,
  type,
}: {
  search: string;
  pageNo: number;
  type: string;
}) {
  const movies = await fetchSearchedWithGenreNames(search, pageNo, type);
  return (
    <CardsWrapper>
      <Card movies={movies} />
    </CardsWrapper>
  );
}
