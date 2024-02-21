import { signOut, auth } from "@/auth";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { LoginLink } from "./buttons";
import { getUserData } from "../lib/actions";

export default async function LogFunction() {
  const session = await getUserData();
  const user = session?.user;

  return (
    <>
      {user ? (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
          className="flex"
        >
          <button className="flex">
            <ArrowLeftStartOnRectangleIcon className="w-3 md:w-5" />
            <p className="hidden md:flex text-xs md:text-sm uppercase ml-2">
              Sign Out, {user.name}
            </p>
          </button>
        </form>
      ) : (
        <LoginLink />
      )}
    </>
  );
}
