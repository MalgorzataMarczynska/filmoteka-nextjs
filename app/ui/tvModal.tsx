import { fetchMovieById } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  AddToQueueButton,
  AddToWatchedButton,
  FindSimilar,
  ShowDetails,
  NonLoginModalButton,
} from "./buttons";
import { getUserId } from "@/app/lib/actions";

export default async function TvModal({
  movieId,
  backTo,
  search,
  page,
}: {
  movieId: string | undefined;
  backTo: string;
  search: string;
  page: number;
}) {
  const userData = await getUserId();
  const userId = userData?.id;
  const backToPath = backTo.split("?");
  if (!movieId) {
    return;
  }
  const pathValues = [
    {
      value: "home",
      href: "/",
    },
    {
      value: "library",
      href: "/library",
    },
    {
      value: "similar",
      href: "/library/similar",
    },
    {
      value: "queue movies",
      href: "/library/queue/movies",
    },
    {
      value: "queue series",
      href: "/library/queue/tv",
    },
    {
      value: "watched movies",
      href: "/library/watched/movies",
    },
    {
      value: "watched series",
      href: "/library/watched/tv",
    },
    {
      value: "trendingTV",
      href: "/trendingTV",
    },
  ];
  const valuedPath = pathValues.find((path) => path.value === backToPath[0]);
  const path = valuedPath ? valuedPath.href : "/trendingTV";
  const backPath = (query: string, page: number) => {
    if (query && page > 1) {
      return `${path}/?query=${query}&page=${page}`;
    }
    if (!query && !backToPath[1] && page !== 1) {
      return `${path}/?page=${page}`;
    }
    if (page === 1 && query) {
      return `${path}/?query=${query}`;
    }
    if (backToPath[1] && page === 1) {
      return `${path}/?${backToPath[1]}`;
    }
    if (backToPath[1] && page > 1) {
      return `${path}/?${backToPath[1]}&page=${page}`;
    }
    return path;
  };

  const numberMovieId = Number(movieId);
  const serie = await fetchMovieById(numberMovieId, "tv");
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
    networks,
    status,
  } = serie;
  const genreNames = genres
    .map(({ id, name }: { id: number; name: string }) => name)
    .slice(0, 3)
    .join(", ");
  const networkName = networks
    .map(({ name }: { name: string }) => name)
    .join(", ");
  return (
    <>
      <div className="fixed inset-0 bg-zinc-800 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
        <div className="relative w-4/6 mx-auto md:w-1/2 items-center p-5 md:p-9 border shadow-lg rounded-md bg-zinc-100">
          <div className="absolute flex justify-center md:mt-4 top-2 md:top-5 right-2 md:right-9">
            {/* Navigates back to the base URL - closing the modal  */}
            <Link
              href={backPath(search, page)}
              className=" px-1 md:px-2 py-1 md:py-2 bg-zinc-100 md:bg-transparent text-zinc-900 rounded-3xl shadow hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <XMarkIcon className="w-5 md:w-6" />
            </Link>
          </div>
          <div className="block mx-auto md:flex items-center justify-center">
            <div className="block md:flex items-center w-full md:w-5/12 mb-2 md:mb-0">
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
            <div className="block mx-auto md:flex flex-col md:pl-16 md:pr-2 w-full md:w-7/12">
              <h2 className="text-xl md:text-3xl font-bold text-zinc-900 uppercase w-11/12">
                {name}
              </h2>
              <ul className="flex flex-col py-3 md:py-5">
                <li className="flex flex-row items-center">
                  <p className="text-xs md:text-sm text-zinc-500 w-3/12">
                    Vote / Votes
                  </p>
                  <span className="bg-orange-600 text-xs md:text-sm text-zinc-100 font-medium rounded py-1 px-1.5 md:px-2.5 ml-2.5">
                    {vote_average}
                  </span>
                  <span className="text-zinc-900 text-xs md:text-sm font-medium pl-1.5">
                    / {vote_count}
                  </span>
                </li>
                <li className="flex flex-row items-center pb-1">
                  <p className="text-xs md:text-sm text-zinc-500 w-3/12">
                    Popularity
                  </p>
                  <span className="text-zinc-900 text-xs md:text-sm font-medium  pl-3">
                    {popularity}
                  </span>
                </li>
                <li className="flex flex-row items-center pb-1">
                  <p className="text-xs md:text-sm text-zinc-500 w-3/12">
                    Original Title
                  </p>
                  <span className="text-zinc-900 text-xs md:text-sm font-medium uppercase pl-3">
                    {original_name.length > 35
                      ? original_name.slice(0, 35) + "..."
                      : original_name}
                  </span>
                </li>
                <li className="flex flex-row items-center pb-1">
                  <p className="text-xs md:text-sm text-zinc-500 w-3/12">
                    Genre
                  </p>
                  <span className="text-zinc-900 text-xs md:text-sm font-medium pl-3">
                    {genreNames}
                  </span>
                </li>
                <li className="flex flex-row items-center pb-1">
                  <p className="text-xs md:text-sm text-zinc-500 w-3/12">
                    Status:
                  </p>
                  <span className="text-zinc-900 text-xs md:text-sm font-medium pl-3">
                    {status}
                  </span>
                </li>
                <li className="flex flex-row items-center">
                  <p className="text-xs md:text-sm text-zinc-500 w-3/12">
                    Network
                  </p>
                  <span className="text-zinc-900 text-xs md:text-sm font-medium  pl-3">
                    {networkName}
                  </span>
                </li>
              </ul>
              <div className="mt-1.5 md:mt-2.5">
                <h3 className="text-sm text-zinc-900 font-bold uppercase pb-1.5 md:pb-2">
                  About
                </h3>
                <p className="text-xs text-zinc-900 font-medium md:leading-relaxed tracking-wide">
                  {overview}
                </p>
              </div>
              {userId ? (
                <div className="mt-5 md:mt-10 flex flex-col md:flex-row md:justify-between">
                  <AddToQueueButton id={id} userId={userId} type={"tv"} />
                  <AddToWatchedButton id={id} userId={userId} type={"tv"} />
                </div>
              ) : (
                <div className="mt-5 md:mt-10 flex flex-col md:flex-row md:justify-between">
                  <NonLoginModalButton />{" "}
                </div>
              )}
              {userId ? (
                <div className="mt-5 md:mt-10 flex flex-col md:flex-row md:justify-between">
                  <FindSimilar id={id} type={"tv"} />
                  <ShowDetails id={id} type={"tv"} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
