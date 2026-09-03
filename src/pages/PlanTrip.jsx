import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, LoaderCircle, Sparkles, Clock3, Compass, Lightbulb, MapPin } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import Itinerary from "../components/Itinerary";
import RouteTransitPlanner from "../components/RouteTransitPlanner";
import { useLanguage } from "../context/LanguageContext";
import { useLocationContext } from "../context/LocationContext";
import { cityLandmarksMap, searchCities } from "../data/worldCountries";

const travelStyles = [
  "Balanced",
  "Cultural",
  "Relaxed",
  "Adventure",
  "Food & Local Life",
];

function generateFallbackItinerary(destination, days, travelStyle) {
  const cleanDest = (destination || "").toLowerCase().trim();
  let landmarks = [];
  for (const [key, list] of Object.entries(cityLandmarksMap)) {
    if (cleanDest.includes(key) || key.includes(cleanDest)) {
      landmarks = list;
      break;
    }
  }

  const l1 = landmarks[0]?.name || `Famous Cultural Landmark of ${destination}`;
  const l2 = landmarks[1]?.name || `Iconic Monument & Heritage Quarter`;
  const l3 = landmarks[2]?.name || `Scenic Botanical Gardens & Historic Square`;
  const l4 = landmarks[3]?.name || `Panoramic Sunset Viewpoint`;

  const dayTemplates = [
    {
      theme: `Arrival & ${l1}`,
      stops: [
        {
          time: "Morning (09:00 - 12:00)",
          title: `Welcome to ${destination}`,
          description: `Check into your accommodation, refresh, and orient yourself with a relaxed stroll through the city center.`,
          tip: "Stop at a beloved local café to try regional breakfast specialties and filter coffee.",
        },
        {
          time: "Afternoon (13:30 - 16:30)",
          title: `Visit ${l1}`,
          description: `Tour ${l1} in ${destination}. Immerse yourself in the storied past, royal architecture, and local heritage.`,
          tip: "Pre-booking tickets online or arriving by early afternoon secures the best photo lighting.",
        },
        {
          time: "Evening (18:30 - 21:30)",
          title: `Golden Hour Sunset at ${l4}`,
          description: `Watch the sunset over ${destination} from ${l4} followed by an authentic ${travelStyle.toLowerCase()} dinner.`,
          tip: "Ask for seasonal regional thalis or chef specialties rather than standard menus.",
        },
      ],
    },
    {
      theme: `Heritage Exploration: ${l2}`,
      stops: [
        {
          time: "Morning (09:30 - 12:30)",
          title: `Explore ${l2}`,
          description: `Discover the grandeur of ${l2}, walking through historic corridors and admiring regional craftsmanship.`,
          tip: "Morning is when natural light is best and crowds are most relaxed.",
        },
        {
          time: "Afternoon (14:00 - 17:00)",
          title: `Tour ${l3}`,
          description: `Unwind and explore ${l3} nestled within ${destination}, taking in vibrant local culture.`,
          tip: "Local certified guides provide fascinating stories of regional legends and history.",
        },
        {
          time: "Evening (19:00 - 22:00)",
          title: "Artisan Bazaars & Traditional Dinner",
          description: `Savor traditional street delicacies and browse handcrafted regional textiles, sandalwood, or spices.`,
          tip: "Follow where local families gather after dusk for the most genuine cuisine.",
        },
      ],
    },
    {
      theme: "Scenic Excursion, Natural Splendor & Farewell Feast",
      stops: [
        {
          time: "Morning (08:30 - 12:00)",
          title: "Nature Trails & Scenic Coastal / Mountain Vistas",
          description: `Take a short morning excursion to the natural surroundings of ${destination}, taking in fresh air and inspiring vistas.`,
          tip: "Carry comfortable walking footwear, a light layer, and plenty of hydration.",
        },
        {
          time: "Afternoon (13:00 - 16:00)",
          title: "Artisanal Souvenir Hunting & Café Lounging",
          description: `Pick up unique handmade keepsakes and enjoy an unhurried afternoon reflecting on your travels.`,
          tip: "Look for independent workshops stamped with official regional artisan seals.",
        },
        {
          time: "Evening (18:30 - 21:30)",
          title: "Celebratory Farewell Dinner",
          description: `Celebrate your stay in ${destination} with a memorable culinary experience showcasing regional specialties and hospitality.`,
          tip: "Reserve early to secure a balcony or terrace table with evening views.",
        },
      ],
    },
  ];

  const generatedDays = [];
  for (let i = 0; i < days; i++) {
    const template = dayTemplates[i % dayTemplates.length];
    generatedDays.push({
      day: i + 1,
      title: template.theme,
      morning: {
        activity: template.stops[0].title,
        description: template.stops[0].description,
      },
      afternoon: {
        activity: template.stops[1].title,
        description: template.stops[1].description,
      },
      evening: {
        activity: template.stops[2].title,
        description: template.stops[2].description,
      },
      tip: template.stops[0].tip,
    });
  }

  return {
    title: `${days}-Day ${travelStyle} Journey in ${destination}`,
    destination,
    duration: `${days} Days`,
    style: travelStyle,
    summary: `A carefully curated ${days}-day ${travelStyle.toLowerCase()} journey through ${destination}, balancing iconic landmarks, rich regional culture, authentic cuisine, and moments of unhurried discovery.`,
    days: generatedDays,
    practicalTips: [
      "Keep local currency on hand for street markets, small cafés, and transit tickets.",
      "Download offline maps to effortlessly navigate pedestrian alleys and historic quarters.",
      "Check seasonal opening times for museums and landmark monuments ahead of time.",
    ],
  };
}

