import { fetchReviews } from "@/app/lib/data";
import Link from "next/link";
import { ArrowUpIcon } from "@heroicons/react/24/outline";

export default async function Reviews({
  movieId,
  currentPage,
}: {
  movieId: number;
  currentPage: number;
}) {
  const reviews = await fetchReviews(movieId, currentPage);

  return (
    <section className="flex flex-col border-b-2 border-zinc-500 py-3">
      <h3 className="uppercase text-3xl font-bold tracking-wide text-orange-600 mb-2 text-center">
        Reviews
      </h3>
      <Link
        href={`/library/movieDetails?id=${movieId}`}
        className="flex bg-transparent border border-orange-600 rounded text-sm font-medium uppercase text-center py-2 px-4 transition-colors transition-transform hover:bg-orange-600 hover:border-orange-600 hover:text-zinc-100 hover:scale-105"
      >
        Minimize the reviews
        <ArrowUpIcon className="stroke-white w-4 ml-2 hover:stroke-white" />
      </Link>
      <ul className="pt-4">
        {reviews?.map(
          ({
            id,
            author,
            author_details,
            content,
            updated_at,
          }: {
            id: string;
            author: string;
            author_details: { rating: number };
            content: string;
            updated_at: string;
          }) => (
            <li key={id} className="pb-3">
              <div className="flex justify-between border-b-2 border-zinc-500 py-1 text-zinc-500 font-medium">
                <div>
                  <p>
                    Author: <span>{author}</span>
                  </p>
                  <p>
                    Movie rating:{" "}
                    <span className="text-orange-600">
                      {author_details.rating}
                    </span>
                  </p>
                </div>
                <div>
                  <p>
                    Newest version of review:{" "}
                    <span>{updated_at.split("T")[0]}</span>
                  </p>
                </div>
              </div>
              <div className="pt-2">
                <p className="text-sm tracking-wide leading-6">{content}</p>
              </div>
            </li>
          )
        )}
      </ul>
    </section>
  );
}
