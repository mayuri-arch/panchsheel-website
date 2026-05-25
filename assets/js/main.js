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
    if (typeof updateCalculator === 'function') updateCalculator();
  };
  document.querySelectorAll('.lang-toggle button').forEach((b) => b.addEventListener('click', () => applyLang(b.dataset.lang)));

  // ===== WhatsApp Bulk Price Estimator =====
  const PRICING_DB = {
    tshirt: {
      nameEn: 'Round-Neck T-Shirt', nameHi: 'गोल-गला टी-शर्ट',
      tiers: [
        { min: 100, price: 89 },
        { min: 26, price: 109 },
        { min: 6, price: 129 },
        { min: 1, price: 149 }
      ]
    },
    polo: {
      nameEn: 'Polo T-Shirt', nameHi: 'कॉलर वाली पोलो टी-शर्ट',
      tiers: [
        { min: 100, price: 159 },
        { min: 26, price: 189 },
        { min: 6, price: 219 },
        { min: 1, price: 249 }
      ]
    },
    mug: {
      nameEn: 'White Photo Mug', nameHi: 'सफ़ेद फोटो मग',
      tiers: [
        { min: 100, price: 79 },
        { min: 26, price: 99 },
        { min: 6, price: 109 },
        { min: 1, price: 129 }
      ]
    },
    bottle: {
      nameEn: 'Steel Sipper Bottle', nameHi: 'स्टील सिपर बोतल',
      tiers: [
        { min: 100, price: 169 },
        { min: 26, price: 199 },
        { min: 6, price: 219 },
        { min: 1, price: 249 }
      ]
    },
    pillow: {
      nameEn: 'Photo Pillow', nameHi: 'फोटो तकिया (कुशन)',
      tiers: [
        { min: 100, price: 179 },
        { min: 26, price: 199 },
        { min: 6, price: 229 },
        { min: 1, price: 249 }
      ]
    },
    frame: {
      nameEn: 'MDF Photo Frame', nameHi: 'MDF फोटो फ्रेम',
      tiers: [
        { min: 100, price: 129 },
        { min: 26, price: 149 },
        { min: 6, price: 179 },
        { min: 1, price: 199 }
      ]
    },
    keychain: {
      nameEn: 'Photo Keychain', nameHi: 'फोटो कीचेन',
      tiers: [
        { min: 100, price: 29 },
        { min: 26, price: 35 },
        { min: 6, price: 42 },
        { min: 1, price: 49 }
      ]
    }
  };

  const calcProduct = document.getElementById('calcProduct');
  const calcQty = document.getElementById('calcQty');
  const btnMinus = document.getElementById('calcMinus');
  const btnPlus = document.getElementById('calcPlus');

  const valUnit = document.getElementById('valUnit');
  const valTotal = document.getElementById('valTotal');
  const badgeDisc = document.getElementById('badgeDisc');
  const btnCalcWa = document.getElementById('btnCalcWa');

  const updateCalculator = () => {
    if (!calcProduct || !calcQty) return;
    const prodKey = calcProduct.value;
    const qty = parseInt(calcQty.value) || 1;
    const prod = PRICING_DB[prodKey];
    if (!prod) return;

    let unitPrice = prod.tiers[prod.tiers.length - 1].price;
    for (const tier of prod.tiers) {
      if (qty >= tier.min) {
        unitPrice = tier.price;
        break;
      }
    }

    const totalPrice = unitPrice * qty;
    const basePrice = prod.tiers[prod.tiers.length - 1].price;
    const discountPercent = Math.round(((basePrice - unitPrice) / basePrice) * 100);

    if (valUnit) valUnit.innerHTML = `₹${unitPrice}`;
    
    if (valTotal) {
      valTotal.innerHTML = `₹${totalPrice.toLocaleString('en-IN')}`;
      valTotal.classList.add('pop');
      setTimeout(() => valTotal.classList.remove('pop'), 120);
    }

    if (badgeDisc) {
      if (discountPercent > 0) {
        badgeDisc.style.display = 'inline-flex';
        const lang = localStorage.getItem('pcl_lang') || 'en';
        if (lang === 'hi') {
          badgeDisc.innerHTML = `✓ ${discountPercent}% होलसेल बचत!`;
        } else {
          badgeDisc.innerHTML = `✓ Save ${discountPercent}% Wholesale!`;
        }
      } else {
        badgeDisc.style.display = 'none';
      }
    }

    if (btnCalcWa) {
      const lang = localStorage.getItem('pcl_lang') || 'en';
      const prodName = lang === 'hi' ? prod.nameHi : prod.nameEn;
      
      let waText = '';
      if (lang === 'hi') {
        waText = `नमस्ते पंचशील कस्टम लैब,%0A%0Aमुझे एक प्रिंटिंग कोट चाहिए:%0A📦 प्रोडक्ट: ${encodeURIComponent(prodName)}%0A🔢 मात्रा: ${qty} पीस%0A💰 अनुमानित कुल क़ीमत: ₹${totalPrice.toLocaleString('en-IN')}%0A%0Aकृपया डिज़ाइन और ऑर्डर प्रक्रिया के बारे में बताएं।`;
      } else {
        waText = `Hi Panchsheel Custom Lab,%0A%0AI would like a printing quote:%0A📦 Product: ${encodeURIComponent(prodName)}%0A🔢 Quantity: ${qty} pcs%0A💰 Estimated Total: ₹${totalPrice.toLocaleString('en-IN')}%0A%0APlease let me know the design and order process.`;
      }
      
      btnCalcWa.setAttribute('href', `https://wa.me/919990903566?text=${waText}`);
    }
  };

  if (calcProduct) calcProduct.addEventListener('change', updateCalculator);
  if (calcQty) {
    calcQty.addEventListener('input', () => {
      let v = parseInt(calcQty.value) || 1;
      if (v < 1) v = 1;
      calcQty.value = v;
      updateCalculator();
    });
  }
  if (btnMinus) {
    btnMinus.addEventListener('click', () => {
      let v = parseInt(calcQty.value) || 1;
      if (v > 1) {
        calcQty.value = v - 1;
        updateCalculator();
      }
    });
  }
  if (btnPlus) {
    btnPlus.addEventListener('click', () => {
      let v = parseInt(calcQty.value) || 1;
      calcQty.value = v + 1;
      updateCalculator();
    });
  }

  // Run initial calculations
  applyLang(storedLang);
  updateCalculator();

  // ===== Contact form =====
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

