import CardsWrapper from "../cardswrapper";
import Card from "../cards";
import { fetchTrendingMoviesWithGenreNames } from "@/app/lib/data";

export default async function TrendingMoviesChart() {
  const movies = await fetchTrendingMoviesWithGenreNames();
  return (
    <CardsWrapper>
      <Card movies={movies} />
    </CardsWrapper>
  );
}
