"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  FilmIcon,
  BookmarkIcon,
  BookmarkSlashIcon,
  BellIcon,
  PuzzlePieceIcon,
  ArrowLeftEndOnRectangleIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

const links = [
  {
    name: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    name: "Upcoming Movies",
    href: "/library",
    icon: BellIcon,
  },
  {
    name: "Similar Movies",
    href: "/library/similar",
    icon: PuzzlePieceIcon,
  },
  {
    name: "Movie details",
    href: "/library/movieDetails",
    icon: FilmIcon,
  },
  {
    name: "Queue",
    href: "/library/queue",
    icon: BookmarkIcon,
  },
  {
    name: "Watched",
    href: "/library/watched",
    icon: BookmarkSlashIcon,
  },
];
export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx("flex items-center justify-between ml-6", {
              "underline decoration-2 decoration-orange-700 underline-offset-8":
                pathname === link.href,
            })}
          >
            <LinkIcon className="w-3 md:w-5 stroke-zinc-200" />
            <p className="hidden lg:flex uppercase text-sm tracking-wider text-zinc-200 font-medium pl-2">
              {link.name}
            </p>
          </Link>
        );
      })}
    </>
  );
}
