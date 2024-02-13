import { Suspense } from "react";
import { CardsWrapperSkeleton, MovieSkeleton } from "../ui/skeletons";
import UpcomingMoviesChart from "../ui/library/upcomingMovies";
import Modal from "../ui/modal";
import { fetchTotalPagesUpcomingMovies } from "../lib/data";
import Pagination from "../ui/pagination";

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
  const totalPages = await fetchTotalPagesUpcomingMovies(currentPage);
  return (
    <main className="container mx-auto py-5 md:py-10 px-2 md:px-4">
      <h2 className="text-xl md:text-2xl text-center uppercase font-bold tracking-wider text-orange-600 pb-8">
        Upcoming, the most popular movies in the next three months
      </h2>
      <Suspense key={currentPage} fallback={<CardsWrapperSkeleton />}>
        <UpcomingMoviesChart currentPage={currentPage} />
      </Suspense>
      {show && (
        <Suspense key={id} fallback={<MovieSkeleton />}>
          <Modal
            movieId={id}
            backTo={"library"}
            search={query}
            page={currentPage}
          />
        </Suspense>
      )}
      <div className="mt-5 flex w-full justify-center">
        <Suspense key="pagination-library" fallback={<p>Loading...</p>}>
          <Pagination totalPages={totalPages} />
        </Suspense>
      </div>
    </main>
  );
}
