"use client";

import { useEffect, useState } from "react";

/**
 * Returns the id of whichever section is currently most visible in the viewport.
 * Used to highlight the active nav link as the user scrolls.
 *
 * @param sectionIds  Array of element ids to observe, e.g. ["about","experience"]
 * @param offset      Top margin for the intersection root (default "-20%")
 */
export function useActiveSection(
  sectionIds: string[],
  offset = "-20%"
): string {
  const [active, setActive] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(id);
          }
        },
        {
          rootMargin: `${offset} 0px -60% 0px`,
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sectionIds, offset]);

  return active;
}
