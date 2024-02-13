import MovieDetails from "@/app/ui/movieDetails/movieDetail";
import NotFound from "@/app/ui/movieDetails/not-found";
import { MovieDetailsSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    show?: boolean;
    id?: string;
    cast?: boolean;
    review?: boolean;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const show = searchParams?.show;
  const id = searchParams?.id;
  const cast = searchParams?.cast || false;
  const review = searchParams?.review || false;

  return (
    <main className="container mx-auto py-5 md:py-10 px-2 md:px-4">
      {id ? (
        <Suspense key={id} fallback={<MovieDetailsSkeleton />}>
          <MovieDetails
            movieId={Number(id)}
            currentPage={currentPage}
            cast={cast}
            review={review}
          />
        </Suspense>
      ) : (
        <Suspense key="movie not found">
          <NotFound />
        </Suspense>
      )}
    </main>
  );
}
