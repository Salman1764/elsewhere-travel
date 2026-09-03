import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Search,
  SlidersHorizontal,
  X,
  Heart,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import DestinationCard from "../components/DestinationCard";
import LocationPicker from "../components/LocationPicker";
import destinations, { allDestinations } from "../data/destinations";
import { createDynamicCityDestination } from "../data/worldCountries";
import { useLanguage } from "../context/LanguageContext";
import { useLocationContext } from "../context/LocationContext";
import { useWishlist } from "../context/WishlistContext";

const filterCategories = [
  { id: "All", labelKey: "filterAll" },
  { id: "Asia", labelKey: "filterAsia" },
  { id: "Europe", labelKey: "filterEurope" },
  { id: "Africa", labelKey: "filterAfrica" },
  { id: "North America", labelKey: "filterNorthAmerica" },
  { id: "South America", labelKey: "filterSouthAmerica" },
  { id: "Oceania", labelKey: "filterOceania" },
  { id: "Saved", labelKey: "navSaved" },
];

const INITIAL_LIMIT = 6;

function Home() {
  const { t } = useLanguage();
  const { location, openLocationModal } = useLocationContext();
  const { isSaved, wishlistCount } = useWishlist();

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(INITIAL_LIMIT);

  const filteredDestinations = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    // Search across full global catalog when searching, or curated collection when browsing
    const sourceList = normalizedSearch ? allDestinations : destinations;

    const matched = sourceList.filter((destination) => {
      const matchesSearch =
        !normalizedSearch ||
        destination.name.toLowerCase().includes(normalizedSearch) ||
        destination.country.toLowerCase().includes(normalizedSearch) ||
        destination.region.toLowerCase().includes(normalizedSearch) ||
        destination.category.toLowerCase().includes(normalizedSearch) ||
        destination.description.toLowerCase().includes(normalizedSearch);

      let matchesFilter = true;
      if (activeFilter === "All") {
        matchesFilter = true;
      } else if (activeFilter === "Saved") {
        matchesFilter = isSaved(destination.id);
      } else {
        matchesFilter =
          destination.region === activeFilter ||
          (destination.region === "World Discovery" && activeFilter === "All");
      }

      return matchesSearch && matchesFilter;
    });

    // If searching any city/country not yet in database, dynamically generate it!
    if (matched.length === 0 && normalizedSearch.length >= 2 && activeFilter !== "Saved") {
      const dynamicCity = createDynamicCityDestination(searchTerm.trim());
      return [dynamicCity];
    }

    return matched;
  }, [searchTerm, activeFilter, isSaved]);

  const isSearchingOrFiltering = Boolean(searchTerm.trim() || activeFilter !== "All");
  const displayedDestinations = isSearchingOrFiltering
    ? filteredDestinations
    : filteredDestinations.slice(0, visibleCount);

  const canExpand = !isSearchingOrFiltering && visibleCount < filteredDestinations.length;
  const canCollapse =
    !isSearchingOrFiltering &&
    visibleCount >= filteredDestinations.length &&
    filteredDestinations.length > INITIAL_LIMIT;

  const clearSearch = () => {
    setSearchTerm("");
    setVisibleCount(INITIAL_LIMIT);
  };

  const revealTransition = {
    duration: 0.8,
    ease: [0.22, 1, 0.36, 1],
  };

  return (
    <main>
      <Hero onSearchSubmit={(term) => setSearchTerm(term)} />

      <section id="destinations" className="destinations-section">
        <div className="destinations-section__inner">
          <div className="section-heading">
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                ...revealTransition,
                delay: 0.05,
              }}
            >
              <p className="section-eyebrow">{t("destEyebrow")}</p>

              <h2>
                {t("destHeading1")}
                <br />
                <em>{t("destHeading2")}</em>
              </h2>
            </motion.div>

            <motion.p
              className="section-heading__description"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                ...revealTransition,
                delay: 0.2,
              }}
            >
              {t("destDesc")}
            </motion.p>
          </div>

          <motion.div
            className="destination-tools"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              ...revealTransition,
              delay: 0.25,
            }}
          >
            <div className="destination-search">
              <Search size={18} strokeWidth={1.7} />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder={t("searchPlaceholder")}
                aria-label="Search destinations"
              />

              {searchTerm && (
                <motion.button
                  type="button"
                  onClick={clearSearch}
                  aria-label="Clear destination search"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <X size={17} />
                </motion.button>
              )}
            </div>

            <div className="destination-filters">
              <SlidersHorizontal size={17} strokeWidth={1.7} />

              {filterCategories.map((cat, index) => {
                const isActive = activeFilter === cat.id;
                const label = t(cat.labelKey) || cat.id;
                return (
                  <motion.button
                    key={cat.id}
                    type="button"
                    className={
                      isActive
                        ? "destination-filter destination-filter--active"
                        : "destination-filter"
                    }
                    onClick={() => setActiveFilter(cat.id)}
                    aria-pressed={isActive}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{
                      duration: 0.2,
                      delay: index * 0.02,
                    }}
                  >
                    {cat.id === "Saved" && (
                      <Heart
                        size={13}
                        style={{ marginRight: "5px" }}
                        fill={isActive ? "#ff5370" : "none"}
                      />
                    )}
                    {label}
                    {cat.id === "Saved" && wishlistCount > 0 && (
                      <span className="destination-filter__count">
                        {" "}
                        ({wishlistCount})
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {filteredDestinations.length > 0 ? (
            <>
              <div className="destination-grid">
                {displayedDestinations.map((destination, index) => (
                  <DestinationCard
                    key={destination.id}
                    destination={destination}
                    index={index}
                  />
                ))}
              </div>

              {canExpand && (
                <div className="destinations-expand-wrap">
                  <motion.button
                    type="button"
                    className="destinations-expand-btn"
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span>Explore More Destinations</span>
                    <span className="expand-badge">
                      +{filteredDestinations.length - visibleCount} more
                    </span>
                    <ChevronDown size={16} />
                  </motion.button>
                </div>
              )}

              {canCollapse && (
                <div className="destinations-expand-wrap">
                  <motion.button
                    type="button"
                    className="destinations-expand-btn destinations-expand-btn--collapse"
                    onClick={() => setVisibleCount(INITIAL_LIMIT)}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span>Show Curated Selection</span>
                    <ChevronUp size={16} />
                  </motion.button>
                </div>
              )}
            </>
          ) : (
            <motion.div
              className="destination-empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={revealTransition}
            >
              <span>NO RESULTS</span>

              <h3>{t("noResultsTitle")}</h3>

              <p>{t("noResultsDesc")}</p>

              <motion.button
                type="button"
                onClick={() => {
                  clearSearch();
                  setActiveFilter("All");
                }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                {t("clearSearch")}
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Location Starting Point Section */}
      <LocationPicker />

      {location && (
        <motion.section
          className="location-result"
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="location-result__card">
            <motion.div
              className="location-result__icon"
              initial={{
                opacity: 0,
                scale: 0.7,
                rotate: -10,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.15,
              }}
            >
              <MapPin size={22} strokeWidth={1.8} />
            </motion.div>

            <div className="location-result__content">
              <span className="location-result__eyebrow">
                02 / {t("locEyebrow")}
              </span>

              <h2>{location.name || "Current Location"}</h2>

              <p>
                {location.name ? (
                  <>
                    {location.state ? `${location.state}, ` : ""}
                    {location.country || "Location active"}
                  </>
                ) : (
                  "Your starting location is configured."
                )}
              </p>

              {location.latitude && location.longitude && (
                <span className="location-result__coordinates">
                  📍 {Number(location.latitude).toFixed(4)}°,{" "}
                  {Number(location.longitude).toFixed(4)}° • ACTIVE BASE
                </span>
              )}
            </div>

            <motion.div
              className="location-result__actions"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.3,
              }}
            >
              <div className="location-result__ready-badge">
                <span className="location-result__pulse-dot" />
                <span>BASE ACTIVE & READY</span>
              </div>

              <div className="location-result__btn-group">
                <button
                  type="button"
                  className="location-change-btn"
                  onClick={openLocationModal}
                >
                  Change Location
                </button>

                <Link to="/plan" className="location-plan-btn">
                  Plan Trip →
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* About Section */}
      <motion.section
        id="about"
        className="home-about"
        initial={{
          opacity: 0,
          y: 30,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          ...revealTransition,
          delay: 0.1,
        }}
      >
        <div className="home-about__inner">
          <motion.div
            className="home-about__intro"
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span>02 / ABOUT ELSEWHERE</span>

            <h2>
              Travel
              <br />
              <em>differently.</em>
            </h2>
          </motion.div>

          <motion.div
            className="home-about__content"
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p>
              Elsewhere is an editorial front-end travel experience designed to make
              destination discovery feel inspiring, visual, and personal. The
              application combines React 19, real-time weather, geolocation
              services, multi-language internationalization, responsive design,
              refined UI motion, and AI-powered trip planning.
            </p>

            <div className="home-about__creator">
              <span>ABOUT THE CREATOR</span>

              <h3>
                Built with curiosity,
                <br />
                <em>designed with purpose.</em>
              </h3>

              <p>
                A front-end developer passionate about creating thoughtful,
                high-performance, and beautifully crafted web experiences.
              </p>
            </div>

            <div className="home-about__skills">
              <span>REACT 19</span>
              <span>GEOLOCATION</span>
              <span>OPENWEATHER API</span>
              <span>I18N LOCALIZATION</span>
              <span>MOTION ANIMATION</span>
              <span>AI ITINERARY</span>
            </div>

            <Link to="/plan" className="home-about__link">
              <span>Plan your journey</span>

              <motion.span
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight size={18} strokeWidth={1.6} />
              </motion.span>
            </Link>
          </motion.div>
        </div>

        <div className="home-about__footer">
          <span>ELSEWHERE</span>
          <span>DISCOVER / EXPLORE / JOURNEY</span>
          <span>2026</span>
        </div>
      </motion.section>
    </main>
  );
}

export default Home;