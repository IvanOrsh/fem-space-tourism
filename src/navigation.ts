const mobileToggleButton = document.querySelector(".mobile-nav-toggle");
const primaryNavigation = document.getElementById("primary-navigation");

(mobileToggleButton as HTMLButtonElement).addEventListener("click", () => {
  const visibility = (primaryNavigation as HTMLUListElement).getAttribute(
    "data-visible"
  );

  if (visibility === "false") {
    primaryNavigation!.setAttribute("data-visible", "true");
    mobileToggleButton!.setAttribute("aria-expanded", "true");
  } else {
    primaryNavigation!.setAttribute("data-visible", "false");
    mobileToggleButton!.setAttribute("aria-expanded", "false");
  }
});
