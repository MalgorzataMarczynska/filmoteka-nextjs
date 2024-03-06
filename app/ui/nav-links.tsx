"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FilmIcon,
  BookmarkIcon,
  BookmarkSlashIcon,
  BellIcon,
  TvIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

const links = [
  {
    name: "Trending Movies",
    href: "/",
    icon: FilmIcon,
  },
  {
    name: "Trending TV",
    href: "/trendingTV",
    icon: TvIcon,
  },
  {
    name: "Upcoming Movies",
    href: "/library",
    icon: BellIcon,
  },
  {
    name: "Queue Movies",
    href: "/library/queue/movies",
    icon: BookmarkIcon,
  },
  {
    name: "Queue TV",
    href: "/library/queue/tv",
    icon: BookmarkIcon,
  },
  {
    name: "Watched Movies",
    href: "/library/watched/movies",
    icon: BookmarkSlashIcon,
  },
  {
    name: "Watched TV",
    href: "/library/watched/tv",
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
            className={clsx(
              "flex items-center justify-between ml-5 transition-transform hover:scale-105 focus:scale-105",
              {
                "underline decoration-2 decoration-orange-700 underline-offset-8":
                  pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-3 md:w-5 stroke-orange-600" />
            <p className="hidden lg:flex uppercase text-sm tracking-wide text-zinc-400 font-bold pl-2">
              {link.name}
            </p>
          </Link>
        );
      })}
    </>
  );
}
