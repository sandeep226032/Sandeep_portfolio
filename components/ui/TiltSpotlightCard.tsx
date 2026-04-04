"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

export default function TiltSpotlightCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Mouse position values for tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Mouse position for spotlight pixel coords
  const lightX = useMotionValue(0);
  const lightY = useMotionValue(0);

  const rotateX = useSpring(useMotionValue(0), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Calculates pixel position of mouse from top left of container
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;
    
    lightX.set(relativeX);
    lightY.set(relativeY);

    // Calculates percent from center (range -0.5 to 0.5)
    // Mult by max degrees (e.g. 5)
    const MAX_TILT = 5;
    rotateX.set(((relativeY / rect.height) - 0.5) * -MAX_TILT);
    rotateY.set(((relativeX / rect.width) - 0.5) * MAX_TILT);
  };

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setHovered(false);
        rotateX.set(0);
        rotateY.set(0);
      }}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      className={`relative group rounded-[4px] border overflow-hidden bg-[var(--surface)] transition-colors duration-300 ${className}`}
      // Swap out the direct style border colors to let CSS/Tailwind manage it via group-hover
    >
      {/* Spotlight background gradient */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: useMotionTemplate`radial-gradient(
            400px circle at ${lightX}px ${lightY}px,
            rgba(232, 184, 75, 0.08), 
            transparent 80%
          )`,
        }}
      />
      {/* Spotlight Border glow effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: useMotionTemplate`radial-gradient(
            300px circle at ${lightX}px ${lightY}px,
            rgba(232, 184, 75, 0.4), 
            transparent 100%
          )`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          padding: "1px", // Creates the border thickness
        }}
      />

      <div className="relative z-20 h-full w-full pointer-events-auto">
        {children}
      </div>
    </motion.div>
  );
}
