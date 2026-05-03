/* =============================================
   Parcours.js — Jungfrau-Aletsch
   Carte Leaflet + liste des sentiers
   Version 4.0 — Mars 2026 (DA Light)
   ============================================= */

// ─── Données des 8 sentiers (tracés enrichis) ──────
const TRAILS_DATA = [
    {
        id: 1, name: "Boucle Aletsch Panorama", location: "Fieschertal, Valais", region: "Aletsch",
        distance: 12.4, elevation: 2200, time: "5h 30min", level: 4, difficulty: "Difficile", price: 37, priceLabel: "CHF 37 (télécabine Moosfluh)",
        description: "Randonnée exigeante offrant une vue imprenable sur le plus grand glacier des Alpes. Sentier alpin avec passages techniques le long de la moraine.",
        image: "assets/images/parcours/aletsch-panorama.jpg",
        tags: ["Glacier", "UNESCO", "Alpin"],
        gpxTrack: [
            {lat:46.4200,lng:8.0100},{lat:46.4230,lng:8.0140},{lat:46.4270,lng:8.0170},{lat:46.4310,lng:8.0210},
            {lat:46.4350,lng:8.0260},{lat:46.4390,lng:8.0310},{lat:46.4420,lng:8.0370},{lat:46.4460,lng:8.0430},
            {lat:46.4490,lng:8.0500},{lat:46.4510,lng:8.0560},{lat:46.4520,lng:8.0630},{lat:46.4510,lng:8.0700},
            {lat:46.4480,lng:8.0750},{lat:46.4440,lng:8.0780},{lat:46.4400,lng:8.0760},{lat:46.4360,lng:8.0710},
            {lat:46.4330,lng:8.0650},{lat:46.4300,lng:8.0580},{lat:46.4270,lng:8.0500},{lat:46.4240,lng:8.0420},
            {lat:46.4220,lng:8.0340},{lat:46.4210,lng:8.0260},{lat:46.4200,lng:8.0180},{lat:46.4200,lng:8.0100}
        ]
    },
    {
        id: 2, name: "Sentier des Fleurs Alpines", location: "Grindelwald, Berne", region: "Grindelwald",
        distance: 5.2, elevation: 1600, time: "2h 15min", level: 1, difficulty: "Très facile", price: 0, priceLabel: "Gratuit",
        description: "Balade familiale à travers prairies fleuries avec vue sur l'Eiger. Idéal pour une initiation douce à la montagne.",
        image: "assets/images/parcours/fleurs-alpines.jpg",
        tags: ["Flore", "Famille", "Panorama"],
        gpxTrack: [
            {lat:46.6245,lng:8.0350},{lat:46.6230,lng:8.0380},{lat:46.6215,lng:8.0410},{lat:46.6200,lng:8.0445},
            {lat:46.6185,lng:8.0475},{lat:46.6170,lng:8.0510},{lat:46.6158,lng:8.0550},{lat:46.6150,lng:8.0590},
            {lat:46.6155,lng:8.0630},{lat:46.6170,lng:8.0660},{lat:46.6190,lng:8.0640},{lat:46.6210,lng:8.0600},
            {lat:46.6225,lng:8.0560},{lat:46.6235,lng:8.0520},{lat:46.6240,lng:8.0480},{lat:46.6242,lng:8.0430},
            {lat:46.6244,lng:8.0390},{lat:46.6245,lng:8.0350}
        ]
    },
    {
        id: 3, name: "Tour du Jungfraujoch", location: "Lauterbrunnen, Berne", region: "Jungfrau",
        distance: 15.8, elevation: 3700, time: "7h 00min", level: 5, difficulty: "Expert", price: 214, priceLabel: "CHF 214 (train Jungfraubahn)",
        description: "Itinéraire alpin d'exception au pied du Jungfrau. Haute altitude, passages glaciaires. Réservé aux randonneurs confirmés.",
        image: "assets/images/parcours/jungfraujoch-trail.jpg",
        tags: ["Haute montagne", "Glacier", "Expert"],
        gpxTrack: [
            {lat:46.5365,lng:7.9614},{lat:46.5380,lng:7.9580},{lat:46.5400,lng:7.9550},{lat:46.5430,lng:7.9530},
            {lat:46.5465,lng:7.9520},{lat:46.5500,lng:7.9540},{lat:46.5530,lng:7.9570},{lat:46.5555,lng:7.9610},
            {lat:46.5575,lng:7.9655},{lat:46.5590,lng:7.9710},{lat:46.5595,lng:7.9770},{lat:46.5585,lng:7.9830},
            {lat:46.5565,lng:7.9880},{lat:46.5535,lng:7.9910},{lat:46.5500,lng:7.9920},{lat:46.5465,lng:7.9900},
            {lat:46.5435,lng:7.9860},{lat:46.5410,lng:7.9810},{lat:46.5390,lng:7.9750},{lat:46.5375,lng:7.9690},
            {lat:46.5365,lng:7.9614}
        ]
    },
    {
        id: 4, name: "Chemin de la Forêt d'Aletsch", location: "Riederalp, Valais", region: "Aletsch",
        distance: 7.6, elevation: 1800, time: "3h 00min", level: 2, difficulty: "Facile", price: 20, priceLabel: "CHF 20 (télécabine Riederalp)",
        description: "Traversée de la forêt d'Aletsch, la plus haute forêt de pins d'Arolla d'Europe. Sentier ombragé et paisible.",
        image: "assets/images/parcours/foret-aletsch.jpg",
        tags: ["Forêt", "Nature", "UNESCO"],
        gpxTrack: [
            {lat:46.3898,lng:8.0270},{lat:46.3920,lng:8.0300},{lat:46.3945,lng:8.0325},{lat:46.3975,lng:8.0350},
            {lat:46.4005,lng:8.0375},{lat:46.4035,lng:8.0405},{lat:46.4060,lng:8.0440},{lat:46.4075,lng:8.0480},
            {lat:46.4080,lng:8.0520},{lat:46.4070,lng:8.0555},{lat:46.4045,lng:8.0575},{lat:46.4015,lng:8.0560},
            {lat:46.3985,lng:8.0530},{lat:46.3955,lng:8.0490},{lat:46.3930,lng:8.0445},{lat:46.3910,lng:8.0400},
            {lat:46.3900,lng:8.0350},{lat:46.3898,lng:8.0270}
        ]
    },
    {
        id: 5, name: "Panoramaweg Schynige Platte", location: "Wilderswil, Berne", region: "Schynige Platte",
        distance: 9.3, elevation: 2100, time: "4h 00min", level: 3, difficulty: "Modéré", price: 64, priceLabel: "CHF 64 (train Schynige Platte)",
        description: "Sentier panoramique reliant la Schynige Platte au Faulhorn. Vue à 360° sur les lacs de Thoune et Brienz.",
        image: "assets/images/parcours/schynige-platte.jpg",
        tags: ["Panorama", "Lacs", "Crête"],
        gpxTrack: [
            {lat:46.6550,lng:7.9050},{lat:46.6535,lng:7.9080},{lat:46.6520,lng:7.9115},{lat:46.6505,lng:7.9150},
            {lat:46.6490,lng:7.9190},{lat:46.6475,lng:7.9230},{lat:46.6460,lng:7.9270},{lat:46.6448,lng:7.9310},
            {lat:46.6440,lng:7.9355},{lat:46.6438,lng:7.9400},{lat:46.6445,lng:7.9440},{lat:46.6460,lng:7.9465},
            {lat:46.6480,lng:7.9450},{lat:46.6500,lng:7.9420},{lat:46.6515,lng:7.9380},{lat:46.6525,lng:7.9335},
            {lat:46.6530,lng:7.9290},{lat:46.6535,lng:7.9240},{lat:46.6540,lng:7.9190},{lat:46.6545,lng:7.9130},
            {lat:46.6550,lng:7.9050}
        ]
    },
    {
        id: 6, name: "Balcon du Lötschental", location: "Blatten, Valais", region: "Lötschental",
        distance: 11.0, elevation: 2400, time: "4h 45min", level: 3, difficulty: "Modéré", price: 0, priceLabel: "Gratuit",
        description: "Sentier en balcon surplombant la vallée du Lötschental. Vues spectaculaires sur les glaciers valaisans.",
        image: "assets/images/parcours/lotschental-valley.jpg",
        tags: ["Vallée", "Culture", "Balcon"],
        gpxTrack: [
            {lat:46.4200,lng:7.8600},{lat:46.4225,lng:7.8625},{lat:46.4255,lng:7.8650},{lat:46.4280,lng:7.8680},
            {lat:46.4305,lng:7.8715},{lat:46.4330,lng:7.8750},{lat:46.4355,lng:7.8790},{lat:46.4375,lng:7.8830},
            {lat:46.4390,lng:7.8875},{lat:46.4395,lng:7.8920},{lat:46.4385,lng:7.8960},{lat:46.4365,lng:7.8985},
            {lat:46.4340,lng:7.8970},{lat:46.4310,lng:7.8940},{lat:46.4280,lng:7.8900},{lat:46.4255,lng:7.8855},
            {lat:46.4235,lng:7.8800},{lat:46.4220,lng:7.8740},{lat:46.4210,lng:7.8680},{lat:46.4200,lng:7.8600}
        ]
    },
    {
        id: 7, name: "Sentier du Lac de Bachalp", location: "Grindelwald, Berne", region: "Grindelwald",
        distance: 6.8, elevation: 2265, time: "2h 30min", level: 2, difficulty: "Facile", price: 60, priceLabel: "CHF 60 (télécabine First)",
        description: "Promenade accessible vers le célèbre lac de Bachalp au pied du Wetterhorn. Eaux turquoise inoubliables.",
        image: "assets/images/parcours/bachalpsee.jpg",
        tags: ["Lac", "Photographie", "Famille"],
        gpxTrack: [
            {lat:46.6580,lng:8.0580},{lat:46.6570,lng:8.0610},{lat:46.6555,lng:8.0635},{lat:46.6540,lng:8.0660},
            {lat:46.6520,lng:8.0690},{lat:46.6505,lng:8.0720},{lat:46.6490,lng:8.0750},{lat:46.6480,lng:8.0785},
            {lat:46.6478,lng:8.0820},{lat:46.6485,lng:8.0850},{lat:46.6500,lng:8.0860},{lat:46.6520,lng:8.0845},
            {lat:46.6535,lng:8.0815},{lat:46.6548,lng:8.0780},{lat:46.6558,lng:8.0740},{lat:46.6565,lng:8.0700},
            {lat:46.6572,lng:8.0655},{lat:46.6578,lng:8.0615},{lat:46.6580,lng:8.0580}
        ]
    },
    {
        id: 8, name: "Traversée Mürren – Gimmelwald", location: "Mürren, Berne", region: "Lauterbrunnen",
        distance: 7.0, elevation: 1650, time: "3h 15min", level: 2, difficulty: "Facile", price: 44, priceLabel: "CHF 44 (télécabine Mürren)",
        description: "Chemin pittoresque reliant deux villages sans voiture. Vue plongeante sur la vallée de Lauterbrunnen.",
        image: "assets/images/parcours/murren-village.jpg",
        tags: ["Villages", "Cascades", "Tradition"],
        gpxTrack: [
            {lat:46.5590,lng:7.8920},{lat:46.5580,lng:7.8940},{lat:46.5565,lng:7.8960},{lat:46.5548,lng:7.8978},
            {lat:46.5530,lng:7.8995},{lat:46.5510,lng:7.9015},{lat:46.5490,lng:7.9035},{lat:46.5475,lng:7.9055},
            {lat:46.5458,lng:7.9075},{lat:46.5440,lng:7.9095},{lat:46.5425,lng:7.9115},{lat:46.5415,lng:7.9135},
            {lat:46.5408,lng:7.9155}
        ]
    }
];

