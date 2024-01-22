"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, FilmIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

const links = [
  {
    name: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    name: "My library",
    href: "/library",
    icon: FilmIcon,
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
            className={clsx("flex items-center justify-between ml-3", {
              "underline decoration-4 decoration-orange-700 underline-offset-8":
                pathname === link.href,
            })}
          >
            <LinkIcon className="w-5" />
            <p className="hidden md:flex uppercase pl-2">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
