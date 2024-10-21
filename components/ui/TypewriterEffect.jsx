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
        <div className="text-xs sm:text-base md:text-xl lg:text-3xl xl:text-5xl font-bold whitespace-nowrap">
          {words.map((word, idx) => (
            <span
              key={idx}
              className={cn("dark:text-white text-black", word.className)}
            >
              {word.text}
            </span>
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
