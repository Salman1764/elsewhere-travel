const OPENWEATHER_BASE_URL =
  "https://api.openweathermap.org/data/2.5/weather";

function interpretWmoCode(code) {
  if (code === 0) return { condition: "Clear", description: "Clear sky", icon: "01d" };
  if (code <= 3) return { condition: "Clouds", description: "Partly cloudy", icon: "02d" };
  if (code <= 48) return { condition: "Mist", description: "Foggy", icon: "50d" };
  if (code <= 55) return { condition: "Drizzle", description: "Light drizzle", icon: "09d" };
  if (code <= 67) return { condition: "Rain", description: "Rainy", icon: "10d" };
  if (code <= 77) return { condition: "Snow", description: "Snowy", icon: "13d" };
  if (code <= 82) return { condition: "Rain", description: "Passing showers", icon: "09d" };
  if (code >= 95) return { condition: "Thunderstorm", description: "Thunderstorms", icon: "11d" };
  return { condition: "Clear", description: "Fair weather", icon: "01d" };
}

export async function getWeather(latitude, longitude, cityName = "") {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  // 1. Try OpenWeather API if valid key is supplied
  if (apiKey && apiKey !== "your_openweather_api_key_here") {
    try {
      const response = await fetch(
        `${OPENWEATHER_BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
      );

      if (response.ok) {
        const data = await response.json();
        return {
          temperature: Math.round(data.main.temp),
          feelsLike: Math.round(data.main.feels_like),
          condition: data.weather?.[0]?.main || "Clear",
          description: data.weather?.[0]?.description || "Fair",
          humidity: data.main.humidity,
          windSpeed: Math.round(data.wind.speed),
          city: cityName || data.name,
          country: data.sys?.country || "",
          icon: data.weather?.[0]?.icon || "01d",
        };
      }
    } catch {
      // Fallback to Open-Meteo
    }
  }

  // 2. Open-Meteo Weather API Fallback (Free, reliable, no API key needed!)
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`
    );

    if (response.ok) {
      const data = await response.json();
      const current = data.current;
      const wmo = interpretWmoCode(current.weather_code);

      return {
        temperature: Math.round(current.temperature_2m),
        feelsLike: Math.round(current.apparent_temperature),
        condition: wmo.condition,
        description: wmo.description,
        humidity: Math.round(current.relative_humidity_2m),
        windSpeed: Math.round(current.wind_speed_10m),
        city: cityName || "Live Station",
        country: "",
        icon: wmo.icon,
      };
    }
  } catch (err) {
    throw new Error(err.message || "Unable to load weather.");
  }

  throw new Error("Unable to retrieve weather data.");
}