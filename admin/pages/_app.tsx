import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-number-input/style.css";
import "sendbird-uikit/dist/index.css";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { useStore } from "utils/hooks/zustand";

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import { AdminLayout } from "@/layouts/AdminLayout";
import { theme } from "@/themes/default";

import "@/styles/index.css";

Sentry.init({
  dsn: "https://476341c82e6749fe82f4f6de3b567064@sentry.mindworks.xyz/25",
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});

// export const AuthContext = React.createContext();
function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  // const [authState, setAuthState] = React.useState({
  //   accessToken: "",
  //   refreshToken: "",
  // });

  const router = useRouter();
  const user = useStore((state) => state.user);
  useEffect(() => {
    if (user) return;
    router.push("/auth/login");
  }, [user]);
  return (
    // <AuthContext.Provider value={{ accessToken: "", refreshToken: "" }}>
    <ChakraProvider theme={theme}>
      {user ? (
        <AdminLayout path={router.pathname.split("/").splice(0, 2).join("/")}>
          <Component {...pageProps} />
        </AdminLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </ChakraProvider>
    // </AuthContext.Provider>
  );
}
export default MyApp;
