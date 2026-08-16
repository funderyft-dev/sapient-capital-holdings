"use client";

import { useEffect } from "react";

const itemSelectors = [
  ".business-card",
  ".value-card",
  ".brand-value-grid article",
  ".leadership-profile",
  ".leadership-card",
  ".leadership-chart-node",
  ".leadership-chart-committee",
  ".insight-card",
  ".project-card",
  ".category-list > div",
  ".governance-grid article",
  ".leadership-pillars article",
  ".principle-grid > div",
  ".activity-list > div",
  ".chain-row > div",
].join(",");

const introSelectors = [
  ".section-heading",
  ".prose-grid",
  ".brand-value-heading",
  ".leadership-section-heading",
  ".contact-enquiry",
  ".cta-inner",
  ".leadership-cta > .container",
].join(",");

export default function MotionObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -10%" });

    const observe = (selector: string, className: string) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
        if (element.dataset.motionReady) return;
        element.dataset.motionReady = "true";
        element.classList.add(className);
        element.style.setProperty("--motion-order", String(index % 5));
        observer.observe(element);
      });
    };

    observe(itemSelectors, "motion-item");
    observe(introSelectors, "motion-intro");
    observe(".section-title, .leadership-section-heading h2, .leadership-framework-section h2, .leadership-documents-inner h2", "motion-heading");
    observe(".leadership-chart, .org-interactive", "motion-chart");

    const heroHeading = document.querySelector<HTMLElement>(".brand-hero h1");
    if (heroHeading && !heroHeading.dataset.linesReady) {
      const lines = heroHeading.innerText.split(/\n+/).map((line) => line.trim()).filter(Boolean);
      if (lines.length > 1) {
        heroHeading.replaceChildren(...lines.map((line, index) => {
          const span = document.createElement("span");
          span.textContent = line;
          span.style.setProperty("--hero-line", String(index));
          return span;
        }));
      }
      heroHeading.dataset.linesReady = "true";
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
