export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};
export type LibraryMovie = {
  userId: string;
  movieId: number;
  status: "watched" | "queue";
  date: string;
};
