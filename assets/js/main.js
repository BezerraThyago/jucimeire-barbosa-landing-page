const menuToggleButton = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("menu-mobile");
const siteScaleRoot = document.getElementById("site-scale-root");
const siteFrame = document.getElementById("site-frame");

if (menuToggleButton && mobileMenu) {
  menuToggleButton.addEventListener("click", () => {
    const isExpanded = menuToggleButton.getAttribute("aria-expanded") === "true";
    menuToggleButton.setAttribute("aria-expanded", String(!isExpanded));
    mobileMenu.classList.toggle("hidden");
  });

  const mobileLinks = Array.from(mobileMenu.querySelectorAll("a"));
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggleButton.setAttribute("aria-expanded", "false");
      mobileMenu.classList.add("hidden");
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
      menuToggleButton.setAttribute("aria-expanded", "false");
      mobileMenu.classList.add("hidden");
    }
  });
}

function applyDesktopScale() {
  if (!siteScaleRoot || !siteFrame) return;

  const baseWidth = 1920;
  const viewportWidth = window.innerWidth;
  const scale = Math.min(viewportWidth / baseWidth, 1);

  siteScaleRoot.style.transform = `scale(${scale})`;
  siteFrame.style.height = `${siteScaleRoot.scrollHeight * scale}px`;
}

applyDesktopScale();
window.addEventListener("resize", applyDesktopScale);

const faqTriggers = Array.from(document.querySelectorAll(".faq-trigger"));

faqTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const item = trigger.closest(".faq-item");
    if (!item) return;

    const content = item.querySelector(".faq-content");
    if (!content) return;

    const isExpanded = trigger.getAttribute("aria-expanded") === "true";

    faqTriggers.forEach((otherTrigger) => {
      const otherItem = otherTrigger.closest(".faq-item");
      const otherContent = otherItem?.querySelector(".faq-content");
      otherTrigger.setAttribute("aria-expanded", "false");
      otherContent?.classList.remove("is-open");
    });

    if (!isExpanded) {
      trigger.setAttribute("aria-expanded", "true");
      content.classList.add("is-open");
    }
  });
});
