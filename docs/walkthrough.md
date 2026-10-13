# A pairing walkthrough

Load the example palette and select the AA normal text target.

The muted text token (#888888) on paper (#FAF8F2) has about 3.338:1 contrast,
below the 4.5:1 target. Pairshade offers ink and brand as existing alternatives.

Choose brand. Its ratio on paper is about 7.183:1 and meets the selected target.
The token values remain unchanged; only the selected pairing changes.

The matrix contains 36 ordered pairs for six tokens. Download the JSON audit to
retain all ratios and AA/AAA threshold results. Compare it with
[examples/audit.json](../examples/audit.json). The palette's CSS custom properties
are in [examples/tokens.css](../examples/tokens.css).

Switch to AA large text and check muted on paper again: it meets the 3:1
contrast threshold, but you still need to verify the actual text is large enough.
Changing the target changes the matrix decisions; it does not change the colors.

A same-color pairing has 1:1 contrast. Selecting such a matrix cell shows the
failing preview so you can inspect the choice.
