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