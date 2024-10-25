import type { Metadata } from "next";
import { Noto_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";
import { cookies } from "next/headers";
const noto_serif = Noto_Serif({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: "Cremacion Directa",
  description: "Cremacion directa - Planificar es un gesto de amor",
  icons: {
    icon: "/images/logo-small.png",
  },
  
};

const isLoggedIn = Boolean(cookies().get('jwt')?.value);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body
        className={`${noto_serif.className} antialiased grid min-h-dvh grid-rows-[auto-1fr-auto]`}
      >
        <Navbar isLoggedIn={isLoggedIn} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
