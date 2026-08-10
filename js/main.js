/* Hickory Kitchen Remodeling — minimal UI JS (mobile nav + year) */
(function () {
  "use strict";

  // Mobile nav
  var openBtn  = document.querySelector("[data-menu-open]");
  var panel    = document.querySelector(".mnav-panel");
  var backdrop = document.querySelector(".mnav-backdrop");
  var closeBtn = document.querySelector("[data-menu-close]");

  function open()  { if (panel) { panel.classList.add("open"); backdrop.classList.add("open"); document.body.style.overflow = "hidden"; } }
  function close() { if (panel) { panel.classList.remove("open"); backdrop.classList.remove("open"); document.body.style.overflow = ""; } }

  if (openBtn)  openBtn.addEventListener("click", open);
  if (closeBtn) closeBtn.addEventListener("click", close);
  if (backdrop) backdrop.addEventListener("click", close);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });

  // Current year in footer
  var y = document.querySelectorAll("[data-year]");
  y.forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
