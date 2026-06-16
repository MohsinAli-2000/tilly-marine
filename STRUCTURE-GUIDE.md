# Tilly Marine — Build & Structure Guide

A practical reference for building **new pages** that match this codebase 1:1.
Read this before writing any HTML/CSS/JS. The golden rule: **reuse existing
classes and patterns first; only add new CSS when nothing fits, and when you do,
prefix it `tl-` and place it in the correct CSS region (see §5).**

This site is plain static HTML on Bootstrap 4 + jQuery. No build step, no
framework, no CSS variables file (a few `var(--x, #fallback)` are used inline
with fallbacks, so the fallback is what actually renders). Every page links the
**same** CDN block, the **same** `style.css`, and the **same** `script.js`.

---

## 1. Every page is built from 4 fixed blocks

In this exact order, every page is:

```
<head>      → identical CDN + meta block (only <title> / <meta description> change)
<header>    → desktop nav   (identical on every page)
<div>       → inventory mega-menu   (identical on every page)
... PAGE CONTENT ...   ← the only part that changes
<footer>    → footer   (identical on every page)
<script>    → identical CDN script block + script.js
```

To make a new page: **copy an existing page, keep blocks 1/2/3 and the footer +
script block byte-for-byte, and replace only the page-content region** between
the `<!-- xxx page starts here -->` / `<!-- xxx page ends here -->` comments.

---

## 2. The `<head>` block (copy verbatim)

Order is always: Bootstrap → Owl Carousel (2 files) → Fancybox → Font Awesome →
`style.css`. `style.css` is **always last** so it overrides the libraries.

```html
<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="PAGE-SPECIFIC DESCRIPTION">
    <meta name="author" content="Tilly Marine">
    <title>PAGE NAME | Tilly Marine</title>

    <!-- ======= Bootstrap CSS ======= -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">

    <!-- ======= Owl Carousel CSS ======= -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css"
        referrerpolicy="no-referrer">
    <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css"
        referrerpolicy="no-referrer">

    <!-- ======= Fancybox CSS ======= -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css" />

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
        integrity="sha512-2SwdPD6INVrV/lHTZbO2nodKhrnDdJK9/kg2XD1r9uGqPo1cUbujc+IYdlYdEErWNu69gVcYgdxlmVmzTWnetw=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!-- ======= Custom Styles ======= -->
    <link rel="stylesheet" href="./assets/css/style.css">
</head>
```

## 3. The `<script>` block (copy verbatim, bottom of `<body>`)

Order is fixed: jQuery → Bootstrap bundle → Owl Carousel → Fancybox →
`script.js`. jQuery **must** come first (everything depends on it).

```html
    <!-- ======= Script Dependencies ======= -->
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"
        referrerpolicy="no-referrer"></script>
    <script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.umd.js"></script>
    <script src="./assets/js/script.js"></script>
</body>
</html>
```

## 4. Header + mega-menu + footer (shared, copy verbatim)

These three blocks are **identical** on every page. Copy them from any existing
page. The only thing that differs is which `href`s are wired up (e.g. on
`events.html` the nav links point to real files; on `home.html` many are still
`javascript:void(0)`). When building a new page, point links to real pages where
they exist, otherwise use `javascript:void(0)` as the placeholder.

Structure summary (full markup: copy from `events.html`, which has the most
links wired):

- **`<header class="desktopNav">`** → `.desktopNavContainer` holding:
  - `.desktopNavMenuList` — `Inventory` (`.toggleInventoryMenu`), `Service`,
    `Our World` (`.toggleResourcesMenu` → contains `.resourcesMegaMenu` dropdown).
  - `.desktopNavLogo` — centered absolutely-positioned logo.
  - `.phoneAndSearchWrap` — phone block + `.searchWrapper` (input + icon).
- **`<div class="inventoryMegaMenu">`** → full-width fixed panel (hidden by
  default, toggled by JS) with link columns + two brand cards + `.closeInventoryIcon`.
