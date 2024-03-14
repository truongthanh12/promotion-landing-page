import React from "react";
import App from "./App";
import { Providers } from "./state/provider";
import CampaignStatus from "./components/StatusCampaign";
import NetworkStatus from "./components/NetworkStatus";
import { createRoot } from "react-dom/client";

const container: HTMLElement | any = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Providers>
      <CampaignStatus>
        <NetworkStatus>
          <App />
        </NetworkStatus>
      </CampaignStatus>
    </Providers>
  </React.StrictMode>
);
