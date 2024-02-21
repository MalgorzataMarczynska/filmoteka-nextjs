import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  preload: true,
});

export const metadata: Metadata = {
  title: { template: "%s | Filmoteka Authentication", default: "Filmoteka" },
  description: "Page to discover movies with user's library",
  metadataBase: new URL("https://filmoteka-nextjs.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" className="scroll-smooth">
      <body className={`${roboto.className} antialiased`}>{children}</body>
    </html>
  );
}
