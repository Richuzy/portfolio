// ===== Typewriter =====
document.addEventListener("DOMContentLoaded", () => {
  const roles = ["AI & DS Student", "Web Developer", "Data Analyst"];
  const el = document.querySelector(".typewriter-text");
  let i = 0, j = 0, deleting = false;

  function tick() {
    const word = roles[i];
    if (!deleting) {
      el.textContent = word.slice(0, ++j);
      if (j === word.length) { deleting = true; setTimeout(tick, 900); return; }
    } else {
      el.textContent = word.slice(0, --j);
      if (j === 0) { deleting = false; i = (i + 1) % roles.length; }
    }
    setTimeout(tick, deleting ? 50 : 120);
  }
  tick();
});

// ===== Mobile menu =====
const dropdown = document.getElementById("dropdown");
const burgerBtn = document.querySelector(".hamburg");
const cancelBtn = document.querySelector(".cancel");

burgerBtn?.addEventListener("click", () => {
  dropdown.style.display = "block";
  burgerBtn.setAttribute("aria-expanded", "true");
});
cancelBtn?.addEventListener("click", () => {
  dropdown.style.display = "none";
  burgerBtn.setAttribute("aria-expanded", "false");
});
// close dropdown when clicking a link
dropdown?.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => (dropdown.style.display = "none"))
);

 

// ===== Scroll to top =====
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => {
  if (!toTop) return;
  if (window.scrollY > 400) toTop.classList.add("show");
  else toTop.classList.remove("show");
});
toTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ================================
// Theme Toggle (Light / Dark) with ripple + switch sound
// ================================
(function () {
  const btn = document.getElementById("themeToggle");
  const splash = document.querySelector(".theme-splash");
  if (!btn || !splash) return;

  const ICON_SUN = "fa-sun";
  const ICON_MOON = "fa-moon";
  const icon = btn.querySelector("i");

  // 🔊 switch sound
  const switchSound = new Audio("411642__inspectorj__pop-high-a-h1.wav");
  switchSound.preload = "auto";

  // Load preferred theme: localStorage -> system -> default (dark)
  const stored = localStorage.getItem("theme");
  const prefersLight = window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches;

  if (stored === "light" || (!stored && prefersLight)) {
    document.body.classList.add("theme-light");
  }

  // set correct icon
  function refreshIcon() {
    const light = document.body.classList.contains("theme-light");
    icon?.classList.remove(light ? ICON_MOON : ICON_SUN);
    icon?.classList.add(light ? ICON_SUN : ICON_MOON);
  }
  refreshIcon();

  // ripple helper (expands from the button)
  function rippleFrom(el, toLight) {
    const rect = el.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    splash.style.setProperty("--splash-x", `${x}px`);
    splash.style.setProperty("--splash-y", `${y}px`);
    splash.style.setProperty("--splash-color", toLight ? "#f6f7fb" : "#0b0b0c");

    // restart animation
    splash.classList.remove("animate");
    void splash.offsetWidth;
    splash.classList.add("animate");

    splash.addEventListener("animationend", () => {
      splash.classList.remove("animate");
    }, { once: true });
  }

  // toggle on click (instant theme switch; ripple masks transition)
  btn.addEventListener("click", () => {
    const goingToLight = !document.body.classList.contains("theme-light");

    // sound
    switchSound.currentTime = 0;
    switchSound.play();

    // instant theme switch
    document.body.classList.toggle("theme-light");
    localStorage.setItem("theme", goingToLight ? "light" : "dark");
    refreshIcon();

    // ripple using NEW theme color
    rippleFrom(btn, goingToLight);
  });
})();

// Optional auto-rotation (every 5s) — disable if not needed
(function () {
  const select = document.getElementById('langSelect');
  if (!select) return;
  const order = ['en','ar','hi','ml','te','es','zh','fr','pt'];
  let i = order.indexOf(select.value);
  setInterval(() => {
    i = (i + 1) % order.length;
    select.value = order[i];
    select.dispatchEvent(new Event('change'));
  }, 5000);
})();

// ================================
// Logo typewriter across languages
// ================================
(function () {
  const el = document.getElementById('logoName');
  const logo = el?.closest('.logo');
  if (!el || !logo) return;

  // Each entry sets the text, font class and text direction for that script
  const names = [
    { code: 'en', text: 'Mohammed Musthafa', cls: 'font-latin', dir: 'ltr' },
    { code: 'ar', text: 'محمد مصطفى',        cls: 'font-ar',    dir: 'rtl' },
    { code: 'ml', text: 'മുഹമ്മദ് മുസ്തഫ',    cls: 'font-ml',    dir: 'ltr' },
    { code: 'hi', text: 'मुहम्मद मुस्तफ़ा',   cls: 'font-hi',    dir: 'ltr' },
    { code: 'es', text: 'Mohammed Musthafa', cls: 'font-latin', dir: 'ltr' }, // Spanish
    { code: 'fr', text: 'Mohammed Musthafa', cls: 'font-latin', dir: 'ltr' }, // French
    { code: 'pt', text: 'Mohammed Musthafa', cls: 'font-latin', dir: 'ltr' }, // Portuguese
  ];

  let i = 0, j = 0, deleting = false;

  function applyLang(idx) {
    // swap font + direction only when language changes
    logo.setAttribute('dir', names[idx].dir);
    el.classList.remove('font-latin','font-ar','font-ml','font-hi');
    el.classList.add(names[idx].cls);
  }

  function tick() {
    const n = names[i];
    applyLang(i); // ensure correct font/dir

    if (!deleting) {
      el.textContent = n.text.slice(0, ++j);
      if (j === n.text.length) { deleting = true; setTimeout(tick, 900); return; }
    } else {
      el.textContent = n.text.slice(0, --j);
      if (j === 0) { deleting = false; i = (i + 1) % names.length; }
    }
    setTimeout(tick, deleting ? 40 : 110); // typing/erasing speeds
  }

  tick();
})();
