"use client";
import FilmotekaLogo from "../filmoteka-logo";
import Link from "next/link";
import NavLinks from "../nav-links";
import SearchBar from "./search";
import Filters from "../library/navfilters";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

export default function Navbar() {
  const pathname = usePathname();
  let imagePath = "/home_desktop_opt.jpg";
  pathname.includes("library")
    ? (imagePath = "/library_desktop_opt.jpg")
    : (imagePath = "/home_desktop_opt.jpg");
  return (
    <div
      style={{ backgroundImage: `url(${imagePath})` }}
      className="flex flex-col bg-cover bg-center h-48 md:h-60 justify-between items-center py-11"
    >
      <div className="container mx-auto flex flex-row items-center content-center justify-between px-2">
        <Link href="/">
          <FilmotekaLogo />
        </Link>
        <div className="flex justify-between">
          <nav className="flex items-center justify-between mr-4">
            <Suspense key="nav-links" fallback={<p>Loading links</p>}>
              <NavLinks />
            </Suspense>
          </nav>
          <div>Login</div>
        </div>
      </div>
      <div className="w-4/6">
        {pathname.includes("library") ? (
          <Suspense key="Filters" fallback={<p>Loading filters...</p>}>
            <Filters />
          </Suspense>
        ) : (
          <Suspense key="search" fallback={<p>Loading searchbar...</p>}>
            <SearchBar placeholder="Search movie by name" />
          </Suspense>
        )}
      </div>
    </div>
  );
}
