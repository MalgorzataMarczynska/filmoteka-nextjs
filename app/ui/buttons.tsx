import clsx from "clsx";
import { movies } from "../lib/placeholder-data.js";

export function AddToQueueButton({ id }: { id: number }) {
  return (
    <button
      type="button"
      className="bg-transparent border border-zinc-900 rounded text-zinc-900 font-medium uppercase py-2 px-5 transition-colors transition-transform hover:bg-orange-600 hover:border-orange-600 hover:text-zinc-100 hover:scale-105"
    >
      Add to queue
    </button>
  );
}
export function AddToWatchedButton({ id }: { id: number }) {
  return (
    <button
      type="button"
      className="bg-transparent border border-zinc-900 rounded text-zinc-900 font-medium uppercase py-2 px-5 transition-colors transition-transform hover:bg-orange-600 hover:border-orange-600 hover:text-zinc-100 hover:scale-105"
    >
      Add to watched
    </button>
  );
}
