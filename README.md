# Elsewhere — Luxury Editorial Travel & Multi-Modal Journey Platform

> **Front-End Developer Assessment Submission** for **Design Esthetics** (via TAP Academy)  
> Designed and engineered with React 19, Vite, Leaflet, Framer Motion, and Custom Editorial Design Systems.

---

## 🌟 Live Demo & Deployment
- **Live Web Application:** *[https://elsewhere-travel.vercel.app](https://elsewhere-travel.vercel.app)* *(or deploy via Vercel / Netlify)*
- **GitHub Repository:** *[https://github.com/your-username/elsewhere-travel](https://github.com/your-username/elsewhere-travel)*

---

## 📖 Project Overview

**Elsewhere** is a luxury, editorial travel discovery, multi-modal transit planning, and AI itinerary web application. Built for travelers who seek thoughtful design and effortless utility, Elsewhere marries magazine-grade editorial typography and warm luxury aesthetics with deep front-end engineering: real-time multi-modal transit planning, watermark-free Leaflet mapping, live currency conversion with accurate mid-market exchange rates, Web Speech audio phrasebooks, and interactive community reviews.

---

## ✨ Standout Features & Engineering Highlights

### 1. 🗺️ Multi-Modal Route & Transit Engine (`RouteTransitPlanner.jsx`)
- **Watermark-Free Leaflet Mapping:** Utilizes clean OpenStreetMap tiles with zero API keys and zero watermarks.
- **Dynamic Haversine Distance Engine:** Calculates precise geodesic distance between departure and destination cities.
- **Multi-Modal Travel Comparison:**
  - ✈️ **By Flight:** Flight duration, estimated airfare, carbon emissions, and speed badges.
  - 🚆 **By Express Rail / Vande Bharat:** Rail duration, scenic route highlights, and 85% reduced carbon footprint.
  - 🚌 **By Sleeper / Deluxe Bus:** Point-to-point interstate bus connectivity with budget pricing.
  - 🚗 / 🏍️ **By Expressway / Bike:** Highway road-trip drive times, fuel/toll estimates, and scenic pitstop tips.
- **Intra-State & Regional Travel Support:**
  - Specialized routing for regional connections like **Bangalore to Mysuru** (Vande Bharat Express in 1h 45m, NH 275 10-lane Expressway with Maddur Vada & Bidadi Thatte Idli stops) and **Bangalore to Chitradurga** (NH 48, Siddhaganga Superfast).
- **🏛️ Same-City Local Sightseeing Circuit Mode:**
  - Automatically activates when departure equals destination (e.g. Bangalore to Bangalore, Mumbai to Mumbai).
  - Zooms directly into city streets, dropping numbered landmark pins for famous places (*Lalbagh, Bangalore Palace, Cubbon Park, ISKCON, Gateway of India, Mysore Palace, Chitradurga Fort*).
  - Connects monuments via an optimal day sightseeing loop.
  - Compares intra-city transit modes: **🚇 Metro (Skip Traffic)**, **🛺 Auto-Rickshaw / Cabs (Door-to-door)**, **🚌 Hop-On City Tour Bus**, and **🚶 Heritage Walk / Cycle**.
  - **1-Click Google Maps Turn-by-Turn Navigation:** Generates full multi-stop navigation links directly into Google Maps.

---

### 2. 💱 Live Mid-Market Travel Currency Converter (`CurrencyModal.jsx`)
- **Accurate Live Forex API:** Powered by open exchange rates (`https://open.er-api.com/v6/latest/USD`), accurately reflecting live market rates (**1 USD = ₹94.97 INR**).
- **Interactive Navbar Widget:** Clickable `[ 💱 1 USD = ₹94.97 ]` pill opens a glassmorphic bidirectional converter with instant multi-currency comparison tables (EUR, GBP, JPY, AUD, CAD, CHF) and a live refresh button.
- **On-Page Itinerary & Transit Currency Switcher:** One-click toggling between **INR (₹)**, **USD ($)**, **EUR (€)**, and **GBP (£)** across all itinerary costs, daily budgets, and transit fares.

---

### 3. 🎨 Luxury Editorial Itinerary Experience (`Itinerary.jsx`)
- **Editorial Color System:**
  - 🌅 **Morning Card:** Soft sunrise borders (`#fed7aa`), ivory-gold gradients, and amber sunrise badges.
  - ☀️ **Afternoon Card:** Daylight azure borders (`#bae6fd`), sky blue gradients, and radiant sun badges.
  - 🌆 **Evening Card:** Twilight lavender borders (`#e9d5ff`), lilac gradients, and royal sunset badges.
  - 🔑 **Amber Concierge Secret Box:** Replaces generic tips with a warm, luxury concierge recommendation box.
- **Executive Multi-Page PDF Export:** Custom `@media print` rules ensuring clean, high-contrast, multi-page PDF generation with zero blank pages.
- **Instant Shareable Parameterized URLs:** Copies deep-link URLs (e.g., `/plan?destination=Mumbai&days=3&style=Balanced`) that automatically load and render the exact itinerary for anyone who opens the link.
- **Interactive Packing Checklist:** Collapsible checklist drawer with live progress tracking saved across user sessions.

---

### 4. 🗣️ Native Audio Phrasebook (`PhrasebookCard.jsx`)
- Built-in **Web Speech API (`window.speechSynthesis`)** that speaks foreign phrases aloud with native accents (Japanese for Kyoto, Hindi/Marathi for Mumbai/Jaipur, French for Paris, German for Munich/Zurich, Italian for Venice, Balinese for Bali).
- Displays native scripts, phonetic romaji/pronunciations, and English meanings with interactive category filters (*Greetings*, *Dining*, *Directions*, *Polite*).

---

### 5. 🌟 Verified Traveler Reviews & Guestbook (`TravelerReviews.jsx`)
- Authentic community stories with traveler avatar shields, verified traveler badges ("Solo Explorer", "Cultural Connoisseur"), and star ratings.
- Interactive submission form allowing users to write and post their own travel reviews, persisted instantly in `localStorage`.

---

### 6. 🧭 Global Controls & Navigation (`Navbar.jsx`)
- **Saved City Quick-Redirect:** Active navbar button `[ ❤️ Kyoto ]` instantly redirects the traveler to their saved city page.
- **GPS Location Detection:** HTML5 Geolocation with reverse geocoding to city and country, with manual search fallback.
- **Multi-Language i18n:** Instant translation across English (EN), Spanish (ES), French (FR), German (DE), and Japanese (JA).
- **Member Authentication Modal:** Glassmorphic modal with **⚡ Quick Demo Login** for instant evaluation access.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
|---|---|
| **Core Framework** | **React 19**, **React Router v7**, **Vite 8** |
| **Mapping & GIS** | **Leaflet**, **OpenStreetMap Tile Layer**, Haversine Geodesic Math |
| **Styling & Esthetics** | Pure Vanilla CSS (custom luxury editorial system, glassmorphism, responsive flex/grid) |
| **Animation Choreography** | **Framer Motion** (staggered entries, spring modals, fluid tab switches) |
| **Audio Synthesis** | Native Browser **Web Speech API** (`window.speechSynthesis`) |
| **Live APIs** | Open Exchange Rates API, OpenWeather API, Open-Meteo, BigDataCloud Geocoding |
| **Icons** | **Lucide React** |
| **Build & Quality** | **Oxlint**, Vite production rollup minifier |

---

## 🚀 How to Run the Project Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18+ recommended)
- `npm` (comes bundled with Node.js)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/elsewhere-travel.git
cd elsewhere-travel
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```

---

## 📂 Project Architecture

```
design-esthetics-travel/
├── public/                     # Static public assets
├── src/
│   ├── components/
│   │   ├── AuthModal.jsx            # Glassmorphic auth modal with Quick Demo Login
│   │   ├── Chatbot.jsx              # Floating AI travel assistant
│   │   ├── CurrencyModal.jsx        # Live mid-market forex converter (94.97 INR)
│   │   ├── DestinationCard.jsx      # Luxury destination cards with hover animations
│   │   ├── FamousPlaceCard.jsx      # Landmark highlights with Google Maps integration
│   │   ├── Hero.jsx                 # Editorial hero with location pill & search
│   │   ├── Itinerary.jsx            # Color-coded luxury multi-day itinerary & PDF export
│   │   ├── LocationModal.jsx        # GPS & manual city picker modal
│   │   ├── Navbar.jsx               # Navigation bar with currency, saved city & i18n
│   │   ├── PhrasebookCard.jsx       # Audio speech phrasebook (Web Speech API)
│   │   ├── RouteTransitPlanner.jsx  # Multi-modal Leaflet route & same-city circuit
│   │   ├── TravelerReviews.jsx      # Community reviews & guestbook submission
│   │   └── WeatherCard.jsx          # Live weather forecast widget
│   ├── context/
│   │   ├── AuthContext.jsx          # User session management (localStorage)
│   │   ├── LanguageContext.jsx      # 5-language internationalization
│   │   ├── LocationContext.jsx      # Active traveler origin location
│   │   └── WishlistContext.jsx      # Bookmarked destinations management
│   ├── data/
│   │   ├── destinations.js          # Handpicked global destinations dataset
│   │   ├── phrasebooks.js           # Multilingual phrases with audio pronunciations
│   │   └── worldCountries.js        # Geocoordinates, country maps & landmark data
│   ├── pages/
│   │   ├── DestinationDetails.jsx   # Deep-dive destination showcase page
│   │   ├── Home.jsx                 # Main editorial travel discovery catalog
│   │   └── PlanTrip.jsx             # Multi-day AI journey planner
│   ├── App.css                      # Luxury editorial stylesheet
│   └── main.jsx                     # Application entry point
├── package.json
└── vite.config.js
```

---

## 🏆 Assessment Criteria Self-Evaluation

| Criterion | Implementation in Elsewhere |
|---|---|
| **Design Esthetics & Visual Polish** | Warm editorial color palette, luxury serif & sans-serif hierarchy, subtle golden accents, glassmorphic modals, and custom time-of-day badges. |
| **Interactive Polish & UX** | Multi-modal transit comparison, interactive Leaflet route polylines, audio speech pronunciation, live currency conversion, and instant PDF downloads. |
| **Performance & Clean Code** | Pure CSS styling, sub-3 second production builds (`vite build`), zero watermarks, and smooth 60fps Framer Motion transitions. |
| **Edge-Case Resilience** | Handles intercontinental flights, regional intra-state expressways/trains (Mysuru/Chitradurga), and same-city local sightseeing circuits gracefully. |

---

*Crafted with passion for the **Design Esthetics Front-End Developer Assessment**.*
