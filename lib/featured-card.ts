import { useEffect } from "react";

export function useFeaturedCardMouseEffect() {
  useEffect(() => {
    // Check if device supports hover (desktop/laptop)
    const supportsHover = window.matchMedia("(hover: hover)").matches;

    if (!supportsHover) {
      return; // Don't add mouse effect on mobile devices
    }

    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll(".featured-card");

      for (const card of Array.from(cards)) {
        if (card instanceof HTMLElement) {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          card.style.setProperty("--mouse-x", `${x}px`);
          card.style.setProperty("--mouse-y", `${y}px`);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
}
