// set current year
document.getElementById("year").textContent = new Date().getFullYear();

// simple headshot switcher (optional)
(function(){
  const img = document.getElementById("headshot");
  if(!img) return;

  const sources = [
    "images/profile.jpg",
    "images/profile_alt1.jpg",
    "images/profile_alt2.jpg"
  ];

  let i = 0;

  function setIdx(next){
    i = (next + sources.length) % sources.length;
    img.src = sources[i];
  }

  const prev = document.getElementById("headshotPrev");
  const next = document.getElementById("headshotNext");

  if(prev && next){
    prev.addEventListener("click", () => setIdx(i - 1));
    next.addEventListener("click", () => setIdx(i + 1));
  }
})();

// card-click navigation
(function(){
  function shouldIgnoreClick(e){
    const t = e.target;
    if(!t) return false;
    return !!t.closest('a, button');
  }

  function go(el){
    const href = el.getAttribute("data-href");
    if(href) window.location.href = href;
  }

  document.querySelectorAll(".card-click").forEach((card) => {
    card.addEventListener("click", (e) => {
      if(shouldIgnoreClick(e)) return;
      go(card);
    });

    card.addEventListener("keydown", (e) => {
      if(e.key === "Enter" || e.key === " "){
        e.preventDefault();
        go(card);
      }
    });
  });
})();