/*
 * Orbis Romanus — the place dataset.
 *
 * Each entry:
 *   name    Latin name shown to the player
 *   tier    "familiar" | "known" | "obscure" | "edge"  (difficulty + points)
 *   kind    "city" | "province" | "region"
 *             province = a formally organized Roman provincia
 *             region   = a geographic/ethnic name Rome used but never (or only
 *                        briefly) organized as a single province — a broad
 *                        area spanning several provinces (Gallia, Hispania),
 *                        a client kingdom (Osroene, Colchis), or land outside
 *                        Roman control entirely (Hibernia, Parthia, Thule)
 *   lon,lat true location (decimal degrees) — used for scoring
 *   modern  what/where it is today, revealed after a guess (for learning)
 *   note    optional gotcha / disambiguation, shown on reveal
 *
 * This is a SEED, deliberately extensible. Adding a place is one line — no
 * code changes. Region coordinates are approximate centroids; city
 * coordinates are the real point. For the legendary "edge" lands (Thule,
 * Serica...) the ancients' own placement was vague, so the engine gives
 * edge-tier guesses a more forgiving tolerance.
 *
 * `kind` is used by The Trial (a fixed 10-question test) to draw a mix of
 * cities, provinces, and regions rather than picking blind.
 *
 * Ideas to extend (left for later stages):
 *   - a fifth "beyond the world" tier: India, Taprobane (Sri Lanka),
 *     Serica (China) — needs the map bbox pushed east past 70°E.
 */
