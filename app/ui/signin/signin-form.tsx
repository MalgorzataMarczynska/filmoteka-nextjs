"use client";
import { EnvelopeIcon, KeyIcon, UserIcon } from "@heroicons/react/24/outline";
import { useFormState, useFormStatus } from "react-dom";
import { createUser } from "@/app/lib/actions";

export default function SignInForm() {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(createUser, initialState);
  return (
    <form action={dispatch} className="space-y-3 py-2">
      <div className="flex flex-col">
        <h2 className="text-sm md:text-base">
          Sign in to discover all features of our page
        </h2>
        <div className="w-full mt-5">
          <div className="mb-3">
            <label
              htmlFor="name"
              className="uppercase text-xs md:text-sm font-medium text-orange-600"
            >
              Username
            </label>
            <div className="relative mt-1">
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your username"
                required
                className="w-full py-3 px-2 bg-zinc-900/30 border border-zinc-500 rounded-md text-sm md:text-base"
              ></input>
              <UserIcon className="pointer-event-none hidden md:absolute top-1/4 right-4 w-6 stroke-zinc-500" />
            </div>
            <div id="username-error" aria-live="polite" aria-atomic={true}>
              {state.errors?.name &&
                state.errors.name.map((error: string) => (
                  <p key={error} className="mt-2 text-sm text-red-500">
                    {error}
                  </p>
                ))}
            </div>
          </div>
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
            <div id="email-error" aria-live="polite" aria-atomic={true}>
              {state.errors?.email &&
                state.errors.email.map((error: string) => (
                  <p key={error} className="mt-2 text-sm text-red-500">
                    {error}
                  </p>
                ))}
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
              <KeyIcon className="pointer-event-none hidden md:absolute top-1/4 right-4 w-6 stroke-zinc-500" />
            </div>
            <div id="password-error" aria-live="polite" aria-atomic={true}>
              {state.errors?.password &&
                state.errors.password.map((error: string) => (
                  <p key={error} className="mt-2 text-sm text-red-500">
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="mb-3">
            <label
              htmlFor="confirmedPassword"
              className="uppercase text-xs md:text-sm font-medium text-orange-600"
            >
              Confirm password
            </label>
            <div className="relative mt-1">
              <input
                id="confirmedPassword"
                type="password"
                name="confirmedPassword"
                placeholder="Confirm your password"
                required
                minLength={6}
                className="w-full py-3 px-2 bg-zinc-900/30 border border-zinc-500 rounded-md text-sm md:text-base"
              ></input>
              <KeyIcon className="pointer-event-none hidden md:absolute top-1/4 right-4 w-6 stroke-zinc-500" />
            </div>
            <div
              id="confirmedPassword-error"
              aria-live="polite"
              aria-atomic={true}
            >
              {state.errors?.confirmedPassword &&
                state.errors.confirmedPassword.map((error: string) => (
                  <p key={error} className="mt-2 text-sm text-red-500">
                    {error}
                  </p>
                ))}
            </div>
            <div
              id="form-validation-error"
              aria-live="polite"
              aria-atomic="true"
              aria-describedby="form-validation-error"
            >
              {state.message && (
                <p className="mt-2 text-sm text-red-500">{state.message}</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-3">
          <SignInButton />
        </div>
      </div>
    </form>
  );
}
export function SignInButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="bg-transparent border border-orange-600 py-2 px-8 rounded-md uppercase text-center transition-colors transition-transform hover:bg-orange-600 focus:bg-orange-600 hover:scale-105 focus:scale-105"
    >
      Sign In
    </button>
  );
}
