import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Coins,
  Wallet,
  Languages,
  Heart,
  Sparkles,
  Plane,
  Calculator,
  Compass,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import destinations, { getDestinationById } from "../data/destinations";
import { getDestinationQuery, getFallbackImage } from "../services/images";
import { usePexelsImage } from "../hooks/usePexelsImage";
import { getWeather } from "../services/weather";
import WeatherCard from "../components/WeatherCard";
import FamousPlaceCard from "../components/FamousPlaceCard";
import PhrasebookCard from "../components/PhrasebookCard";
import TravelerReviews from "../components/TravelerReviews";
import RouteTransitPlanner from "../components/RouteTransitPlanner";
import { useLanguage } from "../context/LanguageContext";
import { useWishlist } from "../context/WishlistContext";
import { useLocationContext } from "../context/LocationContext";

function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
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

function estimateFlightTime(distanceKm) {
  if (distanceKm < 150) return "< 1 hr";
  const hours = distanceKm / 800 + 0.5; // average cruising speed
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return `${h}h ${m > 0 ? `${m}m` : ""}`;
}

function DestinationDetails() {
  const { destinationId } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isSaved, toggleWishlist } = useWishlist();
  const { location: userLocation } = useLocationContext();

  // Memoize destination to eliminate unstable object references causing re-render loops
  const destination = useMemo(() => {
    return getDestinationById(destinationId);
  }, [destinationId]);

  const { url: pexelsHero } = usePexelsImage(
    destination ? getDestinationQuery(destination) : ""
  );

  const heroImageUrl = useMemo(() => {
    return (
      destination?.image ||
      pexelsHero ||
      getFallbackImage(destination?.id || destination?.name, 1400)
    );
  }, [destination, pexelsHero]);

  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState("");

  // Interactive Budget Calculator State
  const [calcDays, setCalcDays] = useState(5);
  const [calcStyle, setCalcStyle] = useState("balanced"); // "budget" | "balanced" | "luxury"
  const [calcCurrency, setCalcCurrency] = useState("USD"); // "USD" | "EUR" | "GBP" | "INR"

  const saved = destination ? isSaved(destination.id) : false;

  // Real-time Flight Distance from User's Starting Point
  const distanceKm = useMemo(() => {
    if (!destination?.coordinates || !userLocation?.coordinates) return null;
    const { lat: lat1, lon: lon1 } = userLocation.coordinates;
    const { lat: lat2, lon: lon2 } = destination.coordinates;
    if (!lat1 || !lon1 || !lat2 || !lon2) return null;
    return calculateDistanceKm(lat1, lon1, lat2, lon2);
  }, [destination, userLocation]);

  const flightTime = useMemo(() => {
    return distanceKm ? estimateFlightTime(distanceKm) : null;
  }, [distanceKm]);

  // Currency & Travel Style Rates
  const currencyConfig = {
    USD: { symbol: "$", rate: 1 },
    EUR: { symbol: "€", rate: 0.92 },
    GBP: { symbol: "£", rate: 0.79 },
    INR: { symbol: "₹", rate: 83.5 },
  };

  const styleConfig = {
    budget: { label: "Backpacker", stay: 35, food: 20, activities: 15 },
    balanced: { label: "Balanced", stay: 85, food: 45, activities: 30 },
    luxury: { label: "Luxury", stay: 240, food: 110, activities: 80 },
  };

  const curr = currencyConfig[calcCurrency];
  const style = styleConfig[calcStyle];
  const dailyStay = Math.round(style.stay * curr.rate);
  const dailyFood = Math.round(style.food * curr.rate);
  const dailyActivities = Math.round(style.activities * curr.rate);
  const totalTripCost = (dailyStay + dailyFood + dailyActivities) * calcDays;

  // Robust, debounced weather loader without infinite re-render triggers
  useEffect(() => {
    if (!destination?.coordinates) return;

    let isMounted = true;
    const loadWeather = async () => {
      setWeatherLoading(true);
      setWeatherError("");

      try {
        const weatherData = await getWeather(
          destination.coordinates.lat,
          destination.coordinates.lon,
          destination.name
        );

        if (isMounted) {
          setWeather(weatherData);
        }
      } catch {
        if (isMounted) {
          setWeatherError("Weather temporarily unavailable");
        }
      } finally {
        if (isMounted) {
          setWeatherLoading(false);
        }
      }
    };

    loadWeather();

    return () => {
      isMounted = false;
    };
  }, [destination?.id, destination?.coordinates?.lat, destination?.coordinates?.lon]);

  if (!destination) {
    return (
      <main className="destination-not-found">
        <h2>Destination Not Found</h2>
        <p>The destination you are looking for does not exist.</p>
        <Link to="/" className="destination-not-found__btn">
          <ArrowLeft size={16} />
          <span>Return to Destinations</span>
        </Link>
      </main>
    );
  }

  const revealTransition = {
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1],
  };

  return (
    <main className="destination-details">
      <section className="destination-details__hero">
        <motion.div
          className="destination-details__hero-image-wrap"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <img
            src={heroImageUrl}
            alt={destination.name}
            className="destination-details__hero-image"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </motion.div>

        <div className="destination-details__hero-overlay" />

        <div className="destination-details__hero-content">
          {/* Top Bar with Back Link & Elegant Wishlist Button */}
          <motion.div
            className="destination-details__top-bar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.15,
            }}
          >
            <Link to="/#destinations" className="destination-details__back">
              <ArrowLeft size={16} />
              <span>{t("backToDestinations")}</span>
            </Link>

            <motion.button
              type="button"
              className={`destination-details__wishlist-btn ${
                saved ? "destination-details__wishlist-btn--saved" : ""
              }`}
              onClick={() => toggleWishlist(destination.id)}
              aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart
                size={16}
                fill={saved ? "#ff5370" : "none"}
                stroke={saved ? "#ff5370" : "#ffffff"}
              />
              <span>{saved ? t("savedToWishlist") : t("saveToWishlist")}</span>
            </motion.button>
          </motion.div>

          <motion.div
            className="destination-details__title"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="destination-details__tags-row">
              <p>{destination.country}</p>

              {/* Dynamic Flight Distance & Time Connection */}
              {distanceKm && userLocation && (
                <div className="destination-flight-tag">
                  <Plane size={13} />
                  <span>
                    {distanceKm.toLocaleString()} km from {userLocation.name} (~{flightTime})
                  </span>
                </div>
              )}
            </div>

            <h1>{destination.name}</h1>
          </motion.div>
        </div>
      </section>

      <section className="destination-details__content">
        <div className="destination-details__intro">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              ...revealTransition,
              delay: 0.05,
            }}
          >
            <p className="section-eyebrow">{t("aboutDestination")}</p>

            <h2>
              {t("destStoryTitle1")}
              <br />
              <em>{t("destStoryTitle2")}</em>
            </h2>

            {/* Curator's Spotlight Card */}
            <div className="destination-details__curator-card">
              <div className="curator-card__badge">
                <Sparkles size={14} />
                <span>CURATOR'S SPOTLIGHT</span>
              </div>
              <p>
                "{destination.name} is celebrated worldwide for its distinctive heritage, vibrant street life, and remarkable natural beauty."
              </p>
            </div>

            {/* Quick Trip Planner CTA */}
            <div className="destination-details__plan-box">
              <div>
                <h4>Ready to explore {destination.name}?</h4>
                <p>Generate a customized AI itinerary tailored to your style.</p>
              </div>
              <button
                type="button"
                className="destination-details__plan-btn"
                onClick={() =>
                  navigate(`/plan?destination=${encodeURIComponent(destination.name)}`)
                }
              >
                <Sparkles size={16} />
                <span>Plan trip to {destination.name}</span>
              </button>
            </div>
          </motion.div>

          <motion.div
            className="destination-details__description"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              ...revealTransition,
              delay: 0.18,
            }}
          >
            <p>{destination.description}</p>

            <div className="destination-details__facts">
              <motion.div
                className="destination-fact"
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  ...revealTransition,
                  delay: 0.25,
                }}
              >
                <div className="destination-fact__icon destination-fact__icon--time">
                  <CalendarDays size={18} strokeWidth={1.8} />
                </div>
                <div>
                  <span>{t("bestTime")}</span>
                  <strong>{destination.bestTime}</strong>
                </div>
              </motion.div>

              <motion.div
                className="destination-fact"
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  ...revealTransition,
                  delay: 0.32,
                }}
              >
                <div className="destination-fact__icon destination-fact__icon--location">
                  <MapPin size={18} strokeWidth={1.8} />
                </div>
                <div>
                  <span>{t("locationLabel")}</span>
                  <strong>
                    {destination.country} ({destination.region})
                  </strong>
                </div>
              </motion.div>

              <motion.div
                className="destination-fact"
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  ...revealTransition,
                  delay: 0.38,
                }}
              >
                <div className="destination-fact__icon destination-fact__icon--currency">
                  <Coins size={18} strokeWidth={1.8} />
                </div>
                <div>
                  <span>{t("currencyLabel")}</span>
                  <strong>{destination.currency}</strong>
                </div>
              </motion.div>

              <motion.div
                className="destination-fact"
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  ...revealTransition,
                  delay: 0.44,
                }}
              >
                <div className="destination-fact__icon destination-fact__icon--budget">
                  <Wallet size={18} strokeWidth={1.8} />
                </div>
                <div>
                  <span>{t("budgetPerDayLabel")}</span>
                  <strong>{destination.budgetPerDay}</strong>
                </div>
              </motion.div>

              <motion.div
                className="destination-fact destination-fact--full"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  ...revealTransition,
                  delay: 0.5,
                }}
              >
                <div className="destination-fact__icon destination-fact__icon--language">
                  <Languages size={18} strokeWidth={1.8} />
                </div>
                <div>
                  <span>{t("languageSpokenLabel")}</span>
                  <strong>
                    {Array.isArray(destination.languages)
                      ? destination.languages.join(", ")
                      : destination.languages}
                  </strong>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Live Weather Forecast Card */}
        <motion.div
          className="destination-weather"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            ...revealTransition,
            delay: 0.1,
          }}
        >
          <WeatherCard
            weather={weather}
            loading={weatherLoading}
            error={weatherError}
          />
        </motion.div>

        {/* Multi-Modal Route & Transit Planner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ ...revealTransition }}
        >
          <RouteTransitPlanner
            originName={location?.name || "Bengaluru"}
            destinationName={destination.name}
          />
        </motion.div>

        {/* Interactive Travel Cost & Currency Estimator */}
        <motion.section
          className="budget-estimator-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ ...revealTransition }}
        >
          <div className="budget-estimator__header">
            <div>
              <div className="budget-estimator__badge">
                <Calculator size={13} />
                <span>INTERACTIVE BUDGET ESTIMATOR</span>
              </div>
              <h3>Plan your trip budget to {destination.name}</h3>
            </div>

            {/* Currency Selector Pills */}
            <div className="budget-currency-pills">
              {Object.keys(currencyConfig).map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`currency-pill ${calcCurrency === c ? "currency-pill--active" : ""}`}
                  onClick={() => setCalcCurrency(c)}
                >
                  {c} ({currencyConfig[c].symbol})
                </button>
              ))}
            </div>
          </div>

          <div className="budget-estimator__body">
            {/* Left Controls */}
            <div className="budget-estimator__controls">
              <div className="budget-control-group">
                <div className="budget-control-header">
                  <label htmlFor="budget-days-slider">Trip Duration</label>
                  <span className="budget-days-value">
                    {calcDays} {calcDays === 1 ? "Day" : "Days"}
                  </span>
                </div>
                <input
                  id="budget-days-slider"
                  type="range"
                  min="1"
                  max="14"
                  value={calcDays}
                  onChange={(e) => setCalcDays(Number(e.target.value))}
                  className="budget-range-slider"
                />
                <div className="budget-range-labels">
                  <span>1 day</span>
                  <span>7 days</span>
                  <span>14 days</span>
                </div>
              </div>

              <div className="budget-control-group">
                <label>Travel Pace & Style</label>
                <div className="budget-style-pills">
                  {Object.keys(styleConfig).map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`budget-style-btn ${calcStyle === s ? "budget-style-btn--active" : ""}`}
                      onClick={() => setCalcStyle(s)}
                    >
                      {styleConfig[s].label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Cost Summary Card */}
            <div className="budget-estimator__summary">
              <div className="budget-summary-row">
                <span>Accommodation & Stays</span>
                <strong>{curr.symbol}{(dailyStay * calcDays).toLocaleString()}</strong>
              </div>
              <div className="budget-summary-row">
                <span>Dining & Local Food</span>
                <strong>{curr.symbol}{(dailyFood * calcDays).toLocaleString()}</strong>
              </div>
              <div className="budget-summary-row">
                <span>Attractions & Transit</span>
                <strong>{curr.symbol}{(dailyActivities * calcDays).toLocaleString()}</strong>
              </div>

              <div className="budget-summary-total">
                <div>
                  <span className="total-label">Estimated Total Budget</span>
                  <span className="total-sub">Includes stay, meals & activities</span>
                </div>
                <div className="total-price">
                  {curr.symbol}{totalTripCost.toLocaleString()}
                </div>
              </div>

              <button
                type="button"
                className="budget-plan-cta"
                onClick={() =>
                  navigate(
                    `/plan?destination=${encodeURIComponent(destination.name)}&days=${calcDays}`
                  )
                }
              >
                <Compass size={15} />
                <span>Generate {calcDays}-Day Itinerary →</span>
              </button>
            </div>
          </div>
        </motion.section>

        {/* Local Language Phrasebook with Speech Pronunciation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ ...revealTransition }}
        >
          <PhrasebookCard
            destinationId={destination.id}
            country={destination.country}
            destinationName={destination.name}
          />
        </motion.div>

        {/* Famous Places / Landmarks Section */}
        <div className="famous-places">
          <motion.div
            className="famous-places__heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              amount: 0.25,
            }}
            transition={{
              ...revealTransition,
            }}
          >
            <div>
              <p className="section-eyebrow">{t("mustSee") || "MUST SEE"}</p>
              <h2>{t("famousPlacesTitle") || t("famousPlaces") || "Famous places"}</h2>
            </div>

            <span>
              {String(destination.famousPlaces.length).padStart(2, "0")}{" "}
              {t("placesCount") || "places"}
            </span>
          </motion.div>

          <div className="famous-places__grid">
            {destination.famousPlaces.map((place, index) => (
              <FamousPlaceCard
                key={place.name}
                place={place}
                destination={destination.name}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Verified Traveler Reviews & Interactive Guestbook */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ ...revealTransition }}
        >
          <TravelerReviews
            destinationId={destination.id}
            destinationName={destination.name}
          />
        </motion.div>
      </section>
    </main>
  );
}

export default DestinationDetails;