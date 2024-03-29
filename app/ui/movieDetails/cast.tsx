import { fetchCast } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpIcon } from "@heroicons/react/24/outline";

export default async function Cast({ id, type }: { id: number; type: string }) {
  const cast = await fetchCast(id, type);
  const mainCast = cast.slice(0, 15);
  return (
    <section className="flex flex-col border-b-2 border-zinc-500 py-3">
      <h3 className="uppercase text-xl md:text-3xl font-bold tracking-wide text-orange-600 mb-2 text-center">
        Main cast
      </h3>
      <Link
        href={`/library/movieDetails?id=${id}&type=${type}`}
        className="flex bg-transparent border border-orange-600 rounded text-sm font-medium uppercase text-center py-2 px-4 transition-colors transition-transform hover:bg-orange-600 hover:border-orange-600 hover:text-zinc-100 hover:scale-105"
      >
        Minimize the cast
        <ArrowUpIcon className="stroke-white w-4 ml-2 hover:stroke-white" />
      </Link>
      <ul className="mt-4 mx-auto grid md:gap-4 md:grid-cols-3 lg:grid-cols-5 list-none">
        {mainCast?.map(
          ({
            id,
            name,
            profile_path,
            character,
          }: {
            id: number;
            name: string;
            profile_path: string;
            character: string;
          }) => (
            <li
              key={id}
              className="max-w-80 rounded-md overflow-hidden transition duration-300 ease-out hover:scale-105 hover:ease-in focus:scale-105 focus:ease-in-out"
            >
              {profile_path ? (
                <Image
                  priority
                  src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                  alt={`Photography of ${name}`}
                  width={500}
                  height={800}
                  className="w-full h-5/6"
                />
              ) : (
                <Image
                  priority
                  src={`https://image.tmdb.org/t/p/w500/wmyYQbahIy4SF2Qo6qNBBkJFg7z.jpg`}
                  alt={`Mock image of ${name}`}
                  width={500}
                  height={800}
                  className="w-full h-5/6"
                />
              )}
              <div className="p-2">
                <p className="text-sm font-medium">
                  Actor/actress:{" "}
                  <span className="uppercase text-orange-600">{name}</span>
                </p>
                <p className="text-sm font-medium">
                  Character: <span className="uppercase">{character}</span>
                </p>
              </div>
            </li>
          )
        )}
      </ul>
    </section>
  );
}
