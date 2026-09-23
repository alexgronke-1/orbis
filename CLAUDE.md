# Orbis Romanus — project guide

A browser game: a Latin place name from the Roman world appears, the player
places it on a map, and the guess is scored by great-circle distance (shown in
Roman miles). Difficulty runs from familiar (Iudaea, Gallia) through the edges
of the known world (Thule, Bactria).

## Read this first — why the project is structured this way

Two earlier attempts to build this in a single pass **failed**: they tried to
generate the map geometry, the game engine, the styling, and the full place
dataset all at once, which overran the output limit and produced nothing
usable. The structure here exists to prevent that. Hold to it:

1. **Data stays separate from code.** The heavy, crash-prone part is the map
   geometry. It is precomputed into `data/mapdata.js` (~41 KB) and never
   hand-authored inline. Places live in `data/places.js`, one line each.
2. **Build incrementally, and keep a working version at every step.** There is
   already a playable v1. Extend it in small, testable slices — never rewrite
   the whole thing in one go.
3. **Never regenerate `mapdata.js` by typing coordinates.** If the map needs to
   change, edit `scripts/build_map.py` and re-run it.

## File map

```
index.html            The game. Loads the two data globals, renders the map,
                      runs the place → guess → score loop. Deliberately lean.
data/mapdata.js       window.ORBIS_MAP = { meta, land[], rivers[] }. Generated.
data/mapdata.json     Same data as JSON (for tooling / re-use).
data/places.js        window.ORBIS_PLACES = [ {name,tier,lon,lat,modern,note} ]
scripts/build_map.py  Regenerates the map data from Natural Earth. See below.
```

## Regenerating the map (only if you need to)

```
pip install shapely --break-system-packages
python3 scripts/build_map.py     # rewrites data/mapdata.json
# then mirror it to the JS global the game loads:
python3 -c "import json;open('data/mapdata.js','w').write('window.ORBIS_MAP = '+json.dumps(json.load(open('data/mapdata.json')),separators=(',',':'))+';')"
```

Tunable knobs at the top of `build_map.py`: bounding box (`LON_MIN` … `LAT_MAX`),
`SIMPLIFY_DEG` (coarseness vs. file size), `WIDTH`, `MIN_RIVER_PX`.
Projection is plain **equirectangular** and exactly invertible, so pixel ↔
lon/lat is trivial — keep it that way unless you have a strong reason not to.

## Adding places

One line in `data/places.js`, no code changes:
```js
{ name:"Numidia", tier:"known", lon:6.5, lat:35.6, modern:"NE Algeria" },
```
`tier` is one of `familiar | known | obscure | edge` (also the points weight).
Add `note:"…"` for gotchas (e.g. Caucasian Iberia vs. Hispania). Coordinates
are approximate province centroids. Anything outside the map bbox won't show —
either widen the bbox and rebuild, or leave it out.

## Game format

Resolved: **one fixed test, not a mode picker.** v1/early v2 let the player
pick a "reach" (Provinces → Frontier → Whole Known World) before playing —
a cumulative tier filter that produced open-ended rounds of varying length.
That was replaced with a single format: every playthrough is a fixed
ten-question test, `buildDeck()` in `index.html`, drawn from the full place
list and guaranteed a spread of difficulty (`tier`) and kind (`kind`), with
the tier never shown during play. Score is equal-weighted per question
(distance-band credit, no tier multiplier), always out of 10, ending in a
sobriquet from `SOBRIQUETS` (Caesar down to Plebs). Don't reintroduce a
mode-selection screen — if difficulty options come back, they should shape
which fixed test gets built, not fork the game into separate modes again.

## Roadmap

- **v1 (done):** real coastline + rivers, click-to-place, haversine scoring,
  reveal/skip, round summary.
- **v2 (done):** drag-and-drop the name card. 85-place dataset (cities,
  provinces, regions). The reach-picker start screen was tried, then
  replaced — see "Game format" above.
- **v3 (polish, next):** study mode that labels everything first; a zoom for
  the packed Levant/Anatolia cluster; streak/timer; end-screen stats beyond
  the sobriquet.
- **later:** a "beyond the world" tier (India, Taprobane, Serica) — needs the
  bbox pushed east past 70°E and generous tolerance. A city-level round.

## Visual identity

Resolved: **mosaic tesserae**. The palette (`:root` in `index.html`) is drawn
from a Roman floor mosaic — near-black ink (`--ink`/`--sea`), limestone
tessera (`--paper`/`--land`), cinnabar red (`--accent`), and ochre
(`--accent2`). The signature element is the red-and-black checkerboard band
(`.tess`) under the masthead — kept to that one spot deliberately; everything
else is flat tile color, not pattern. Round markers on the map are small
diamonds (rotated squares) rather than circles, echoing the same tile
language at small scale. If this gets revisited, avoid drifting back toward
parchment/terracotta — that's the cliché this was chosen to replace.

`assets/tesserae-bg.webp` is a Midjourney-generated replica of a real
Roman guilloche/key-pattern floor mosaic, used as an ambient page texture via
`body::before` — fixed, `opacity:.06`, desaturated and darkened further with
`filter`. Deliberately near-invisible: it reads as depth on the dark chrome,
not a second pattern competing with `.tess`. If it ever needs to be more
visible, raise opacity in small steps and recheck against the `.tess` band
and text contrast rather than assuming more is better.

Display type is **Unbounded** (Google Fonts, loaded via `<link>` — the one
network dependency the game has; everything falls back to `system-ui` if it
can't load) on `h1`, `.prompt`, `.sobriquet`, and `.placard`. It replaced
plain bold `system-ui` because that, paired with the original cream
`--paper` (`#ece5d3`), read as generic AI-generated-page default rather than
a considered choice. Body copy and buttons stay on `system-ui`; the display
face is spent only on the hero text, in keeping with "boldness in one
place."

`--paper` went through two attempts before landing right: first cooled
toward grey (`#d9d3c2`) to get away from the cliché cream, but that read as
neither generic nor Roman — just muted. It's now a warm honey travertine
(`#e3d3ae`), close to `--land` on purpose (same limestone family as the map
fill, matching the actual tone in `tesserae-bg.webp`'s reference mosaic) and
warmer/more saturated than a default pale card. Warm stone is also the
traditional pairing for cinnabar red in Roman wall painting and mosaic —
grey neutrals aren't. If `--paper` gets revisited again, stay warm; the fix
for "generic" was never coolness, it was specificity.

## Running

No build step, no dependencies for the game itself. Open `index.html` directly,
or serve the folder: `python3 -m http.server` then visit `localhost:8000`.
