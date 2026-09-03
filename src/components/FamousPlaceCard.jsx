import { motion } from "framer-motion";
import { Sparkles, MapPin } from "lucide-react";
import { getFamousPlaceQuery, getFallbackImage } from "../services/images";
import { usePexelsImage } from "../hooks/usePexelsImage";

function FamousPlaceCard({ place, destination, index = 0 }) {
  // If place.image is explicitly defined, use it instantly without any slow API delay!
  const searchQuery = place?.image ? "" : getFamousPlaceQuery(place, destination);
  const { url: pexelsUrl, loading } = usePexelsImage(searchQuery);

  const displayImage = place?.image || pexelsUrl || getFallbackImage(place?.name, 600);

  return (
    <motion.article
      className="famous-place-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="famous-place-card__image-wrap">
        <img
          src={displayImage}
          alt={place.name}
          className="famous-place-card__image"
          loading="eager"
          decoding="async"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = getFallbackImage(place?.name, 600);
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