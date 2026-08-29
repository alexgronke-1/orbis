# Orbis Romanus

Place the provinces of the Roman world. A Latin name appears — click the map
where it belonged; your error is scored in Roman miles. Difficulty runs from
Iudaea to the legendary edges (Thule, Bactria).

## Play

Open `index.html` in a browser. That's it — no build, no dependencies.
(Or serve the folder: `python3 -m http.server`, then open `localhost:8000`.)

## Develop

This is set up as a Claude Code project. Open the folder in Claude Code and
read `CLAUDE.md` first — it explains the architecture and, importantly, the
one rule that keeps the build from falling over: **data stays separate from
code, and you extend in small working slices rather than regenerating
everything at once.**

Quick map:
- `index.html` — the game (loads the data, renders the map, runs the loop)
- `data/places.js` — the place list; add one line per place
- `data/mapdata.js` — the coastline + rivers (generated, don't hand-edit)
- `scripts/build_map.py` — regenerates the map from Natural Earth data

## Credits

Coastline and river geometry: Natural Earth (public domain), simplified and
clipped to the Roman world.
