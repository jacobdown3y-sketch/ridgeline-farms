# Ridgeline Farms

A full redesign of [ridgelinefarms.com](https://ridgelinefarms.com) — a family-owned, second-generation, **sun-grown** craft cannabis brand high in the hills of **Southern Humboldt County**, and repeat **Emerald Cup** champions.

Fast, dependency-free static site (no build step). Heritage editorial design with cinematic, generative SVG animation.

## Highlights

- **Cinematic hero** — generative layered ridgeline silhouettes, an animated sun with rotating rays, a twinkling starfield, and multi-layer scroll parallax, over real aerial photography of the farm.
- **3D coverflow strain vault** — drag / scroll / arrow-key browsable, with live search, Indica/Hybrid/Sativa/Featured filters, a grid view, and a detail modal. Real cultivars (Lantz, Green Lantern, Lamborghini OG…).
- **Interactive store locator** — a stylized California map with animated pins linked to a live retail-partner list.
- **Awards & press room** — Emerald Cup timeline, featured film block, press quotes and outlet strip.
- **Gallery** — real, optimized farm photography (redwoods, light-dep rows, sunset harvest, the founder).
- Age gate (21+), cookie consent, contact + wholesale forms, and full legal pages.
- Responsive, accessible (keyboard-navigable, focus states, reduced-motion support), theme-colored, favicon set.

## Structure

```
index.html          Landing — hero, farm story, how we grow, vault, spotlight, awards, press, gallery, locator
strains.html        Full 3D strain vault + growing notes + signature cut
media.html          Awards timeline, film, press, full gallery
contact.html        Store locator, contact form, wholesale request
privacy / terms / cookies / accessibility .html
styles.css          Design system + engine styles
main.js             Generative hero, coverflow, locator, reveals, parallax, modal, age gate
data.js             Content model — strains, awards, press, retailers, gallery, grow steps
assets/             Optimized photography, logo, favicons
```

## Type & color

- **Display:** Fraunces · **UI:** Archivo
- Olive/moss + deep forest, warm bone/cream paper, and a gold "star" accent — drawn from the logo and the Humboldt landscape.

## Develop

Pure static files — open `index.html` or serve the folder:

```bash
python3 -m http.server 8000
```

Deploys to Vercel as-is (`vercel.json` handles clean URLs, caching and security headers).

## Content note

Photography and brand facts (Emerald Cup wins, founder Jason Gellman, strain profiles, retail partners) were sourced from the brand's own materials and public press. Contact details and social handles should be confirmed before going live.