// ─── Couleurs difficulté ────────────────────────
const DIFFICULTY_COLORS = {
    "Très facile": "#22c55e", "Facile": "#16a34a",
    "Modéré": "#f97316", "Difficile": "#ea580c", "Expert": "#dc2626"
};
const DIFFICULTY_CLASSES = {
    "Très facile": "difficulty-very-easy", "Facile": "difficulty-easy",
    "Modéré": "difficulty-moderate", "Difficile": "difficulty-difficult", "Expert": "difficulty-expert"
};

// ─── Traductions Internes (Parcours JS) ────────
const TRAILS_DATA_EN = {
    1: { name: "Aletsch Panorama Loop", location: "Fieschertal, Valais", description: "Demanding hike offering breathtaking views of the largest glacier in the Alps. Alpine trail with technical sections along the moraine.", tags: ["Glacier", "UNESCO", "Alpine"] , priceLabel: "CHF 37 (Moosfluh cable car)" },
    2: { name: "Alpine Flowers Trail", location: "Grindelwald, Bern", description: "Family walk through flowery meadows with views of the Eiger. Ideal for a gentle introduction to the mountains.", tags: ["Flora", "Family", "Panorama"] , priceLabel: "Free" },
    3: { name: "Jungfraujoch Tour", location: "Lauterbrunnen, Bern", description: "Exceptional alpine route at the foot of the Jungfrau. High altitude, glacial passages. Reserved for experienced hikers.", tags: ["High Mountain", "Glacier", "Expert"] , priceLabel: "CHF 214 (Jungfrau Railway)" },
    4: { name: "Aletsch Forest Path", location: "Riederalp, Valais", description: "Crossing the Aletsch forest, the highest Arolla pine forest in Europe. Shaded and peaceful path.", tags: ["Forest", "Nature", "UNESCO"] , priceLabel: "CHF 20 (Riederalp cable car)" },
    5: { name: "Schynige Platte Panorama Trail", location: "Wilderswil, Bern", description: "Panoramic trail connecting Schynige Platte to the Faulhorn. 360° view of Lakes Thun and Brienz.", tags: ["Panorama", "Lakes", "Ridge"] , priceLabel: "CHF 64 (Schynige Platte railway)" },
    6: { name: "Lötschental Balcony", location: "Blatten, Valais", description: "Balcony trail overlooking the Lötschental valley. Spectacular views of the Valais glaciers.", tags: ["Valley", "Culture", "Balcony"] , priceLabel: "Free" },
    7: { name: "Bachalpsee Trail", location: "Grindelwald, Bern", description: "Accessible walk to the famous Bachalpsee at the foot of the Wetterhorn. Unforgettable turquoise waters.", tags: ["Lake", "Photography", "Family"] , priceLabel: "CHF 60 (First cable car)" },
    8: { name: "Mürren – Gimmelwald Crossing", location: "Mürren, Bern", description: "Picturesque path connecting two car-free villages. Plunging view of the Lauterbrunnen valley.", tags: ["Villages", "Waterfalls", "Tradition"] , priceLabel: "CHF 44 (Mürren cable car)" }
};

