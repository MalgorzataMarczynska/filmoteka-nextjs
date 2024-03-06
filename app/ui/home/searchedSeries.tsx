import CardsWrapper from "../cardswrapper";
import TvCard from "../tvCards";
import { fetchSearchedWithGenreNames } from "@/app/lib/data";

export default async function SearchedSerieChart({
  search,
  pageNo,
  type,
}: {
  search: string;
  pageNo: number;
  type: string;
}) {
  const series = await fetchSearchedWithGenreNames(search, pageNo, type);
  return (
    <CardsWrapper>
      <TvCard series={series} />
    </CardsWrapper>
  );
}