- **`<footer class="calFooter">`** → Bootstrap `.row.no-gutters`:
  - `.col-lg-8` → `.calFooterLinks` (contact + Boats column + Company column).
  - `.col-lg-4` → `.calFooterNewsletter` (dark email signup + social icons).
  - `.calFooterBottom` → copyright bar.

> There is currently **no mobile hamburger nav** in the markup — the nav is
> desktop-oriented. Don't invent one unless asked; match what exists.

---

## 5. `style.css` is organized in strict regions — respect the order

`style.css` is a single file read top-to-bottom. Add new rules to the **correct
region**, never randomly at the end. The regions, in file order:

| Order | Region (marked by comments)                          | What lives here |
|-------|------------------------------------------------------|-----------------|
| 1 | `/* common css starts here */`                            | Reset, `@font-face`, buttons, headings, paragraphs, helpers |
| 2 | `/* desktop nav css starts here */`                       | `.desktopNav*`, search |
| 3 | `/* mega menu css starts here */`                         | `.inventoryMegaMenu`, `.resourcesMegaMenu` |
| 4 | `FOOTER`                                                  | `.calFooter*` |
| 5 | `/* home page css starts here */`                         | All `home.html` styles |
| 6 | **Empty global breakpoint stack** (see §6)                | 9 empty `@media` blocks reserved for home-page responsive |
| 7 | `SERVICE PAGES — CSS`                                     | `.tl-services-*` (hero, intro, difference, rows, form, faq) |
| 8 | `SERVICE PAGES — RESPONSIVE`                              | service `@media` blocks |
| 9 | `SELL & TRADE / PRO SHOP / CONTACT — CSS` + responsive   | `.tl-feature-*`, `.tl-process*`, `.tl-brand-*`, `.tl-shop-*`, `.tl-map-*`, `.tl-contact-*` |
| 10 | `.tl-section` generic spacer + responsive              | brand/financing/about spacing |
| 11 | events / blog / team-bio blocks                         | `.tl-event-*`, `.tl-blog-*`, `.tl-bio-*` |

**Rule:** a page's CSS goes in **one contiguous labeled block**, with a clear
`/* ---- section name ---- */` comment, followed (or grouped) by its responsive
`@media` rules. New page → add a new labeled region at the bottom following the
same `===== HEADER =====` comment-banner style.

---

## 6. Responsive CSS — how and where it's placed

Two patterns coexist; **follow whichever the surrounding region uses**:

1. **Global breakpoint stack** (home page): right after the home CSS there is a
   ladder of empty media queries kept as a template —
   ```css
   @media (max-width: 1600px) {}
   @media (max-width: 1500px) {}
   @media (max-width: 1440px) {}
   @media (max-width: 1350px) {}
   @media (max-width: 1200px) {}
   @media (max-width: 991px)  {}
   @media (max-width: 768px)  {}
   @media (max-width: 576px)  {}
   @media (max-width: 400px)  {}
   ```
   Fill these in for home-page responsiveness.

2. **Per-region responsive blocks** (every `tl-` page): each page region has its
   **own** `@media` group placed **directly after** that region's base CSS, using
   the breakpoints actually needed — typically `1200`, `991`, `768`, `576`
   (`max-width`, mobile-down). Example: the `SERVICE PAGES — RESPONSIVE` banner
   holds all service breakpoints together right after the service base styles.

**Conventions seen across breakpoints:**
- Section vertical margins shrink at each step: `100px → 64px (≤991) → 48px (≤576)`.
- Section paddings shrink: `80px → 64px → 48px`.
- Big headings step down, e.g. `.headerHeading 80px → 64px (≤1200) → 48px (≤991) → 32px (≤576)`.
- Overlapping cards (negative `margin-top`) reset to a positive margin on mobile
  (e.g. `.tl-contact-card`, `.tl-event-datecard` → `margin-top: 24/32px` at `≤991`).

