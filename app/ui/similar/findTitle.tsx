import { fetchMovieById } from "@/app/lib/data";
export default async function FindTitle({
  id,
  type,
}: {
  id: number;
  type: string;
}) {
  const movie = await fetchMovieById(id, type);
  const genres = movie.genres
    .map(({ id, name }: { id: number; name: string }) => name)
    .join(", ");

  return (
    <>
      <h2 className="text-xl md:text-2xl text-center uppercase font-bold tracking-wider text-orange-600 pb-8">
        Movies similar to &#34;{type === "movie" ? movie.title : movie.name}
        &#34; <span className="text-base md:text-xl">&#91;{genres}&#93;</span>
      </h2>
    </>
  );
}