const UI_EN = {
    "Très facile": "Very easy",
    "Facile": "Easy",
    "Modéré": "Moderate",
    "Difficile": "Difficult",
    "Expert": "Expert",
    "Toutes difficultés": "All difficulties",
    "Toutes régions": "All regions",
    "Tous les prix": "All prices",
    "Gratuit": "Free",
    "Moins de CHF 30": "Under CHF 30",
    "CHF 30 – 100": "CHF 30 – 100",
    "Plus de CHF 100": "Over CHF 100",
    "Aucun sentier ne correspond à vos filtres.": "No trails match your filters.",
    "Réinitialiser les filtres": "Reset filters",
    "Difficulté": "Difficulty",
    "Tout voir": "See all"
};

function getTrailLoc(trail, field) {
    const lang = document.documentElement.lang || 'fr';
    if (lang === 'en' && TRAILS_DATA_EN[trail.id] && TRAILS_DATA_EN[trail.id][field]) {
        return TRAILS_DATA_EN[trail.id][field];
    }
    return trail[field];
}

function t_ui(str) {
    const lang = document.documentElement.lang || 'fr';
    if (lang === 'en' && UI_EN[str]) return UI_EN[str];
    return str;
}

// ─── État global ────────────────────────────────
const appState = {
    trails: TRAILS_DATA, selectedTrailId: null,
    filterDifficulty: "all", filterRegion: "all", filterPrice: "all", viewMode: "split"
};

