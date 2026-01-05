// Tell CSS that JS is running (safe animations)
document.documentElement.classList.add("js");

// Icons
if (window.lucide) {
  lucide.createIcons();
}

// Footer year
const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

// GSAP setup
gsap.registerPlugin(ScrollTrigger);

// Reveal animations (fade + rise)
gsap.utils.toArray(".reveal").forEach((el, i) => {
  gsap.from(el, {
    opacity: 0,
    y: 40,
    duration: 1.1,
    ease: "power3.out",
    delay: i * 0.08,
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none none"
    }
  });
});

// Subtle floating background motion (for hero section)
gsap.to("body", {
  backgroundPosition: "200% 200%",
  duration: 40,
  ease: "none",
  repeat: -1
});

// Optional animated counters (only runs if you add data-count)
document.querySelectorAll("[data-count]").forEach(counter => {
  const target = +counter.dataset.count;

  ScrollTrigger.create({
    trigger: counter,
    start: "top 85%",
    once: true,
    onEnter: () => {
      gsap.fromTo(
        counter,
        { innerText: 0 },
        {
          innerText: target,
          duration: 1.6,
          ease: "power2.out",
          snap: { innerText: 1 }
        }
      );
    }
  });
});

// Button hover pulse (eye-catching but classy)
gsap.utils.toArray(".btn").forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    gsap.to(btn, {
      scale: 1.05,
      boxShadow: "0 0 25px rgba(255,45,167,.6)",
      duration: 0.3
    });
  });

  btn.addEventListener("mouseleave", () => {
    gsap.to(btn, {
      scale: 1,
      boxShadow: "none",
      duration: 0.3
    });
  });
});
