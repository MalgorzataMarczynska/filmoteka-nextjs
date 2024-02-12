import MovieDetails from "@/app/ui/movieDetails/movieDetail";
import NotFound from "@/app/ui/movieDetails/not-found";
import Cast from "@/app/ui/movieDetails/cast";
import Reviews from "@/app/ui/movieDetails/reviews";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
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
  const cast = searchParams?.cast;
  const review = searchParams?.review;

  return (
    <main className="container mx-auto py-10">
      {id ? <MovieDetails movieId={Number(id)} /> : <NotFound />}
      <div className="pt-4">
        {cast ? (
          <Cast id={Number(id)} />
        ) : (
          <Link
            href={`/library/movieDetails?id=${id}&cast=true`}
            className=" flex bg-transparent border border-orange-600 rounded text-sm font-medium uppercase py-2 px-4 transition-colors transition-transform hover:bg-orange-600 hover:border-orange-600 hover:text-zinc-100 hover:scale-105"
          >
            Show movie cast
            <ArrowDownIcon className="stroke-white w-4 ml-2 hover:stroke-white" />
          </Link>
        )}
      </div>
      <div className="pt-4">
        {review ? (
          <Reviews movieId={Number(id)} currentPage={currentPage} />
        ) : (
          <Link
            href={`/library/movieDetails?id=${id}&review=true`}
            className=" flex bg-transparent border border-orange-600 rounded text-sm font-medium uppercase py-2 px-4 transition-colors transition-transform hover:bg-orange-600 hover:border-orange-600 hover:text-zinc-100 hover:scale-105"
          >
            Show movie reviews
            <ArrowDownIcon className="stroke-white w-4 ml-2 hover:stroke-white" />
          </Link>
        )}
      </div>
    </main>
  );
}