// ─── Leaflet refs ───────────────────────────────
let leafletMap = null;
const mapLayers = { polylines: {}, markers: {} };

// ─── Utilitaires ────────────────────────────────
function getFilteredTrails() {
    return appState.trails.filter(t => {
        const d = appState.filterDifficulty === "all" || t.difficulty === appState.filterDifficulty;
        const r = appState.filterRegion === "all" || t.region === appState.filterRegion;
        let p = true;
        if (appState.filterPrice === "free")         p = t.price === 0;
        else if (appState.filterPrice === "0-30")    p = t.price > 0 && t.price <= 30;
        else if (appState.filterPrice === "30-100")  p = t.price > 0 && t.price <= 100;
        else if (appState.filterPrice === "100+")    p = t.price > 100;
        return d && r && p;
    }).sort((a, b) => a.level - b.level);
}

function getFilteredBounds() {
    const trails = getFilteredTrails();
    if (!trails.length) return null;
    return L.latLngBounds(trails.flatMap(t => t.gpxTrack.map(p => [p.lat, p.lng]))).pad(0.15);
}

// ─── Init Leaflet ───────────────────────────────
function initMap() {
    const el = document.getElementById("leaflet-map");
    if (!el || leafletMap) return;

    leafletMap = L.map("leaflet-map", {
        center: [46.52, 7.98], zoom: 11,
        zoomControl: false, attributionControl: false, scrollWheelZoom: true
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 20, subdomains: "abcd"
    }).addTo(leafletMap);

    L.control.zoom({ position: "topright" }).addTo(leafletMap);
    L.control.attribution({ position: "bottomright", prefix: false })
        .addAttribution('<a href="https://carto.com/" target="_blank" style="color:#64748b">CARTO</a> · <a href="https://www.openstreetmap.org/" target="_blank" style="color:#64748b">OSM</a>')
        .addTo(leafletMap);

    const bounds = getFilteredBounds();
    if (bounds) leafletMap.fitBounds(bounds, { padding: [30, 30] });
    renderMapTrails();
}

// ─── Rendu carte ────────────────────────────────
function clearMapLayers() {
    Object.values(mapLayers.polylines).forEach(l => leafletMap.removeLayer(l));
    Object.values(mapLayers.markers).forEach(l => leafletMap.removeLayer(l));
    mapLayers.polylines = {};
    mapLayers.markers = {};
}

