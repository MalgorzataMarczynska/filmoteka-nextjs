import Link from "next/link";
export default function NotFound() {
  return (
    <div className="min-h-96 w-1/2 mx-auto">
      <h2 className="text-2xl text-center uppercase font-bold tracking-wider text-orange-600 pb-8">
        Any movie to choose
      </h2>
      <p className="text-lg text-center leading-8">
        You did not choose any movie to compare. Please step back to{" "}
        <Link href="/" className="text-orange-600 underline underline-offset-2">
          trending / searched
        </Link>{" "}
        or your{" "}
        <Link
          href="/library"
          className="text-orange-600 underline underline-offset-2"
        >
          saved movies
        </Link>{" "}
        and pick one.{" "}
      </p>
    </div>
  );
}
