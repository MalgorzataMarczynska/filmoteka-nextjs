import CardsWrapper from "../cardswrapper";
import Card from "../cards";
import { fetchTrendingWithGenreNames } from "@/app/lib/data";

export default async function TrendingMoviesChart({
  page,
  type,
}: {
  page: number;
  type: string;
}) {
  const movies = await fetchTrendingWithGenreNames(page, type);
  return (
    <CardsWrapper>
      <Card movies={movies} />
    </CardsWrapper>
  );
}
