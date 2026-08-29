#!/usr/bin/env python3
"""
Build a compact map for the Orbis Romanus game.

Reads Natural Earth land + river GeoJSON, clips to the Roman-world bounding
box, simplifies the geometry hard (so the output stays small), and projects
everything with a plain equirectangular projection into SVG pixel coordinates.

Why equirectangular: it is exactly invertible (pixel <-> lon/lat is linear),
so the game can turn a drop point straight back into lon/lat for haversine
scoring with zero projection bookkeeping.

Output: data/mapdata.json  ->  { meta, land:[[ [x,y], ... ]], rivers:[...] }

Run:  python3 scripts/build_map.py
Re-run any time you want to change the bounding box, detail, or projection.
"""
import json, math, os, sys

try:
    from shapely.geometry import shape, box, mapping
    from shapely.ops import unary_union
except ImportError:
    sys.exit("shapely is required:  pip install shapely --break-system-packages")

# --- The Roman world, generously bounded ----------------------------------
# West: Hibernia (~ -8). East: Bactria / the eastern edge (~ 66-70).
# North: Thule / Caledonia (~ 60). South: Aegyptus / the Garamantes (~ 15).
LON_MIN, LON_MAX = -12.0, 70.0
LAT_MIN, LAT_MAX = 13.0, 60.0

# Output canvas. Height derived from the lat/lon span so the map isn't
# stretched. (Pure equirectangular squashes N-S slightly at these latitudes;
# that's fine and keeps the inverse trivial.)
WIDTH = 1600
HEIGHT = round(WIDTH * (LAT_MAX - LAT_MIN) / (LON_MAX - LON_MIN))

# Simplification tolerance in DEGREES applied before projecting. Bigger =
# smaller file, coarser coast. 0.06 keeps the Mediterranean readable while
# staying tiny. Bump toward 0.12 if you want an even smaller file.
SIMPLIFY_DEG = 0.06

# Rivers shorter than this (in projected px) are dropped as clutter.
MIN_RIVER_PX = 60

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
LAND_IN = os.environ.get("LAND_GEOJSON", "/tmp/land.geojson")
RIVERS_IN = os.environ.get("RIVERS_GEOJSON", "/tmp/rivers.geojson")
OUT = os.path.join(ROOT, "data", "mapdata.json")


def project(lon, lat):
    x = (lon - LON_MIN) / (LON_MAX - LON_MIN) * WIDTH
    y = (LAT_MAX - lat) / (LAT_MAX - LAT_MIN) * HEIGHT
    return [round(x, 1), round(y, 1)]


def rings_from_polygon(poly):
    out = []
    for ring in [poly.exterior, *poly.interiors]:
        pts = [project(x, y) for x, y in ring.coords]
        if len(pts) >= 3:
            out.append(pts)
    return out


def load(path):
    with open(path) as f:
        return json.load(f)


def main():
    clip = box(LON_MIN, LAT_MIN, LON_MAX, LAT_MAX)

    # --- Land ---
    land_fc = load(LAND_IN)
    geoms = []
    for feat in land_fc["features"]:
        g = shape(feat["geometry"]).buffer(0)  # fix any invalid rings
        g = g.intersection(clip)
        if not g.is_empty:
            geoms.append(g)
    land = unary_union(geoms).simplify(SIMPLIFY_DEG, preserve_topology=True)

    land_rings = []
    polys = list(land.geoms) if land.geom_type == "MultiPolygon" else [land]
    for poly in polys:
        if poly.is_empty:
            continue
        land_rings.extend(rings_from_polygon(poly))

    # --- Rivers ---
    river_lines = []
    try:
        riv_fc = load(RIVERS_IN)
        for feat in riv_fc["features"]:
            g = shape(feat["geometry"]).intersection(clip)
            if g.is_empty:
                continue
            g = g.simplify(SIMPLIFY_DEG, preserve_topology=False)
            lines = list(g.geoms) if g.geom_type == "MultiLineString" else [g]
            for ln in lines:
                pts = [project(x, y) for x, y in ln.coords]
                if len(pts) < 2:
                    continue
                length = sum(math.dist(pts[i], pts[i + 1]) for i in range(len(pts) - 1))
                if length >= MIN_RIVER_PX:
                    river_lines.append(pts)
    except FileNotFoundError:
        print("(no rivers file; skipping rivers)")

    data = {
        "meta": {
            "lonMin": LON_MIN, "lonMax": LON_MAX,
            "latMin": LAT_MIN, "latMax": LAT_MAX,
            "width": WIDTH, "height": HEIGHT,
            "projection": "equirectangular",
            "note": "x=(lon-lonMin)/(lonMax-lonMin)*width; "
                    "y=(latMax-lat)/(latMax-latMin)*height. Invertible.",
        },
        "land": land_rings,
        "rivers": river_lines,
    }

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    with open(OUT, "w") as f:
        json.dump(data, f, separators=(",", ":"))

    size = os.path.getsize(OUT)
    print(f"wrote {OUT}")
    print(f"  canvas      : {WIDTH} x {HEIGHT}")
    print(f"  land rings  : {len(land_rings)}")
    print(f"  river lines : {len(river_lines)}")
    print(f"  file size   : {size/1024:.1f} KB")


if __name__ == "__main__":
    main()
