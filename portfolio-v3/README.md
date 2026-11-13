# Karan Sud, Portfolio (V2)

Personal portfolio for Karan Sud, content & growth strategist. Dark, motion-led
single-page site built as a custom Next.js app and deployed on Vercel.

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript + Tailwind CSS 4
- Framer Motion (reveals, parallax, animated case modals)
- Lenis (smooth scroll)
- Canvas aurora background

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure

- `app/`, routes, layout, metadata, robots, sitemap, OG image
- `components/`, UI (Hero, Work, case modal, Brands marquee, etc.)
- `lib/`, typed case-study + FAQ data

## SEO / AEO / GEO

Metadata, JSON-LD entity graph (Person / ProfilePage / ItemList / FAQPage),
`robots.txt` (AI crawlers welcomed), `sitemap.xml`, `llms.txt`, dynamic OG image.

The previous static site is archived in `../portfolio v1`.

## Deploy

Auto-deployed to Vercel on push to `main` (root directory: `portfolio-v2`).
