import { ReactNode, Suspense } from "react"
import '@/styles/globals.css';
import { Metadata } from "next";
import Nav from "@/components/Nav";
import Provider from "@/components/Provider";
import { Toaster } from "react-hot-toast";
import Loading from "@/components/Loading";

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
            <Suspense fallback={<Loading />}>
              <Nav />
              {children}
            </Suspense>
          </main>
        </Provider>
      </body>
    </html>
  );
};