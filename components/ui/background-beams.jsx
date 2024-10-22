"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export const BackgroundBeams = React.memo(({ className }) => {
  const paths = useMemo(
    () => [
      "M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835",
      "M-268 -317C-268 -317 -200 88 264 215C728 342 796 747 796 747",
      "M-65 -549C-65 -549 3 -144 467 -17C931 110 999 515 999 515",
      "M-44 -573C-44 -573 24 -168 488 -41C952 86 1020 491 1020 491",
    ],
    []
  );

  const gradients = useMemo(() => {
    return paths.map((_, index) => ({
      id: `linearGradient-${index}`,
      animation: {
        x1: ["0%", "100%"],
        x2: ["0%", "95%"],
        y1: ["0%", "100%"],
        y2: ["0%", `${93 + Math.random() * 8}%`],
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 10,
      },
    }));
  }, [paths]);

  return (
    <div
      className={cn(
        "absolute h-full w-full inset-0 [mask-size:40px] [mask-repeat:no-repeat] flex items-center justify-center",
        className
      )}
    >
      <svg
        className="z-0 h-full w-full pointer-events-none absolute"
        width="100%"
        height="100%"
        viewBox="0 0 696 316"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859"
          stroke="url(#paint0_radial_242_278)"
          strokeOpacity="0.09"
          strokeWidth="0.5"
        />

        {paths.map((path, index) => (
          <motion.path
            key={`path-${index}`}
            d={path}
            stroke={`url(#${gradients[index].id})`}
            strokeOpacity="0.4"
            strokeWidth="0.5"
          />
        ))}

        <defs>
          {gradients.map((gradient, index) => (
            <motion.linearGradient
              key={gradient.id}
              id={gradient.id}
              initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
              animate={gradient.animation}
              transition={{
                duration: gradient.animation.duration,
                ease: "easeInOut",
                repeat: Infinity,
                delay: gradient.animation.delay,
              }}
            >
              <stop stopColor="#18CCFC" stopOpacity="0" />
              <stop stopColor="#18CCFC" />
              <stop offset="32.5%" stopColor="#6344F5" />
              <stop offset="100%" stopColor="#AE48FF" stopOpacity="0" />
            </motion.linearGradient>
          ))}

          <radialGradient
            id="paint0_radial_242_278"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(352 34) rotate(90) scale(555 1560.62)"
          >
            <stop offset="0.0666667" stopColor="var(--neutral-300)" />
            <stop offset="0.243243" stopColor="var(--neutral-300)" />
            <stop offset="0.43594" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
});

BackgroundBeams.displayName = "BackgroundBeams";
