/* ============================================================
   RIDGELINE FARMS — content data
   "Sun grown in the heart of Southern Humboldt."
   Family-owned · Second-generation · Emerald Cup champions
   Real photography pulled from ridgelinefarms.com archives.
   ============================================================ */

/* ---- image registry (local /assets) ---- */
const IMG = {
  "logo":        "assets/logo.png",
  "aerial":      "assets/farm-1.jpg",   // aerial of the farm in the redwoods
  "purple-macro":"assets/farm-2.jpg",   // purple frosty cola macro
  "tall-cola":   "assets/farm-3.jpg",   // tall purple cola against sky
  "canopy":      "assets/farm-4.jpg",   // top-down green canopy
  "green-cola":  "assets/farm-5.jpg",   // frosty green cola
  "greenhouse":  "assets/farm-6.jpg",   // light-dep greenhouse rows
  "founder":     "assets/farm-7.jpg",   // Jason in the greenhouse
  "field":       "assets/farm-8.jpg",   // outdoor rows + redwoods
  "sunset":      "assets/farm-9.jpg",   // sunset over the ridge w/ plant
  "nug":         "assets/flower-1.jpg", // studio nug
  "green-lantern-bag": "assets/flower-2.jpg", // Green Lantern packaging
  "lantz-1":     "assets/lantz-1.jpg",
  "lantz-2":     "assets/lantz-2.jpg",
  "emeraldcup":  "assets/emeraldcup.jpg"
};

/* ---- the strain vault (real Ridgeline cultivars + honest profiles) ---- */
const STRAINS = [
  { n: "Lantz",           img: "lantz-1",           t: "Hybrid", g: "Ridgeline in-house selection", f: "Grape gas · candy · funk", e: "Euphoric, heavy, deeply relaxing", potency: "Very High", award: "Zalympix — Best Tasting", feat: true,
    d: "Our signature cut and the flavor the farm is known for. Grape-candy sweetness wrapped in loud gas, finishing heavy and euphoric. Sun-grown, hand-trimmed, small-batch." },
  { n: "Green Lantern",   img: "green-lantern-bag", t: "Hybrid", g: "Undisclosed · Mendocino/Humboldt legacy", f: "Sour diesel · gas · pine", e: "Potent, hard-hitting, cerebral", potency: "35.1% THC", award: "2018 Emerald Cup — Winner", feat: true,
    d: "A truly limited boutique strain handcrafted in the hills of northern Mendocino and southern Humboldt. Extremely gassy, dominated by sour diesel with the power of the strongest kushes. Reaching 35.1% THC — its genetics remain one of the true mysteries." },
  { n: "Lamborghini OG",  img: "tall-cola",         t: "Sativa", g: "OG Kush lineage", f: "Pine · citrus · earthy gas", e: "Uplifting, euphoric, stress & pain relief",  potency: "High",
    d: "A potent, sativa-dominant hybrid with a strong gassy nose and a euphoric high. Pine, citrus and earth shine through for a classic yet distinct flavor — grown organically in full natural sunlight." },
  { n: "Whitethorn Rose", img: "purple-macro",      t: "Hybrid", g: "Ridgeline in-house selection", f: "Floral rose · sweet cream", e: "Balanced, calming, clear-headed",   potency: "High", feat: true,
    d: "Named for the valley below the farm. Delicate floral and rose notes over a sweet-cream base — smooth, balanced and unmistakably Ridgeline." },
  { n: "Ridgeline Runtz", img: "green-cola",        t: "Hybrid", g: "Zkittlez × Gelato line", f: "Fruit candy · gas", e: "Relaxed, happy, social",           potency: "High",
    d: "Fruit-candy sweetness with a gassy backbone, raised in full Humboldt sun. A crowd cut that carries the terpene punch our elevation is known for." },
  { n: "Sour Diesel",     img: "lantz-2",           t: "Sativa", g: "Chemdawg × Northern Lights", f: "Pungent fuel · citrus", e: "Energizing, uplifting, clear", potency: "High",
    d: "A legacy classic done the Ridgeline way. Pungent diesel fuel and bright citrus, clear and energizing — a daytime standard." },
  { n: "Emerald OG",      img: "nug",               t: "Indica", g: "OG Kush cut", f: "Kush · pine · earth", e: "Heavy, restful, full-body",     potency: "High",
    d: "Deep kush and pine with an earthy exhale. A heavy, restful Humboldt nightcap grown slow under the sun." },
  { n: "Papaya",          img: "canopy",            t: "Indica", g: "Citral × Ice #2", f: "Tropical stone fruit · earth", e: "Soothing, mellow, calm", potency: "Med-High",
    d: "Tropical papaya and stone-fruit sweetness with a soft earthy finish. Easygoing and mellow — sunshine in a jar." }
];

