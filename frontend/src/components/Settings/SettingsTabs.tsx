import { useRouter } from "next/router";
import React from "react";

import { Card } from "../Elements/Card";

interface IProp {
  settings: string[];
  currentSetting: string;
  isDirty: boolean;
  resetFormCallback: () => void;
  darkBg?: boolean;
  changeTabCallback: (value: React.SetStateAction<string>) => void;
}

const SettingsTabs = ({
  settings,
  currentSetting,
  isDirty,
  resetFormCallback,
  darkBg,
  changeTabCallback,
}: IProp): React.ReactElement => {
  const router = useRouter();

  return (
    <div className="order-first lg:col-span-2 lg:order-last">
      <Card
        className={`${
          darkBg ? "text-white bg-dark-overlay" : "text-black"
        } p-6 bg-opacity-20 navigator_tour_84`}
      >
        {settings.map((setting) => (
          <button
            className={`w-full bg-none text-left font-extrabold border-none hover:bg-opacity-40 rounded-3xl transition duration-200 ease-in-out px-5 py-4 my-1 ${
              setting === currentSetting ? "bg-opacity-20 bg-gray-500" : ""
            } ${
              darkBg
                ? "text-white hover:bg-white"
                : "text-black hover:bg-gray-300"
            }`}
            key={setting}
            onClick={(): void => {
              if (isDirty) {
                if (
                  confirm(
                    `You will lose your changes if you change tabs. Please save your changes first or hit "OK" to lose your changes`,
                  )
                ) {
                  changeTabCallback(setting);
                  router.replace({query:{page:setting}});
                  resetFormCallback();
                }
              } else {
                changeTabCallback(setting);
                router.replace({query:{page:setting}});
              }
            }}
          >
            {setting}
          </button>
        ))}
      </Card>
    </div>
  );
};

export default SettingsTabs;
