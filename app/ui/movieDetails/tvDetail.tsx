import { fetchMovieById } from "@/app/lib/data";
import Image from "next/image";
import { Suspense } from "react";
import Cast from "./cast";
import Reviews from "./reviews";
import { CastSkeleton, ReviewsSkeleton } from "../skeletons";
import Link from "next/link";
import { ArrowDownIcon } from "@heroicons/react/24/outline";

export default async function TvDetails({
  serieId,
  currentPage,
  cast,
  review,
  type,
}: {
  serieId: number;
  currentPage: number;
  cast: boolean;
  review: boolean;
  type: string;
}) {
  const serie = await fetchMovieById(serieId, type);
  const {
    id,
    poster_path,
    name,
    original_name,
    genres,
    vote_average,
    vote_count,
    popularity,
    overview,
    created_by,
    first_air_date,
    last_air_date,
    networks,
    number_of_seasons,
    number_of_episodes,
    status,
  } = serie;
  const genreNames =
    genres
      .map(({ id, name }: { id: number; name: string }) => name)
      .slice(0, 3)
      .join(", ") || "";
  const creators =
    created_by
      .map(({ id, name }: { id: number; name: string }) => name)
      .slice(0, 3)
      .join(", ") || "";
  const network =
    networks
      .map(({ id, name }: { id: number; name: string }) => name)
      .slice(0, 3)
      .join(", ") || "";

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
              alt={`Poster of ${name}`}
              className="w-full h-full rounded-md overflow:hidden"
            />
          ) : (
            <Image
              priority
              src={`https://image.tmdb.org/t/p/w500/wmyYQbahIy4SF2Qo6qNBBkJFg7z.jpg`}
              width={500}
              height={800}
              alt={`Poster of ${name}`}
              className="w-full h-full rounded-md overflow:hidden"
            />
          )}
        </div>
        <div className="mt-3 px-1 md:px-0 md:mt-0 md:w-9/12">
          <h3 className="uppercase text-xl md:text-3xl font-bold tracking-wide text-orange-600 mb-2">
            {name}{" "}
            <span className="text-base md:text-lg">
              &#91;original title: &#34;{original_name}&#34;&#93;
            </span>
          </h3>
          <ul>
            <li className="pt-2 pb-1">
              <span className="uppercase text-sm md:text-base font-bold tracking-wide text-zinc-500 mr-4">
                Created by:
              </span>
              <span className="text-sm md:text-base tracking-wide">
                {creators}
              </span>
            </li>
            <li className="pt-2 pb-1">
              <span className="uppercase text-sm md:text-base font-bold tracking-wide text-zinc-500 mr-4">
                First episode date: / Last episode date / Status of production:
              </span>
              <span className="text-sm md:text-base tracking-wide">
                {first_air_date} / {last_air_date} / {status}
              </span>
            </li>
            <li className="pt-2 pb-1">
              <span className="uppercase text-sm md:text-base font-bold tracking-wide text-zinc-500 mr-4">
                Number of seasons: / Number of episodes:
              </span>
              <span className="text-sm md:text-base tracking-wide">
                {number_of_seasons} / {number_of_episodes}
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
                Network:
              </span>
              <span className="text-sm md:text-base tracking-wide">
                {network}
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
              <Cast id={Number(id)} type={type} />
            </Suspense>
          ) : (
            <Link
              href={`/library/movieDetails?id=${id}&cast=true&type=${type}`}
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
              <Reviews
                movieId={Number(id)}
                currentPage={currentPage}
                type={type}
              />
            </Suspense>
          ) : (
            <Link
              href={`/library/movieDetails?id=${id}&review=true&type=${type}`}
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
