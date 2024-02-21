"use client";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <main className="flex h-full flex-col items-center justify-center py-10">
      <h2 className="text-center mb-6 text-base font-medium tracking-wide">
        Something went wrong!
      </h2>
      <button
        className="rounded bg-orange-600 py-2 px-4 text-base font-medium tracking-wide"
        onClick={() => reset()}
      >
        Try again
      </button>
    </main>
  );
}
