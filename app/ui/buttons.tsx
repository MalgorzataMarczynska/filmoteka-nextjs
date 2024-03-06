"use client";
import clsx from "clsx";
import { addToQueue, addToWatched } from "../lib/actions";
import { usePathname } from "next/navigation.js";
import Link from "next/link.js";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";

export function AddToQueueButton({
  id,
  userId,
  type,
}: {
  id: number;
  userId: string;
  type: string;
}) {
  const pathname = usePathname();
  const disabledQueuePaths = "/library/queue/movies" || "/library/queue/tv";
  return (
    <button
      onClick={() => addToQueue(id, userId, type)}
      type="button"
      className={clsx(
        "bg-transparent border border-zinc-900 rounded text-zinc-900 text-xs md:text-sm font-medium uppercase py-1 md:py-2 px-2 md:px-5 mb-1 md:mb-0 transition-colors transition-transform hover:bg-orange-600 hover:border-orange-600 hover:text-zinc-100 hover:scale-105",
        {
          "disabled:bg-zinc-500 disabled:border-zinc-500 disabled:text-zinc-600 disabled:hover:scale-100":
            pathname === disabledQueuePaths,
        }
      )}
      aria-disabled={pathname === disabledQueuePaths}
      disabled={pathname === disabledQueuePaths}
    >
      Add to queue
    </button>
  );
}
export function NonLoginModalButton() {
  return (
    <Link
      href="/login"
      className="bg-transparent border border-zinc-900 rounded text-zinc-900 text-xs md:text-sm font-medium uppercase py-1 md:py-2 px-2 md:px-5 mb-1 md:mb-0 transition-colors transition-transform hover:bg-orange-600 hover:border-orange-600 hover:text-zinc-100 hover:scale-105"
    >
      In order to access more feature like adding to library or see similar and
      details, please log in
    </Link>
  );
}
export function AddToWatchedButton({
  id,
  userId,
  type,
}: {
  id: number;
  userId: string;
  type: string;
}) {
  const pathname = usePathname();
  const disabledWatchedPaths =
    "/library/watched/movies" || "/library/watched/tv";
  return (
    <button
      onClick={() => addToWatched(id, userId, type)}
      type="button"
      className={clsx(
        "bg-transparent border border-zinc-900 rounded text-zinc-900 text-xs md:text-sm font-medium uppercase py-1 md:py-2 px-2 md:px-5 transition-colors transition-transform hover:bg-orange-600 hover:border-orange-600 hover:text-zinc-100 hover:scale-105",
        {
          "disabled:bg-zinc-500 disabled:border-zinc-500 disabled:text-zinc-600 disabled:hover:scale-100":
            pathname === disabledWatchedPaths,
        }
      )}
      aria-disabled={pathname === disabledWatchedPaths}
      disabled={pathname === disabledWatchedPaths}
    >
      Add to watched
    </button>
  );
}
export function FindSimilar({ id, type }: { id: number; type: string }) {
  return (
    <Link
      href={`/library/similar?similarTo=${id}&type=${type}`}
      className="bg-transparent border border-orange-600 rounded text-zinc-900 text-center text-xs md:text-sm font-medium uppercase p-1 md:p-2 mb-1 md:mb-0 transition-colors transition-transform hover:bg-orange-600 hover:border-orange-600 hover:text-zinc-100 hover:scale-105"
    >
      Find similar movies
    </Link>
  );
}
export function ShowDetails({ id, type }: { id: number; type: string }) {
  return (
    <Link
      href={`/library/movieDetails?id=${id}&type=${type}`}
      className="bg-transparent border border-orange-600 rounded text-zinc-900 text-center text-xs md:text-sm font-medium uppercase p-1 md:p-2 transition-colors transition-transform hover:bg-orange-600 hover:border-orange-600 hover:text-zinc-100 hover:scale-105"
    >
      Show cast&reviews
    </Link>
  );
}
export function LoginLink() {
  return (
    <Link href="/login" className="flex">
      <ArrowLeftEndOnRectangleIcon className="w-5" />
      <p className="ml-2 uppercase hidden md:flex text-xs md:text-sm">
        Log in, anonymous
      </p>
    </Link>
  );
}
