// Enhanced location service with GPS reverse geocoding and Open-Meteo fallback
export function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(
        new Error("Location services are not supported by this browser.")
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // Try reverse geocoding to give the user a friendly city name
        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          if (response.ok) {
            const data = await response.json();
            const cityName =
              data.city || data.locality || data.principalSubdivision || "Current Location";
            const countryName = data.countryName || "";
            const stateName = data.principalSubdivision || "";

            resolve({
              latitude,
              longitude,
              name: cityName,
              country: countryName,
              state: stateName,
            });
            return;
          }
        } catch {
          // If reverse geocoding fails, fallback to coordinates
        }

        resolve({
          latitude,
          longitude,
          name: "Current Location",
          country: "",
          state: "",
        });
      },
      (error) => {
        let message = "Unable to get your location.";

        if (error.code === error.PERMISSION_DENIED) {
          message =
            "Location permission was denied. You can search for a location manually.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          message = "Your location is currently unavailable.";
        } else if (error.code === error.TIMEOUT) {
          message = "Location request timed out. Please try again.";
        }

        reject(new Error(message));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  });
}

export async function searchLocation(query) {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    throw new Error("Please enter a city or place to search.");
  }

  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  // 1. Try OpenWeather if key is available
  if (apiKey && apiKey !== "your_openweather_api_key_here") {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
          trimmedQuery
        )}&limit=5&appid=${apiKey}`
      );

      if (response.ok) {
        const results = await response.json();
        if (results && results.length > 0) {
          const place = results[0];
          return {
            latitude: place.lat,
            longitude: place.lon,
            name: place.name,
            country: place.country || "",
            state: place.state || "",
          };
        }
      }
    } catch {
      // Fallback to open-meteo below
    }
  }

  // 2. Open-Meteo Geocoding Fallback (Completely free, no key needed, works anywhere)
  try {
    const fallbackResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        trimmedQuery
      )}&count=5&language=en&format=json`
    );

    if (fallbackResponse.ok) {
      const data = await fallbackResponse.json();
      if (data.results && data.results.length > 0) {
        const place = data.results[0];
        return {
          latitude: place.latitude,
          longitude: place.longitude,
          name: place.name,
          country: place.country || "",
          state: place.admin1 || "",
        };
      }
    }
  } catch {
    throw new Error("Unable to search for that location right now.");
  }

  throw new Error("Location not found. Try another city or place.");
}