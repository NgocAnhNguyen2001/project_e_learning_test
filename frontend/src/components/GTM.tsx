import { useGTMDispatch } from "@elgorditosalsero/react-gtm-hook";
import { useRouter } from "next/router";
import React from "react";

import { useStore } from "utils/hooks/zustand";

const GTM = (): React.ReactElement => {
  const router = useRouter();
  const user = useStore((state) => state.user);
  const sendDataToGTM = useGTMDispatch();
  React.useEffect(() => {
    if(!user?.id) return;
    sendDataToGTM({
      event: 'location.href',
      userId: user?.id,
      role: user?.role,
      href: location.href,
      now: Date.now(),
    });
  }, [router.pathname]);
  return (
    <>
    </>
  );
};

export { GTM };
