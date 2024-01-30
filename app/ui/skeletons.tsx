import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function CardSkeleton() {
  return (
    <li
      className={`${shimmer} max-w-80 rounded-md overflow-hidden transition duration-300 ease-out hover:scale-105 hover:ease-in focus:scale-105 focus:ease-in-out`}
    >
      <div className="w-full h-auto" />
      <div className="py-2.5 px-2">
        <p className="text-base font-medium uppercase text-zinc-200 tracking-wide"></p>
        <p className="text-sm font-medium text-orange-600 pt-1"></p>
      </div>
    </li>
  );
}
export function CardsWrapperSkeleton() {
  return (
    <ul className="grid gap-8 grid-cols-4 list-none">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </ul>
  );
}

export function MovieSkeleton() {
  return (
    <>
      <div className="fixed inset-0 bg-zinc-800 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
        <div className="relative w-1/2 items-center p-9 border shadow-lg rounded-md bg-zinc-100">
          <div className="absolute flex justify-center mt-4 top-5 right-9">
            {/* Navigates back to the base URL - closing the modal  */}
            <Link
              href="/"
              className="px-2 py-2 bg-transparent text-zinc-900  rounded-3xl shadow hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <XMarkIcon className="w-6" />
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <div className="flex items-center w-5/12"></div>
            <div className="flex flex-col pl-16 pr-2 w-7/12">
              <h2 className="text-3xl font-bold text-zinc-900 uppercase w-11/12">
                title
              </h2>
              <ul className="flex flex-col py-5">
                <li className="flex flex-row items-center">
                  <p className="text-sm text-zinc-500 w-3/12">Vote / Votes</p>
                  <span className=" bg-orange-600 text-sm text-zinc-100 font-medium rounded py-1 px-2.5 ml-2.5"></span>
                  <span className="text-zinc-900 text-sm font-medium pl-1.5"></span>
                </li>
                <li className="flex flex-row items-center pb-1">
                  <p className="text-sm text-zinc-500 w-3/12">Popularity</p>
                  <span className="text-zinc-900 text-sm font-medium  pl-3"></span>
                </li>
                <li className="flex flex-row items-center pb-1">
                  <p className="text-sm text-zinc-500 w-3/12">Original Title</p>
                  <span className="text-zinc-900 text-sm font-medium  uppercase pl-3"></span>
                </li>
                <li className="flex flex-row items-center">
                  <p className="text-sm text-zinc-500 w-3/12">Genre</p>
                  <span className="text-zinc-900 text-sm font-medium  pl-3"></span>
                </li>
              </ul>
              <div className="mt-2.5">
                <h3 className="text-sm text-zinc-900 font-bold uppercase pb-2">
                  About
                </h3>
                <p className="text-xs text-zinc-900 font-medium leading-relaxed tracking-wide"></p>
              </div>
              <div className="mt-10 flex justify-between">
                <button
                  type="button"
                  className="bg-transparent border border-zinc-900 rounded text-zinc-900 font-medium uppercase py-2 px-5 transition-colors transition-transform hover:bg-orange-600 hover:border-orange-600 hover:text-zinc-100 hover:scale-105"
                >
                  Add to queue
                </button>
                <button
                  type="button"
                  className="bg-transparent border border-zinc-900 rounded text-zinc-900 font-medium uppercase py-2 px-5 transition-colors transition-transform hover:bg-orange-600 hover:border-orange-600 hover:text-zinc-100 hover:scale-105"
                >
                  Add to watched
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
