import Image from "next/image";

export default function FilmotekaLogo() {
  return (
    <div className="flex flex-row items-center transition:transform hover:scale-105 focus:scale-105">
      <Image
        src="/logo_gray.png"
        width={30}
        height={31}
        className="flex self-center w-6 md:w-8 h-auto mr-2.5 transition-transform focus:rotate-90 hover:rotate-90"
        alt="Link to home page"
      ></Image>
      <span className="flex hidden md:flex self-center text-3xl font-medium text-white items-center">
        Filmoteka
      </span>
    </div>
  );
}
