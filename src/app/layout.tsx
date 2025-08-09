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
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Use JWT cookie as the primary source of truth for authentication
  const jwtCookie = cookies().get('jwt')?.value;
  const isLoggedIn = Boolean(jwtCookie);
  
  return (
    <html lang="en">
      <Head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <body
        className={`${noto_serif.className} antialiased `}
      >
        <Navbar isLoggedIn={isLoggedIn} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
