import { motion } from "framer-motion";
import { Sparkles, MapPin } from "lucide-react";
import { getFamousPlaceQuery, getFallbackImage } from "../services/images";
import { usePexelsImage } from "../hooks/usePexelsImage";

function FamousPlaceCard({ place, destination, index = 0 }) {
  const { url, loading } = usePexelsImage(
    getFamousPlaceQuery(place, destination)
  );

  const displayImage = place.image || url || getFallbackImage(place.name, 1200);

  return (
    <motion.article
      className="famous-place-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div
        className={`famous-place-card__image-wrap ${
          loading && !place.image ? "is-loading" : ""
        }`}
      >
        <img
          src={displayImage}
          alt={place.name}
          className="famous-place-card__image"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=85";
          }}
        />

        <div className="famous-place-card__overlay" />

        <div className="famous-place-card__badge">
          <Sparkles size={11} />
          <span>0{index + 1} • MUST SEE</span>
        </div>
      </div>

      <div className="famous-place-card__content">
        <div className="famous-place-card__header-row">
          <h3>{place.name}</h3>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${place.name} ${typeof destination === "object" ? destination.name : destination}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="famous-place-card__map-link"
            title={`View ${place.name} on Google Maps`}
          >
            <MapPin size={12} />
            <span>Map ↗</span>
          </a>
        </div>
        <p>{place.description}</p>
      </div>
    </motion.article>
  );
}

export default FamousPlaceCard;