function renderMapTrails() {
    if (!leafletMap) return;
    clearMapLayers();
    const trails = getFilteredTrails();

    trails.forEach(trail => {
        const color = DIFFICULTY_COLORS[trail.difficulty] || "#3b82f6";
        const isSel = trail.id === appState.selectedTrailId;
        const coords = trail.gpxTrack.map(p => [p.lat, p.lng]);

        const polyline = L.polyline(coords, {
            color, weight: isSel ? 6 : 4, opacity: isSel ? 1 : 0.8,
            smoothFactor: 1.5, lineCap: "round", lineJoin: "round"
        }).addTo(leafletMap);

        polyline.on("mouseover", function () { if (trail.id !== appState.selectedTrailId) this.setStyle({ weight: 6, opacity: 1 }); });
        polyline.on("mouseout", function () { if (trail.id !== appState.selectedTrailId) this.setStyle({ weight: 4, opacity: 0.8 }); });
        polyline.on("click", () => selectTrail(trail.id));
        mapLayers.polylines[trail.id] = polyline;

        const startPt = coords[0];
        const marker = L.circleMarker(startPt, {
            radius: isSel ? 9 : 6, fillColor: color, color: "#ffffff",
            weight: isSel ? 3 : 2, fillOpacity: isSel ? 1 : 0.9
        }).addTo(leafletMap);

        marker.bindTooltip(trail.name, { permanent: isSel, direction: "right", offset: [12, 0], className: "leaflet-trail-tooltip" });
        marker.on("click", () => selectTrail(trail.id));
        marker.on("mouseover", function () { this.openTooltip(); });
        marker.on("mouseout", function () { if (trail.id !== appState.selectedTrailId) this.closeTooltip(); });
        mapLayers.markers[trail.id] = marker;

        // Arrivée (sentiers non-boucle)
        const endPt = coords[coords.length - 1];
        if (Math.abs(startPt[0] - endPt[0]) > 0.001 || Math.abs(startPt[1] - endPt[1]) > 0.001) {
            const endM = L.circleMarker(endPt, {
                radius: isSel ? 7 : 4, fillColor: color, color: "#ffffff", weight: 2, fillOpacity: 0.8
            }).addTo(leafletMap);
            endM.bindTooltip(trail.name + " (arrivée)", { direction: "right", offset: [8, 0], className: "leaflet-trail-tooltip" });
            endM.on("click", () => selectTrail(trail.id));
            mapLayers.markers[trail.id + "_end"] = endM;
        }
    });

    const bounds = getFilteredBounds();
    if (bounds && !appState.selectedTrailId) leafletMap.fitBounds(bounds, { padding: [30, 30], animate: true });
}

function updateMapSelection() {
    if (!leafletMap) return;
    getFilteredTrails().forEach(trail => {
        const isSel = trail.id === appState.selectedTrailId;
        const pl = mapLayers.polylines[trail.id];
        if (pl) { pl.setStyle({ weight: isSel ? 6 : 4, opacity: isSel ? 1 : 0.8 }); if (isSel) pl.bringToFront(); }
        const mk = mapLayers.markers[trail.id];
        if (mk) { mk.setRadius(isSel ? 9 : 6); mk.setStyle({ weight: isSel ? 3 : 2, fillOpacity: isSel ? 1 : 0.9 }); if (isSel) { mk.openTooltip(); mk.bringToFront(); } else mk.closeTooltip(); }
        const mkE = mapLayers.markers[trail.id + "_end"];
        if (mkE) { mkE.setRadius(isSel ? 7 : 4); mkE.setStyle({ fillOpacity: isSel ? 0.9 : 0.8 }); }
    });
    if (appState.selectedTrailId) {
        const pl = mapLayers.polylines[appState.selectedTrailId];
        if (pl) leafletMap.fitBounds(pl.getBounds().pad(0.3), { animate: true, duration: 0.5 });
    } else {
        const b = getFilteredBounds();
        if (b) leafletMap.fitBounds(b, { padding: [30, 30], animate: true });
    }
}

// ─── Légende ────────────────────────────────────
function renderMapLegend() {
    const existing = document.querySelector(".map-legend-overlay");
    if (existing) existing.remove();
    const mc = document.querySelector(".map-container");
    if (!mc) return;

    const legend = document.createElement("div");
    legend.className = "map-legend-overlay";
    legend.innerHTML = `
        <div class="legend-title">${t_ui("Difficulté")}</div>
        ${Object.entries(DIFFICULTY_COLORS).map(([l, c]) =>
            `<div class="legend-row"><span class="legend-dot" style="background:${c}"></span><span class="legend-label">${t_ui(l)}</span></div>`
        ).join("")}
        <button class="legend-reset-btn" title="${t_ui("Tout voir")}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
            ${t_ui("Tout voir")}
        </button>`;
    legend.querySelector(".legend-reset-btn").addEventListener("click", () => selectTrail(null));
    mc.append(legend);
}

