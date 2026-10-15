# How to add case-study media

Every brand folder here is scanned automatically at build time. Drop files in,
rebuild (or redeploy), and they appear inside that brand's case-study modal.
No code changes needed.

## Folder layout

```
public/Results/<Brand>/
  creatives/        → "Creatives" gallery in the modal
  before-after/     → "Before and after" section in the modal
  *.png             → analytics screenshots ("Proof" section, listed in code)
```

Brand folder → case study mapping lives in `lib/caseStudies.ts` (`mediaDir`):

| Folder | Case study |
|---|---|
| FanTV | FanTV AI |
| Prashan | Prashan Agarwal |
| Fere AI | Fere AI |
| Novaswap | Novaswap |
| Defx | Defx |
| BimaBTC | BimaBTC |
| Tony Roma's | Tony Roma's |
| Mohaimina Haque | Mohaimina Haque |
| Potters' Hub | Potters' Hub |
| B&B | Bones & Burgers |
| Opaque Studio | Opaque Studio |
| Sportsrush | The Sportrush |

## 1. Creatives (graphics + videos)

Drop images or videos into `<Brand>/creatives/`. Supported:
`.png .jpg .jpeg .webp .gif .avif` and `.mp4 .webm .mov`.

Files show in name order, so prefix with a number to control it:

```
Fere AI/creatives/1-launch-thread.png
Fere AI/creatives/2-product-demo.mp4
Fere AI/creatives/3-data-drop.png
```

Videos get player controls and stay muted until played. Keep videos under
~20MB each so the page stays fast (compress at handbrake.fr if needed).

## 2. Before and after (feed transformations)

Drop paired files into `<Brand>/before-after/`, named `<n>-before` and
`<n>-after` with the same `n`:

```
Tony Roma's/before-after/1-before.png   ← feed before
Tony Roma's/before-after/1-after.png    ← feed after
Tony Roma's/before-after/2-before.png   ← second pair
Tony Roma's/before-after/2-after.png
```

Only complete pairs show. A `1-before.png` without a `1-after.png` is ignored.

## 3. Adding a new client

1. Create the folder: `public/Results/<New Brand>/` with `creatives/` and
   `before-after/` inside.
2. Add the brand logo to `public/Logos/`.
3. Send me (or add to `lib/caseStudies.ts`) the case details: tag, title,
   one-line description, 3 card metrics, role, timeline, channels, stats,
   situation, strategy, execution bullets, results bullets. I'll wire the
   entry and set `mediaDir` to the folder name.

For current or ongoing work, use "Mmm YYYY to Present" as the timeline —
Fere AI and Novaswap are the pattern to copy.

## Notes

- The FanTV `creatives/` and `before-after/` files currently in here are
  placeholders (copies of existing screenshots) so the layout can be
  previewed. Replace them with real creatives.
- Filenames become URLs; spaces are fine but simple names are safer.
