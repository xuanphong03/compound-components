// Wait for DOM to be fully loaded before executing
window.addEventListener("DOMContentLoaded", function () {
  // Cache DOM elements
  const scrollUpBtnEl = document.querySelector(".scroll-up__btn");
  const progressRectEl = scrollUpBtnEl?.querySelector(".progress-rect");

  // Early return if elements don't exist
  if (!scrollUpBtnEl || !progressRectEl) {
    console.warn("Scroll up button or progress rectangle not found");
    return;
  }

  // Constants for circle calculations
  const radius = 23.5; // Radius of the circular progress indicator
  const circumference = 2 * Math.PI * radius;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  // Initialize progress circle
  progressRectEl.setAttribute("stroke-dasharray", circumference);
  progressRectEl.setAttribute("stroke-dashoffset", circumference);

  // Calculate and update progress based on scroll position
  const drawProgress = () => {
    const scrollTop = window.scrollY;
    const scrollPercent = scrollTop / docHeight;
    const offset = circumference - scrollPercent * circumference;
    progressRectEl.setAttribute("stroke-dashoffset", offset);
  };

  // Smooth scroll to top of page
  const scrollUpHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Add event listeners
  scrollUpBtnEl.addEventListener("click", scrollUpHandler);
  window.addEventListener("scroll", drawProgress);
});
