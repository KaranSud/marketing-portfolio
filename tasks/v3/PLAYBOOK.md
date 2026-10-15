# portfolio-v3 playbook (read this first, every agent, every time)

## Mission
Build the next version of Karan Sud's personal brand site in `portfolio-v3/`, a copy of `portfolio-v2/` as the
starting point. Goal: a site that converts the clients Karan wants (growth / content / AI-marketing engagements,
freelance and full-time leads), feels like an intentional journey, is simple to understand, is interactive in ways
that explain the work, and does not read as AI-generated.

## Hard rules
- NEVER edit `portfolio-v2/` (it is live on Vercel from `main`). Read it freely.
- Work on branch `claude/portfolio-redesign-overhaul-8dsywo`. Never push `main`.
- Commits: author and committer Karan Sud <karansud98@gmail.com>, no Claude/Anthropic attribution lines (tasks/lessons.md).
- Copy rules: tasks/lessons.md (no em/en dashes, no AI vocab, no negative parallelism stacks, no "from X to Y" sweeps,
  no decorative triads, no participle danglers). Run `tasks/v3/workflows/copy-lint.sh portfolio-v3/app portfolio-v3/components portfolio-v3/lib`.
- Every number on the site must trace to `research/facts.md`. If a number is not there, do not use it.
- Never fabricate testimonials, logos, clients, metrics, or quotes.

## Don't repeat work: workflows first
Before doing any procedure, check `workflows/`. If you do something a second time, turn it into a script there
and add a line to the index below. Append reusable discoveries to `learnings.md` (dated, one line each).

| Workflow | Use |
|----------|-----|
| `workflows/serve.sh <appDir> <port>` | build + serve a Next app (v2 on :3200, v3 on :3300) |
| `workflows/shot.mjs <url> <outPrefix>` | desktop + mobile full-page screenshots in readable chunks. Run with `NODE_PATH=/opt/node22/lib/node_modules node`. |
| `workflows/copy-lint.sh <dirs>` | anti-AI copy sweep |
| `workflows/rubric.md` | the 10-point critic rubric |

## Environment facts (verified 2026-10-15, don't re-probe)
- WebSearch works. Direct curl to x.com, instagram.com, linkedin.com, awwwards.com, lapa.ninja, karansud.com is
  blocked by egress policy (403). api.github.com and registry.npmjs.org work. github.com HTML does not.
  raw.githubusercontent.com works for raw files. WebFetch may reach sites curl cannot; try it before giving up.
- Chromium: /opt/pw-browsers/chromium-1194/chrome-linux/chrome. Playwright at /opt/node22/lib/node_modules.
  ffmpeg: /opt/pw-browsers/ffmpeg-1011/ffmpeg-linux (playwright build: webm/vp8 ok, no h264 encoder).
- Karan cannot open localhost. Previews reach him as screenshots (SendUserFile) or published Artifacts.

## Shared outputs (write here, read before starting)
- `research/facts.md` career fact base + verification status (the only source for numbers)
- `research/positioning.md` how top content/growth/AI-marketing people position, and Karan's recommended positioning
- `research/conversion.md` what personal-brand / consultant sites convert, with evidence
- `research/tooling.md` interactive-web libraries, repos and Claude skills worth using, vetted
- `research/baseline.md` critique of live v2 with the rubric (the score to beat)
- `PLAN.md` deliverables, IA, section-by-section spec, design direction (written by the lead after research)
- `critiques/round-NN.md` critic output per round
- `STATE.md` current phase and next step (lead updates)