/* ---- awards / accolades (all real) ---- */
const AWARDS = [
  { yr: "2023", title: "Emerald Cup — Champion Once Again", org: "The Emerald Cup", note: "Ridgeline returns to the top at the 19th Emerald Cup." },
  { yr: "2023", title: "Best Tasting, 3rd Place — Lantz", org: "Greenwolf Zalympix", note: "Our signature Lantz places among California's most flavorful." },
  { yr: "2023", title: "Forbes Cannabis Top List — Jason Gellman", org: "Forbes", note: "Founder Jason Gellman recognized among the industry's leaders." },
  { yr: "2018", title: "Emerald Cup — Winner, Green Lantern", org: "The Emerald Cup", note: "A boutique mystery cut takes the win at 35.1% THC." }
];

/* ---- press / featured in (real outlets & headlines) ---- */
const PRESS = [
  { outlet: "LA Weekly",          quote: "The Emerald Cup was back for 2023 and Ridgeline is Champion Once Again.", by: "Jimi Devine" },
  { outlet: "Forbes",             quote: "The Emerald Cup celebrates its 2023 cannabis award winners with heart.", by: "Lindsey Bartlett" },
  { outlet: "Forbes",             quote: "Cannabis leader Jason Gellman makes the Forbes top list.", by: "Forbes" },
  { outlet: "Redheaded Blackbelt",quote: "Humboldt County cultivators take top honors at the Emerald Cup.", by: "Kym Kemp" }
];
const OUTLETS = ["Forbes","LA Weekly","The New Yorker","The Press Democrat","GreenState","Leafly","MG Magazine","Marijuana Retail Report","Direct Cannabis Network","The Emerald Cup"];

/* ---- how we grow ---- */
const GROW = [
  { k: "Sun-Grown", t: "Full sun, full term", d: "Every plant finishes under real Humboldt light — no artificial cycles, no shortcuts. The sun does what no lamp can." },
  { k: "Living Soil", t: "Natural & organic", d: "We feed living soil with natural, organic inputs and zero synthetic pesticides, chasing terpenes and clean, complete flavor." },
  { k: "Stewardship", t: "Protecting the land", d: "We farm to protect the redwoods, oak forests and the winding Eel River that surround us — quality over quantity, always." },
  { k: "Legacy", t: "Second generation", d: "Owner-operated by lifelong Southern Humboldt residents. A family farm, carrying a legacy forward one season at a time." }
];

/* ---- where to find us ---- */
const RETAILERS = [
  { n: "The Country Club",        city: "Los Angeles, CA" },
  { n: "Redwood Herbal Alliance", city: "Santa Rosa, CA" },
  { n: "Proper Wellness",         city: "Santa Rosa, CA" },
  { n: "Cornerstone Wellness",    city: "Los Angeles, CA" },
  { n: "Satori",                  city: "Santa Cruz, CA" },
  { n: "Heart of the Emerald",    city: "Humboldt County, CA" }
];

/* ---- gallery (real farm photography) ---- */
const GALLERY = [
  { img: "aerial",      cap: "The farm, high above Southern Humboldt", span: "wide" },
  { img: "sunset",      cap: "Sundown on the ridge", span: "tall" },
  { img: "founder",     cap: "Jason in the light-dep, mid-season" },
  { img: "greenhouse",  cap: "Full rows under natural light" },
  { img: "tall-cola",   cap: "A finished cola reaching for the sky", span: "tall" },
  { img: "field",       cap: "Outdoor beds beneath the redwoods", span: "wide" },
  { img: "purple-macro",cap: "Frost and color at harvest" },
  { img: "canopy",      cap: "Canopy from above" },
  { img: "green-cola",  cap: "Terpene-loaded, sun-fed flower" }
];
