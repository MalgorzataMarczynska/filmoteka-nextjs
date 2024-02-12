import { fetchMovieById } from "../lib/data";
import Image from "next/image";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  AddToQueueButton,
  AddToWatchedButton,
  FindSimilar,
  ShowDetails,
} from "./buttons";

export default async function Modal({
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
      value: "queue",
      href: "/library/queue",
    },
    {
      value: "watched",
      href: "/library/watched",
    },
  ];

  const valuedPath = pathValues.find((path) => path.value === backToPath[0]);
  const path = valuedPath ? valuedPath.href : "/";

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
  const movie = await fetchMovieById(numberMovieId);
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
  } = movie;
  const genreNames = genres
    .map(({ id, name }: { id: number; name: string }) => name)
    .slice(0, 3)
    .join(", ");
  return (
    <>
      <div className="fixed inset-0 bg-zinc-800 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
        <div className="relative w-1/2 items-center p-9 border shadow-lg rounded-md bg-zinc-100">
          <div className="absolute flex justify-center mt-4 top-5 right-9">
            {/* Navigates back to the base URL - closing the modal  */}
            <Link
              href={backPath(search, page)}
              className="px-2 py-2 bg-transparent text-zinc-900  rounded-3xl shadow hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <XMarkIcon className="w-6" />
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex items-center w-5/12">
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
                  className="w-full h-full"
                />
              )}
            </div>
            <div className="flex flex-col pl-16 pr-2 w-7/12">
              <h2 className="text-3xl font-bold text-zinc-900 uppercase w-11/12">
                {title}
              </h2>
              <ul className="flex flex-col py-5">
                <li className="flex flex-row items-center">
                  <p className="text-sm text-zinc-500 w-3/12">Vote / Votes</p>
                  <span className=" bg-orange-600 text-sm text-zinc-100 font-medium rounded py-1 px-2.5 ml-2.5">
                    {vote_average}
                  </span>
                  <span className="text-zinc-900 text-sm font-medium pl-1.5">
                    / {vote_count}
                  </span>
                </li>
                <li className="flex flex-row items-center pb-1">
                  <p className="text-sm text-zinc-500 w-3/12">Popularity</p>
                  <span className="text-zinc-900 text-sm font-medium  pl-3">
                    {popularity}
                  </span>
                </li>
                <li className="flex flex-row items-center pb-1">
                  <p className="text-sm text-zinc-500 w-3/12">Original Title</p>
                  <span className="text-zinc-900 text-sm font-medium  uppercase pl-3">
                    {original_title.length > 35
                      ? original_title.slice(0, 35) + "..."
                      : original_title}
                  </span>
                </li>
                <li className="flex flex-row items-center">
                  <p className="text-sm text-zinc-500 w-3/12">Genre</p>
                  <span className="text-zinc-900 text-sm font-medium  pl-3">
                    {genreNames}
                  </span>
                </li>
              </ul>
              <div className="mt-2.5">
                <h3 className="text-sm text-zinc-900 font-bold uppercase pb-2">
                  About
                </h3>
                <p className="text-xs text-zinc-900 font-medium leading-relaxed tracking-wide">
                  {overview}
                </p>
              </div>
              <div className="mt-10 flex justify-between">
                <AddToQueueButton id={id} />
                <AddToWatchedButton id={id} />
              </div>
              <div className="mt-10 flex justify-between">
                <FindSimilar id={id} />
                <ShowDetails id={id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
