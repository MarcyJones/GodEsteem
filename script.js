document.documentElement.classList.add("js");

if (window.lucide) {
  lucide.createIcons();
}

document.getElementById("year").textContent =
  new Date().getFullYear();

gsap.registerPlugin(ScrollTrigger);

gsap.from(".reveal", {
  opacity: 0,
  y: 20,
  duration: 1,
  stagger: 0.2,
  ease: "power3.out"
});
