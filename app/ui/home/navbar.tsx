"use client";
import FilmotekaLogo from "../filmoteka-logo";
import Link from "next/link";
import NavLinks from "../nav-links";
import SearchBar from "./search";
import Filters from "../library/navfilters";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  let imagePath = "/home_desktop_opt.jpg";
  pathname.includes("library")
    ? (imagePath = "/library_desktop_opt.jpg")
    : (imagePath = "/home_desktop_opt.jpg");
  return (
    <div
      style={{ backgroundImage: `url(${imagePath})` }}
      className="flex flex-col bg-cover bg-center h-60 justify-between items-center py-11"
    >
      <div className="container mx-auto flex flex-row items-center content-center justify-between">
        <Link href="/">
          <FilmotekaLogo />
        </Link>
        <div className="flex justify-between">
          <nav className="flex items-center justify-between mr-4">
            <NavLinks />
          </nav>
          <div>Login</div>
        </div>
      </div>
      <div className="w-2/6">
        {pathname.includes("library") ? (
          <Filters />
        ) : (
          <SearchBar placeholder="Search movies by name" />
        )}
      </div>
    </div>
  );
}
