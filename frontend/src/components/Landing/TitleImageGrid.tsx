import React from "react";

import Section from "../Elements/Section";
interface ItemProps {
  image: string;
  label?: string;
  title?: string;
}
interface IProps {
  title: string;
  items: ItemProps[];
  className?: string;
  gridCols?: number;
}

export const TitleImageGrid = ({
  title,
  items,
  className,
  gridCols = 4,
}: IProps): React.ReactElement => {
  return (
    <div className={className}>
      <Section size="2xl" padding="sm" className="space-y-12">
        <p className="text-xl font-bold text-center text-white md:text-3xl">
          {title}
        </p>
        <div
          className={`grid w-2/3 gap-4 mx-auto ${
            gridCols > 3 ? "md:grid-cols-2" : `md:grid-cols-${gridCols}`
          } lg:grid-cols-${gridCols} lg:gap-x-12 lg:gap-y-16`}
        >
          {items.length > 0 &&
            items.map((item, index) => (
              <div key={index} className="flex flex-col justify-between">
                <div className="flex items-center justify-center w-full aspect-square">
                  <img src={item.image} alt="" className="w-full" />
                </div>
                <div className="pt-6 space-y-2 text-white">
                  {item.label && (
                    <p className="text-sm text-center opacity-80">
                      {item.label}
                    </p>
                  )}
                  {item.title && (
                    <p className="text-lg font-bold text-center">
                      {item.title}
                    </p>
                  )}
                </div>
              </div>
            ))}
        </div>
      </Section>
    </div>
  );
};
