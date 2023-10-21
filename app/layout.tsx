import { ReactNode } from "react"
import '@/styles/globals.css';
import { Metadata } from "next";
import Nav from "@/components/Nav";
import Provider from "@/components/Provider";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata= {
    title: "Quotopia",
    description: "Discover and share quotes from your favorite books, movies and TV shows.",
}

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main"></div>
          <div className="gradient" />

          <main className="app">
            <Toaster />
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};