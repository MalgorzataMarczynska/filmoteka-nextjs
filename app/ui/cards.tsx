import Image from "next/image";
import { fetchGenres } from "../lib/data";

export default async function Card({
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
  return (
    <>
      {movies?.map(({ id, title, poster_path, genre_ids, release_date }) => (
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
            <p className="text-base font-medium uppercase text-zinc-200 tracking-wide">
              {title.length >= 30 ? `${title.slice(0, 27)}...` : title}
            </p>
            <p className="text-sm font-medium text-orange-600 pt-1">
              {genre_ids.length !== 0
                ? genre_ids.slice(0, 3).join(", ")
                : "genre unknown"}{" "}
              |{" "}
              {release_date ? release_date.slice(0, 4) : "release year unknown"}
            </p>
          </div>
        </li>
      ))}
    </>
  );
}
