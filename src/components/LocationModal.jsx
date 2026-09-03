import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, MapPin, Search, LoaderCircle, CheckCircle2, Navigation } from "lucide-react";
import { useLocationContext } from "../context/LocationContext";
import { useLanguage } from "../context/LanguageContext";

function LocationModal() {
  const {
    location,
    isLocationModalOpen,
    closeLocationModal,
    detectLocation,
    searchAndSetLocation,
    clearLocation,
    loading,
    error,
    setError,
  } = useLocationContext();

  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  if (!isLocationModalOpen) return null;

  const handleGPS = async () => {
    try {
      await detectLocation();
    } catch {
      // Error handled in context
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setError("Please enter a city or location name.");
      return;
    }
    try {
      await searchAndSetLocation(searchTerm);
      setSearchTerm("");
    } catch {
      // Error handled in context
    }
  };

  return (
    <AnimatePresence>
      <div className="location-modal-overlay" onClick={closeLocationModal}>
        <motion.div
          className="location-modal"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="location-modal__close"
            onClick={closeLocationModal}
            aria-label="Close location dialog"
          >
            <X size={20} />
          </button>

          <div className="location-modal__header">
            <span className="location-modal__eyebrow">{t("locEyebrow")}</span>
            <h2>{t("locModalTitle")}</h2>
            <p>{t("locModalSubtitle")}</p>
          </div>

          {location && (
            <div className="location-modal__current-badge">
              <div className="location-badge-info">
                <CheckCircle2 size={18} className="location-badge-icon" />
                <div>
                  <strong>{location.name}</strong>
                  <span>{location.country ? `, ${location.country}` : ""}</span>
                </div>
              </div>
              <button
                type="button"
                className="location-clear-btn"
                onClick={clearLocation}
              >
                Change
              </button>
            </div>
          )}

          {error && (
            <div className="location-modal__error" role="alert">
              <span>{error}</span>
            </div>
          )}

          <div className="location-modal__body">
            <button
              type="button"
              className="location-gps-btn"
              onClick={handleGPS}
              disabled={loading}
            >
              {loading ? (
                <LoaderCircle size={20} className="spin-icon" />
              ) : (
                <Navigation size={20} />
              )}
              <div className="location-gps-btn-text">
                <strong>{t("locUseGPS")}</strong>
                <small>Automatically detect city via browser GPS</small>
              </div>
            </button>

            <div className="location-modal__divider">
              <span>or enter location manually</span>
            </div>

            <form onSubmit={handleSearch} className="location-modal__form">
              <div className="location-input-wrapper">
                <MapPin size={18} className="location-input-icon" />
                <input
                  type="text"
                  placeholder={t("locSearchPlaceholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
                <button
                  type="submit"
                  className="location-submit-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <LoaderCircle size={16} className="spin-icon" />
                  ) : (
                    <Search size={16} />
                  )}
                  <span>{t("locSearchBtn")}</span>
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default LocationModal;