// ─── Liste des sentiers (DA light) ──────────────
function renderTrailsList() {
    const container = document.querySelector(".trails-list");
    if (!container) return;
    container.innerHTML = "";

    const trails = getFilteredTrails();
    if (!trails.length) {
        container.innerHTML = `
            <div class="no-results">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.3">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
                <p>${t_ui("Aucun sentier ne correspond à vos filtres.")}</p>
                <button onclick="resetFilters()" class="reset-btn">${t_ui("Réinitialiser les filtres")}</button>
            </div>`;
        return;
    }

    // Couleur icônes stats : blue-600 (#R4)
    const iconColor = "#2563eb";

    trails.forEach(trail => {
        const isSel = trail.id === appState.selectedTrailId;
        const card = document.createElement("article");
        card.className = "trail-card" + (isSel ? " selected" : "");
        card.dataset.trailId = trail.id;
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "button");
        card.setAttribute("aria-label", "Sentier : " + trail.name);

        card.innerHTML = `
            <div class="trail-image-wrapper">
                <img src="${trail.image}" alt="Photo du sentier ${getTrailLoc(trail, 'name')}" class="trail-image" loading="lazy"
                    onerror="this.onerror=null;this.src='';this.parentElement.classList.add('image-fallback');" />
                <span class="difficulty-badge ${DIFFICULTY_CLASSES[trail.difficulty] || ''}">${t_ui(trail.difficulty)}</span>
            </div>
            <div class="trail-content">
                <div class="trail-header">
                    <h3 class="trail-title">${getTrailLoc(trail, 'name')}</h3>
                    <p class="trail-location">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                        ${getTrailLoc(trail, 'location')}
                    </p>
                </div>
                <p class="trail-description">${getTrailLoc(trail, 'description')}</p>
                <div class="trail-info">
                    <div class="trail-stat">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                        ${trail.distance} km
                    </div>
                    <div class="trail-stat">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2"><path d="m8 3 4 8 5-5 2 11H2L8 3z"/></svg>
                        ${trail.elevation} m
                    </div>
                    <div class="trail-stat">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${iconColor}" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        ${trail.time}
                    </div>
                </div>
                <div class="trail-price-row" style="margin-top:0.5rem;">
                    ${trail.price === 0
                        ? '<span class="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> ' + t_ui('Gratuit') + '</span>'
                        : '<span class="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="16" cy="12" r="1.5"/></svg> ' + getTrailLoc(trail, 'priceLabel') + '</span>'
                    }
                </div>
                <div class="trail-tags">
                    ${getTrailLoc(trail, 'tags').map(t => `<span class="trail-tag">${t}</span>`).join("")}
                </div>
            </div>`;

        card.addEventListener("click", () => selectTrail(trail.id));
        card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); selectTrail(trail.id); } });
        container.append(card);
    });

    // Observer les nouvelles cards pour fade-up
    observeNewElements();
}

// ─── Stats (#3 monochrome) ──────────────────────
function updateStats() {
    const trails = getFilteredTrails();
    const totalDist = trails.reduce((s, t) => s + t.distance, 0);
    const maxEle = trails.length ? Math.max(...trails.map(t => t.elevation)) : 0;
    const regions = new Set(trails.map(t => t.region)).size;

    const set = (k, v) => { const el = document.querySelector('[data-stat="' + k + '"]'); if (el) el.innerHTML = v; };
    set("trails", trails.length);
    set("distance", totalDist.toFixed(1) + ' <span class="stat-unit">km</span>');
    set("elevation", maxEle + ' <span class="stat-unit">m</span>');
    set("regions", regions);
}

// ─── Custom pill-dropdown logic ─────────────────
/**
 * Build and wire a single custom filter dropdown.
 * @param {object} cfg
 *   wrapId     - id of the wrapper div
 *   btnId      - id of the trigger button
 *   panelId    - id of the <ul> panel
 *   labelId    - id of the <span> showing current label
 *   dotId      - id of the color dot span (null for region)
 *   items      - array of { value, label, color? }
 *   allLabel   - translated label for "all" option
 *   onSelect   - callback(value)
 */
