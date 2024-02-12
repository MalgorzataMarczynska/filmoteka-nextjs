import { fetchMovieById } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";
export default async function MovieDetails({ movieId }: { movieId: number }) {
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

  return (
    <div className="flex flex-col">
      <section className="flex flex-row border-b-2 border-zinc-500 py-3">
        <div className="w-2/12 mr-6">
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
        <div className="w-9/12">
          <h3 className="uppercase text-3xl font-bold tracking-wide text-orange-600 mb-2">
            {title}{" "}
            <span className="text-lg">
              &#91;original title: &#34;{original_title}&#34;&#93;
            </span>
          </h3>
          <ul>
            <li className="pt-2 pb-1">
              <span className="uppercase font-bold tracking-wide text-zinc-500 mr-4">
                Release date:
              </span>
              <span className="tracking-wide">{release_date}</span>
            </li>
            <li className="pt-2 pb-1">
              <span className="uppercase font-bold tracking-wide text-zinc-500 mr-4">
                Genres:
              </span>
              <span className="tracking-wide">{genreNames}</span>
            </li>
            <li className="pt-2 pb-1">
              <span className="uppercase font-bold tracking-wide text-zinc-500 mr-4">
                Vote average / Vote count / Popularity:
              </span>
              <span className="tracking-wide">
                <span className="text-orange-600 font-bold">
                  {vote_average}
                </span>{" "}
                / {vote_count} / {popularity}
              </span>
            </li>
            <li className="pt-2 pb-1">
              <span className="uppercase font-bold tracking-wide text-zinc-500 mr-4">
                Budget: / Revenue:
              </span>
              <span className="tracking-wide">
                {budgetFormatted} / {revenueFormatted}
              </span>
            </li>
            <li className="pt-2 pb-1">
              <span className="uppercase font-bold tracking-wide text-zinc-500 mr-4">
                Overview:
              </span>
              <span className="tracking-wide">{overview}</span>
            </li>
          </ul>
        </div>
      </section>
      <section>
        {/* <Link href={`/library/movieDetails?id=${id}/cast`}>Cast</Link> */}
      </section>
      <section>{/* <Link href="">Reviews</Link> */}</section>
    </div>
  );
}
