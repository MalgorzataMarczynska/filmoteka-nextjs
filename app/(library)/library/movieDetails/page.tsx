import MovieDetails from "@/app/ui/movieDetails/movieDetail";
import TvDetails from "@/app/ui/movieDetails/tvDetail";
import { MovieDetailsSkeleton, TvDetailsSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Movie details",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    show?: boolean;
    id?: string;
    cast?: boolean;
    review?: boolean;
    type?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const id = searchParams?.id;
  const cast = searchParams?.cast || false;
  const review = searchParams?.review || false;
  const detailType = searchParams?.type || "";

  return (
    <main className="container mx-auto py-5 md:py-10 px-2 md:px-4">
      {detailType === "movie" ? (
        <Suspense key={id} fallback={<MovieDetailsSkeleton />}>
          <MovieDetails
            movieId={Number(id)}
            currentPage={currentPage}
            cast={cast}
            review={review}
            type={detailType}
          />
        </Suspense>
      ) : (
        <Suspense key={id} fallback={<TvDetailsSkeleton />}>
          <TvDetails
            serieId={Number(id)}
            currentPage={currentPage}
            cast={cast}
            review={review}
            type={detailType}
          />
        </Suspense>
      )}
    </main>
  );
}
