import { Suspense } from "react";
import TrendingMoviesChart from "../ui/home/trendingMovies";
import SearchedMovieChart from "../ui/home/searchedMovies";
import { CardsWrapperSkeleton, MovieSkeleton } from "../ui/skeletons";
import Pagination from "../ui/pagination";
import Modal from "../ui/modal";
import { fetchTotalPages } from "../lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trending movies this week",
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
  const totalPages = Number(await fetchTotalPages(query, currentPage, "movie"));

  return (
    <main className="container mx-auto py-5 md:py-10 px-2 md:px-4">
      <h1 className="text-xl md:text-2xl text-center uppercase font-bold tracking-wider text-orange-600 pb-8">
        {query ? "Searched movies" : "Trending movies this week"}
      </h1>

      {query ? (
        <Suspense key={query + currentPage} fallback={<CardsWrapperSkeleton />}>
          <SearchedMovieChart
            search={query}
            pageNo={currentPage}
            type={"movie"}
          />
        </Suspense>
      ) : (
        <Suspense key={currentPage} fallback={<CardsWrapperSkeleton />}>
          <TrendingMoviesChart page={currentPage} type={"movie"} />
        </Suspense>
      )}
      {show && (
        <Suspense key={id} fallback={<MovieSkeleton />}>
          <Modal
            movieId={id}
            backTo={"home"}
            search={query}
            page={currentPage}
          />
        </Suspense>
      )}
      <div className="mt-5 flex w-full justify-center">
        <Suspense key="pagination-home" fallback={<p>Loading...</p>}>
          <Pagination totalPages={totalPages} />
        </Suspense>
      </div>
    </main>
  );
}
