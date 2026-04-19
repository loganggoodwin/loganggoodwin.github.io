// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Nav toggle
(function(){
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("siteNav");
  if(!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("open");
  });
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
})();

// Headshot carousel
(function(){
  const img = document.getElementById("headshot");
  if(!img) return;
  const prev = document.getElementById("headshotPrev");
  const next = document.getElementById("headshotNext");
  const sources = ["images/profile.jpg","images/profile_alt1.jpg","images/profile_alt2.jpg"];
  let i = 0;
  const setIndex = (n) => { i = (n + sources.length) % sources.length; img.src = sources[i]; };
  if(prev) prev.addEventListener("click", () => setIndex(i - 1));
  if(next) next.addEventListener("click", () => setIndex(i + 1));
})();

// Scroll reveal
(function(){
  const els = document.querySelectorAll(".reveal");
  if(!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add("visible");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
})();

// Contact form — Formspree
// To activate: create a free form at formspree.io, then replace YOUR_FORM_ID below
(function(){
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  const btn = document.getElementById("submitBtn");
  if(!form) return;

  const FORMSPREE_ID = "YOUR_FORM_ID"; // <-- replace this

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    btn.disabled = true;
    btn.textContent = "Sending…";
    status.textContent = "";

    if(FORMSPREE_ID === "YOUR_FORM_ID"){
      // Fallback: open email client if Formspree isn't configured
      const name = form.querySelector("[name=name]").value;
      const email = form.querySelector("[name=email]").value;
      const message = form.querySelector("[name=message]").value;
      window.location.href = `mailto:Logan@goodwinmail.net?subject=Portfolio contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message + "\n\nReply to: " + email)}`;
      btn.disabled = false;
      btn.textContent = "Send message";
      return;
    }

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(form)
      });
      if(res.ok){
        status.textContent = "Message sent — I'll get back to you soon.";
        form.reset();
      } else {
        status.textContent = "Something went wrong. Try emailing directly.";
      }
    } catch {
      status.textContent = "Network error. Try emailing directly.";
    }
    btn.disabled = false;
    btn.textContent = "Send message";
  });
})();
