import Image from "next/image";
import { fetchGenres } from "../lib/data";

export default async function Card({
  movies,
}: {
  movies: {
    id: number;
    title: string;
    poster_path: string;
    genre_ids: number[];
    release_date: string;
  }[];
}) {
  return (
    <>
      {movies?.map(
        ({
          id,
          title,
          poster_path = "/wmyYQbahIy4SF2Qo6qNBBkJFg7z.jpg",
          genre_ids,
          release_date,
        }) => (
          <li
            key={id}
            className="max-w-80 rounded-md overflow-hidden transition duration-300 ease-out hover:scale-105 hover:ease-in focus:scale-105 focus:ease-in-out"
          >
            <Image
              priority
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              width={500}
              height={700}
              alt={`Poster of ${title}`}
              className="w-full h-auto"
            />
            <div className="py-2.5 px-2">
              <p className="text-base font-medium uppercase text-zinc-200 tracking-wide">
                {title.length >= 33 ? `${title.slice(0, 30)}...` : title}
              </p>
              <p className="text-sm font-medium text-orange-600 pt-1">
                {genre_ids.length > 3
                  ? genre_ids.slice(0, 3).join(", ")
                  : genre_ids.join(", ")}{" "}
                | {release_date ? release_date.slice(0, 4) : "unknown"}
              </p>
            </div>
          </li>
        )
      )}
    </>
  );
}
