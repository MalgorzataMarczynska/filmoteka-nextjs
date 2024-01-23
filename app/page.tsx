import { Suspense } from "react";
import TrendingMoviesChart from "./ui/home/trendingMovies";
import SearchedMovieChart from "./ui/home/searchedMovies";
import { CardsWrapperSkeleton } from "./ui/skeletons";
import Pagination from "./ui/pagination";
import { fetchTotalPages } from "./lib/data";

export default async function Home({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = Number(await fetchTotalPages(query));

  return (
    <main className="container mx-auto py-10">
      <h1 className="text-2xl text-center uppercase font-bold tracking-wider text-orange-600 pb-8">
        {query ? "Searched movies" : "Trending movies this week"}
      </h1>
      {query ? (
        <Suspense key={query + currentPage} fallback={<CardsWrapperSkeleton />}>
          <SearchedMovieChart search={query} pageNo={currentPage} />
        </Suspense>
      ) : (
        <Suspense key={currentPage} fallback={<CardsWrapperSkeleton />}>
          <TrendingMoviesChart page={currentPage} />
        </Suspense>
      )}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
}
