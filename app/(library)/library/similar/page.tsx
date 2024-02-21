import { fetchTotalPagesSimilarMovies } from "@/app/lib/data";
import { CardsWrapperSkeleton, MovieSkeleton } from "@/app/ui/skeletons";
import SimilarMovies from "@/app/ui/similar/similarCards";
import Pagination from "@/app/ui/pagination";
import Modal from "@/app/ui/modal";
import NotFound from "@/app/ui/similar/not-found";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Similar movies to choose movie",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    show?: boolean;
    id?: string;
    similarTo?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const show = searchParams?.show;
  const id = searchParams?.id;
  const similarTo = searchParams?.similarTo;
  const totalPages = Number(
    await fetchTotalPagesSimilarMovies(Number(similarTo), currentPage)
  );

  return (
    <main className="container mx-auto py-5 md:py-10 px-2 md:px-4">
      {similarTo ? (
        <Suspense key={`similarTo${id}`} fallback={<CardsWrapperSkeleton />}>
          <SimilarMovies id={Number(similarTo)} currentPage={currentPage} />
        </Suspense>
      ) : (
        <NotFound />
      )}
      {show && (
        <Suspense key={id} fallback={<MovieSkeleton />}>
          <Modal
            movieId={id}
            backTo={`similar?similarTo=${similarTo}`}
            search={query}
            page={currentPage}
          />
        </Suspense>
      )}
      {similarTo ? (
        <div className="mt-5 flex w-full justify-center">
          <Suspense key="pagination-similar" fallback={<p>Loading...</p>}>
            <Pagination totalPages={totalPages} />
          </Suspense>
        </div>
      ) : null}
    </main>
  );
}
