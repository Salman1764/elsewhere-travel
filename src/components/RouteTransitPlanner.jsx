import { useState, useEffect, useRef, useMemo } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Plane,
  Train,
  Bus,
  Car,
  Navigation,
  Sparkles,
  Leaf,
  Clock,
  DollarSign,
  MapPin,
  Route as RouteIcon,
  ShieldCheck,
  ChevronRight,
  Footprints,
  Bike,
  Landmark,
  Compass,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cityCoordinatesMap, cityLandmarksMap, worldCities } from "../data/worldCountries";
import destinations from "../data/destinations";

// Haversine Distance in Kilometers
function calculateHaversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

// Coordinate Resolver for Any City / Town / Place
function resolveCityCoords(cityName) {
  if (!cityName) return { lat: 12.9716, lon: 77.5946, name: "Bengaluru" };

  const clean = cityName.trim().toLowerCase();

  // Check cityCoordinatesMap (includes all Karnataka & Indian cities)
  if (cityCoordinatesMap[clean]) {
    return {
      lat: cityCoordinatesMap[clean].lat,
      lon: cityCoordinatesMap[clean].lon,
      name: cityName,
    };
  }

  // Check partial key matches in cityCoordinatesMap
  for (const [key, value] of Object.entries(cityCoordinatesMap)) {
    if (clean.includes(key) || key.includes(clean)) {
      return { lat: value.lat, lon: value.lon, name: cityName };
    }
  }

  // Check worldCities
  const worldCity = worldCities.find(
    (c) => c.name.toLowerCase() === clean || c.id === clean
  );
  if (worldCity?.coordinates) {
    return { ...worldCity.coordinates, name: worldCity.name };
  }

  // Check destinations
  const dest = destinations.find(
    (d) => d.name.toLowerCase() === clean || d.id === clean
  );
  if (dest?.coordinates) {
    return { ...dest.coordinates, name: dest.name };
  }

  // Fallback defaults
  if (clean.includes("mysore") || clean.includes("mysuru")) return { lat: 12.2958, lon: 76.6394, name: "Mysuru" };
  if (clean.includes("chitradurga")) return { lat: 14.2251, lon: 76.398, name: "Chitradurga" };
  if (clean.includes("hampi")) return { lat: 15.335, lon: 76.46, name: "Hampi" };
  if (clean.includes("mumbai")) return { lat: 19.076, lon: 72.8777, name: "Mumbai" };
  if (clean.includes("delhi")) return { lat: 28.6139, lon: 77.209, name: "Delhi" };
  if (clean.includes("bengaluru") || clean.includes("bangalore")) return { lat: 12.9716, lon: 77.5946, name: "Bengaluru" };
  if (clean.includes("kyoto")) return { lat: 35.0116, lon: 135.7681, name: "Kyoto" };
  if (clean.includes("paris")) return { lat: 48.8566, lon: 2.3522, name: "Paris" };

  return { lat: 12.9716, lon: 77.5946, name: cityName };
}

const TRANSIT_CURRENCIES = {
  INR: { symbol: "₹", rate: 94.97 },
  USD: { symbol: "$", rate: 1.0 },
  EUR: { symbol: "€", rate: 0.86 },
  GBP: { symbol: "£", rate: 0.74 },
};

