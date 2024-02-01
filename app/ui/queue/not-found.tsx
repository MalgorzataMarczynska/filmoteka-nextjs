import Link from "next/link";
import {
  FilmIcon,
  FaceFrownIcon,
  FaceSmileIcon,
  MinusIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";

export default function NotFoundQueue() {
  return (
    <div className="w-1/2 h-svh mx-auto py-10">
      <p className="text-center text-lg text-zinc-400 leading-10 tracking-wide">
        It seems you have not any queue to watch movies now. Let&#39;s change
        it! There are so many worlds to discover, so many stories to see and so
        many heroes to love or hate. Step back and choose from{" "}
        <Link
          href="/"
          className="text-orange-600 tracking-wider underline underline-offset-2"
        >
          trending movies
        </Link>{" "}
        this week or search by movie title in our database. You will certainly
        find there something interesting. If you want to find something e.g. in
        specific genre use advanced filters in{" "}
        <Link
          href="/library"
          className="text-orange-600 tracking-wider underline underline-offset-2"
        >
          library
        </Link>
        . Remember this formula:
      </p>
      <div className="w-1/2 mx-auto flex pt-7 justify-around">
        <FaceSmileIcon className="w-9 fill-orange-600 stroke-zinc-900" />
        <MinusIcon className="w-6" />
        <FilmIcon className="w-9 stroke-orange-600" />
        <Bars2Icon className="w-6" />
        <FaceFrownIcon className="w-9 fill-orange-600 stroke-zinc-900" />
      </div>
    </div>
  );
}