function buildFilterDropdown(cfg) {
    const wrap  = document.getElementById(cfg.wrapId);
    const btn   = document.getElementById(cfg.btnId);
    const panel = document.getElementById(cfg.panelId);
    const labelEl = document.getElementById(cfg.labelId);
    const dotEl   = cfg.dotId ? document.getElementById(cfg.dotId) : null;
    if (!wrap || !btn || !panel) return;

    // Build option list
    panel.innerHTML = "";
    const allItems = [{ value: "all", label: cfg.allLabel, color: null }, ...cfg.items];

    allItems.forEach(item => {
        const li = document.createElement("li");
        li.className = "filter-option";
        li.setAttribute("role", "option");
        li.setAttribute("aria-selected", item.value === "all" ? "true" : "false");
        li.dataset.value = item.value;
        li.innerHTML = `
            ${item.color
                ? `<span class="filter-option-dot" style="background:${item.color}"></span>`
                : `<svg class="filter-option-dot" style="opacity:0" width="8" height="8" viewBox="0 0 8 8"></svg>`
            }
            <span>${item.label}</span>
            <svg class="filter-option-check" width="14" height="14" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"/>
            </svg>`;
        li.addEventListener("click", () => {
            selectFilterOption(cfg, item, allItems, labelEl, dotEl);
            closeDropdown(wrap, btn);
            cfg.onSelect(item.value);
        });
        panel.append(li);
    });

    // Toggle open/close
    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = wrap.classList.contains("is-open");
        closeAllDropdowns();
        if (!isOpen) {
            wrap.classList.add("is-open");
            btn.setAttribute("aria-expanded", "true");
        }
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
        if (!wrap.contains(e.target)) closeDropdown(wrap, btn);
    });

    // Keyboard: Escape closes
    btn.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeDropdown(wrap, btn);
    });
}

function selectFilterOption(cfg, item, allItems, labelEl, dotEl) {
    // Update aria-selected on all options
    const panel = document.getElementById(cfg.panelId);
    if (panel) {
        panel.querySelectorAll(".filter-option").forEach(li => {
            li.setAttribute("aria-selected", li.dataset.value === item.value ? "true" : "false");
        });
    }
    // Update button label
    if (labelEl) labelEl.textContent = item.label;
    // Update color dot
    if (dotEl) {
        if (item.color) {
            dotEl.style.background = item.color;
            dotEl.classList.remove("hidden");
        } else {
            dotEl.classList.add("hidden");
        }
    }
    // Active state on pill
    const btn = document.getElementById(cfg.btnId);
    if (btn) btn.classList.toggle("is-active", item.value !== "all");
}

function closeDropdown(wrap, btn) {
    wrap.classList.remove("is-open");
    if (btn) btn.setAttribute("aria-expanded", "false");
}

function closeAllDropdowns() {
    document.querySelectorAll(".filter-dropdown.is-open").forEach(w => {
        const b = w.querySelector(".filter-pill");
        closeDropdown(w, b);
    });
}

// ─── Filtres ────────────────────────────────────
function populateFilters() {
    const DIFFICULTY_ORDER = ["Très facile", "Facile", "Modéré", "Difficile", "Expert"];
    const diffs = [...new Set(appState.trails.map(t => t.difficulty))]
        .sort((a, b) => DIFFICULTY_ORDER.indexOf(a) - DIFFICULTY_ORDER.indexOf(b));
    const regs = [...new Set(appState.trails.map(t => t.region))].sort();

    // ── Difficulté
    buildFilterDropdown({
        wrapId: "filter-diff-wrap",
        btnId:  "filter-diff-btn",
        panelId:"filter-diff-panel",
        labelId:"filter-diff-label",
        dotId:  "filter-diff-dot",
        items: diffs.map(d => ({ value: d, label: t_ui(d), color: DIFFICULTY_COLORS[d] || null })),
        allLabel: t_ui("Toutes difficultés"),
        onSelect: (val) => {
            appState.filterDifficulty = val;
            appState.selectedTrailId = null;
            updateView();
        }
    });

    // ── Région
    buildFilterDropdown({
        wrapId: "filter-reg-wrap",
        btnId:  "filter-reg-btn",
        panelId:"filter-reg-panel",
        labelId:"filter-reg-label",
        dotId:  null,
        items: regs.map(r => ({ value: r, label: r, color: null })),
        allLabel: t_ui("Toutes régions"),
        onSelect: (val) => {
            appState.filterRegion = val;
            appState.selectedTrailId = null;
            updateView();
        }
    });

    // ── Prix
    const priceItems = [
        { value: "free",   label: t_ui("Gratuit"),         color: null },
        { value: "0-30",   label: t_ui("Moins de CHF 30"), color: null },
        { value: "30-100", label: t_ui("CHF 30 – 100"),    color: null },
        { value: "100+",   label: t_ui("Plus de CHF 100"), color: null }
    ];
    buildFilterDropdown({
        wrapId: "filter-price-wrap",
        btnId:  "filter-price-btn",
        panelId:"filter-price-panel",
        labelId:"filter-price-label",
        dotId:  null,
        items: priceItems,
        allLabel: t_ui("Tous les prix"),
        onSelect: (val) => {
            appState.filterPrice = val;
            appState.selectedTrailId = null;
            updateView();
        }
    });
}

