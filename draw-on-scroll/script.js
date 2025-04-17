// Initialize when DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Cache DOM elements
  const scrollUpBtnEl = document.querySelector(".scroll-up__btn");
  const progressRectEl = scrollUpBtnEl?.querySelector(".progress-rect");

  // Exit if required elements are not found
  if (!scrollUpBtnEl || !progressRectEl) {
    console.warn("Scroll up button or progress element not found");
    return;
  }

  // Cache circle progress settings
  const radius = 23.5;
  const circumference = 2 * Math.PI * radius;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  // Set initial progress circle state
  progressRectEl.setAttribute("stroke-dasharray", circumference);
  progressRectEl.setAttribute("stroke-dashoffset", circumference);

  // Debounced scroll handler using requestAnimationFrame
  let ticking = false;
  const drawProgress = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const scrollPercent = scrollTop / docHeight;
        const offset = circumference - scrollPercent * circumference;
        progressRectEl.setAttribute("stroke-dashoffset", offset);
        ticking = false;
      });
      ticking = true;
    }
  };

  // Handle click to scroll back to top
  const scrollUpHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Set up event listeners with passive option for better performance
  scrollUpBtnEl.addEventListener("click", scrollUpHandler);
  window.addEventListener("scroll", drawProgress, { passive: true });
});
