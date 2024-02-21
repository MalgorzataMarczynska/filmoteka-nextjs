"use server";
import { User } from "./definitions";
import { LibraryMovie } from "./definitions";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { redirect } from "next/navigation";
const bcrypt = require("bcrypt");
import { signIn, auth } from "@/auth";
import { AuthError } from "next-auth";

const date = new Date().toISOString().split("T")[0];
export async function addToQueue(movieId: number, userId: string) {
  const duplicatedMovie =
    await sql<LibraryMovie>`SELECT movies.movie_id FROM movies WHERE movies.user_id = ${userId} AND movies.movie_id = ${movieId} AND movies.status = 'queue'`;
  const differentStatusMovie =
    await sql<LibraryMovie>`SELECT movies.movie_id FROM movies WHERE movies.user_id = ${userId} AND movies.movie_id = ${movieId} AND movies.status = 'watched'`;
  const data = await Promise.all([duplicatedMovie, differentStatusMovie]);
  const duplicated = data[0].rows.length;
  const differentStatus = data[1].rows.length;

  try {
    if (duplicated !== 0) {
      return { message: "You have already added this movie to queue." };
    }
    if (differentStatus !== 0) {
      console.log(" I am changing status to queue");
      await sql`UPDATE movies SET status = 'queue' WHERE user_id = ${userId} AND movie_id = ${movieId}`;
      revalidatePath("/library/queue");
      revalidatePath("/library/watched");
      return;
    }
    console.log(`I am saving queue data ${userId}, ${movieId}`);
    await sql`INSERT INTO movies (user_id, movie_id, status, date) VALUES (${userId}, ${movieId}, 'queue', ${date})`;
    revalidatePath("/library/queue");
  } catch (error) {
    return { message: "Failed to add to queue" };
  }
}
export async function addToWatched(movieId: number, userId: string) {
  const duplicatedMovie =
    await sql<LibraryMovie>`SELECT movies.movie_id FROM movies WHERE movies.user_id = ${userId} AND movies.movie_id = ${movieId} AND movies.status = 'watched'`;
  const differentStatusMovie =
    await sql<LibraryMovie>`SELECT movies.movie_id FROM movies WHERE movies.user_id = ${userId} AND movies.movie_id = ${movieId} AND movies.status = 'queue'`;
  const data = await Promise.all([duplicatedMovie, differentStatusMovie]);
  const duplicated = data[0].rows.length;
  const differentStatus = data[1].rows.length;

  try {
    if (duplicated !== 0) {
      return { message: "You have already added this movie to watched." };
    }
    if (differentStatus !== 0) {
      console.log(" I am changing status to watched");
      await sql`UPDATE movies SET status = 'watched' WHERE user_id = ${userId} AND movie_id = ${movieId}`;
      revalidatePath("/library/watched");
      revalidatePath("/library/queue");
      return;
    }
    console.log(" I am saving watched data");
    await sql`INSERT INTO movies (user_id, movie_id, status, date) VALUES (${userId}, ${movieId}, 'watched', ${date})`;
    revalidatePath("/library/watched");
  } catch (error) {
    return { message: "Failed to add to watched" };
  }
}

const FormSchema = z.object({
  id: z.string(),
  name: z.string({ required_error: "Please type your username." }),
  email: z.string({ required_error: "Please type your email." }),
  password: z.string({ required_error: "Choose your password" }),
  confirmedPassword: z.string({ required_error: "Confirm your password" }),
});
const CreateUser = FormSchema.omit({ id: true });
export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    confirmedPassword?: string[];
  };
  message?: string | null;
};

export async function createUser(prevState: State, formData: FormData) {
  const validatedFields = CreateUser.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmedPassword: formData.get("confirmedPassword"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields. Failed to create user.",
    };
  }
  const { name, email, password, confirmedPassword } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  if (password !== confirmedPassword) {
    return { message: "Confirmed password are not matching to password." };
  }
  try {
    await sql`INSERT INTO users (name, email, password)
    VALUES (${name}, ${email}, ${hashedPassword})`;
    console.log("I saved the user");
  } catch (error) {
    return { message: "Database error: Failed to create user." };
  }
  redirect("/library");
}
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
export async function getUserData() {
  const sessionData = await auth();
  try {
    return sessionData;
  } catch (error) {
    console.error("Failed to get user:", error);
    throw new Error("Failed to get user.");
  }
}
export async function getUserId() {
  const sessionData = await auth();
  const userData = sessionData?.user;
  const userEmail = userData?.email;
  try {
    const user = await sql`SELECT * FROM users WHERE email=${userEmail}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error("Failed to fetch user id:", error);
    throw new Error("Failed to fetch user id.");
  }
}
