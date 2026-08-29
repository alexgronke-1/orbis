/*
 * Orbis Romanus — the place dataset.
 *
 * Each entry:
 *   name    Latin name shown to the player
 *   tier    "familiar" | "known" | "obscure" | "edge"  (difficulty + points)
 *   kind    "city" for a city; omitted for a province / region / land
 *   lon,lat true location (decimal degrees) — used for scoring
 *   modern  what/where it is today, revealed after a guess (for learning)
 *   note    optional gotcha / disambiguation, shown on reveal
 *
 * This is a SEED, deliberately extensible. Adding a place is one line — no
 * code changes. Region coordinates are approximate province centroids; city
 * coordinates are the real point. For the legendary "edge" lands (Thule,
 * Serica...) the ancients' own placement was vague, so the engine gives
 * edge-tier guesses a more forgiving tolerance.
 *
 * Cities are mixed straight into the normal rounds — they carry a tier like
 * anything else. The `kind:"city"` tag is only there for a future city-only
 * round / a distinct marker; the engine ignores it today.
 *
 * Ideas to extend (left for later stages):
 *   - a fifth "beyond the world" tier: India, Taprobane (Sri Lanka),
 *     Serica (China) — needs the map bbox pushed east past 70°E.
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

  // ======================================================================
  //  CITIES  — mixed into the normal rounds; tier = difficulty as usual.
  // ======================================================================

  // ---- FAMILIAR cities -------------------------------------------------
  { name: "Roma",       tier: "familiar", kind: "city", lon: 12.50, lat: 41.90, modern: "Rome, Italy" },
  { name: "Alexandria", tier: "familiar", kind: "city", lon: 29.92, lat: 31.20, modern: "Alexandria, Egypt" },
  { name: "Carthago",   tier: "familiar", kind: "city", lon: 10.32, lat: 36.85, modern: "a suburb of Tunis, Tunisia", note: "Razed in 146 BC, refounded as a Roman colony." },
  { name: "Athenae",    tier: "familiar", kind: "city", lon: 23.73, lat: 37.98, modern: "Athens, Greece" },
  { name: "Massilia",   tier: "familiar", kind: "city", lon:  5.37, lat: 43.30, modern: "Marseille, France", note: "Greek Massalia — a Phocaean colony older than Rome." },
  { name: "Byzantium",  tier: "familiar", kind: "city", lon: 28.98, lat: 41.01, modern: "Istanbul, Türkiye", note: "Refounded as Constantinople, AD 330." },
  { name: "Pompeii",    tier: "familiar", kind: "city", lon: 14.49, lat: 40.75, modern: "near Naples, Italy", note: "Buried by Vesuvius, AD 79." },
  { name: "Syracusae",  tier: "familiar", kind: "city", lon: 15.29, lat: 37.07, modern: "Siracusa, Sicily" },

  // ---- KNOWN cities --------------------------------------------------
  { name: "Lugdunum",     tier: "known", kind: "city", lon:  4.83, lat: 45.76, modern: "Lyon, France", note: "Capital of the Gauls; birthplace of Claudius." },
  { name: "Londinium",    tier: "known", kind: "city", lon: -0.09, lat: 51.51, modern: "London, England" },
  { name: "Antiochia",    tier: "known", kind: "city", lon: 36.16, lat: 36.20, modern: "Antakya, Türkiye", note: "Antioch on the Orontes — not Pisidian Antioch." },
  { name: "Ephesus",      tier: "known", kind: "city", lon: 27.34, lat: 37.94, modern: "near Selçuk, Türkiye", note: "Capital of the province of Asia." },
  { name: "Corinthus",    tier: "known", kind: "city", lon: 22.88, lat: 37.91, modern: "Corinth, Greece" },
  { name: "Gades",        tier: "known", kind: "city", lon: -6.30, lat: 36.53, modern: "Cádiz, Spain", note: "Phoenician Gadir — a foundation older than Carthage." },
  { name: "Mediolanum",   tier: "known", kind: "city", lon:  9.19, lat: 45.46, modern: "Milan, Italy", note: "An imperial capital in the west from the late 3rd c." },
  { name: "Ravenna",      tier: "known", kind: "city", lon: 12.20, lat: 44.42, modern: "Ravenna, Italy", note: "Western imperial capital from AD 402." },
  { name: "Thessalonica", tier: "known", kind: "city", lon: 22.94, lat: 40.64, modern: "Thessaloniki, Greece" },
  { name: "Hierosolyma",  tier: "known", kind: "city", lon: 35.23, lat: 31.78, modern: "Jerusalem", note: "Refounded as Aelia Capitolina after AD 135." },
  { name: "Neapolis",     tier: "known", kind: "city", lon: 14.25, lat: 40.84, modern: "Naples, Italy", note: "Greek for 'new city' — the name recurs across the empire." },

  // ---- OBSCURE cities ----------------------------------------------
  { name: "Palmyra",             tier: "obscure", kind: "city", lon: 38.28, lat: 34.56, modern: "Tadmur, Syria", note: "Caravan city; Zenobia's revolt, AD 270." },
  { name: "Leptis Magna",        tier: "obscure", kind: "city", lon: 14.29, lat: 32.64, modern: "near Al-Khums, Libya", note: "Birthplace of Septimius Severus." },
  { name: "Emerita Augusta",     tier: "obscure", kind: "city", lon: -6.34, lat: 38.92, modern: "Mérida, Spain", note: "Capital of Lusitania." },
  { name: "Colonia Agrippina",   tier: "obscure", kind: "city", lon:  6.96, lat: 50.94, modern: "Cologne, Germany" },
  { name: "Augusta Treverorum",  tier: "obscure", kind: "city", lon:  6.64, lat: 49.75, modern: "Trier, Germany", note: "A western imperial residence in late antiquity." },
  { name: "Aquincum",            tier: "obscure", kind: "city", lon: 19.05, lat: 47.57, modern: "Budapest, Hungary" },
  { name: "Tarraco",             tier: "obscure", kind: "city", lon:  1.24, lat: 41.12, modern: "Tarragona, Spain", note: "Capital of Hispania Tarraconensis." },
  { name: "Eboracum",            tier: "obscure", kind: "city", lon: -1.08, lat: 53.96, modern: "York, England", note: "Legionary base; two emperors died here." },
  { name: "Nicomedia",           tier: "obscure", kind: "city", lon: 29.92, lat: 40.77, modern: "İzmit, Türkiye", note: "Diocletian's eastern capital." },
  { name: "Pergamum",            tier: "obscure", kind: "city", lon: 27.18, lat: 39.12, modern: "Bergama, Türkiye", note: "Its library rivalled Alexandria's." },
  { name: "Vindobona",           tier: "obscure", kind: "city", lon: 16.37, lat: 48.21, modern: "Vienna, Austria" },

  // ---- EDGE cities -----------------------------------------------
  { name: "Petra",         tier: "edge", kind: "city", lon: 35.44, lat: 30.33, modern: "Jordan", note: "Nabataean capital; annexed AD 106." },
  { name: "Ctesiphon",     tier: "edge", kind: "city", lon: 44.58, lat: 33.09, modern: "near Baghdad, Iraq", note: "Parthian, then Sasanian, capital on the Tigris." },
  { name: "Volubilis",     tier: "edge", kind: "city", lon: -5.55, lat: 34.07, modern: "near Meknes, Morocco", note: "Far-western edge, in Mauretania Tingitana." },
  { name: "Dura-Europos",  tier: "edge", kind: "city", lon: 40.73, lat: 34.75, modern: "E Syria, on the Euphrates", note: "Frontier garrison — the 'Pompeii of the desert'." },
  { name: "Zeugma",        tier: "edge", kind: "city", lon: 37.86, lat: 37.06, modern: "SE Türkiye, on the Euphrates" },
  { name: "Berenice",      tier: "edge", kind: "city", lon: 35.48, lat: 23.91, modern: "Red Sea port, SE Egypt", note: "Terminus of the trade route to India." },
  { name: "Camulodunum",   tier: "edge", kind: "city", lon:  0.90, lat: 51.89, modern: "Colchester, England", note: "First capital of Roman Britain; sacked by Boudica, AD 60." },
  { name: "Vindolanda",    tier: "edge", kind: "city", lon: -2.36, lat: 55.00, modern: "fort south of Hadrian's Wall, England", note: "Source of the Vindolanda writing tablets." },
];
