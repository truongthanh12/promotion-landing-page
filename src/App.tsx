import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Popup from "./components/ui/Popup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VieONIntro from "./components/VieONIntro";
import { useAppDispatch } from "./state/hooks";
import { getCampaignConfig } from "./state/features/campaignSlice";
import DefaultLayout from "./layout/DefaultLayout";
import ResultLayout from "./layout/ResultLayout";
import PaymentResults from "./pages/results";
import { pathname, trimmedPathname } from "./utils/helper";
import { PAGE } from "./utils/constants";
import Home from "./pages/home";
import { Tracking } from "tracking/TrackingSegment";

/**
 * Renders the main application component.
 * @returns The rendered component.
 */
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    document.documentElement.classList.add("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    const timeoutId = setTimeout(() => {
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
      setLoading(false);
    }, 2900);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    dispatch(getCampaignConfig({ key: trimmedPathname }));
  }, [dispatch]);

  // useEffect(() => {
  //   Tracking.init()
  // }, [])

  return (
    <BrowserRouter>
      {loading && <VieONIntro />}
      <Routes>
        <Route
          path={pathname}
          element={
            <DefaultLayout>
              <Home />
            </DefaultLayout>
          }
        />
        <Route
          path={pathname + PAGE.RESULT}
          element={
            <ResultLayout>
              <PaymentResults />
            </ResultLayout>
          }
        />
      </Routes>
      <Popup />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
