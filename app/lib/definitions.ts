export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};
export type LibraryMovie = {
  user_id: string;
  movie_id: number;
  status: "watched" | "queue";
  date: string;
};
