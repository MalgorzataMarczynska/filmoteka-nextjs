import Image from "next/image";

export default function FilmotekaLogo() {
  return (
    <div className="flex flex-row transition:transform hover:scale-105 focus:scale-105">
      <Image
        src="/logo_gray.png"
        width={30}
        height={31}
        className="mr-2.5 self-center transition-transform focus:rotate-90 hover:rotate-90 w-auto"
        alt="Link to home page"
      ></Image>
      <span className="text-3xl font-medium text-white">Filmoteka</span>
    </div>
  );
}
