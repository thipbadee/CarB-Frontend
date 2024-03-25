import type { Metadata } from "next";
import { Inter, Leckerli_One } from "next/font/google";
import { Libre_Franklin } from "next/font/google";
import "./globals.css";
import TopMenu from "@/components/TopMenu";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import NextAuthProvider from "@/providers/NextAuthProvider";
import ReduxProvider from "@/redux/ReduxProvider";


const inter = Inter({ subsets: ["latin"] });
const libre_Franklin = Libre_Franklin({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "CarB",
  description: "CarB - Car Booking System",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={ libre_Franklin.className}>
        <ReduxProvider>
        <NextAuthProvider session={session}>
        <TopMenu/>
        {children}
        </NextAuthProvider>
        </ReduxProvider>
        </body>
    </html>
  );
}
