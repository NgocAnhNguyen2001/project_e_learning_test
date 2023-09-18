import { GTMProvider } from "@elgorditosalsero/react-gtm-hook";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import type { AppProps } from "next/app";
import "@/styles/index.css";
import "tailwindcss/tailwind.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-number-input/style.css";
import "sendbird-uikit/dist/index.css";
import Head from "next/head";
import Script from "next/script";
import React from "react";

import { FeedbackContainer } from "@/components/Feedback";
import { GTM } from "@/components/GTM";
import {
  NEXT_PUBLIC_GTM_AUTH,
  NEXT_PUBLIC_GTM_ID,
  NEXT_PUBLIC_GTM_PREVIEW,
} from "@/config";
import { extractHostname, getTenant, Props } from "@/utils/tenant";
import { useStore } from "utils/hooks/zustand";

const gtmParams = {
  id: NEXT_PUBLIC_GTM_ID,
  auth: NEXT_PUBLIC_GTM_AUTH,
  preview: NEXT_PUBLIC_GTM_PREVIEW,
};

Sentry.init({
  dsn: "https://1658abea45374eb9a823b7dcbd5e0928@sentry.mindworks.xyz/23",
  integrations: [new Integrations.BrowserTracing()],
  environment: process.env.NODE_ENV,

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

function MyApp({ Component, pageProps }: AppProps & Props): React.ReactElement {
  const user = useStore((state) => state.user);

  const memoTenant = React.useMemo(() => {
    return getTenant(pageProps.hostname).name;
  }, [pageProps.hostname]);

  // Use the custom layout defined at the page level, if available

  return (
    <GTMProvider state={gtmParams}>
      <Head>
        <title>{memoTenant}</title>
      </Head>
      <GTM />
      <Component {...pageProps} />
      <FeedbackContainer />
      {process.env.NODE_ENV === "production" && (
        <Script
          id="fresh-desk"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `function initFreshChat() {
                window.fcWidget.init({
                  token: "9e48e756-ad67-4883-b027-a656d6dda7a1",
                  host: "https://wchat.freshchat.com",
                  config: {
                    cssNames: {
                      widget: "custom_fc_frame"
                    }
                  }
                });
                window.fcWidget.setExternalId("${user?.id}");
                window.fcWidget.user.setFirstName("${user?.firstName}");
              }
              function initialize(i,t){var e;i.getElementById(t)?initFreshChat():((e=i.createElement("script")).id=t,e.async=!0,e.src="https://wchat.freshchat.com/js/widget.js",e.onload=initFreshChat,i.head.appendChild(e))}function initiateCall(){initialize(document,"Freshdesk Messaging-js-sdk")}window.addEventListener?window.addEventListener("load",initiateCall,!1):window.attachEvent("load",initiateCall,!1);`,
          }}
        />
      )}
    </GTMProvider>
  );
}
export default MyApp;

export const getServerSideProps = extractHostname;
