import { Suspense } from "react";
import TrendingMoviesChart from "./ui/home/trendingMovies";
import SearchedMovieChart from "./ui/home/searchedMovies";
import { CardsWrapperSkeleton } from "./ui/skeletons";

export default async function Home({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
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
    </main>
  );
}
