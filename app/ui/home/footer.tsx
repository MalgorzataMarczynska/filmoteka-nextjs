import { HeartIcon } from "@heroicons/react/16/solid";
import React from "react";

export default function Footer() {
  return (
    <footer className="bottom-0 bg-zinc-200 dark:bg-zinc-900 w-full py-7">
      <div className="container mx-auto text-center">
        <p className="text-sm md:text-base text-zinc-500">
          &copy; 2024 | All Rights Reserved | Developed with
          <span className="inline-block px-1.5">
            <HeartIcon className="w-3 md:w-5 fill-red-600"></HeartIcon>
          </span>
          by Małgorzata Marczyńska
        </p>
      </div>
    </footer>
  );
}
