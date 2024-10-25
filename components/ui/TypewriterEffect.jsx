"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "../../lib/utils";

export const TypewriterEffect = ({ words, className, cursorClassName }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      width: "fit-content",
      transition: { duration: 2, ease: "easeInOut", delay: 1 },
    });
  }, [controls]);

  return (
    <div className={cn("flex items-center space-x-1 my-6", className)}>
      <motion.div
        className="overflow-hidden pb-2"
        initial={{ width: "0%" }}
        animate={controls}
      >
        <div className="text-lg sm:text-2xl md:text-4xl lg:text-6xl xl:text-7xl font-bold whitespace-nowrap">
          {words.map((word, idx) => (
            <motion.span
              key={idx}
              className={cn(
                "font-medium dark:text-white text-white",
                word.className
              )}
              whileHover={{
                scale: 1.1, // Subtle scale on hover
                textShadow: "0px 0px 8px rgba(0, 150, 255, 0.8)", // Softer glow effect
                letterSpacing: "0.1em", // Small letter spacing on hover
              }}
              initial={{ opacity: 0, y: 30 }} // Slide from below with opacity transition
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8, // Smoother and slower transition
                ease: "easeInOut", // Smoother easing
                delay: idx * 0.3, // Staggered animation for each word
              }}
              whileTap={{
                scale: 0.95, // Slight press effect on click
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
