import { Metadata } from "next";
import { Suspense } from "react";
import TrendingSeriesChart from "@/app/ui/home/trendingSeries";
import SearchedSerieChart from "@/app/ui/home/searchedSeries";
import TvModal from "@/app/ui/tvModal";
import { CardsWrapperSkeleton, MovieSkeleton } from "@/app/ui/skeletons";
import { fetchTotalPages } from "@/app/lib/data";
import Pagination from "@/app/ui/pagination";

export const metadata: Metadata = {
  title: "Trending TV series this week",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    show?: boolean;
    id?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const show = searchParams?.show;
  const id = searchParams?.id;
  const totalPages = Number(await fetchTotalPages(query, currentPage, "tv"));
  return (
    <main className="container mx-auto py-5 md:py-10 px-2 md:px-4">
      <h1 className="text-xl md:text-2xl text-center uppercase font-bold tracking-wider text-orange-600 pb-8">
        {query ? "Searched TV series" : "Trending TV series this week"}
      </h1>
      {query ? (
        <Suspense key={query + currentPage} fallback={<CardsWrapperSkeleton />}>
          <SearchedSerieChart search={query} pageNo={currentPage} type={"tv"} />
        </Suspense>
      ) : (
        <Suspense key={currentPage} fallback={<CardsWrapperSkeleton />}>
          <TrendingSeriesChart page={currentPage} type={"tv"} />
        </Suspense>
      )}
      {show && (
        <Suspense key={id} fallback={<MovieSkeleton />}>
          <TvModal
            movieId={id}
            backTo={"trendingTV"}
            search={query}
            page={currentPage}
          />
        </Suspense>
      )}
      <div className="mt-5 flex w-full justify-center">
        <Suspense key="pagination-trendingTV" fallback={<p>Loading...</p>}>
          <Pagination totalPages={totalPages} />
        </Suspense>
      </div>
    </main>
  );
}
