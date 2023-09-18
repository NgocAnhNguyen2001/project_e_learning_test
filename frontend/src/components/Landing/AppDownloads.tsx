import React from "react";

import Apple from "../../../public/images/landing/apple-download.svg";
import Google from "../../../public/images/landing/google-download.svg";

export const AppDownloads = (): React.ReactElement => {
  return (
    <div className="py-24 space-y-6">
      <div className="flex flex-col items-center justify-center space-y-6 md:space-x-6 md:space-y-0 md:flex-row">
        <div className="cursor-not-allowed opacity-40">
          <Apple />
        </div>
        <div className="cursor-not-allowed opacity-40">
          <Google />
        </div>
      </div>
      <p className="px-4 font-bold text-center text-white">
        Stay tuned for mobile application launch at Q3 2022!
      </p>
    </div>
  );
};
