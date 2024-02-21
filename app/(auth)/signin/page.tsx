import FilmotekaLogo from "@/app/ui/filmoteka-logo";
import SignInForm from "@/app/ui/signin/signin-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in page",
};

export default function SignInPage() {
  const imageUrl = "/bg_home_desktop_opt.jpg";
  return (
    <div
      style={{ backgroundImage: `url(${imageUrl})` }}
      className="flex w-auto h-screen bg-cover bg-center"
    >
      <main className="w-full flex flex-row items-center justify-center py-10 px-10">
        <div className="w-5/6 md:w-1/2 bg-transparent border-2 border-zinc-500 rounded-md px-5 md:px-10 py-7">
          <FilmotekaLogo />
          <SignInForm />
        </div>
      </main>
    </div>
  );
}
