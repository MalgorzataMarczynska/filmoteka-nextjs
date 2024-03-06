import { fetchReviews } from "@/app/lib/data";
import Link from "next/link";
import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { Suspense } from "react";
import Pagination from "../pagination";

export default async function Reviews({
  movieId,
  currentPage,
  type,
}: {
  movieId: number;
  currentPage: number;
  type: string;
}) {
  const data = await fetchReviews(movieId, currentPage, type);
  const reviews = data.results;
  const totalPages = data.total_pages;

  return (
    <section className="flex flex-col border-b-2 border-zinc-500 py-3">
      <h3 className="uppercase text-xl md:text-3xl font-bold tracking-wide text-orange-600 mb-2 text-center">
        Reviews
      </h3>
      <Link
        href={`/library/movieDetails?id=${movieId}&type=${type}`}
        className="flex bg-transparent border border-orange-600 rounded text-sm font-medium uppercase text-center py-2 px-4 transition-colors transition-transform hover:bg-orange-600 hover:border-orange-600 hover:text-zinc-100 hover:scale-105"
      >
        Minimize the reviews
        <ArrowUpIcon className="stroke-white w-4 ml-2 hover:stroke-white" />
      </Link>
      <ul className="pt-4 px-1 md:px-0">
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
              <div className="flex flex-col md:flex-row md:justify-between border-b-2 border-zinc-500 py-1 text-zinc-500 font-medium">
                <div>
                  <p className="text-sm md:text-base">
                    Author: <span>{author}</span>
                  </p>
                  <p className="text-sm md:text-base">
                    Movie rating:{" "}
                    <span className="text-orange-600">
                      {author_details.rating}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm md:text-base">
                    Newest version of review:{" "}
                    <span>{updated_at.split("T")[0]}</span>
                  </p>
                </div>
              </div>
              <div className="pt-2">
                <p className="text-sm md:text-base tracking-wide leading-6">
                  {content}
                </p>
              </div>
            </li>
          )
        )}
      </ul>
      <div className="mt-5 flex w-full justify-center">
        <Suspense key="pagination-review" fallback={<p>Loading...</p>}>
          <Pagination totalPages={totalPages} />
        </Suspense>
      </div>
    </section>
  );
}
