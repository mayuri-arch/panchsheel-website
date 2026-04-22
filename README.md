# Panchsheel Custom Lab — Premium Website

Production-ready, conversion-focused website for **Panchsheel Customizers Sublimation** (public brand: **Panchsheel Custom Lab**) — a premium custom printing studio in Nandgram, Ghaziabad, run by Sanjay Kumar.

Built with hand-crafted HTML + a custom CSS design system (no Tailwind dependency, no build step). Deployable to Vercel in 3 minutes.

---

## 📁 Folder structure

```
panchsheel-website/
├── index.html          # Home (premium hero, why-us, testimonials, FAQ)
├── services.html       # 7 services with Ghaziabad pricing
├── products.html       # Product catalog by category
├── gallery.html        # Masonry portfolio
├── blog.html           # 6 SEO articles
├── about.html          # Brand story
├── contact.html        # Form (Web3Forms + WhatsApp) + Map
├── robots.txt
├── sitemap.xml
├── vercel.json         # Caching + security headers
├── .gitignore
├── README.md
└── assets/
    ├── css/styles.css  # Full design system (one file, ~600 lines)
    ├── js/main.js      # Nav, scroll-reveal, Hindi toggle, contact form
    └── img/logo.svg    # Brand logo (gradient + petal mark)
```

---

## 🎨 Brand system

| Token              | Value      | Used for                                 |
|--------------------|-----------|-------------------------------------------|
| `--brand` (primary) | `#1E3A8A` | Headings, buttons, links, brand accents   |
| `--brand-2`         | `#0f1e5c` | Hero gradient, hover states              |
| `--gold` (accent)   | `#D4AF37` | Badges, CTAs, highlights                 |
| `--gold-soft`       | `#f6e6a6` | Soft tints                               |
| `--ink` / `--ink-2` | `#0B1220` / `#1f2937` | Body text                |
| `--muted`           | `#5b6577` | Secondary text                           |
| `--bg-soft`         | `#f6f7fb` | Section backgrounds                      |

Edit any of these in **`assets/css/styles.css`** (top of the file) — the entire site updates.

**Typography:** Poppins (display) + Inter (body). Two fonts only — strict consistency.

---

## 🖼️ Image guidelines (FOLLOW THESE for future uploads)

### A. Product mockup images
The site uses a `.product-shot` CSS frame that **automatically normalizes** any product image with consistent background, padding, and shadow. So even if your source images vary, they look like a coordinated set.

