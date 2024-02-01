import QueueMoviesChart from "@/app/ui/queue/queueMovies";
import Pagination from "@/app/ui/pagination";
import { countMovies } from "@/app/lib/data";
import { users } from "../../lib/placeholder-data";
import { Suspense } from "react";
import { CardsWrapperSkeleton, MovieSkeleton } from "@/app/ui/skeletons";
import Modal from "@/app/ui/modal";

export default async function Queue({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    show: boolean;
    id: string | undefined;
  };
}) {
  const user = users[0].id;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const show = searchParams?.show;
  const id = searchParams?.id;
  const totalPages = await countMovies("queue", user);

  return (
    <main className="container mx-auto py-10">
      <h2 className="text-2xl text-center uppercase font-bold tracking-wider text-orange-600 pb-8">
        Your movie in queue to watch
      </h2>
      <Suspense key={currentPage} fallback={<CardsWrapperSkeleton />}>
        <QueueMoviesChart />
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
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
}
