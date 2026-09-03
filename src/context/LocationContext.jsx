import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentLocation, searchLocation } from "../services/location";

const LocationContext = createContext(null);

const STORAGE_KEY = "elsewhere_user_location";

export function LocationProvider({ children }) {
  const [location, setLocation] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      if (location) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(location));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Ignore
    }
  }, [location]);

  const openLocationModal = () => {
    setError("");
    setIsLocationModalOpen(true);
  };

  const closeLocationModal = () => {
    setIsLocationModalOpen(false);
  };

  const detectLocation = async () => {
    setLoading(true);
    setError("");
    try {
      const loc = await getCurrentLocation();
      setLocation(loc);
      closeLocationModal();
      return loc;
    } catch (err) {
      setError(err.message || "Failed to detect location.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const searchAndSetLocation = async (query) => {
    setLoading(true);
    setError("");
    try {
      const loc = await searchLocation(query);
      setLocation(loc);
      closeLocationModal();
      return loc;
    } catch (err) {
      setError(err.message || "Unable to find that location.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearLocation = () => {
    setLocation(null);
  };

  const value = {
    location,
    setLocation,
    isLocationModalOpen,
    openLocationModal,
    closeLocationModal,
    detectLocation,
    searchAndSetLocation,
    clearLocation,
    loading,
    error,
    setError,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationContext() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error(
      "useLocationContext must be used within a LocationProvider"
    );
  }
  return context;
}
