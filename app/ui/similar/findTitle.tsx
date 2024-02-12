import { fetchMovieById } from "@/app/lib/data";
export default async function FindTitle({ id }: { id: number }) {
  const movie = await fetchMovieById(id);
  const genres = movie.genres
    .map(({ id, name }: { id: number; name: string }) => name)
    .join(", ");

  return (
    <>
      <h2 className="text-2xl text-center uppercase font-bold tracking-wider text-orange-600 pb-8">
        Movies similar to &#34;{movie.title}&#34;{" "}
        <span className="text-xl">&#91;{genres}&#93;</span>
      </h2>
    </>
  );
}
