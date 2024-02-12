import CardsWrapper from "../cardswrapper";
import UpcomingCard from "./upcomingCards";
import { fetchUpcomingMoviesWithGenreNames } from "@/app/lib/data";

export default async function UpcomingMoviesChart({
  currentPage,
}: {
  currentPage: number;
}) {
  const movies = await fetchUpcomingMoviesWithGenreNames(currentPage);

  return (
    <CardsWrapper>
      <UpcomingCard movies={movies} />
    </CardsWrapper>
  );
}
