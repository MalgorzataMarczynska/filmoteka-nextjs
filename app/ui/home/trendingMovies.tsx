import CardsWrapper from "../cardswrapper";
import Card from "../cards";
import { fetchTrendingMoviesWithGenreNames } from "@/app/lib/data";

export default async function TrendingMoviesChart({ page }: { page: number }) {
  const movies = await fetchTrendingMoviesWithGenreNames(page);
  return (
    <CardsWrapper>
      <Card movies={movies} />
    </CardsWrapper>
  );
}
