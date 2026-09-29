import type { Metadata } from "next";
import { Space_Grotesk, Rajdhani } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chinedu Systems - Mechanical Design",
  description: "Dynamic 3D Mechanical Design Portfolio",
};

import { ThemeProvider } from "@/components/ThemeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${rajdhani.variable} h-full antialiased`}
    >
      <body className={`${spaceGrotesk.className} min-h-full flex flex-col overflow-x-hidden`}>
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 w-full relative z-10 flex flex-col">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
