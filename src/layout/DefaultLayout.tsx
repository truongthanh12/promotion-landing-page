import React, { ReactNode, Suspense } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { cn } from "../utils/helper";
import { useAppSelector } from "../state/hooks";
import { RootState } from "../state/store";
import Spinner from "../components/Spinner";
import { isMobile } from "react-device-detect";
import Error from "../pages/error";
import { ERROR_TYPE } from "../utils/constants";

export default function DefaultLayout({ children }: { children: ReactNode }) {
  const error = useAppSelector((state: RootState) => state.payment.typeError);
  let content;
  if (!!error && error !== ERROR_TYPE.NETWORK_ERROR) {
    content = <Error errorType={error} />;
  } else {
    content = children;
  }

  const { data } = useAppSelector((state) => state.campaign);
  const { background, background_mobile } = data || {};

  return (
    <Suspense fallback={<Spinner />}>
      <header className="px-4 md:px-8 lg:px-20 sticky top-0 bg-black z-50">
        <Header />
      </header>
      <main
        className={cn(
          "px-4 lg:pr-6",
          !!error && error !== ERROR_TYPE.NETWORK_ERROR
            ? "py-16 lg:py-24 bg-white min-h-[65vh]"
            : "py-4 lg:py-6 background-body min-h-screen"
        )}
        style={{
          backgroundImage:
            !error && error !== ERROR_TYPE.NETWORK_ERROR
              ? `url(${isMobile ? background_mobile : background})`
              : "",
        }}
      >
        <div className="container md:w-[93%] 2xl:w-full">{content}</div>
      </main>
      <footer className="px-4 md:px-8">
        <Footer />
      </footer>
    </Suspense>
  );
}
