import {
  Cloud,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Droplets,
  LoaderCircle,
  Sun,
  Thermometer,
  Wind,
} from "lucide-react";

function WeatherIconDisplay({ condition }) {
  const cond = (condition || "").toLowerCase();

  if (cond.includes("clear") || cond.includes("sun")) {
    return (
      <div className="weather-icon-badge weather-icon-badge--sun">
        <Sun size={34} strokeWidth={1.6} />
      </div>
    );
  }

  if (cond.includes("rain") || cond.includes("drizzle")) {
    return (
      <div className="weather-icon-badge weather-icon-badge--rain">
        <CloudRain size={34} strokeWidth={1.6} />
      </div>
    );
  }

  if (cond.includes("snow")) {
    return (
      <div className="weather-icon-badge weather-icon-badge--snow">
        <CloudSnow size={34} strokeWidth={1.6} />
      </div>
    );
  }

  if (cond.includes("thunder")) {
    return (
      <div className="weather-icon-badge weather-icon-badge--storm">
        <CloudLightning size={34} strokeWidth={1.6} />
      </div>
    );
  }

  return (
    <div className="weather-icon-badge weather-icon-badge--cloud">
      <CloudSun size={34} strokeWidth={1.6} />
    </div>
  );
}

function WeatherCard({
  weather,
  loading = false,
  error = "",
}) {
  if (loading) {
    return (
      <section className="weather-card weather-card--loading">
        <LoaderCircle
          className="weather-card__loader spin-icon"
          size={24}
          strokeWidth={1.5}
        />

        <div>
          <p className="section-eyebrow">CURRENT WEATHER</p>
          <h3>Loading real-time forecast...</h3>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="weather-card weather-card--error">
        <div>
          <p className="section-eyebrow">CURRENT WEATHER</p>
          <h3>Weather unavailable</h3>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  if (!weather) {
    return null;
  }

  return (
    <section className="weather-card">
      <div className="weather-card__header">
        <div>
          <p className="section-eyebrow">LIVE WEATHER</p>

          <h3>
            {weather.city}
            {weather.country ? `, ${weather.country}` : ""}
          </h3>
        </div>

        <WeatherIconDisplay condition={weather.condition} />
      </div>

      <div className="weather-card__main">
        <div className="weather-card__temperature">
          {weather.temperature}°
        </div>

        <div className="weather-card__condition">
          <strong>{weather.condition}</strong>
          <span>{weather.description}</span>
        </div>
      </div>

      <div className="weather-card__details">
        <div className="weather-detail">
          <Thermometer size={17} strokeWidth={1.5} />

          <div>
            <span>FEELS LIKE</span>
            <strong>{weather.feelsLike}°C</strong>
          </div>
        </div>

        <div className="weather-detail">
          <Droplets size={17} strokeWidth={1.5} />

          <div>
            <span>HUMIDITY</span>
            <strong>{weather.humidity}%</strong>
          </div>
        </div>

        <div className="weather-detail">
          <Wind size={17} strokeWidth={1.5} />

          <div>
            <span>WIND</span>
            <strong>{weather.windSpeed} m/s</strong>
          </div>
        </div>
      </div>

      <div className="weather-card__footer">
        <Cloud size={15} strokeWidth={1.5} />
        <span>Live atmospheric data synchronized</span>
      </div>
    </section>
  );
}

export default WeatherCard;