document.getElementById("year").textContent = new Date().getFullYear();

(function(){
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("siteNav");
  if(toggle && nav){
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("open");
    });
  }
})();

(function(){
  const img = document.getElementById("headshot");
  if(!img) return;
  const prev = document.getElementById("headshotPrev");
  const next = document.getElementById("headshotNext");
  const sources = [
    "images/profile.jpg",
    "images/profile_alt1.jpg",
    "images/profile_alt2.jpg"
  ];
  let i = 0;
  const setIndex = (n) => {
    i = (n + sources.length) % sources.length;
    img.src = sources[i];
  };
  if(prev) prev.addEventListener("click", () => setIndex(i - 1));
  if(next) next.addEventListener("click", () => setIndex(i + 1));
})();


(function(){
  const nav = document.getElementById("siteNav");
  const toggle = document.getElementById("navToggle");
  if(!nav) return;
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      if(nav.classList.contains("open")){
        nav.classList.remove("open");
        if(toggle) toggle.setAttribute("aria-expanded", "false");
      }
    });
  });
})();