But to push it further:
- **Background:** plain white or neutral gradient (the frame already adds one — clean source images stack better)
- **Aspect ratio:** square (1:1). Source images larger than 700×700 px
- **Padding:** leave ~10–15% breathing room around the product
- **Lighting:** soft, even, top-left. Avoid harsh shadows
- **Format:** JPG (photos) or WebP (smaller). PNG only if transparency needed
- **File size:** under 200 KB per image (compress at [tinypng.com](https://tinypng.com) or [squoosh.app](https://squoosh.app))
- **Naming:** `tshirt-round-neck-white.jpg`, `mug-magic-couple.jpg` (lowercase, hyphens — good for SEO)

### B. Lifestyle / hero images
- **Aspect ratio:** 4:5 portrait (hero) or 16:10 (page heroes)
- **Resolution:** at least 1200 px wide
- **Mood:** warm, real, human. Hands at work, stacks of finished orders, a satisfied customer holding a mug
- **Avoid:** generic stock photos of foreign people in suits

### C. Gallery / portfolio
- Mix orientations (portrait + landscape) — the masonry layout balances them automatically
- Show **finished real orders** with the customer's permission
- One sentence per image: "Wedding return mug · 80 pcs · Loni Road" — adds trust

### D. Where to put your photos
Drop them into `assets/img/` (create subfolders if you like — `assets/img/products/`, `assets/img/gallery/`). Then in the HTML, replace the `https://images.unsplash.com/...` URL with `assets/img/products/your-photo.jpg`.

> Until you upload your own photos, the site uses curated Unsplash images that match the product shots — they look real because they *are* real photographs.

---

## ✏️ How to edit content (no coding needed)

### Change phone numbers / WhatsApp
Open each `.html` file, **Find & Replace** (Ctrl+H):
- `9990903566` → new number
- `8882130530` → new alt number
- `Panchsheel008@gmail.com` → new email

WhatsApp URLs follow the format `https://wa.me/91XXXXXXXXXX?text=...` — keep the `91` prefix.

### Change the offer banner
Search for `FIRST10` or `10% OFF` — edit the `.offer-bar` div in any HTML file.

### Change prices
- Service-level pricing → `services.html`
- Product card "From ₹X" → `products.html` and `index.html`

### Replace product images
See **Image guidelines** above. Use Find & Replace in HTML to swap URLs.

### Update testimonials
Open `index.html`, search for `t-card` — each `<figure>` is a testimonial. Replace name, location and quote. Avatars are auto-generated from initials via [ui-avatars.com](https://ui-avatars.com) — no broken-face-photo problems.

### Update FAQ
In `index.html`, each `<details class="faq">` is one Q&A — duplicate or edit.

### Update Hindi translations
Any element with `data-en="..."` gets a matching `data-hi="..."`. The toggle button (top-right) swaps them via JS. To translate more strings: add `data-en="..." data-hi="..."` to any element.

---

## 📨 Contact form (Web3Forms setup)

The contact form sends enquiries to **email + WhatsApp** simultaneously. Email delivery uses [Web3Forms](https://web3forms.com) (free, no signup for testing).

### To activate email delivery:

1. Go to [web3forms.com](https://web3forms.com) → enter your email (Panchsheel008@gmail.com) → click "Create Access Key"
2. Copy the access key
3. Open `assets/js/main.js`
4. Find `const WEB3_KEY = 'YOUR_WEB3FORMS_KEY';`
5. Replace `YOUR_WEB3FORMS_KEY` with your real key
6. Save and re-deploy

> Until you do step 5, the form still works perfectly — it just opens WhatsApp pre-filled (which is your primary lead channel anyway).

---

## 🚀 Deploy to Vercel via GitHub — step by step

### 1. Create a GitHub repo
1. [github.com](https://github.com) → **+** → **New repository**
2. Name: `panchsheel-website` → **Create**

### 2. Push this folder to GitHub
Open Command Prompt **inside this folder**:

```bash
git init
git add .
git commit -m "Premium Panchsheel Custom Lab website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/panchsheel-website.git
git push -u origin main
```

### 3. Deploy on Vercel
1. [vercel.com](https://vercel.com) → sign up with GitHub
2. **Add New Project** → select `panchsheel-website`
3. Framework preset: **Other** (it's static HTML)
4. Leave build/output settings empty
5. **Deploy** — live URL within 30 seconds

### 4. Connect a real domain (recommended)
1. Buy `panchsheelcustomlab.com` on GoDaddy / Namecheap / Hostinger (~₹700/year)
2. Vercel → Project → **Settings → Domains** → add domain
3. Copy the 2 DNS records Vercel shows → paste into your domain registrar's DNS panel
4. SSL is automatic. Live in 1–2 hours

After adding a real domain, do a Find-Replace for `panchsheelcustomlab.com` across all HTML files (in case the canonical URLs differ).

---

## 🔁 Updating the live site
After the first deploy, every `git push` auto-redeploys:
```bash
git add .
git commit -m "Updated pricing"
git push
```
Live in ~20 seconds.

---

## 🧠 Section-wise improvements over v1

| Section | Before (v1) | After (v2 — this) |
|--------|------------|-------------------|
| **Logo** | Plain "P" letter | Gradient SVG with petal mark + serif logotype |
| **Hero** | Generic image, generic copy | Premium gradient + grid overlay, lifestyle photo with floating "live orders" + "starting price" cards, dual CTA |
| **Trust signals** | None | Trust chip row under hero (5 chips) + 4-stat counters |
| **Products** | Mismatched images | Normalized `.product-shot` frame: same bg, padding, shadow, hover scale — all images look coordinated |
| **Why Us** | Missing | New 4-point section with split image + iconified benefits |
| **Testimonials** | Looked fake (just text) | 6 cards with avatars, stars, names + locations, real-sounding voices, hover-lift |
| **FAQ** | Basic | 6 questions with smooth open/close, plus/minus icon, branded hover |
| **Hindi toggle** | None | Full EN ↔ हिंदी toggle on key strings, persists in localStorage |
| **Gallery page** | None | New page with masonry layout (auto-balanced columns) |
| **Blog page** | None | New page with 6 SEO articles (cards with hover) |
| **Contact form** | WhatsApp only | Web3Forms email + WhatsApp simultaneously |
| **Footer** | Light grey | Premium dark navy with social icons |
| **Design tokens** | Inline Tailwind utilities | Single CSS variable system — change palette in 5 lines |
| **Fonts** | Poppins + Open Sans | Poppins + Inter (cleaner body type) |
| **Images** | Generic stock | Curated product-photography Unsplash IDs + auto-generated avatars |

---

## 🔎 SEO checklist (already done)

- [x] Meta titles & descriptions on every page (unique per page)
- [x] Canonical URLs
- [x] Open Graph + Twitter Card tags
- [x] Schema.org `LocalBusiness` JSON-LD with `aggregateRating` (home page)
- [x] `robots.txt` + `sitemap.xml` (now includes Gallery + Blog)
- [x] Image alt text with location keywords ("printing Ghaziabad", "Nandgram")
- [x] Mobile-first responsive layout
- [x] Semantic HTML (`<header>`, `<section>`, `<article>`, `<figure>`)
- [x] Fast: lazy-loaded images, preconnect to font/image hosts, long cache headers in `vercel.json`

### After going live — do these to rank faster:
1. **Google Search Console** → add domain → submit `sitemap.xml`
2. **Google Business Profile** → list as *Panchsheel Custom Lab, Nandgram, Ghaziabad*. **This is the #1 thing for "near me" searches.**
3. Get your first 10 customers to leave Google reviews (a 5★ at the right time = 10× return)
4. Add more blog posts (one per week) targeting long-tail keywords like "school uniform printing in raj nagar", "anniversary gift ideas under 500 ghaziabad"

---

## 📈 Suggestions for further scaling (SEO + conversions)

### Short-term wins (this week)
- **Replace stock images with your real studio photos** — biggest visual win. Especially: hero image, About-us studio photo, gallery tiles
- **Add real customer photo testimonials** — even one 30-sec video review of a mug/t-shirt customer recorded on phone is gold
- **Activate Web3Forms** — see Contact Form section above
- **Add Google Reviews badge** — embed your live rating from Google Business Profile

### Mid-term wins (next month)
- **Add a "Track My Order" page** — a simple form that asks for name + phone, sends to your WhatsApp. Customers love it; it kills 50% of "is my order ready?" calls
- **Add structured product schema** to each product card — qualifies for Google Shopping rich results
- **Build a 30-piece blog calendar** — one post per week × 6 months. Title format: "How to [outcome] in [city] — [year]"
- **Add Hindi versions of all hero copy + product cards** — Nandgram audience converts better in Hindi
- **Set up Meta Pixel + Google Tag Manager** — needed before you ever spend on ads

### Long-term wins (next 3 months)
- **Migrate from static HTML to Next.js / Astro** — only when you need: dynamic product configurator, online payments, customer accounts. Until then, static is faster and free
- **Add an online "Design Your Own" tool** (canvas + drag-text-on-mug) — takes the WhatsApp friction away for tech-savvy customers
- **Start a YouTube channel** — short 30-sec reels of presses running, customers reacting. Drives massive Tier-2/3 trust
- **Run hyperlocal Meta ads** targeting Nandgram, Vasundhara, Indirapuram, Raj Nagar Extn pin codes — at ₹50/day for 30 days you'll learn what converts

---

## 🛠️ Tech stack
- HTML5 (semantic)
- Custom CSS design system (no framework, ~600 lines, all in one file)
- Vanilla JS — IntersectionObserver for animations, localStorage for Hindi pref
- Google Fonts (Poppins + Inter)
- Web3Forms (free email API)
- Hosted on Vercel (free tier handles 100k+ visits/month)

**Performance budget:** Page weighs <500 KB transferred. Lighthouse score should be 95+/100/100/100 once you swap stock images for properly-compressed real ones.

---

## 📞 Business contact (on site)

- **Phone:** +91 99909 03566 / +91 88821 30530
- **Email:** Panchsheel008@gmail.com
- **WhatsApp:** [wa.me/919990903566](https://wa.me/919990903566?text=Hi%2C%20I%20want%20to%20order%20a%20custom%20print)
- **Address:** Nandgram, Ghaziabad, Uttar Pradesh
- **Map:** [Google Maps](https://share.google/9djJrCFrVhPnkyvvI)

---

**Built with care for a business that deserves a premium online identity.** 🪷
