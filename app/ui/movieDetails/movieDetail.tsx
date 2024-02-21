import { fetchMovieById, fetchDirector } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";
import Cast from "./cast";
import Reviews from "./reviews";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import { Suspense } from "react";
import { CastSkeleton, ReviewsSkeleton } from "../skeletons";

export default async function MovieDetails({
  movieId,
  currentPage,
  cast,
  review,
}: {
  movieId: number;
  currentPage: number;
  cast: boolean;
  review: boolean;
}) {
  const movie = await fetchMovieById(movieId);
  const {
    id,
    poster_path,
    title,
    original_title,
    genres,
    vote_average,
    vote_count,
    popularity,
    overview,
    release_date,
    budget,
    revenue,
  } = movie;
  const budgetFormatted = budget.toLocaleString();
  const revenueFormatted = revenue.toLocaleString();
  const genreNames = genres
    .map(({ id, name }: { id: number; name: string }) => name)
    .slice(0, 3)
    .join(", ");
  const director = await fetchDirector(movieId);
  const formattedDirector = director?.join(", ");

  return (
    <div className="flex flex-col">
      <section className="flex flex-col md:flex-row border-b-2 border-zinc-500 py-3">
        <div className="md:w-2/12 md:mr-6">
          {poster_path ? (
            <Image
              priority
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              width={500}
              height={800}
              alt={`Poster of ${title}`}
              className="w-full h-full rounded-md overflow:hidden"
            />
          ) : (
            <Image
              priority
              src={`https://image.tmdb.org/t/p/w500/wmyYQbahIy4SF2Qo6qNBBkJFg7z.jpg`}
              width={500}
              height={800}
              alt={`Poster of ${title}`}
              className="w-full h-full rounded-md overflow:hidden"
            />
          )}
        </div>
        <div className="mt-3 px-1 md:px-0 md:mt-0 md:w-9/12">
          <h3 className="uppercase text-xl md:text-3xl font-bold tracking-wide text-orange-600 mb-2">
            {title}{" "}
            <span className="text-base md:text-lg">
              &#91;original title: &#34;{original_title}&#34;&#93;
            </span>
          </h3>
          <ul>
            <li className="pt-2 pb-1">
              <span className="uppercase text-sm md:text-base font-bold tracking-wide text-zinc-500 mr-4">
                Director:
              </span>
              <span className="text-sm md:text-base tracking-wide">
                {formattedDirector}
              </span>
            </li>
            <li className="pt-2 pb-1">
              <span className="uppercase text-sm md:text-base font-bold tracking-wide text-zinc-500 mr-4">
                Release date:
              </span>
              <span className="text-sm md:text-base tracking-wide">
                {release_date}
              </span>
            </li>
            <li className="pt-2 pb-1">
              <span className="uppercase text-sm md:text-base font-bold tracking-wide text-zinc-500 mr-4">
                Genres:
              </span>
              <span className="text-sm md:text-base tracking-wide">
                {genreNames}
              </span>
            </li>
            <li className="pt-2 pb-1">
              <span className="uppercase text-sm md:text-base font-bold tracking-wide text-zinc-500 mr-4">
                Vote average / Vote count / Popularity:
              </span>
              <span className="text-sm md:text-base tracking-wide">
                <span className="text-orange-600 font-bold">
                  {vote_average}
                </span>{" "}
                / {vote_count} / {popularity}
              </span>
            </li>
            <li className="pt-2 pb-1">
              <span className="uppercase text-sm md:text-base font-bold tracking-wide text-zinc-500 mr-4">
                Budget: / Revenue:
              </span>
              <span className="text-sm md:text-base tracking-wide">
                {budgetFormatted} / {revenueFormatted}
              </span>
            </li>
            <li className="pt-2 pb-1">
              <span className="uppercase text-sm md:text-base font-bold tracking-wide text-zinc-500 mr-4">
                Overview:
              </span>
              <span className="text-sm md:text-base tracking-wide">
                {overview}
              </span>
            </li>
          </ul>
        </div>
      </section>
      <section>
        <div className="pt-4">
          {cast ? (
            <Suspense key={`cast${id}`} fallback={<CastSkeleton />}>
              <Cast id={Number(id)} />
            </Suspense>
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
      </section>
      <section>
        <div className="pt-4">
          {review ? (
            <Suspense key={`review${id}`} fallback={<ReviewsSkeleton />}>
              <Reviews movieId={Number(id)} currentPage={currentPage} />
            </Suspense>
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
      </section>
    </div>
  );
}