function resetFilters() {
    appState.filterDifficulty = "all";
    appState.filterRegion = "all";
    appState.filterPrice = "all";
    appState.selectedTrailId = null;

    // Reset difficulty dropdown
    const dLabel = document.getElementById("filter-diff-label");
    const dDot   = document.getElementById("filter-diff-dot");
    const dBtn   = document.getElementById("filter-diff-btn");
    if (dLabel) dLabel.textContent = t_ui("Toutes difficultés");
    if (dDot)   dDot.classList.add("hidden");
    if (dBtn)   dBtn.classList.remove("is-active");
    const dPanel = document.getElementById("filter-diff-panel");
    if (dPanel) dPanel.querySelectorAll(".filter-option").forEach(li =>
        li.setAttribute("aria-selected", li.dataset.value === "all" ? "true" : "false"));

    // Reset region dropdown
    const rLabel = document.getElementById("filter-reg-label");
    const rBtn   = document.getElementById("filter-reg-btn");
    if (rLabel) rLabel.textContent = t_ui("Toutes régions");
    if (rBtn)   rBtn.classList.remove("is-active");
    const rPanel = document.getElementById("filter-reg-panel");
    if (rPanel) rPanel.querySelectorAll(".filter-option").forEach(li =>
        li.setAttribute("aria-selected", li.dataset.value === "all" ? "true" : "false"));

    // Reset price dropdown
    const pLabel = document.getElementById("filter-price-label");
    const pBtn   = document.getElementById("filter-price-btn");
    if (pLabel) pLabel.textContent = t_ui("Tous les prix");
    if (pBtn)   pBtn.classList.remove("is-active");
    const pPanel = document.getElementById("filter-price-panel");
    if (pPanel) pPanel.querySelectorAll(".filter-option").forEach(li =>
        li.setAttribute("aria-selected", li.dataset.value === "all" ? "true" : "false"));

    updateView();
}

// ─── Mode de vue ────────────────────────────────
function setViewMode(mode) {
    appState.viewMode = mode;
    document.querySelectorAll(".toggle-btn").forEach(b => b.classList.toggle("active", b.dataset.mode === mode));
    const mc = document.querySelector(".map-container");
    const lw = document.querySelector(".trails-list-wrapper");
    if (mc) mc.style.display = (mode === "list") ? "none" : "block";
    if (lw) lw.style.display = (mode === "map") ? "none" : "block";
    if (mode !== "list" && leafletMap) setTimeout(() => leafletMap.invalidateSize(), 120);
    try { localStorage.setItem("parcours-view-mode", mode); } catch (e) {}
}

// ─── Sélection ──────────────────────────────────
function selectTrail(id) {
    appState.selectedTrailId = (appState.selectedTrailId === id) ? null : id;
    updateMapSelection();
    renderTrailsList();
    updateStats();
    if (appState.selectedTrailId !== null) {
        const mc = document.querySelector(".map-container");
        if (mc) {
            mc.scrollIntoView({ behavior: "smooth", block: "center" });
            
            // Ajout d'un focus visuel temporaire
            mc.classList.remove("map-highlight");
            void mc.offsetWidth; // Force reflow
            mc.classList.add("map-highlight");
        }
    }
}

// ─── Mise à jour globale ────────────────────────
function updateView() { renderMapTrails(); renderTrailsList(); updateStats(); }

// ─── IntersectionObserver pour éléments dynamiques (#12) ─
function observeNewElements() {
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-up:not(.visible)').forEach(el => obs.observe(el));
}

// ─── Init ───────────────────────────────────────
function initToggleButtons() {
    document.querySelectorAll(".toggle-btn").forEach(btn => {
        btn.addEventListener("click", () => { const m = btn.dataset.mode; if (m) setViewMode(m); });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    try {
        const saved = localStorage.getItem("parcours-view-mode");
        if (saved && ["split", "list", "map"].includes(saved)) appState.viewMode = saved;
    } catch (e) {}

    populateFilters();
    initToggleButtons();
    setViewMode(appState.viewMode);
    initMap();
    renderMapLegend();
    renderTrailsList();
    updateStats();

    // Listen to language changes explicitly
    window.addEventListener('languageChanged', () => {
        // Always reset filters on lang switch (label text has changed)
        appState.filterDifficulty = "all";
        appState.filterRegion     = "all";
        appState.filterPrice      = "all";
        appState.selectedTrailId  = null;

        // Rebuild dropdowns with new language labels (clone btn to strip old listeners)
        ["filter-diff-btn", "filter-reg-btn", "filter-price-btn"].forEach(id => {
            const el = document.getElementById(id);
            if (el) { const clone = el.cloneNode(true); el.parentNode.replaceChild(clone, el); }
        });
        populateFilters();

        renderTrailsList();
        renderMapLegend();
    });
});
