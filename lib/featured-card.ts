import { useEffect } from "react";

export function useFeaturedCardMouseEffect() {
  useEffect(() => {
    // Check if device supports hover (desktop/laptop)
    const supportsHover = window.matchMedia("(hover: hover)").matches;
    if (!supportsHover) {
      return; // Don't add mouse effect on mobile devices
    }

    const cards = document.querySelectorAll(".featured-card");
    let eventCounter = 0;
    const BOUNDARY_OFFSET = 250;
    let lastMousePosition = { x: 0, y: 0 };

    const updateCards = (mouseX: number, mouseY: number) => {
      for (const card of Array.from(cards)) {
        if (card instanceof HTMLElement) {
          const rect = card.getBoundingClientRect();

          // Check if mouse is within 200px boundary of the card
          const isWithinBoundary =
            mouseX >= rect.left - BOUNDARY_OFFSET &&
            mouseX <= rect.right + BOUNDARY_OFFSET &&
            mouseY >= rect.top - BOUNDARY_OFFSET &&
            mouseY <= rect.bottom + BOUNDARY_OFFSET;

          if (!isWithinBoundary) {
            continue; // Skip this card if mouse is too far away
          }

          const x = mouseX - rect.left;
          const y = mouseY - rect.top;

          card.style.setProperty("--mouse-x", `${x}px`);
          card.style.setProperty("--mouse-y", `${y}px`);
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastMousePosition = { x: e.clientX, y: e.clientY };
      // Throttle: only process every second event
      eventCounter++;
      if (eventCounter % 3 !== 0) {
        return;
      }
      updateCards(e.clientX, e.clientY);
    };

    const handleScroll = () => {
      updateCards(lastMousePosition.x, lastMousePosition.y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
}
