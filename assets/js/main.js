// Panchsheel Custom Lab — main.js
(function () {
  // Mobile nav
  const btn = document.getElementById('navToggle');
  const menu = document.getElementById('mobileMenu');
  if (btn && menu) btn.addEventListener('click', () => menu.classList.toggle('hidden'));

  // Sticky header shadow
  const header = document.querySelector('.site-header');
  const onScroll = () => { if (!header) return; header.classList.toggle('scrolled', window.scrollY > 20); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // Scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // Active nav link
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav-link').forEach((a) => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
  });

  // ===== Hindi / English toggle =====
  const storedLang = localStorage.getItem('pcl_lang') || 'en';
  const applyLang = (lang) => {
    document.querySelectorAll('[data-en]').forEach((el) => {
      const en = el.getAttribute('data-en');
      const hi = el.getAttribute('data-hi');
      if (lang === 'hi' && hi) el.innerHTML = hi; else el.innerHTML = en;
    });
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang-toggle button').forEach((b) => b.classList.toggle('active', b.dataset.lang === lang));
    localStorage.setItem('pcl_lang', lang);
  };
  document.querySelectorAll('.lang-toggle button').forEach((b) => b.addEventListener('click', () => applyLang(b.dataset.lang)));
  applyLang(storedLang);

  // ===== Contact form =====
  // Using Web3Forms (free, no signup required for basic, or use your key). Fallback = WhatsApp.
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async (ev) => {
      ev.preventDefault();
      const name = form.name.value.trim();
      const phone = form.phone.value.trim();
      const message = form.message.value.trim();
      const email = (form.email && form.email.value.trim()) || '';
      if (!name || !phone || !message) return;

      const submitBtn = form.querySelector('button[type="submit"]');
      const ok = document.getElementById('formSuccess');
      const err = document.getElementById('formError');
      if (err) err.classList.add('hidden');
      if (submitBtn) { submitBtn.disabled = true; submitBtn.dataset.old = submitBtn.innerHTML; submitBtn.innerHTML = 'Sending…'; }

      // Web3Forms key: replace YOUR_WEB3FORMS_KEY with the real key from https://web3forms.com
      const WEB3_KEY = 'YOUR_WEB3FORMS_KEY';
      let sent = false;
      if (WEB3_KEY && WEB3_KEY !== 'YOUR_WEB3FORMS_KEY') {
        try {
          const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({
              access_key: WEB3_KEY,
              subject: `New enquiry from ${name} — Panchsheel Custom Lab`,
              from_name: name,
              email: email || 'Panchsheel008@gmail.com',
              phone, message,
              to: 'Panchsheel008@gmail.com'
            })
          });
          sent = res.ok;
        } catch (_) { sent = false; }
      }

      // Always also open WhatsApp (best lead channel for this business)
      const waText = `Hi Panchsheel Custom Lab,%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}${email ? `%0AEmail: ${encodeURIComponent(email)}` : ''}%0A%0A${encodeURIComponent(message)}`;
      window.open(`https://wa.me/919990903566?text=${waText}`, '_blank');

      if (sent || WEB3_KEY === 'YOUR_WEB3FORMS_KEY') {
        if (ok) ok.classList.remove('hidden');
        form.reset();
      } else if (err) {
        err.classList.remove('hidden');
      }
      if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = submitBtn.dataset.old || 'Send'; }
    });
  }

  // Set year in footer
  const yr = document.getElementById('yr'); if (yr) yr.textContent = new Date().getFullYear();
})();
