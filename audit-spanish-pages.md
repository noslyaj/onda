# Ondas — Spanish (/es) Pages Audit Report

**Date:** 2026-05-24  
**Commit:** `2587bc5`  
**Branch:** `claude/build-ondas-ferry-app-rrbuh`

---

## 1. Files Created

| File | Language | URL |
|------|----------|-----|
| `es/index.html` | ES | `/es` |
| `es/cv-interilhas.html` | ES | `/es/cv-interilhas` |
| `es/guide.html` | ES | `/es/guide` |

---

## 2. Files Modified

| File | Change |
|------|--------|
| `index.html` | Added `hreflang="es"` |
| `pt/index.html` | Added `hreflang="es"` |
| `fr/index.html` | Added `hreflang="es"` |
| `de/index.html` | Added `hreflang="es"` |
| `cv-interilhas.html` | Added `hreflang="es"` |
| `pt/cv-interilhas.html` | Added `hreflang="es"` |
| `fr/cv-interilhas.html` | Added `hreflang="es"` |
| `de/cv-interilhas.html` | Added `hreflang="es"` |
| `guide.html` | Added full hreflang block (en/pt/fr/de/es/x-default) — had none previously |
| `pt/guide.html` | Added `hreflang="es"` |
| `fr/guide.html` | Added `hreflang="es"` + fixed missing pt and de (pre-existing gap) |
| `de/guide.html` | Added `hreflang="es"` + fixed missing pt (pre-existing gap) |
| `sitemap.xml` | Added 3 new /es URLs; added es to homepage/cv-interilhas/guide entries; fixed homepage pt/fr hrefs pointing to `/` instead of `/pt`/`/fr`; added missing de to homepage entry |

---

## 3. Hreflang Audit

### Pages with 5-language hreflang (en, pt, fr, de, es + x-default)

| Page family | EN | PT | FR | DE | ES |
|-------------|----|----|----|----|-----|
| Homepage | `index.html` | `pt/index.html` | `fr/index.html` | `de/index.html` | `es/index.html` |
| CV Interilhas | `cv-interilhas.html` | `pt/cv-interilhas.html` | `fr/cv-interilhas.html` | `de/cv-interilhas.html` | `es/cv-interilhas.html` |
| Guide | `guide.html` | `pt/guide.html` | `fr/guide.html` | `de/guide.html` | `es/guide.html` |

**All 15 pages confirmed consistent** — each contains hreflang for en, pt, fr, de, es, and x-default.

### Pages with 4-language hreflang (unchanged — no Spanish version)

| Page family | Languages |
|-------------|-----------|
| Nôs Ferry (4 pages) | en, pt, fr, de + x-default |

### Pages with no hreflang or English-only

| Page | Status |
|------|--------|
| `faq.html` | English-only, no hreflang (no language variants exist) |
| Route pages | en + x-default only (no language variants) |

### Broken reference check

**No page references a nonexistent Spanish URL.** Pages without a Spanish version (faq, nos-ferry, routes) do not contain `hreflang="es"`.

---

## 4. Sitemap Audit

### New entries added

- `https://www.ondas.cv/es` — with full 5-language hreflang
- `https://www.ondas.cv/es/cv-interilhas` — with full 5-language hreflang  
- `https://www.ondas.cv/es/guide` — with full 5-language hreflang

### Existing entries updated

- Homepage (`/`) — added de + es hreflang; fixed pt/fr URLs from `/` to `/pt`/`/fr`
- CV Interilhas (`/cv-interilhas`) — added es hreflang
- Guide (`/guide`) — added full hreflang block (had none previously)

### Entries NOT modified (correct)

- `/faq` — no Spanish version
- `/nos-ferry` — no Spanish version  
- All `/routes/*` pages — no Spanish versions

---

## 5. Metadata Summary

### /es (Homepage)
- **Title:** Ondas — Horarios de Ferry entre las 9 Islas de Cabo Verde
- **Description:** Consulta los horarios de ferry entre las 9 islas de Cabo Verde. Todas las rutas, CV Interilhas y Nôs Ferry en un solo lugar. Gratis, sin cuenta.

### /es/cv-interilhas
- **Title:** CV Interilhas Horarios 2026 — Todas las Rutas, Tiempos y Precios | Ondas
- **Description:** Consulta todos los horarios de CV Interilhas para 2026. Todas las rutas entre las 9 islas de Cabo Verde, con tiempos de viaje y precios. Gratis, sin cuenta.

### /es/guide
- **Title:** Guía de Ferries en Cabo Verde 2026 — Horarios y Rutas entre Islas | Ondas
- **Description:** La guía completa de ferries en Cabo Verde. Rutas desde Praia a Fogo, Maio, Brava y más. Tiempos de viaje, operadores, consejos sobre billetes y búsqueda gratuita.

All pages have matching `og:title`, `og:description`, `twitter:title`, `twitter:description`.

---

## 6. Language Switcher Status

**Not modified in this task.**

The main app's language switcher is an in-app i18n toggle (client-side, no URL navigation). It currently offers: KEA, PT, EN, FR.

**Missing from switcher:**
- German (DE) — pre-existing, `/de/` exists but not in switcher
- Spanish (ES) — new, `/es/` exists but not in switcher

Both are flagged as a follow-up task. The static SEO pages (cv-interilhas, guide, nos-ferry) have no language switcher — only a logo linking to the homepage.

---

## 7. Translation Notes

- Spanish content uses **neutral European Spanish** (Spain vocabulary)
- "horarios de ferry" for schedules, "billetes" for tickets
- Proper nouns kept intact: Cabo Verde, Mindelo, São Vicente, Santo Antão, Porto Novo, CV Interilhas, Nôs Ferry, Ondas
- `/es/index.html` includes a complete `ES:{}` entry in the STRINGS object (75+ UI translation keys)

---

## 8. Pre-existing Issues Fixed

| Issue | Fix |
|-------|-----|
| `fr/guide.html` missing pt and de hreflang | Added both |
| `de/guide.html` missing pt hreflang | Added |
| `guide.html` had no hreflang block at all | Added complete 6-entry block |
| Sitemap homepage pt hreflang pointed to `/` instead of `/pt` | Corrected |
| Sitemap homepage fr hreflang pointed to `/` instead of `/fr` | Corrected |
| Sitemap homepage missing de hreflang entirely | Added |
| Sitemap guide entry had no hreflang annotations | Added complete block |

---

## 9. What Was NOT Changed

- FAQ page (`/faq`) — English-only, no Spanish version created
- Nôs Ferry pages (`/nos-ferry` family) — no Spanish version, hreflang unchanged
- Route pages (`/routes/*`) — no Spanish versions, hreflang unchanged
- Language switcher — not modified
- No routing, redirects, or dependency changes
