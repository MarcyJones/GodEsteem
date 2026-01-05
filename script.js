/* global gsap, ScrollTrigger, lucide */
(function () {
  // Icons
  if (window.lucide) lucide.createIcons();

  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Mobile menu
  const menuBtn = document.querySelector(".menu");
  const drawer = document.querySelector(".drawer");
  const drawerLinks = document.querySelectorAll(".drawer-link");

  function setDrawer(open) {
    if (!drawer || !menuBtn) return;
    drawer.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    drawer.setAttribute("aria-hidden", open ? "false" : "true");
  }

  if (menuBtn && drawer) {
    menuBtn.addEventListener("click", () => {
      setDrawer(!drawer.classList.contains("open"));
    });
    drawerLinks.forEach((a) =>
      a.addEventListener("click", () => setDrawer(false))
    );
  }

  // Contact form -> mailto (no backend needed)
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = (fd.get("name") || "").toString().trim();
      const email = (fd.get("email") || "").toString().trim();
      const subject = (fd.get("subject") || "").toString().trim();
      const message = (fd.get("message") || "").toString().trim();

      const to = "godesteemhsv@gmail.com";
      const fullSubject = encodeURIComponent(subject ? subject : "Message for GOD Esteem");
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n${message}`
      );

      window.location.href = `mailto:${to}?subject=${fullSubject}&body=${body}`;
    });
  }

  // Respect reduced motion
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    document.querySelectorAll(".reveal").forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    return;
  }

  // GSAP animations
  gsap.registerPlugin(ScrollTrigger);

  // Initial hero reveal
  gsap.to(".reveal", {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: "power3.out",
    stagger: 0.08,
    delay: 0.15
  });

  // 3D tilt card (subtle)
  const card = document.querySelector(".card3d");
  if (card) {
    const inner = card.querySelector(".card3d-inner");
    const shine = card.querySelector(".shine");

    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;

      const rotY = (x - 0.5) * 10;
      const rotX = (0.5 - y) * 10;

      inner.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      if (shine) {
        shine.style.transform = `translate(${(x - 0.5) * 30}px, ${(y - 0.5) * 30}px) rotate(18deg)`;
      }
    });

    card.addEventListener("mouseleave", () => {
      inner.style.transform = "rotateX(0deg) rotateY(0deg)";
      if (shine) shine.style.transform = "rotate(18deg)";
    });
  }

  // Floating blobs
  gsap.to(".f1", { y: -14, x: 8, duration: 4.6, yoyo: true, repeat: -1, ease: "sine.inOut" });
  gsap.to(".f2", { y: 18, x: -10, duration: 5.2, yoyo: true, repeat: -1, ease: "sine.inOut" });
  gsap.to(".f3", { y: -10, x: -6, duration: 4.1, yoyo: true, repeat: -1, ease: "sine.inOut" });

  // Section reveals on scroll
  document.querySelectorAll(".section .reveal, .card.reveal, .glass.reveal, .impact-card.reveal, .cta.reveal, .quote.reveal").forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top       },
      }
    );
  });

  // Count-up stats
  document.querySelectorAll("[data-count]").forEach((el) => {
    const target = Number(el.getAttribute("data-count")) || 0;
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.3,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toString();
          },
        });
      },
    });
  });
})();
