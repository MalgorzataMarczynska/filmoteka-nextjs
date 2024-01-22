const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function CardSkeleton() {
  return (
    <li
      className={`${shimmer} max-w-80 rounded-md overflow-hidden transition duration-300 ease-out hover:scale-105 hover:ease-in focus:scale-105 focus:ease-in-out`}
    >
      <div className="w-full h-auto" />
      <div className="py-2.5 px-2">
        <p className="text-base font-medium uppercase text-zinc-200 tracking-wide"></p>
        <p className="text-sm font-medium text-orange-600 pt-1"></p>
      </div>
    </li>
  );
}
export function CardsWrapperSkeleton() {
  return (
    <ul className="grid gap-8 grid-cols-4 list-none">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </ul>
  );
}
