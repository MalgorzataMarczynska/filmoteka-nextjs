"use client";
import {
  KeyIcon,
  EnvelopeIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/app/lib/actions";

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  return (
    <form action={dispatch} className="space-y-3 py-2">
      <div className="flex flex-col">
        <h2 className="text-sm md:text-base">
          Log in to discover all features of our page or{" "}
          <Link
            href="/signin"
            className="text-orange-600 underline decoration-1 underline-offset-2"
          >
            sign in
          </Link>
        </h2>
        <div className="w-full mt-5">
          <div className="mb-3">
            <label
              htmlFor="email"
              className="uppercase text-xs md:text-sm font-medium text-orange-600"
            >
              Email
            </label>
            <div className="relative mt-1">
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="w-full py-3 px-2 bg-zinc-900/30 border border-zinc-500 rounded-md text-sm md:text-base"
              ></input>
              <EnvelopeIcon className="pointer-event-none hidden md:absolute top-1/4 right-4 w-6 stroke-zinc-500" />
            </div>
          </div>
          <div className="mb-3">
            <label
              htmlFor="password"
              className="uppercase text-xs md:text-sm font-medium text-orange-600"
            >
              Password
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                minLength={6}
                className="w-full py-3 px-2 bg-zinc-900/30 border border-zinc-500 rounded-md text-sm md:text-base"
              ></input>
              <KeyIcon className="pointer-event-none  hidden md:absolute top-1/4 right-4 w-6 stroke-zinc-500" />
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-3">
          <LogInButton />
        </div>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
export function LogInButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="bg-transparent border border-orange-600 py-2 px-8 rounded-md uppercase text-center transition-colors transition-transform hover:bg-orange-600 focus:bg-orange-600 hover:scale-105 focus:scale-105"
    >
      Log In
    </button>
  );
}
