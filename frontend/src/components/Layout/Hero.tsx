import { motion } from "framer-motion";
import React from "react";

interface Props {
  children?: React.ReactElement;
  title?: string;
  description?: string;
  bgColor?: string;
  titleColor?: string;
  descriptionColor?: string;
}

const Hero = ({
  children,
  title,
  description,
  bgColor = "bg-white",
  titleColor = "text-black",
  descriptionColor = "text-black",
}: Props): React.ReactElement => {
  return (
    <div
      className={`min-h-screen bg-center bg-cover ${bgColor} overflow-hidden`}
    >
      <div className="container h-full px-6 pt-24 mx-auto lg:pt-48 lg:px-8">
        <div className="grid lg:grid-cols-3">
          <div className="z-10 h-full relativew-full lg:col-span-2 pointer-none">
            <div className="flex flex-col justify-center h-full max-w-3xl">
              <motion.p
                className={`pb-6 text-5xl font-bold lg:pb-24 lg:text-9xl ${titleColor}`}
                style={{
                  rotateX: "2deg",
                  rotateY: "-1deg",
                  scale: 0.8,
                  translateX: "-12%",
                  transformPerspective: 200,
                }}
                animate={{
                  translateX: "0%",
                  rotateX: "0deg",
                  rotateY: "0deg",
                  scale: 1,
                }}
              >
                {title}
              </motion.p>
              <motion.p
                className={`text-lg lg:pb-24 lg:text-2xl ${descriptionColor}`}
                style={{
                  translateY: "-66%",
                  opacity: 0,
                }}
                animate={{ translateY: "0%", opacity: 1 }}
              >
                {description}
              </motion.p>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Hero;
