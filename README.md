# Pairshade

Put your palette to work.

**[Open Pairshade](https://pairshade.vercel.app/)**

Pairshade is a browser-local workbench for named color tokens. Audit every text/surface combination, preview a pairing, and find passing alternatives already in your palette.

## Features

- A named palette editor for 2–16 opaque hex colors.
- A selectable contrast matrix with an explicit PASS or FAIL in every cell.
- Foreground/surface previews and AA normal, AA large, or AAA normal targets.
- Alternative foreground suggestions using existing tokens only.
- CSS custom-property export and a JSON report with full-precision ratios.
- No account, dependencies, analytics, network processing, or saved palettes.

## Quick start

Load the example or paste a palette:

~~~text
ink: #182A36
paper: #FAF8F2
brand: #235D50
mint: #D6EBDC
muted: #888888
white: #FFFFFF
~~~

Choose **Audit palette**, then select a text token, surface token, and target. Select a suggested token or any matrix cell to preview it. Download CSS for your palette or JSON for the full audit.

Names start with a letter and contain only letters, digits, or hyphens (up to 32 characters). Names are case-insensitive; duplicate names are rejected. Colors accept #RGB or #RRGGBB and are exported as uppercase six-digit hex. Editing input hides old results until you audit again.

## Run locally

Requires Node.js 20 or newer. No install step.

~~~sh
npm test
npm run build
npm run dev
~~~

Open http://127.0.0.1:4176. Static output is in dist/. The repository includes Vercel build configuration.

## How it measures

The [WCAG 2.x sRGB relative luminance formula](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) calculates the lighter/darker ratio. AA normal text needs at least 4.5:1, AA large text 3:1, and AAA normal text 7:1.

Pass/fail uses the unrounded ratio. On-screen ratios are rounded for readability; the JSON report retains calculation precision. Large text means at least 24 CSS px, or approximately 18.67 px bold. Selecting a large-text target does not verify your actual font size.

## Limits

This evaluates contrast for opaque, solid sRGB colors only. It does not support alpha colors, gradients, images, APCA, automatic color generation, or Figma imports. It does not examine your actual website, certify accessibility, or check every WCAG requirement. The preview intentionally renders selected colors, even when they fail. Review real typography and interaction states separately.

The JSON report includes every ordered pair, including a token against itself; a self-pair has ratio 1:1. Duplicate color values with different token names remain separate. Suggestions are ranked by contrast, not by visual similarity or semantic suitability.

## Project layout

- src/color.mjs: color normalization, luminance, ratios, thresholds.
- src/palette.mjs: palette validation, alternatives, CSS and JSON exports.
- public/: responsive browser interface.
- test/: reference-value, threshold-boundary, validation, and export checks.
- examples/palette.txt: editable sample palette.

