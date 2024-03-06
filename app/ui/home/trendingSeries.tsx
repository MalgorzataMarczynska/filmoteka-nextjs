import CardsWrapper from "../cardswrapper";
import TvCard from "../tvCards";
import { fetchTrendingWithGenreNames } from "@/app/lib/data";

export default async function TrendingSeriesChart({
  page,
  type,
}: {
  page: number;
  type: string;
}) {
  const series = await fetchTrendingWithGenreNames(page, type);
  return (
    <CardsWrapper>
      <TvCard series={series} />
    </CardsWrapper>
  );
}
