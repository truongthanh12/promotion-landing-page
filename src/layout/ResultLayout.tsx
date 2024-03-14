import React, { ReactNode, Suspense } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ResultLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<>Loading...</>}>
      <header className="px-4 md:px-8 lg:px-20 sticky top-0 bg-black z-50">
        <Header />
      </header>
      <main className="py-6 2xl:py-22 pb-8 px-3 lg:px-6 bg-white min-h-[65vh]">
        <div className="max-w-[700px] mx-auto">{children}</div>
      </main>
      <footer className="px-4 md:px-8">
        <Footer />
      </footer>
    </Suspense>
  );
}
