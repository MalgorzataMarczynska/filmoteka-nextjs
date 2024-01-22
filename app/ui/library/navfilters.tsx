import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const filterNames = [
  { name: "Queue", href: "/library/queue" },
  { name: "Watched", href: "/library/watched" },
];

export default function Filters() {
  const pathname = usePathname();
  return (
    <div className="flex flex-1 flex-shrink-0 justify-between">
      {filterNames.map((filter) => (
        <Link
          key={filter.name}
          href={filter.href}
          className={clsx(
            "flex w-1/3 justify-center bg-transparent rounded border border-white py-2.5 transition-transform hover:scale-105 focus:scale-105",
            { "bg-orange-600 border-0": pathname === filter.href }
          )}
        >
          <p className="uppercase text-sm">{filter.name}</p>
        </Link>
      ))}
    </div>
  );
}