function PlanTrip() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useLanguage();
  const { location } = useLocationContext();

  const [destination, setDestination] = useState(
    () => searchParams.get("destination") || ""
  );
  const [days, setDays] = useState(
    () => searchParams.get("days") || "3"
  );
  const [travelStyle, setTravelStyle] = useState(
    () => searchParams.get("style") || "Balanced"
  );
  const [itinerary, setItinerary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [destSuggestions, setDestSuggestions] = useState([]);
  const [showDestDropdown, setShowDestDropdown] = useState(false);
  const destWrapRef = useRef(null);

  // Close destination suggestions on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (destWrapRef.current && !destWrapRef.current.contains(event.target)) {
        setShowDestDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDestInputChange = (e) => {
    const val = e.target.value;
    setDestination(val);
    if (val.trim().length >= 1) {
      const matches = searchCities(val, 6);
      setDestSuggestions(matches);
      setShowDestDropdown(matches.length > 0);
    } else {
      setDestSuggestions([]);
      setShowDestDropdown(false);
    }
  };

  const handleSelectDest = (cityName) => {
    setDestination(cityName);
    setShowDestDropdown(false);
  };

  // Auto-generate itinerary if shared link contains destination
  useEffect(() => {
    const destParam = searchParams.get("destination");
    if (destParam && !itinerary) {
      const daysParam = searchParams.get("days") || "3";
      const styleParam = searchParams.get("style") || "Balanced";
      const cleanDest = destParam.trim().replace(/\s*,\s*/g, ", ");
      setDestination(cleanDest);
      setDays(daysParam);
      setTravelStyle(styleParam);

      const fallback = generateFallbackItinerary(
        cleanDest,
        Number(daysParam),
        styleParam
      );
      setItinerary(fallback);
    }
  }, [searchParams]);

  const generateItinerary = async (event) => {
    if (event) event.preventDefault();

    const trimmedDestination = destination
      .trim()
      .replace(/\s*,\s*/g, ", ");

    if (!trimmedDestination) {
      setError("Please enter a destination.");
      return;
    }

    // Update browser URL query params so the link is instantly shareable!
    setSearchParams({
      destination: trimmedDestination,
      days,
      style: travelStyle,
    });

    setIsLoading(true);
    setError("");
    setItinerary(null);

    try {
      const response = await fetch("/api/itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destination: trimmedDestination,
          days: Number(days),
          travelStyle,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.itinerary) {
          setItinerary(data.itinerary);
          return;
        }
      }

      // If backend API isn't running or fails, seamlessly use dynamic fallback
      const fallback = generateFallbackItinerary(
        trimmedDestination,
        Number(days),
        travelStyle
      );
      setItinerary(fallback);
    } catch {
      const fallback = generateFallbackItinerary(
        trimmedDestination,
        Number(days),
        travelStyle
      );
      setItinerary(fallback);
    } finally {
      setIsLoading(false);
    }
  };

  const ease = [0.22, 1, 0.36, 1];

  return (
    <main className="plan-trip-page">
      <section className="plan-trip-hero">
        <div className="plan-trip-hero__inner">
          <motion.span
            className="plan-trip-hero__eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease,
              delay: 0.15,
            }}
          >
            03 / {t("navPlanTrip") ? t("navPlanTrip").toUpperCase() : "PLAN A TRIP"}
          </motion.span>

          <motion.h1
            initial={{
              opacity: 0,
              y: 45,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 1.1,
              ease,
              delay: 0.3,
            }}
          >
            Your next journey,
            <br />
            <em>planned by AI.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease,
              delay: 0.55,
            }}
          >
            Tell Elsewhere where you want to go, how long you have,
            and the kind of experience you want.
          </motion.p>
        </div>
      </section>

      {/* Builder section using the exact styling classes from App.css */}
      <section className="plan-trip-builder">
        <div className="plan-trip-builder__inner">
          <motion.div
            className="plan-trip-form-card"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.8,
              ease,
            }}
          >
            <motion.div
              className="plan-trip-form-card__intro"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.15,
                ease,
              }}
            >
              <motion.div
                className="plan-trip-form-card__icon"
                initial={{ scale: 0.7, rotate: -15 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.2,
                  ease,
                }}
              >
                <Sparkles size={20} />
              </motion.div>

              <div>
                <span>ELSEWHERE AI</span>
                <h2>Build your itinerary</h2>
              </div>
            </motion.div>

            <motion.form
              onSubmit={generateItinerary}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.25,
              }}
            >
              <label htmlFor="trip-destination">Destination</label>
              <div className="plan-trip-dest-wrapper" ref={destWrapRef}>
                <motion.input
                  id="trip-destination"
                  type="text"
                  value={destination}
                  onChange={handleDestInputChange}
                  onFocus={() => {
                    if (destSuggestions.length > 0) setShowDestDropdown(true);
                  }}
                  placeholder="e.g. Bengaluru, Mysuru, Chitradurga, Mumbai, Kyoto..."
                  required
                  autoComplete="off"
                  whileFocus={{
                    scale: 1.01,
                  }}
                />

                <AnimatePresence>
                  {showDestDropdown && destSuggestions.length > 0 && (
                    <motion.div
                      className="dest-autocomplete-dropdown"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.18 }}
                    >
                      {destSuggestions.map((city) => (
                        <button
                          key={`${city.name}-${city.country}`}
                          type="button"
                          className="dest-autocomplete-item"
                          onClick={() => handleSelectDest(city.name)}
                        >
                          <MapPin size={14} className="text-gold" />
                          <div className="dest-autocomplete-info">
                            <strong>{city.name}</strong>
                            <span>{city.state ? `${city.state}, ` : ""}{city.country}</span>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <label htmlFor="trip-days">Number of days</label>
              <motion.select
                id="trip-days"
                value={days}
                onChange={(event) => setDays(event.target.value)}
                whileFocus={{
                  scale: 1.01,
                }}
              >
                {[1, 2, 3, 4, 5, 7, 10, 14].map((d) => (
                  <option key={d} value={d}>
                    {d} {d === 1 ? "day" : "days"}
                  </option>
                ))}
              </motion.select>

              <label htmlFor="trip-style">Travel style</label>
              <motion.select
                id="trip-style"
                value={travelStyle}
                onChange={(event) => setTravelStyle(event.target.value)}
                whileFocus={{
                  scale: 1.01,
                }}
              >
                {travelStyles.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </motion.select>

              {error && (
                <motion.p
                  className="plan-trip-form__error"
                  role="alert"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                type="submit"
                className="plan-trip-form__submit"
                disabled={isLoading}
                whileHover={
                  !isLoading
                    ? {
                        y: -2,
                        scale: 1.01,
                      }
                    : undefined
                }
                whileTap={
                  !isLoading
                    ? {
                        scale: 0.98,
                      }
                    : undefined
                }
              >
                {isLoading ? (
                  <>
                    <LoaderCircle className="spin-icon" size={18} />
                    <span>Creating your trip...</span>
                  </>
                ) : (
                  <>
                    <span>Generate itinerary</span>
                    <motion.span
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight size={18} />
                    </motion.span>
                  </>
                )}
              </motion.button>
            </motion.form>
          </motion.div>

          <div className="plan-trip-preview">
            {!itinerary && !isLoading && (
              <motion.div
                className="plan-trip-preview__empty"
                initial={{
                  opacity: 0,
                  y: 35,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.9,
                  ease,
                  delay: 0.15,
                }}
              >
                <div className="plan-trip-preview__header-badge">
                  <Sparkles size={14} className="sparkle-amber" />
                  <span>AI ITINERARY STUDIO</span>
                </div>

                <h2>
                  A bespoke journey,
                  <br />
                  <em>crafted for your style.</em>
                </h2>

                <p className="plan-trip-preview__subtitle">
                  Configure your destination and preferences on the left to generate an intelligent, day-by-day travel plan curated with authentic local insight.
                </p>

                <div className="plan-trip-features-grid">
                  <div className="preview-feature-card">
                    <div className="preview-feature-icon preview-feature-icon--pace">
                      <Clock3 size={18} />
                    </div>
                    <div>
                      <strong>Balanced Pacing</strong>
                      <p>Curated morning, afternoon, and evening flows.</p>
                    </div>
                  </div>

                  <div className="preview-feature-card">
                    <div className="preview-feature-icon preview-feature-icon--culture">
                      <Compass size={18} />
                    </div>
                    <div>
                      <strong>Iconic & Hidden Spots</strong>
                      <p>Famous landmarks combined with quiet local gems.</p>
                    </div>
                  </div>

                  <div className="preview-feature-card">
                    <div className="preview-feature-icon preview-feature-icon--tip">
                      <Lightbulb size={18} />
                    </div>
                    <div>
                      <strong>Insider Tips</strong>
                      <p>Practical navigation, ticketing, and food wisdom.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {isLoading && (
              <motion.div
                className="plan-trip-preview__loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="plan-trip-ai-loader"
                  animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.65, 1, 0.65],
                    rotate: [0, 4, -4, 0],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles size={30} strokeWidth={1.4} />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.15,
                  }}
                >
                  Planning your journey...
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.25,
                  }}
                >
                  Elsewhere AI is creating a day-by-day experience
                  for you.
                </motion.p>
              </motion.div>
            )}

            {itinerary && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  ease,
                }}
              >
                <RouteTransitPlanner
                  originName={location?.name || "Bengaluru"}
                  destinationName={destination || "Mumbai"}
                />
                <Itinerary itinerary={itinerary} />
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default PlanTrip;