function RouteTransitPlanner({ originName = "Bengaluru", destinationName = "Mumbai" }) {
  const [geoOrigin, setGeoOrigin] = useState(() => resolveCityCoords(originName));
  const [geoDest, setGeoDest] = useState(() => resolveCityCoords(destinationName));

  // Update when props change or perform geocoding
  useEffect(() => {
    const orig = resolveCityCoords(originName);
    const dst = resolveCityCoords(destinationName);
    setGeoOrigin(orig);
    setGeoDest(dst);

    // If destination name was not directly in map, attempt fast OpenStreetMap geocode
    const cleanDst = destinationName.trim().toLowerCase();
    if (!cityCoordinatesMap[cleanDst]) {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destinationName)}&limit=1`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.length > 0) {
            setGeoDest({
              lat: parseFloat(data[0].lat),
              lon: parseFloat(data[0].lon),
              name: destinationName,
            });
          }
        })
        .catch(() => {});
    }
  }, [originName, destinationName]);

  const origin = geoOrigin;
  const dest = geoDest;

  const distanceKm = useMemo(() => {
    return calculateHaversineKm(origin.lat, origin.lon, dest.lat, dest.lon);
  }, [origin, dest]);

  // Check if traveler is in the same city (< 35 km or matching city names)
  const isSameCity = useMemo(() => {
    const oName = (origin.name || "").toLowerCase().trim();
    const dName = (dest.name || "").toLowerCase().trim();
    return oName.includes(dName) || dName.includes(oName) || distanceKm <= 35;
  }, [origin.name, dest.name, distanceKm]);

  // Check if regional / intra-state trip (35 km to 380 km, like Bangalore to Mysuru or Chitradurga)
  const isIntraState = useMemo(() => {
    return !isSameCity && distanceKm <= 380;
  }, [isSameCity, distanceKm]);

  // Default active tab based on context
  const [activeMode, setActiveMode] = useState(() => {
    if (isSameCity) return "metro";
    if (isIntraState) return "train";
    return "flight";
  });

  // Sync mode when city changes
  useEffect(() => {
    if (isSameCity) {
      setActiveMode("metro");
    } else if (isIntraState) {
      setActiveMode("train");
    } else {
      setActiveMode("flight");
    }
  }, [isSameCity, isIntraState]);

  const [transitCurrency, setTransitCurrency] = useState("INR");
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const routeLineRef = useRef(null);
  const markersRef = useRef([]);

  const curr = TRANSIT_CURRENCIES[transitCurrency] || TRANSIT_CURRENCIES.INR;

  // Retrieve famous landmarks for same-city circuit
  const cityLandmarks = useMemo(() => {
    const cleanDest = (dest.name || "").toLowerCase().trim();
    for (const [key, places] of Object.entries(cityLandmarksMap)) {
      if (cleanDest.includes(key) || key.includes(cleanDest)) {
        return places;
      }
    }
    // Fallback: generate local sightseeing points around city center
    return [
      { name: `${dest.name} Historic City Center & Palace`, lat: dest.lat + 0.015, lon: dest.lon - 0.01, type: "Heritage Landmark" },
      { name: `${dest.name} Central Botanical Gardens`, lat: dest.lat - 0.018, lon: dest.lon + 0.012, type: "Scenic Garden" },
      { name: `${dest.name} Cultural Monument & Museum`, lat: dest.lat + 0.008, lon: dest.lon + 0.02, type: "Arts & Culture" },
      { name: `${dest.name} Panoramic Sunset Viewpoint`, lat: dest.lat - 0.012, lon: dest.lon - 0.015, type: "Scenic Viewpoint" },
    ];
  }, [dest]);

  // Generate multi-modal travel options dynamically
  const transitOptions = useMemo(() => {
    if (isSameCity) {
      // Intra-City Local Sightseeing Options
      const metroCostInr = 40;
      const cabCostInr = 220;
      const busCostInr = 140;
      const walkCostInr = 0;

      return [
        {
          id: "metro",
          name: "By Metro / Rapid Transit",
          icon: Train,
          badge: "⚡ BEAT CITY TRAFFIC",
          badgeColor: "#10b981",
          time: "~20 - 30 mins",
          cost: `~${curr.symbol}${Math.round((metroCostInr / 94.97) * curr.rate).toLocaleString()}`,
          carbon: "0.2 kg CO₂ (Zero direct emissions)",
          carbonLevel: "🌿 Eco-Friendly Rapid Transit",
          highlights: `High-frequency rapid metro connecting major tourist hubs, palaces, and business districts without signal delays.`,
          recommended: true,
          available: true,
        },
        {
          id: "cab",
          name: "By Auto-Rickshaw / Cab",
          icon: Car,
          badge: "⭐ DOOR-TO-DOOR",
          badgeColor: "#f59e0b",
          time: "~35 mins",
          cost: `~${curr.symbol}${Math.round((cabCostInr / 94.97) * curr.rate).toLocaleString()}`,
          carbon: "1.8 kg CO₂",
          carbonLevel: "Flexible point-to-point transit",
          highlights: `Direct pickup right outside landmark gates. Instant app booking (Uber/Ola/Auto) across all heritage attractions.`,
          recommended: false,
          available: true,
        },
        {
          id: "tour_bus",
          name: "By Hop-On City Bus",
          icon: Bus,
          badge: "💰 BEST SIGHTSEEING VALUE",
          badgeColor: "#3b82f6",
          time: "Full Day Loop",
          cost: `~${curr.symbol}${Math.round((busCostInr / 94.97) * curr.rate).toLocaleString()} Day Pass`,
          carbon: "0.8 kg CO₂",
          carbonLevel: "Sightseeing group transit",
          highlights: `Dedicated tourist sightseeing circuit stopping at all famous palaces, botanical gardens, and museums with unlimited hop-on boarding.`,
          recommended: false,
          available: true,
        },
        {
          id: "walk",
          name: "By Heritage Walk / Cycle",
          icon: Bike,
          badge: "🌿 ECO-TOUR",
          badgeColor: "#8b5cf6",
          time: "2 - 3 hrs",
          cost: "Free / ~₹50 Cycle",
          carbon: "0 kg CO₂ (100% Green)",
          carbonLevel: "Zero carbon footprint",
          highlights: `Pedestrian-friendly morning exploration through tree-lined botanical avenues, artisan bazaars, and traditional filter coffee stops.`,
          recommended: false,
          available: true,
        },
      ];
    }

    if (isIntraState) {
      // Intra-State / Regional Trip (e.g. Bangalore to Mysuru ~145 km or Bangalore to Chitradurga ~200 km)
      const isMysuru = (dest.name || "").toLowerCase().includes("mys") || (origin.name || "").toLowerCase().includes("mys");
      const isChitradurga = (dest.name || "").toLowerCase().includes("chitra") || (origin.name || "").toLowerCase().includes("chitra");

      const trainTime = isMysuru ? "1h 45m" : isChitradurga ? "3h 15m" : `${Math.round(distanceKm / 75)}h ${Math.round(((distanceKm / 75) % 1) * 60)}m`;
      const trainCostInr = isMysuru ? 450 : isChitradurga ? 380 : Math.round(distanceKm * 2.2);

      const roadTime = isMysuru ? "2h 15m (Expressway)" : isChitradurga ? "3h 00m (NH 48)" : `${Math.round((distanceKm * 1.1) / 65)}h 30m`;
      const roadCostInr = isMysuru ? 850 : isChitradurga ? 1200 : Math.round(distanceKm * 5.5);

      const busTime = isMysuru ? "2h 45m" : isChitradurga ? "3h 30m" : `${Math.round(distanceKm / 50)}h 45m`;
      const busCostInr = isMysuru ? 360 : isChitradurga ? 340 : Math.round(distanceKm * 2.0);

      return [
        {
          id: "train",
          name: "By Vande Bharat / Express Rail",
          icon: Train,
          badge: "🏆 #1 RECOMMENDED",
          badgeColor: "#10b981",
          time: trainTime,
          cost: `~${curr.symbol}${Math.round((trainCostInr / 94.97) * curr.rate).toLocaleString()}`,
          carbon: `${Math.round(distanceKm * 0.02)} kg CO₂ (-85% emissions)`,
          carbonLevel: "🌿 Ultra-low carbon rail corridor",
          highlights: isMysuru
            ? "Vande Bharat / Shatabdi Superfast Express from KSR Bengaluru to Mysuru Jn. Smooth AC chair car with panoramic countryside vistas."
            : isChitradurga
            ? "Siddhaganga Superfast Rail passing scenic Tumakuru plains directly into Chitradurga Jn with no road congestion."
            : `High-speed regional express train with comfortable seating, punctual schedule, and zero highway tolls.`,
          recommended: true,
          available: true,
        },
        {
          id: "road",
          name: "By Expressway Drive / Bike",
          icon: Car,
          badge: "🎒 SCENIC HIGHWAY",
          badgeColor: "#8b5cf6",
          time: roadTime,
          cost: `~${curr.symbol}${Math.round((roadCostInr / 94.97) * curr.rate).toLocaleString()} (Fuel/Tolls)`,
          carbon: `${Math.round(distanceKm * 0.11)} kg CO₂`,
          carbonLevel: "Personal vehicle road trip",
          highlights: isMysuru
            ? "Bangalore-Mysore 10-Lane Expressway (NH 275). Enjoy smooth cruising with famous stops at Maddur Vada & Bidadi Thatte Idli!"
            : isChitradurga
            ? "6-lane Pune-Bangalore Highway (NH 48). Cruise past wind turbine fields in Hiriyur with great roadside Kamat eateries."
            : `Scenic highway road trip (~${Math.round(distanceKm * 1.1)} km) offering total travel independence and photo stops.`,
          recommended: false,
          available: true,
        },
        {
          id: "bus",
          name: "By KSRTC / Deluxe Bus",
          icon: Bus,
          badge: "💰 FREQUENT & BUDGET",
          badgeColor: "#f59e0b",
          time: busTime,
          cost: `~${curr.symbol}${Math.round((busCostInr / 94.97) * curr.rate).toLocaleString()}`,
          carbon: `${Math.round(distanceKm * 0.035)} kg CO₂`,
          carbonLevel: "Economical bus transit",
          highlights: "Airavat Club Class & Rajahamsa express buses departing every 15-20 minutes from Majestic (KBS) & Satellite Bus Stand.",
          recommended: false,
          available: true,
        },
        {
          id: "flight",
          name: "By Flight (Not Needed)",
          icon: Plane,
          badge: "⚠️ OVERLAND IS FASTER",
          badgeColor: "#64748b",
          time: "Not Practical",
          cost: "N/A",
          carbon: "High",
          carbonLevel: "Commercial air route not needed",
          highlights: `For short intra-state distances (<${distanceKm} km), direct superfast trains and expressways are 3x faster door-to-door and much more eco-friendly.`,
          recommended: false,
          available: true,
        },
      ];
    }

    // Long-Haul Intercity Trip (> 380 km)
    const isIntercontinental = distanceKm > 3500;
    const flightHours = Math.max(1.1, distanceKm / 720 + 0.8).toFixed(1);
    const flightCostUsd = Math.round(Math.max(48, distanceKm * 0.09));
    const flightCostConverted = Math.round(flightCostUsd * curr.rate);
    const flightCarbon = Math.round(distanceKm * 0.16);

    const trainHours = Math.round(distanceKm / 80 + 0.5);
    const trainCostUsd = Math.round(Math.max(18, distanceKm * 0.038));
    const trainCostConverted = Math.round(trainCostUsd * curr.rate);

    const busHours = Math.round(distanceKm / 55 + 1.0);
    const busCostUsd = Math.round(Math.max(12, distanceKm * 0.025));
    const busCostConverted = Math.round(busCostUsd * curr.rate);

    const roadHours = Math.round((distanceKm * 1.12) / 65);
    const roadFuelUsd = Math.round(distanceKm * 0.065);
    const roadFuelConverted = Math.round(roadFuelUsd * curr.rate);

    const list = [
      {
        id: "flight",
        name: "By Flight",
        icon: Plane,
        badge: distanceKm > 800 ? "⚡ FASTEST" : "SPEEDY",
        badgeColor: "#3b82f6",
        time: `${Math.floor(flightHours)}h ${Math.round((flightHours % 1) * 60)}m`,
        cost: `~${curr.symbol}${flightCostConverted.toLocaleString()}`,
        carbon: `${flightCarbon} kg CO₂`,
        carbonLevel: "Standard air travel",
        highlights: `Direct or 1-stop air connection • Departure from ${origin.name} to ${dest.name} Airport`,
        recommended: distanceKm > 1000,
        available: true,
      },
      {
        id: "train",
        name: "By Express Train",
        icon: Train,
        badge: distanceKm <= 1200 ? "🏆 RECOMMENDED" : "🌿 ECO-FRIENDLY",
        badgeColor: "#10b981",
        time: isIntercontinental ? "Multiple rail transfers" : `${trainHours} hrs`,
        cost: `~${curr.symbol}${trainCostConverted.toLocaleString()}`,
        carbon: `${Math.round(distanceKm * 0.025)} kg CO₂ (-85% emissions)`,
        carbonLevel: "🌿 Ultra-low carbon footprint",
        highlights: `High-speed express rail • Scenic landscape views, spacious seating & dining carriage`,
        recommended: distanceKm <= 1200,
        available: !isIntercontinental,
      },
      {
        id: "bus",
        name: "By Sleeper Bus",
        icon: Bus,
        badge: "💰 BUDGET FRIENDLY",
        badgeColor: "#f59e0b",
        time: `${busHours} hrs`,
        cost: `~${curr.symbol}${busCostConverted.toLocaleString()}`,
        carbon: `${Math.round(distanceKm * 0.045)} kg CO₂`,
        carbonLevel: "Economical group transit",
        highlights: "Overnight luxury AC sleeper coach • Direct point-to-point interstate connectivity",
        recommended: distanceKm < 600 && distanceKm >= 200,
        available: distanceKm <= 1400,
      },
      {
        id: "road",
        name: "By Road / Bike",
        icon: Car,
        badge: "🎒 SCENIC ROUTE",
        badgeColor: "#8b5cf6",
        time: `${roadHours} hrs`,
        cost: `~${curr.symbol}${roadFuelConverted.toLocaleString()} (Fuel)`,
        carbon: `${Math.round(distanceKm * 0.12)} kg CO₂`,
        carbonLevel: "Personal vehicle",
        highlights: `Scenic highway road trip (~${Math.round(distanceKm * 1.12)} km) • Freedom for roadside cafes & mountain vistas`,
        recommended: false,
        available: distanceKm <= 1600,
      },
    ];

    return list.filter((item) => item.available);
  }, [isSameCity, isIntraState, distanceKm, origin.name, dest.name, curr]);

  // Leaflet Map Initialization & Rendering
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        zoomControl: false,
        scrollWheelZoom: false,
      });

      L.control.zoom({ position: "topright" }).addTo(map);

      // Clean OpenStreetMap luxury tiles (100% Free, NO API KEY, NO WATERMARK)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear previous markers & polylines
    markersRef.current.forEach((m) => map.removeLayer(m));
    markersRef.current = [];
    if (routeLineRef.current) {
      map.removeLayer(routeLineRef.current);
      routeLineRef.current = null;
    }

    if (isSameCity) {
      // RENDER SAME-CITY FAMOUS LANDMARKS CIRCUIT MAP!
      const bounds = L.latLngBounds([]);
      const circuitCoords = [];

      cityLandmarks.forEach((place, index) => {
        const placeLatLng = [place.lat, place.lon];
        circuitCoords.push(placeLatLng);
        bounds.extend(placeLatLng);

        const landmarkIcon = L.divIcon({
          className: "route-marker-pin",
          html: `
            <div class="route-landmark-badge">
              <span class="route-landmark-num">${index + 1}</span>
              <span class="route-landmark-name">${place.name.split(" ")[0]} ${place.name.split(" ")[1] || ""}</span>
            </div>
          `,
          iconSize: [140, 32],
          iconAnchor: [70, 16],
        });

        const marker = L.marker(placeLatLng, { icon: landmarkIcon }).addTo(map);
        marker.bindPopup(`
          <div style="font-family: sans-serif; padding: 4px;">
            <strong style="color: #17181c; font-size: 13px;">${place.name}</strong>
            <p style="color: #8c8577; margin: 4px 0 8px; font-size: 11px;">${place.type}</p>
            <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + " " + dest.name)}" target="_blank" style="display: inline-block; color: #d4a34c; font-weight: 700; font-size: 11px; text-decoration: none;">Open in Google Maps ↗</a>
          </div>
        `);
        markersRef.current.push(marker);
      });

      // Draw Sightseeing Loop Polyline connecting all famous landmarks
      if (circuitCoords.length > 1) {
        // Connect loop back to start
        const loopCoords = [...circuitCoords, circuitCoords[0]];
        const polyline = L.polyline(loopCoords, {
          color: "#d4a34c",
          weight: 4,
          opacity: 0.85,
          dashArray: "8, 8",
        }).addTo(map);
        routeLineRef.current = polyline;
      }

      if (bounds.isValid()) {
        map.fitBounds(bounds.pad(0.2));
      }
    } else {
      // RENDER INTER-CITY ROUTE MAP (Origin to Destination)
      const originIcon = L.divIcon({
        className: "route-marker-pin route-marker-pin--origin",
        html: `
          <div class="route-pin-badge">
            <span class="route-pin-dot"></span>
            <span class="route-pin-name">Start: ${origin.name}</span>
          </div>
        `,
        iconSize: [130, 32],
        iconAnchor: [65, 16],
      });

      const destIcon = L.divIcon({
        className: "route-marker-pin route-marker-pin--dest",
        html: `
          <div class="route-pin-badge route-pin-badge--dest">
            <span class="route-pin-dot"></span>
            <span class="route-pin-name">Dest: ${dest.name}</span>
          </div>
        `,
        iconSize: [130, 32],
        iconAnchor: [65, 16],
      });

      const m1 = L.marker([origin.lat, origin.lon], { icon: originIcon }).addTo(map);
      const m2 = L.marker([dest.lat, dest.lon], { icon: destIcon }).addTo(map);
      markersRef.current = [m1, m2];

      let lineColor = "#d4a34c";
      let dashArray = "6, 8";
      if (activeMode === "train") {
        lineColor = "#10b981";
        dashArray = "10, 6";
      } else if (activeMode === "bus") {
        lineColor = "#f59e0b";
        dashArray = "4, 6";
      } else if (activeMode === "road") {
        lineColor = "#8b5cf6";
        dashArray = undefined;
      }

      const polyline = L.polyline(
        [
          [origin.lat, origin.lon],
          [dest.lat, dest.lon],
        ],
        {
          color: lineColor,
          weight: 4,
          opacity: 0.85,
          dashArray,
        }
      ).addTo(map);
      routeLineRef.current = polyline;

      const bounds = L.latLngBounds([[origin.lat, origin.lon], [dest.lat, dest.lon]]);
      map.fitBounds(bounds.pad(0.25));
    }
  }, [origin, dest, activeMode, isSameCity, cityLandmarks]);

  const selectedOption =
    transitOptions.find((o) => o.id === activeMode) || transitOptions[0];

  // Google Maps Full Route URL
  const googleMapsRouteUrl = useMemo(() => {
    if (isSameCity && cityLandmarks.length > 0) {
      const stops = cityLandmarks.map((l) => encodeURIComponent(l.name)).join("/");
      return `https://www.google.com/maps/dir/${stops}`;
    }
    return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin.name)}&destination=${encodeURIComponent(dest.name)}`;
  }, [isSameCity, cityLandmarks, origin.name, dest.name]);

  return (
    <div className="route-transit-planner">
      {/* Section Header */}
      <div className="route-planner__header">
        <div>
          <div className="route-planner__badge">
            <RouteIcon size={14} />
            <span>
              {isSameCity
                ? "🏛️ INTRA-CITY TRANSIT & FAMOUS PLACES CIRCUIT"
                : isIntraState
                ? "🚆 REGIONAL & INTRA-STATE ROUTE PLANNER"
                : "✈️ LONG-HAUL ROUTE & TRANSIT PLANNER"}
            </span>
          </div>
          <h3>
            {isSameCity
              ? `Touring Famous Places in ${dest.name}`
              : `Travel options from ${origin.name} to ${dest.name}`}
          </h3>
          <p>
            {isSameCity ? (
              <>
                You are in <strong>{dest.name}</strong>! Compare the best city transit options (Metro, Cabs, Tour Buses) to explore all top landmarks.
              </>
            ) : (
              <>
                Distance: <strong>{distanceKm.toLocaleString()} km</strong> • Compare the fastest, most scenic, and best budget ways to travel
              </>
            )}
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <div className="route-currency-pill-group">
            {Object.keys(TRANSIT_CURRENCIES).map((c) => (
              <button
                key={c}
                type="button"
                className={`route-curr-btn ${transitCurrency === c ? "route-curr-btn--active" : ""}`}
                onClick={() => setTransitCurrency(c)}
              >
                {c} ({TRANSIT_CURRENCIES[c].symbol})
              </button>
            ))}
          </div>

          <div className="route-distance-chip">
            <Navigation size={15} />
            <span>{isSameCity ? "Same City Circuit" : `${distanceKm.toLocaleString()} km`}</span>
          </div>
        </div>
      </div>

      {/* Transit Mode Selection Tabs */}
      <div className="transit-mode-tabs">
        {transitOptions.map((opt) => {
          const Icon = opt.icon;
          const isActive = activeMode === opt.id;

          return (
            <button
              key={opt.id}
              type="button"
              className={`transit-tab-btn ${isActive ? "transit-tab-btn--active" : ""}`}
              onClick={() => setActiveMode(opt.id)}
            >
              <Icon size={16} />
              <span>{opt.name}</span>
              {opt.badge && (
                <span
                  className="transit-tab-badge"
                  style={{
                    backgroundColor: isActive ? "#ffffff" : opt.badgeColor,
                    color: isActive ? "#17181c" : "#ffffff",
                  }}
                >
                  {opt.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Route Content Grid: Map + Details */}
      <div className="route-planner__grid">
        {/* Left: Leaflet Interactive Map */}
        <div className="route-map-wrapper">
          <div ref={mapContainerRef} className="route-map-canvas" />
          <div className="route-map-overlay-info">
            {isSameCity ? (
              <span>📍 {cityLandmarks.length} Famous Places Circuit in {dest.name}</span>
            ) : (
              <span>{origin.name} ➔ {dest.name} ({distanceKm.toLocaleString()} km)</span>
            )}
          </div>
        </div>

        {/* Right: Selected Mode Details Card */}
        <AnimatePresence mode="wait">
          {selectedOption && (
            <motion.div
              key={selectedOption.id}
              className="route-details-card"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <div className="route-details__top">
                <div className="route-details__title-group">
                  <div
                    className="route-icon-box"
                    style={{
                      background: `${selectedOption.badgeColor}15`,
                      color: selectedOption.badgeColor,
                    }}
                  >
                    <selectedOption.icon size={22} />
                  </div>
                  <div>
                    <h4>{selectedOption.name}</h4>
                    <span
                      className="route-badge-pill"
                      style={{ color: selectedOption.badgeColor }}
                    >
                      {selectedOption.badge}
                    </span>
                  </div>
                </div>

                <div className="route-price-tag">
                  <span>ESTIMATED FARE</span>
                  <strong>{selectedOption.cost}</strong>
                </div>
              </div>

              <p className="route-highlights-text">{selectedOption.highlights}</p>

              <div className="route-metrics-grid">
                <div className="route-metric-box">
                  <Clock size={16} className="text-gold" />
                  <div>
                    <span>TRAVEL DURATION</span>
                    <strong>{selectedOption.time}</strong>
                  </div>
                </div>

                <div className="route-metric-box">
                  <Leaf size={16} className="text-emerald" />
                  <div>
                    <span>CARBON FOOTPRINT</span>
                    <strong>{selectedOption.carbon}</strong>
                  </div>
                </div>
              </div>

              {/* Same-city famous places list preview */}
              {isSameCity && (
                <div className="route-landmarks-preview-box">
                  <span className="landmarks-box-title">
                    <Landmark size={13} />
                    <span>STOPS ON THIS SIGHTSEEING CIRCUIT:</span>
                  </span>
                  <div className="landmarks-preview-list">
                    {cityLandmarks.map((landmark, idx) => (
                      <div key={landmark.name} className="landmark-item-pill">
                        <span className="landmark-num-tag">{idx + 1}</span>
                        <span>{landmark.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Button: Google Maps Navigation */}
              <div style={{ marginTop: "14px" }}>
                <a
                  href={googleMapsRouteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="route-google-maps-btn"
                >
                  <ExternalLink size={14} />
                  <span>
                    {isSameCity
                      ? `Navigate ${dest.name} Sightseeing Circuit in Google Maps ↗`
                      : `Open Route in Google Maps (${origin.name} to ${dest.name}) ↗`}
                  </span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default RouteTransitPlanner;
