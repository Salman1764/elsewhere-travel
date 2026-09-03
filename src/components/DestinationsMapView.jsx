import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Layers,
  Globe,
  Compass,
  ArrowRight,
  X,
  Sparkles,
  Maximize2,
} from "lucide-react";
import { usePexelsImage } from "../hooks/usePexelsImage";
import { getDestinationQuery } from "../services/images";

const TILE_PROVIDERS = {
  satellite: {
    name: "Satellite View",
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    attribution: "Tiles &copy; Esri &mdash; Earthstar Geographics",
    maxZoom: 18,
  },
  dark: {
    name: "Luxury Dark",
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    attribution: "&copy; OpenStreetMap &copy; CARTO",
    maxZoom: 19,
    subdomains: "abcd",
  },
};

function DestinationsMapView({ destinations = [] }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const markersRef = useRef([]);

  const [mapTheme, setMapTheme] = useState("satellite"); // "satellite" | "dark"
  const [selectedDest, setSelectedDest] = useState(null);
  const navigate = useNavigate();

  const { url: previewImg } = usePexelsImage(
    selectedDest ? getDestinationQuery(selectedDest) : ""
  );

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Check if map instance already exists
    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [25, 20],
        zoom: 2.3,
        minZoom: 2,
        maxZoom: 18,
        zoomControl: false, // Custom luxury position
        scrollWheelZoom: true,
      });

      // Add zoom control in top-left
      L.control.zoom({ position: "topleft" }).addTo(map);

      // Initial Tile Layer
      const initialProvider = TILE_PROVIDERS[mapTheme];
      const layer = L.tileLayer(initialProvider.url, {
        attribution: initialProvider.attribution,
        maxZoom: initialProvider.maxZoom,
        subdomains: initialProvider.subdomains || "abc",
      }).addTo(map);

      tileLayerRef.current = layer;
      mapInstanceRef.current = map;
    }

    return () => {
      // Cleanup on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Tile Layer when switching Satellite vs Dark
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }

    const provider = TILE_PROVIDERS[mapTheme];
    const newLayer = L.tileLayer(provider.url, {
      attribution: provider.attribution,
      maxZoom: provider.maxZoom,
      subdomains: provider.subdomains || "abc",
    }).addTo(mapInstanceRef.current);

    tileLayerRef.current = newLayer;
  }, [mapTheme]);

  // Update Markers when destinations list changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear old markers
    markersRef.current.forEach((m) => map.removeLayer(m));
    markersRef.current = [];

    destinations.forEach((dest) => {
      if (!dest.coordinates?.lat || !dest.coordinates?.lon) return;

      const { lat, lon } = dest.coordinates;

      // Luxury custom HTML Marker Icon
      const customIcon = L.divIcon({
        className: "custom-leaflet-marker",
        html: `
          <div class="leaflet-pin-wrap">
            <span class="leaflet-pin-pulse"></span>
            <div class="leaflet-pin-core">
              <span class="leaflet-pin-dot"></span>
              <span class="leaflet-pin-title">${dest.name}</span>
            </div>
          </div>
        `,
        iconSize: [100, 36],
        iconAnchor: [50, 18],
      });

      const marker = L.marker([lat, lon], { icon: customIcon }).addTo(map);

      marker.on("click", () => {
        setSelectedDest(dest);
        map.flyTo([lat, lon], 5, {
          duration: 1.2,
          easeLinearity: 0.25,
        });
      });

      markersRef.current.push(marker);
    });
  }, [destinations]);

  const resetView = () => {
    if (mapInstanceRef.current) {
      setSelectedDest(null);
      mapInstanceRef.current.flyTo([25, 20], 2.3, { duration: 1.2 });
    }
  };

  return (
    <div className="destinations-satellite-map">
      {/* Map Header Controls */}
      <div className="map-controls-toolbar">
        <div className="map-layer-switcher">
          <button
            type="button"
            className={`map-layer-btn ${mapTheme === "satellite" ? "map-layer-btn--active" : ""}`}
            onClick={() => setMapTheme("satellite")}
          >
            <Globe size={14} />
            <span>🛰️ Satellite View</span>
          </button>
          <button
            type="button"
            className={`map-layer-btn ${mapTheme === "dark" ? "map-layer-btn--active" : ""}`}
            onClick={() => setMapTheme("dark")}
          >
            <Layers size={14} />
            <span>🌑 Dark Theme</span>
          </button>
        </div>

        <button
          type="button"
          className="map-reset-btn"
          onClick={resetView}
          title="Reset Global View"
        >
          <Compass size={14} />
          <span>Global View</span>
        </button>
      </div>

      {/* Real Interactive Leaflet Map Container */}
      <div className="map-interactive-viewport" ref={mapContainerRef} />

      {/* Floating Card for Selected Destination */}
      {selectedDest && (
        <div className="map-satellite-preview-card">
          <button
            type="button"
            className="map-preview-close"
            onClick={() => setSelectedDest(null)}
            aria-label="Close details"
          >
            <X size={15} />
          </button>

          <div className="preview-card-image-wrap">
            <img
              src={previewImg}
              alt={selectedDest.name}
              className="preview-card-img"
            />
            <span className="preview-card-tag">{selectedDest.category || "Featured"}</span>
          </div>

          <div className="preview-card-content">
            <span className="preview-card-country">{selectedDest.country}</span>
            <h4>{selectedDest.name}</h4>
            <p>{selectedDest.description?.slice(0, 110)}...</p>

            <div className="preview-card-metrics">
              <div>
                <span>BEST TIME</span>
                <strong>{selectedDest.bestTime?.split("&")[0]}</strong>
              </div>
              <div>
                <span>BUDGET</span>
                <strong>{selectedDest.budgetPerDay}</strong>
              </div>
            </div>

            <button
              type="button"
              className="preview-card-cta"
              onClick={() => navigate(`/destination/${selectedDest.id}`)}
            >
              <span>Explore {selectedDest.name}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Footer Instructions */}
      <div className="map-satellite-footer">
        <span>
          💡 <strong>Drag & swipe</strong> to explore the globe • <strong>Scroll / pinch</strong> to zoom • Tap any golden pin to fly to that city
        </span>
      </div>
    </div>
  );
}

export default DestinationsMapView;
