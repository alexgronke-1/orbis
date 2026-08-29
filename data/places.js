/*
 * Orbis Romanus — the place dataset.
 *
 * Each entry:
 *   name    Latin name shown to the player
 *   tier    "familiar" | "known" | "obscure" | "edge"  (difficulty + points)
 *   lon,lat true location (decimal degrees) — used for scoring
 *   modern  what/where it is today, revealed after a guess (for learning)
 *   note    optional gotcha / disambiguation, shown on reveal
 *
 * This is a SEED, deliberately extensible. Adding a place is one line — no
 * code changes. Coordinates are approximate province centroids; for the
 * legendary "edge" lands (Thule, Serica...) the ancients' own placement was
 * vague, so the engine gives edge-tier guesses a more forgiving tolerance.
 *
 * Ideas to extend (left for later stages):
 *   - a fifth "beyond the world" tier: India, Taprobane (Sri Lanka),
 *     Serica (China) — needs the map bbox pushed east past 70°E.
 *   - city-level round: Roma, Alexandria, Byzantium, Carthago, Lugdunum...
 */
window.ORBIS_PLACES = [
  // ---- FAMILIAR ----------------------------------------------------------
  { name: "Italia",     tier: "familiar", lon: 12.5, lat: 42.5, modern: "Italy" },
  { name: "Graecia",    tier: "familiar", lon: 22.0, lat: 39.2, modern: "Greece" },
  { name: "Aegyptus",   tier: "familiar", lon: 30.8, lat: 27.0, modern: "Egypt (Nile valley)" },
  { name: "Iudaea",     tier: "familiar", lon: 35.2, lat: 31.6, modern: "Israel / Palestine" },
  { name: "Gallia",     tier: "familiar", lon:  2.6, lat: 47.0, modern: "France" },
  { name: "Hispania",   tier: "familiar", lon: -4.0, lat: 40.0, modern: "Spain & Portugal" },
  { name: "Britannia",  tier: "familiar", lon: -1.6, lat: 52.2, modern: "England & Wales" },
  { name: "Sicilia",    tier: "familiar", lon: 14.1, lat: 37.5, modern: "Sicily" },
  { name: "Syria",      tier: "familiar", lon: 37.0, lat: 35.2, modern: "Syria" },
  { name: "Creta",      tier: "familiar", lon: 24.9, lat: 35.2, modern: "Crete" },

  // ---- KNOWN -------------------------------------------------------------
  { name: "Pannonia",   tier: "known", lon: 18.5, lat: 46.2, modern: "W Hungary / E Austria" },
  { name: "Dacia",      tier: "known", lon: 24.2, lat: 46.2, modern: "Romania" },
  { name: "Cappadocia", tier: "known", lon: 35.5, lat: 38.7, modern: "Central Turkey" },
  { name: "Numidia",    tier: "known", lon:  6.5, lat: 35.6, modern: "NE Algeria" },
  { name: "Lusitania",  tier: "known", lon: -8.0, lat: 39.6, modern: "Portugal" },
  { name: "Thracia",    tier: "known", lon: 26.0, lat: 42.0, modern: "SE Bulgaria / Türkiye" },
  { name: "Galatia",    tier: "known", lon: 33.0, lat: 39.5, modern: "Central Anatolia" },
  { name: "Cyrenaica",  tier: "known", lon: 22.0, lat: 32.2, modern: "E Libya" },
  { name: "Mesopotamia",tier: "known", lon: 40.5, lat: 35.0, modern: "N Iraq / SE Türkiye" },
  { name: "Baetica",    tier: "known", lon: -5.0, lat: 37.5, modern: "Andalusia, Spain" },
  { name: "Cilicia",    tier: "known", lon: 34.0, lat: 37.0, modern: "S coast of Türkiye" },
  { name: "Arabia",     tier: "known", lon: 36.0, lat: 30.3, modern: "Jordan (Nabataea)", note: "Provincia Arabia Petraea — not the whole peninsula." },

  // ---- OBSCURE -----------------------------------------------------------
  { name: "Noricum",    tier: "obscure", lon: 14.0, lat: 47.2, modern: "Austria / Slovenia" },
  { name: "Raetia",     tier: "obscure", lon: 10.5, lat: 47.2, modern: "Switzerland / Tyrol" },
  { name: "Moesia",     tier: "obscure", lon: 23.0, lat: 43.6, modern: "Serbia / N Bulgaria" },
  { name: "Dalmatia",   tier: "obscure", lon: 17.2, lat: 43.8, modern: "Croatian coast" },
  { name: "Commagene",  tier: "obscure", lon: 38.0, lat: 37.5, modern: "SE Türkiye" },
  { name: "Colchis",    tier: "obscure", lon: 42.0, lat: 42.3, modern: "W Georgia" },
  { name: "Taurica",    tier: "obscure", lon: 34.2, lat: 45.2, modern: "Crimea" },
  { name: "Pontus",     tier: "obscure", lon: 37.0, lat: 41.0, modern: "N Türkiye, Black Sea coast" },
  { name: "Lycia",      tier: "obscure", lon: 29.6, lat: 36.4, modern: "SW Türkiye" },
  { name: "Osroene",    tier: "obscure", lon: 39.0, lat: 37.1, modern: "Şanlıurfa region, Türkiye" },
  { name: "Assyria",    tier: "obscure", lon: 43.0, lat: 36.2, modern: "N Iraq" },
  { name: "Iberia",     tier: "obscure", lon: 44.5, lat: 41.9, modern: "E Georgia (Caucasus)", note: "The Caucasian Iberia — NOT Hispania." },
  { name: "Asia",       tier: "obscure", lon: 28.0, lat: 38.5, modern: "W Anatolia (province)", note: "The Roman province, not the continent." },

  // ---- THE EDGE ----------------------------------------------------------
  { name: "Hibernia",   tier: "edge", lon: -8.0, lat: 53.3, modern: "Ireland" },
  { name: "Caledonia",  tier: "edge", lon: -4.5, lat: 57.0, modern: "Scotland" },
  { name: "Thule",      tier: "edge", lon: -6.0, lat: 59.3, modern: "Legendary far north (Iceland? Norway? Shetland?)", note: "Placement was vague even to Rome — generous tolerance." },
  { name: "Garamantia", tier: "edge", lon: 13.0, lat: 26.5, modern: "Fezzan, S Libya (Sahara)" },
  { name: "Aethiopia",  tier: "edge", lon: 31.5, lat: 18.5, modern: "Nubia / Sudan" },
  { name: "Sarmatia",   tier: "edge", lon: 40.0, lat: 49.5, modern: "Pontic–Caspian steppe" },
  { name: "Albania",    tier: "edge", lon: 47.5, lat: 40.7, modern: "Azerbaijan (Caucasian Albania)", note: "Nothing to do with modern Albania." },
  { name: "Hyrcania",   tier: "edge", lon: 54.0, lat: 37.0, modern: "SE Caspian shore, Iran" },
  { name: "Parthia",    tier: "edge", lon: 52.0, lat: 33.5, modern: "Iran (Parthian heartland)" },
  { name: "Gedrosia",   tier: "edge", lon: 63.0, lat: 27.0, modern: "Baluchistan (Pakistan/Iran)" },
  { name: "Bactria",    tier: "edge", lon: 66.5, lat: 37.0, modern: "N Afghanistan" },
  { name: "Sogdiana",   tier: "edge", lon: 66.5, lat: 39.6, modern: "Uzbekistan (Samarkand)" },
];
