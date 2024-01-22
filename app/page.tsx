import { Suspense } from "react";
import TrendingMoviesChart from "./ui/home/trendingMovies";
import { CardsWrapperSkeleton } from "./ui/skeletons";

export default async function Home() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-2xl text-center uppercase font-bold tracking-wider text-orange-600 pb-8">
        Trending movies this week
      </h1>
      <Suspense fallback={<CardsWrapperSkeleton />}>
        <TrendingMoviesChart />
      </Suspense>
    </main>
  );
}
