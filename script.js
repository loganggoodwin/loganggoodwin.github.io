// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

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

// Contact form — real Formspree POST endpoint
(function(){
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  const btn = document.getElementById("submitBtn");
  if(!form || !btn) return;

  const setStatus = (message, isError = false) => {
    if(!status) return;
    status.textContent = message;
    status.classList.toggle("form-note--error", Boolean(isError));
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const endpoint = form.getAttribute("action") || "";
    if(!endpoint || endpoint.includes("YOUR_FORM_ID")){
      setStatus("The contact form is missing a Formspree endpoint. Use the direct email link for now.", true);
      return;
    }

    btn.disabled = true;
    btn.textContent = "Sending…";
    setStatus("");

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(form)
      });

      if(res.ok){
        setStatus("Message sent — I’ll get back to you soon.");
        form.reset();
      } else {
        setStatus("The form could not send. Please use the direct email link or copy my email address.", true);
      }
    } catch {
      setStatus("Network error. Please use the direct email link or copy my email address.", true);
    }

    btn.disabled = false;
    btn.textContent = "Send message";
  });
})();


// Copy email button
(function(){
  const copyBtn = document.getElementById("copyEmail");
  const copyStatus = document.getElementById("copyStatus");
  if(!copyBtn) return;

  const setStatus = (message) => {
    if(copyStatus) copyStatus.textContent = message;
    copyBtn.textContent = message.startsWith("Copied") ? "Copied" : "Copy email";
    window.setTimeout(() => {
      copyBtn.textContent = "Copy email";
      if(copyStatus) copyStatus.textContent = "";
    }, 2600);
  };

  copyBtn.addEventListener("click", async () => {
    const email = copyBtn.dataset.email || "Logan@goodwinmail.net";
    try {
      if(navigator.clipboard && window.isSecureContext){
        await navigator.clipboard.writeText(email);
      } else {
        const temp = document.createElement("textarea");
        temp.value = email;
        temp.setAttribute("readonly", "");
        temp.style.position = "absolute";
        temp.style.left = "-9999px";
        document.body.appendChild(temp);
        temp.select();
        document.execCommand("copy");
        document.body.removeChild(temp);
      }
      setStatus("Copied email address.");
    } catch {
      setStatus("Copy failed — email is Logan@goodwinmail.net.");
    }
  });
})();

// Project filter bar
(function(){
  const chips = document.querySelectorAll('.filter-chip');
  const cards = document.querySelectorAll('#projectGrid .project-card');
  if(!chips.length || !cards.length) return;

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('filter-chip--active'));
      chip.classList.add('filter-chip--active');
      const filter = chip.dataset.filter;
      let shown = 0;
      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('is-hidden', !match);
        if(match) shown++;
      });
      const countEl = document.getElementById('count-all');
      if(countEl && filter === 'all') countEl.textContent = shown;
    });
  });
})();

// Project quick-view modal
(function(){
  const modal = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalClose');
  if(!modal || !closeBtn) return;

  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalCredential = document.getElementById('modalCredential');
  const modalTags = document.getElementById('modalTags');
  const modalLink = document.getElementById('modalLink');

  const openModal = (card) => {
    modalImg.src = card.dataset.img || '';
    modalImg.alt = card.dataset.title || '';
    modalTitle.textContent = card.dataset.title || '';
    modalDesc.textContent = card.dataset.desc || '';
    const cred = card.dataset.credential || '';
    modalCredential.textContent = cred;
    modalCredential.style.display = cred ? 'block' : 'none';
    modalTags.innerHTML = (card.dataset.tags || '').split(',').map(t => `<span>${t.trim()}</span>`).join('');
    modalLink.href = card.dataset.link || '#';
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };

  const closeModal = () => {
    modal.hidden = true;
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.project-preview-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(btn.closest('.project-card'));
    });
  });

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if(e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && !modal.hidden) closeModal();
  });
})();
