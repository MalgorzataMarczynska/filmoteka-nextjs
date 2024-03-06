import QueueSeriesChart from "@/app/ui/queue/queueSeries";
import Pagination from "@/app/ui/pagination";
import { Suspense } from "react";
import { countMovies } from "@/app/lib/data";
import { getUserId } from "@/app/lib/actions";
import TvModal from "@/app/ui/tvModal";
import { MovieSkeleton } from "@/app/ui/skeletons";

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
  const user = await getUserId();
  const userId = user?.id;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const show = searchParams?.show;
  const id = searchParams?.id;
  const totalPages = await countMovies("queue", userId, "movies");
  return (
    <main className="container mx-auto py-5 md:py-10 px-2 md:px-4">
      <h2 className="text-xl md:text-2xl text-center uppercase font-bold tracking-wider text-orange-600 pb-8">
        Your series in queue to watch
      </h2>
      <div>
        <QueueSeriesChart currentPage={currentPage} userId={userId} />
      </div>
      {show && (
        <Suspense key={id} fallback={<MovieSkeleton />}>
          <TvModal
            movieId={id}
            backTo={"queue series"}
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