window.ORBIS_PLACES = [
  // ---- FAMILIAR ----------------------------------------------------------
  { name: "Italia",     tier: "familiar", kind: "region",   lon: 12.5, lat: 42.5, modern: "Italy", note: "The homeland itself — not a provincia until Diocletian." },
  { name: "Graecia",    tier: "familiar", kind: "region",   lon: 22.0, lat: 39.2, modern: "Greece", note: "The Roman province here was Achaea; 'Graecia' is the geographic name." },
  { name: "Aegyptus",   tier: "familiar", kind: "province", lon: 30.8, lat: 27.0, modern: "Egypt (Nile valley)" },
  { name: "Iudaea",     tier: "familiar", kind: "province", lon: 35.2, lat: 31.6, modern: "Israel / Palestine" },
  { name: "Gallia",     tier: "familiar", kind: "region",   lon:  2.6, lat: 47.0, modern: "France", note: "Spans several provinces — Lugdunensis, Belgica, Aquitania, Narbonensis." },
  { name: "Hispania",   tier: "familiar", kind: "region",   lon: -4.0, lat: 40.0, modern: "Spain & Portugal", note: "Spans several provinces — Tarraconensis, Baetica, Lusitania." },
  { name: "Britannia",  tier: "familiar", kind: "province", lon: -1.6, lat: 52.2, modern: "England & Wales" },
  { name: "Sicilia",    tier: "familiar", kind: "province", lon: 14.1, lat: 37.5, modern: "Sicily", note: "Rome's first province, 241 BC." },
  { name: "Syria",      tier: "familiar", kind: "province", lon: 37.0, lat: 35.2, modern: "Syria" },
  { name: "Creta",      tier: "familiar", kind: "province", lon: 24.9, lat: 35.2, modern: "Crete", note: "Joined with Cyrenaica as one province." },

  // ---- KNOWN -------------------------------------------------------------
  { name: "Pannonia",   tier: "known", kind: "province", lon: 18.5, lat: 46.2, modern: "W Hungary / E Austria" },
  { name: "Dacia",      tier: "known", kind: "province", lon: 24.2, lat: 46.2, modern: "Romania" },
  { name: "Cappadocia", tier: "known", kind: "province", lon: 35.5, lat: 38.7, modern: "Central Turkey" },
  { name: "Numidia",    tier: "known", kind: "province", lon:  6.5, lat: 35.6, modern: "NE Algeria" },
  { name: "Lusitania",  tier: "known", kind: "province", lon: -8.0, lat: 39.6, modern: "Portugal" },
  { name: "Thracia",    tier: "known", kind: "province", lon: 26.0, lat: 42.0, modern: "SE Bulgaria / Türkiye" },
  { name: "Galatia",    tier: "known", kind: "province", lon: 33.0, lat: 39.5, modern: "Central Anatolia" },
  { name: "Cyrenaica",  tier: "known", kind: "province", lon: 22.0, lat: 32.2, modern: "E Libya" },
  { name: "Mesopotamia",tier: "known", kind: "province", lon: 40.5, lat: 35.0, modern: "N Iraq / SE Türkiye", note: "Held only briefly, under Trajan and Septimius Severus." },
  { name: "Baetica",    tier: "known", kind: "province", lon: -5.0, lat: 37.5, modern: "Andalusia, Spain" },
  { name: "Cilicia",    tier: "known", kind: "province", lon: 34.0, lat: 37.0, modern: "S coast of Türkiye" },
  { name: "Arabia",     tier: "known", kind: "province", lon: 36.0, lat: 30.3, modern: "Jordan (Nabataea)", note: "Provincia Arabia Petraea — not the whole peninsula." },

  // ---- OBSCURE -----------------------------------------------------------
  { name: "Noricum",    tier: "obscure", kind: "province", lon: 14.0, lat: 47.2, modern: "Austria / Slovenia" },
  { name: "Raetia",     tier: "obscure", kind: "province", lon: 10.5, lat: 47.2, modern: "Switzerland / Tyrol" },
  { name: "Moesia",     tier: "obscure", kind: "province", lon: 23.0, lat: 43.6, modern: "Serbia / N Bulgaria" },
  { name: "Dalmatia",   tier: "obscure", kind: "province", lon: 17.2, lat: 43.8, modern: "Croatian coast" },
  { name: "Commagene",  tier: "obscure", kind: "region",   lon: 38.0, lat: 37.5, modern: "SE Türkiye", note: "A client kingdom, absorbed into Syria rather than run as its own province." },
  { name: "Colchis",    tier: "obscure", kind: "region",   lon: 42.0, lat: 42.3, modern: "W Georgia", note: "Client kingdom (Lazica) — never a formal Roman province." },
  { name: "Taurica",    tier: "obscure", kind: "region",   lon: 34.2, lat: 45.2, modern: "Crimea", note: "The Bosporan Kingdom — a client state, not annexed." },
  { name: "Pontus",     tier: "obscure", kind: "province", lon: 37.0, lat: 41.0, modern: "N Türkiye, Black Sea coast", note: "Joined with Bithynia as one province." },
  { name: "Lycia",      tier: "obscure", kind: "province", lon: 29.6, lat: 36.4, modern: "SW Türkiye", note: "Joined with Pamphylia as one province." },
  { name: "Osroene",    tier: "obscure", kind: "region",   lon: 39.0, lat: 37.1, modern: "Şanlıurfa region, Türkiye", note: "A client kingdom (Edessa) for most of its history." },
  { name: "Assyria",    tier: "obscure", kind: "region",   lon: 43.0, lat: 36.2, modern: "N Iraq", note: "Declared a province under Trajan but abandoned almost at once." },
  { name: "Iberia",     tier: "obscure", kind: "region",   lon: 44.5, lat: 41.9, modern: "E Georgia (Caucasus)", note: "The Caucasian Iberia — NOT Hispania. A client kingdom, never annexed." },
  { name: "Asia",       tier: "obscure", kind: "province", lon: 28.0, lat: 38.5, modern: "W Anatolia (province)", note: "The Roman province, not the continent." },

  // ---- THE EDGE ----------------------------------------------------------
  { name: "Hibernia",   tier: "edge", kind: "region", lon: -8.0, lat: 53.3, modern: "Ireland", note: "Never invaded by Rome." },
  { name: "Caledonia",  tier: "edge", kind: "region", lon: -4.5, lat: 57.0, modern: "Scotland", note: "Raided and walled off, never conquered." },
  { name: "Thule",      tier: "edge", kind: "region", lon: -6.0, lat: 59.3, modern: "Legendary far north (Iceland? Norway? Shetland?)", note: "Placement was vague even to Rome — generous tolerance." },
  { name: "Garamantia", tier: "edge", kind: "region", lon: 13.0, lat: 26.5, modern: "Fezzan, S Libya (Sahara)", note: "A Saharan kingdom Rome raided but never held." },
  { name: "Aethiopia",  tier: "edge", kind: "region", lon: 31.5, lat: 18.5, modern: "Nubia / Sudan", note: "Beyond the southern frontier at Aegyptus." },
  { name: "Sarmatia",   tier: "edge", kind: "region", lon: 40.0, lat: 49.5, modern: "Pontic–Caspian steppe", note: "Nomadic peoples, never Roman territory." },
  { name: "Albania",    tier: "edge", kind: "region", lon: 47.5, lat: 40.7, modern: "Azerbaijan (Caucasian Albania)", note: "Nothing to do with modern Albania. A client kingdom, not annexed." },
  { name: "Hyrcania",   tier: "edge", kind: "region", lon: 54.0, lat: 37.0, modern: "SE Caspian shore, Iran", note: "Beyond Roman control — within the Parthian, then Sasanian, orbit." },
  { name: "Parthia",    tier: "edge", kind: "region", lon: 52.0, lat: 33.5, modern: "Iran (Parthian heartland)", note: "Rome's great rival empire, never conquered." },
  { name: "Gedrosia",   tier: "edge", kind: "region", lon: 63.0, lat: 27.0, modern: "Baluchistan (Pakistan/Iran)", note: "Known to Rome mainly from Alexander's disastrous march through it." },
  { name: "Bactria",    tier: "edge", kind: "region", lon: 66.5, lat: 37.0, modern: "N Afghanistan", note: "Far beyond the frontier, on the Silk Road." },
  { name: "Sogdiana",   tier: "edge", kind: "region", lon: 66.5, lat: 39.6, modern: "Uzbekistan (Samarkand)", note: "The edge of the known world for Rome." },

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
