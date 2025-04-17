// Initialize when DOM is fully loaded
window.addEventListener("DOMContentLoaded", function () {
  // Get scroll up button and its progress indicator
  const scrollUpBtnEl = document.querySelector(".scroll-up__btn");
  const progressRectEl = scrollUpBtnEl?.querySelector(".progress-rect");

  // Exit if required elements are not found
  if (!scrollUpBtnEl || !progressRectEl) return;

  // Circle progress settings
  const radius = 23.5; // vì rx = 23.5 (bo góc tròn, gần hình tròn)
  const circumference = 2 * Math.PI * radius;

  // Set initial progress circle state
  progressRectEl.setAttribute("stroke-dasharray", circumference);
  progressRectEl.setAttribute("stroke-dashoffset", circumference);

  // Update progress circle based on scroll position
  const drawProgress = () => {
    // Get current scroll position and total scrollable height
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    // Calculate progress percentage and update circle
    const scrollPercent = scrollTop / docHeight;
    const offset = circumference - scrollPercent * circumference;
    progressRectEl.setAttribute("stroke-dashoffset", offset);
  };

  // Handle click to scroll back to top
  const scrollUpHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Set up event listeners
  scrollUpBtnEl.addEventListener("click", scrollUpHandler);
  window.addEventListener("scroll", drawProgress);
});
