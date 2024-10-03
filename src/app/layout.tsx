import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "@/context/SessionProvider";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SpentEasy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <Provider>
        <body className={inter.className}>
          {children}
          <Toaster/>
        </body>
      </Provider>
    </html>
  );
}
