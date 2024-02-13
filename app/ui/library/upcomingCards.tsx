"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function UpcomingCard({
  movies,
}: {
  movies: {
    id: number;
    title: string;
    poster_path: string;
    genre_ids: string[];
    release_date: string;
  }[];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get("query");
  const page = searchParams.get("page");
  const query = search ? `query=${search}&` : "";
  const currentPage = page ? `page=${page}&` : "";
  return (
    <>
      {movies?.map(({ id, title, poster_path, genre_ids, release_date }) => (
        <Link
          key={id}
          href={`${pathname}?${query}${currentPage}show=true&id=${id}`}
        >
          <li
            key={id}
            className="max-w-80 rounded-md overflow-hidden transition duration-300 ease-out hover:scale-105 hover:ease-in focus:scale-105 focus:ease-in-out"
          >
            {poster_path ? (
              <Image
                priority
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                width={500}
                height={800}
                alt={`Poster of ${title}`}
                className="w-full h-5/6"
              />
            ) : (
              <Image
                priority
                src={`https://image.tmdb.org/t/p/w500/wmyYQbahIy4SF2Qo6qNBBkJFg7z.jpg`}
                width={500}
                height={800}
                alt={`Poster of ${title}`}
                className="w-full h-5/6"
              />
            )}

            <div className="py-2.5 px-2">
              <h2 className="text-sm md:text-base font-medium uppercase text-zinc-200 tracking-wide">
                {title.length >= 30 ? `${title.slice(0, 27)}...` : title}
              </h2>
              <p className="text-xs font-medium tracking-wide text-orange-600 pt-1">
                {genre_ids.length !== 0
                  ? genre_ids.slice(0, 3).join(", ")
                  : "genre unknown"}{" "}
                | {release_date ? release_date : "release year unknown"}
              </p>
            </div>
          </li>
        </Link>
      ))}
    </>
  );
}
