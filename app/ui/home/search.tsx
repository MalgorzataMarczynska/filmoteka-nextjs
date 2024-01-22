"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar({ placeholder }: { placeholder: string }) {
  function handleSearch(term: string) {
    console.log(term);
  }
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search movies by name
      </label>
      <input
        className="w-full backdrop-blur-sm bg-transparent border-b-2 border-white p-2 text-base placeholder:text-zinc-400"
        placeholder={placeholder}
        onChange={(evt) => {
          handleSearch(evt.target.value);
        }}
      />
      <MagnifyingGlassIcon className="absolute right-1 top-1/4 w-5" />
    </div>
  );
}