**Rule:** all responsive rules are **`max-width` (desktop-first)**, ordered
largest→smallest, and placed **at the bottom of their region**, not scattered.

---

## 7. The design system (reuse these — do not reinvent)

**Colors** (used as literals, sometimes via `var(--x, #fallback)`):
- Blackish `#191919` (dark sections, text) · Gold `#B08830` (buttons, accents) ·
  ADA Gold `#906F27` (gold text/links) · grays `#D9D9D9` `#E6E6E6` `#FAFAFA` ·
  white `#FFF`.

**Font:** Montserrat everywhere (`@import` at top of CSS). Acumin Pro is declared
via `@font-face` but Montserrat is the working font.

**Buttons** (in common region): `.yellowBtn` (gold fill), `.whiteBtn` (outline,
inverts on hover), `.blackBtn` (dark). All uppercase, 800 weight, 4px radius.

**Headings:**
| Class | Size | Use |
|-------|------|-----|
| `.headerHeading` | 80px white, centered | hero H1 |
| `.tl-page-title` | 48px dark | plain page titles |
| `.mainHeading` / `.mainHeadingWhite` | 40px (dark / white centered) | section H2 |
| `.tl-contact-heading` | 80px dark | contact hero |
| `.backLinkTitle` | 24px | card titles |

**Body text:** `.blackPara` (16px dark), `.whitePara` (16px white centered),
`.lgBlackPara` (24px). `.goldColor` recolors any text to `#906F27`.
Spacer helper: `.marginYaxis40` (40px top/bottom). Button wrapper: `.btnWrap`
(48px top margin).

---

## 8. Layout patterns (the recurring building blocks)

**Section skeleton** — almost every content section follows this nesting:
```html
<section>
    <div class="SOME-section-wrapper">          <!-- gives vertical margin/padding -->
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-10 col-xl-9 mx-auto">   <!-- centered content column -->
                    ... content ...
                </div>
            </div>
        </div>
    </div>
</section>
```
Common centering columns used: `col-lg-10 col-xl-9 mx-auto`,
`col-lg-11 col-xl-10 mx-auto`, `col-lg-10 mx-auto`. Pick the one matching the
density of neighbouring sections.

**Fixed-aspect media (the core trick):** images/videos use the
*padding-top percentage* technique — a relatively-positioned wrapper with
`padding-top: <ratio>%` and an absolutely-positioned `img/video` filling it with
`object-fit: cover`. Reuse the existing wrapper classes:
- Square (1:1): `.tl-services-img-square`
- Event/card 54%: `.tl-event-img`
- Service detail 72.22%: `.tl-service-detail-img`
- Map 54.17%: `.tl-map-wrap`
- Hero ~31%: `.tl-services-hero` / `.tl-banner`

**Image-text feature row** (alternating sides) — see `service.html` `.tl-services-row`:
```html
<div class="row tl-services-row">                      <!-- image left -->
  <div class="col-lg-6"><div class="tl-services-img-square"><img ...></div></div>
  <div class="col-lg-6"><div class="tl-services-row-text"><div> ...text... </div></div></div>
</div>
<div class="row tl-services-row flex-lg-row-reverse">  <!-- image right: add flex-lg-row-reverse -->
  ...
</div>
```
On mobile, use `order-1/order-2 order-lg-*` to control stacking (see the intro
section in `service.html`).

**Dark overlay hero** — `.tl-services-hero` has a `::after` dark scrim and a
centered `.tl-services-hero-content`. `.tl-banner` is the plain (no-scrim) variant.

**Card grid** — events grid is the canonical example: a `.row` of
`col-lg-6 mb-5` cards, each an `<a>` wrapping `.tl-event-img` + title + date.
Adjust `col-*` and `mb-*` to taste but keep the bottom-margin rhythm.

---

## 9. JavaScript — what `script.js` does and how to add to it

`script.js` is one `$(document).ready(...)` with two labeled regions:

