import FilmotekaLogo from "../filmoteka-logo";
import Link from "next/link";
import NavLinks from "../nav-links";
import SearchBar from "./search";
import { Suspense } from "react";
import LogFunction from "../logFunction";

export default function Navbar() {
  return (
    <div
      style={{ backgroundImage: `url(/home_desktop_opt.jpg)` }}
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
          <div>
            <Suspense key="log-func" fallback={<p>Loading login</p>}>
              <LogFunction />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="w-4/6">
        <Suspense key="search" fallback={<p>Loading searchbar...</p>}>
          <SearchBar placeholder="Search movie by name" />
        </Suspense>
      </div>
    </div>
  );
}
