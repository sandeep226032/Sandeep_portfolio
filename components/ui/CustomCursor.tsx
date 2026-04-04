"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on devices with a fine pointer (like a mouse)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsVisible(mediaQuery.matches);

    if (!mediaQuery.matches) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if we are hovering over an interactive element
      if (target.closest("a, button, input, textarea, [data-interactive]")) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* The main outer circle */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-solid rounded-full pointer-events-none z-[9999] flex justify-center items-center backdrop-mix-blend-difference"
        style={{ borderColor: "var(--gold)" }}
        animate={{
          x: mousePosition.x - 16, // Center the 32px (w-8/h-8) circle
          y: mousePosition.y - 16,
          scale: isHovered ? 1.8 : 1,
          backgroundColor: isHovered ? "rgba(232,184,75,0.1)" : "transparent",
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 28,
          mass: 2,
        }}
      >
        {/* The inner solid dot */}
        <motion.div
          className="w-1 h-1 rounded-full pointer-events-none"
          style={{ background: "var(--gold)" }}
          animate={{
            scale: isHovered ? 0 : 1,
            opacity: isHovered ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  );
}
