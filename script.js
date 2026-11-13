
"use strict";

/* SYNTHETIX AI — Landing page interactions
   All prices, workflow data, metrics and examples are illustrative.
*/

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  // Mobile navigation
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });

  document.addEventListener("click", event => {
    if (!mainNav.contains(event.target) && !menuToggle.contains(event.target)) {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  // Monthly / annual pricing switch
  const billingToggle = document.getElementById("billingToggle");
  const priceValues = document.querySelectorAll(".price-value");
  const billingCaptions = document.querySelectorAll(".billing-caption");

  function updatePricing() {
    const annual = billingToggle.checked;

    priceValues.forEach(price => {
      const amount = annual ? price.dataset.annual : price.dataset.monthly;
      price.textContent = `$${Number(amount).toLocaleString("en-US")}`;
    });

    billingCaptions.forEach((caption, index) => {
      if (index < 2) {
        caption.textContent = annual
          ? "Per month · billed annually"
          : "Billed monthly";
      }
    });
  }

  billingToggle.addEventListener("change", updatePricing);
  updatePricing();

  // ROI / time savings calculator
  const hoursRange = document.getElementById("hoursRange");
  const automationRange = document.getElementById("automationRange");
  const hoursValue = document.getElementById("hoursValue");
  const automationValue = document.getElementById("automationValue");
  const savedHours = document.getElementById("savedHours");
  const savedMonthly = document.getElementById("savedMonthly");

  function updateCalculator() {
    const weeklyHours = Number(hoursRange.value);
    const automationRate = Number(automationRange.value);
    const weeklySavings = weeklyHours * (automationRate / 100);
    const monthlySavings = weeklySavings * 4;

    hoursValue.textContent = `${weeklyHours} ${weeklyHours === 1 ? "hour" : "hours"}`;
    automationValue.textContent = `${automationRate}%`;
    savedHours.innerHTML = `${weeklySavings.toFixed(1)} <small>hours / week</small>`;
    savedMonthly.textContent =
      `Approximately ${monthlySavings.toFixed(0)} hours each month`;
  }

  hoursRange.addEventListener("input", updateCalculator);
  automationRange.addEventListener("input", updateCalculator);
  updateCalculator();

  // Demo enquiry form validation
  const contactForm = document.getElementById("contactForm");
  const formFeedback = document.getElementById("formFeedback");

  contactForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const formData = new FormData(contactForm);
    const firstName = String(formData.get("name")).trim().split(/\s+/)[0];

    formFeedback.textContent =
      `Thanks, ${firstName}! Your demo enquiry passed validation. No information was sent.`;

    contactForm.reset();
    formFeedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  // FAQ: keep the accordion tidy by allowing one open item at a time.
  const faqItems = document.querySelectorAll(".faq-list details");

  faqItems.forEach(item => {
    item.addEventListener("toggle", () => {
      if (item.open) {
        faqItems.forEach(other => {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  // Scroll reveal for major content blocks.
  const revealTargets = document.querySelectorAll(
    ".section-heading, .bento-card, .process-grid article, .price-card, .roi-card, .contact-section"
  );

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    revealTargets.forEach(target => target.classList.add("reveal"));

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    });

    revealTargets.forEach(target => observer.observe(target));
  }

  // Current year is kept accurate automatically in the footer.
  const footerCopyright = document.querySelector(".footer-bottom span");
  if (footerCopyright) {
    footerCopyright.textContent =
      `© ${new Date().getFullYear()} SYNTHETIX AI. Portfolio demonstration project.`;
  }
});
