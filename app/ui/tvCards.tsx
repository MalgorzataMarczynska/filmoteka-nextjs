"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function TvCard({
  series,
}: {
  series: {
    id: number;
    name: string;
    poster_path: string;
    genre_ids: string[];
    first_air_date: string;
  }[];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const similarTo = searchParams.get("similarTo");
  const search = searchParams.get("query");
  const page = searchParams.get("page");
  const query = search ? `query=${search}&` : "";
  const currentPage = page ? `page=${page}&` : "";
  const similar = similarTo ? `similarTo=${similarTo}&` : "";
  return (
    <>
      {series?.map(({ id, name, poster_path, genre_ids, first_air_date }) => (
        <Link
          key={id}
          href={`${pathname}?${query}${currentPage}${similar}show=true&id=${id}`}
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
                alt={`Poster of ${name}`}
                className="w-full h-5/6"
              />
            ) : (
              <Image
                priority
                src={`https://image.tmdb.org/t/p/w500/wmyYQbahIy4SF2Qo6qNBBkJFg7z.jpg`}
                width={500}
                height={800}
                alt={`Poster of ${name}`}
                className="w-full h-5/6"
              />
            )}

            <div className="py-2.5 px-2">
              <h2 className="text-sm md:text-base font-medium uppercase text-zinc-200 tracking-wide">
                {name.length >= 30 ? `${name.slice(0, 27)}...` : name}
              </h2>
              <p className="text-xs md:text-sm font-medium text-orange-600 pt-1">
                {genre_ids.length !== 0
                  ? genre_ids.slice(0, 3).join(", ")
                  : "genre unknown"}{" "}
                |{" "}
                {first_air_date
                  ? first_air_date.slice(0, 4)
                  : "first air date unknown"}{" "}
              </p>
            </div>
          </li>
        </Link>
      ))}
    </>
  );
}
