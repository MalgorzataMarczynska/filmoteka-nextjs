"use client";
import clsx from "clsx";
import { users } from "../lib/placeholder-data.js";
import { addToQueue, addToWatched } from "../lib/actions";
import { usePathname } from "next/navigation.js";

const userId = users[0].id;

export function AddToQueueButton({ id }: { id: number }) {
  const pathname = usePathname();
  return (
    <button
      onClick={() => addToQueue(id, userId)}
      type="button"
      className={clsx(
        "bg-transparent border border-zinc-900 rounded text-zinc-900 font-medium uppercase py-2 px-5 transition-colors transition-transform hover:bg-orange-600 hover:border-orange-600 hover:text-zinc-100 hover:scale-105",
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
        "bg-transparent border border-zinc-900 rounded text-zinc-900 font-medium uppercase py-2 px-5 transition-colors transition-transform hover:bg-orange-600 hover:border-orange-600 hover:text-zinc-100 hover:scale-105",
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
