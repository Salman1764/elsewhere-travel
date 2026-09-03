import { motion } from "framer-motion";
import { LoaderCircle, Search, Navigation } from "lucide-react";
import { useState } from "react";
import { useLocationContext } from "../context/LocationContext";
import { useLanguage } from "../context/LanguageContext";

function LocationPicker({ onLocationChange }) {
  const {
    detectLocation,
    searchAndSetLocation,
    loading: contextLoading,
    error: contextError,
    setError: setContextError,
  } = useLocationContext();

  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [localError, setLocalError] = useState("");

  const handleCurrentLocation = async () => {
    setLocalError("");
    setContextError("");
    try {
      const loc = await detectLocation();
      if (onLocationChange) onLocationChange(loc);
    } catch (error) {
      setLocalError(error.message || "Unable to get your current location.");
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const trimmedSearch = searchTerm.trim();

    if (!trimmedSearch) {
      setLocalError("Please enter a location to search.");
      return;
    }

    setLocalError("");
    setContextError("");

    try {
      const loc = await searchAndSetLocation(trimmedSearch);
      if (onLocationChange) onLocationChange(loc);
      setSearchTerm("");
    } catch (error) {
      setLocalError(error.message || "Unable to search for that location.");
    }
  };

  const ease = [0.22, 1, 0.36, 1];
  const activeError = localError || contextError;

  return (
    <section className="location-picker">
      <motion.div
        className="location-picker__heading"
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
          amount: 0.25,
        }}
        transition={{
          duration: 0.8,
          ease,
        }}
      >
        <div>
          <motion.p
            className="section-eyebrow"
            initial={{
              opacity: 0,
              y: 12,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.55,
              delay: 0.1,
              ease,
            }}
          >
            {t("locEyebrow")}
          </motion.p>

          <motion.h2
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
              duration: 0.75,
              delay: 0.2,
              ease,
            }}
          >
            {t("locHeading1")} <em>{t("locHeading2")}</em>
          </motion.h2>
        </div>
      </motion.div>

      <motion.div
        className="location-picker__actions"
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
          duration: 0.8,
          delay: 0.15,
          ease,
        }}
      >
        <motion.button
          type="button"
          className="location-picker__current"
          onClick={handleCurrentLocation}
          disabled={contextLoading}
          whileHover={!contextLoading ? { y: -3 } : undefined}
          whileTap={!contextLoading ? { scale: 0.98 } : undefined}
        >
          {contextLoading ? (
            <LoaderCircle
              className="location-picker__loader spin-icon"
              size={18}
            />
          ) : (
            <Navigation size={18} strokeWidth={1.7} />
          )}

          <span>
            {contextLoading ? t("locFinding") : t("locUseGPS")}
          </span>
        </motion.button>

        <motion.form
          className="location-picker__search"
          onSubmit={handleSearch}
          whileFocus={{
            scale: 1.005,
          }}
        >
          <Search size={18} strokeWidth={1.7} />

          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder={t("locSearchPlaceholder")}
            aria-label="Search for a location"
          />

          <motion.button
            type="submit"
            aria-label="Search location"
            whileHover={{
              x: 2,
            }}
            whileTap={{
              scale: 0.96,
            }}
          >
            {t("locSearchBtn")}
          </motion.button>
        </motion.form>
      </motion.div>

      {activeError && (
        <motion.p
          className="location-picker__error"
          role="alert"
          initial={{
            opacity: 0,
            y: -8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
            ease,
          }}
        >
          {activeError}
        </motion.p>
      )}
    </section>
  );
}

export default LocationPicker;