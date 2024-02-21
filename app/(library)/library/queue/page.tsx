import QueueMoviesChart from "@/app/ui/queue/queueMovies";
import Pagination from "@/app/ui/pagination";
import { countMovies } from "@/app/lib/data";
import { getUserId } from "@/app/lib/actions";
import { Suspense } from "react";
import { CardsWrapperSkeleton, MovieSkeleton } from "@/app/ui/skeletons";
import Modal from "@/app/ui/modal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Queue to watch",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    show: boolean;
    id: string | undefined;
  };
}) {
  const userData = await getUserId();
  const user = userData?.id;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const show = searchParams?.show;
  const id = searchParams?.id;
  const totalPages = await countMovies("queue", user);

  return (
    <main className="container mx-auto py-5 md:py-10 px-2 md:px-4">
      <h2 className="text-xl md:text-2xl text-center uppercase font-bold tracking-wider text-orange-600 pb-8">
        Your movie in queue to watch
      </h2>
      <Suspense key={currentPage} fallback={<CardsWrapperSkeleton />}>
        <QueueMoviesChart currentPage={currentPage} />
      </Suspense>
      {show && (
        <Suspense key={id} fallback={<MovieSkeleton />}>
          <Modal
            movieId={id}
            backTo={"queue"}
            search={query}
            page={currentPage}
          />
        </Suspense>
      )}
      <div className="mt-5 flex w-full justify-center">
        <Suspense fallback={<p>Loading...</p>}>
          <Pagination totalPages={totalPages} />
        </Suspense>
      </div>
    </main>
  );
}
