"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "../../lib/utils";

export const TypewriterEffect = ({ words, className, cursorClassName }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      width: "fit-content",
      transition: { duration: 2, ease: "linear", delay: 1 },
    });
  }, [controls]);

  return (
    <div className={cn("flex items-center space-x-1 my-6", className)}>
      <motion.div
        className="overflow-hidden pb-2"
        initial={{ width: "0%" }}
        animate={controls}
      >
        <div className=" text-xs sm:text-base md:text-xl lg:text-3xl xl:text-5xl font-bold whitespace-nowrap">
          {words.map((word, idx) => (
            <motion.span
              key={idx}
              className={cn("font-sans font-medium dark:text-black text-black", word.className)}
              whileHover={{
                scale: [1, 1.2, 1], // Pulse effect
                textShadow: "0px 0px 8px rgba(0, 255, 255, 1)", // Glowing effect
                letterSpacing: "0.3em", // Slight increase in letter spacing
              }}
              initial={{ opacity: 0, y: 20 }} // Fade and slide from below
              animate={{ opacity: 1, y: 0 }} // Animate to normal position
              transition={{
                duration: 0.6,
                ease: "easeInOut",
                repeatType: "mirror", // Mirror repeat for the pulse effect
              }}
              whileTap={{
                scale: 0.95, // Click press effect
              }}
            >
              {word.text}
            </motion.span>
          ))}
        </div>
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className={cn(
          "block rounded-sm w-[4px] h-4 sm:h-6 xl:h-12 bg-blue-500",
          cursorClassName
        )}
      />
    </div>
  );
};

export default TypewriterEffect;