1. **Desktop nav / mega-menu** (always active): toggles `.inventoryMegaMenu`,
   `.resourcesMegaMenu`, and the search input with jQuery `fadeIn/fadeOut`,
   closes on outside click, `stopPropagation` to keep open on inside click.
   This runs on every page automatically — no per-page wiring needed.

2. **Carousels** (guarded by `.length` checks): each carousel init is wrapped in
   `if ($('.selector').length) { ... }` so it's safe to load `script.js` on pages
   that don't have that carousel. **Always guard new carousels the same way.**

**Rule for new interactive features:** add a new `// xxx code starts/ends here`
labeled region inside the same `$(document).ready`, and **guard DOM-specific code
with `.length` checks** so it stays safe site-wide.

---

## 10. Owl Carousel — use it for EVERY slider

Whenever a section is a slider/carousel, use **Owl Carousel 2** (already loaded).
Do not hand-roll sliders. Pattern:

**HTML** — outer `.owl-carousel .owl-theme` (+ your own class) wrapping `.item`
(or `.items`) slides:
```html
<div class="myThing-slider owl-carousel owl-theme">
    <div class="item"> ...slide... </div>
    <div class="item"> ...slide... </div>
</div>
```

**JS** — add a `.length`-guarded init in `script.js` (carousel region):
```js
if ($('.myThing-slider').length) {
    $('.myThing-slider').owlCarousel({
        loop: false,
        margin: 20,
        nav: true,
        navText: ['<img src="./assets/images/home/left-arrow.webp" alt="prev"/>',
                  '<img src="./assets/images/home/right-arrow.webp" alt="next"/>'],
        dots: true,
        smartSpeed: 600,
        center: true,
        slideBy: 1,
        responsive: { 0: { items: 1 }, 576: { items: 1 }, 1000: { items: 1 } }
    });
}
```

Two real examples already in `script.js`:
- **`.promoSlider`** — single-item, custom image nav arrows, dots styled in CSS
  (`.promoSlider .owl-dots span`, `.owl-prev/.owl-next` absolutely positioned).
- **`.boat-listing-carousel`** — uses `.each()` + `if (!$(this).hasClass('owl-loaded'))`
  so multiple instances on a page each init once; `loop:true`, no nav/dots.

**Custom arrow/dot styling** lives in CSS next to that carousel's other rules
(see the `.promoSlider .owl-*` rules in the home region). Match that placement.

---

## 11. Assets & placeholders

- Page images live in `./assets/images/<page>/`. Reference with relative
  `./assets/...` paths (every page sits at repo root).
- `./assets/images/home/grey.webp` is the **grey placeholder** for any
  CMS-driven/not-yet-supplied image (cards, galleries, crew photos).
- Inventory/spec icons are pulled from the `cdn.mdsbrand.com` CDN (see the
  new-arrivals card in `home.html`).
- Cards with repeated dummy content (`Year Make Model`, `Event or Promotion
  Title`, etc.) are **templates** to be populated from a CMS later.

---

## 12. Checklist for building a new page

1. Copy an existing page whose layout is closest (e.g. `service.html` for
   content-heavy, `events.html` for a card grid).
2. Keep `<head>`, header, inventory mega-menu, footer, and the script block
   **unchanged** (update only `<title>`/`<meta description>` and link `href`s).
3. Build content with Bootstrap grid + existing `.tl-*` / pages classes; reuse
   the aspect-ratio media wrappers.
4. Only add new CSS when nothing fits → prefix `tl-`, put it in a new labeled
   region at the bottom of `style.css`, with a comment banner.
5. Put that page's responsive rules **in its own `@media` group right after**
   its base CSS, `max-width` desktop-first, largest→smallest.
6. Any slider → Owl Carousel, with a `.length`-guarded init added to the
   carousel region of `script.js`.
7. Wire nav/footer links to real files where they exist; `javascript:void(0)`
   otherwise.
```
