"use client";
import clsx from "clsx";
import { users } from "../lib/placeholder-data.js";
import { addToQueue, addToWatched } from "../lib/actions";
import { usePathname } from "next/navigation.js";
import Link from "next/link.js";

const userId = users[0].id;

export function AddToQueueButton({ id }: { id: number }) {
  const pathname = usePathname();
  return (
    <button
      onClick={() => addToQueue(id, userId)}
      type="button"
      className={clsx(
        "bg-transparent border border-zinc-900 rounded text-zinc-900 text-xs md:text-sm font-medium uppercase py-1 md:py-2 px-2 md:px-5 mb-1 md:mb-0 transition-colors transition-transform hover:bg-orange-600 hover:border-orange-600 hover:text-zinc-100 hover:scale-105",
        {
          "disabled:bg-zinc-500 disabled:border-zinc-500 disabled:text-zinc-600 disabled:hover:scale-100":
            pathname === "/library/queue",
        }
      )}
      aria-disabled={pathname === "/library/queue"}
      disabled={pathname === "/library/queue"}
    >
      Add to queue
    </button>
  );
}
export function AddToWatchedButton({ id }: { id: number }) {
  const pathname = usePathname();
  return (
    <button
      onClick={() => addToWatched(id, userId)}
      type="button"
      className={clsx(
        "bg-transparent border border-zinc-900 rounded text-zinc-900 text-xs md:text-sm font-medium uppercase py-1 md:py-2 px-2 md:px-5 transition-colors transition-transform hover:bg-orange-600 hover:border-orange-600 hover:text-zinc-100 hover:scale-105",
        {
          "disabled:bg-zinc-500 disabled:border-zinc-500 disabled:text-zinc-600 disabled:hover:scale-100":
            pathname === "/library/watched",
        }
      )}
      aria-disabled={pathname === "/library/watched"}
      disabled={pathname === "/library/watched"}
    >
      Add to watched
    </button>
  );
}
export function FindSimilar({ id }: { id: number }) {
  return (
    <Link
      href={`/library/similar?similarTo=${id}`}
      className="bg-transparent border border-orange-600 rounded text-zinc-900 text-center text-xs md:text-sm font-medium uppercase p-1 md:p-2 mb-1 md:mb-0 transition-colors transition-transform hover:bg-orange-600 hover:border-orange-600 hover:text-zinc-100 hover:scale-105"
    >
      Find similar movies
    </Link>
  );
}
export function ShowDetails({ id }: { id: number }) {
  return (
    <Link
      href={`library/movieDetails?id=${id}`}
      className="bg-transparent border border-orange-600 rounded text-zinc-900 text-center text-xs md:text-sm font-medium uppercase p-1 md:p-2 transition-colors transition-transform hover:bg-orange-600 hover:border-orange-600 hover:text-zinc-100 hover:scale-105"
    >
      Show cast&reviews
    </Link>
  );
}
