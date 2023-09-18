// import clsx from "clsx";
import * as React from "react";

// const borders = {
//   gray: "border-gray-300 border-opacity-40 bg-transparent",
//   custom: "",
// };

interface IProgressbarProps {
  className?: string;
  barColorClassName?: string;
  percent: number;
  customColor?: string;
  showPercentage?: boolean;
}

export const Progressbar = ({
  percent,
  customColor,
  className,
  barColorClassName,
  showPercentage,
}: IProgressbarProps): React.ReactElement => {
  const highlight = percent * 0.9;
  const [color, setColor] = React.useState("");

  React.useEffect(() => {
    if (customColor) {
      setColor(customColor);
    } else if (percent <= 50) {
      setColor("#FFC800");
    } else if (percent > 50) {
      setColor("#58CC02");
    }
  }, [customColor, percent]);

  return (
    <div className="flex items-center w-full">
      <div
        className={`flex w-full h-3 bg-gray-200 rounded-full overflow-hidden relative ${className}`}
      >
        <div
          className="absolute flex h-1 bg-white rounded-full opacity-20 top-1 left-2"
          style={{ width: `${highlight}%` }}
        />
        <div
          className={`flex h-3 rounded-full opacity-100 z-10 ${barColorClassName}`}
          style={{ width: `${percent}%`, backgroundColor: color }}
        />
      </div>
      {showPercentage && (
        <p className="w-12 ml-4 text-sm font-bold">{percent} %</p>
      )}
    </div>
  );
};

export default Progressbar;
