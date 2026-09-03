import { ArrowUpRight, MapPin, Heart, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getDestinationQuery } from "../services/images";
import { usePexelsImage } from "../hooks/usePexelsImage";
import { useWishlist } from "../context/WishlistContext";

function DestinationCard({ destination, index = 0 }) {
  const { url, loading } = usePexelsImage(getDestinationQuery(destination));
  const { isSaved, toggleWishlist } = useWishlist();
  const saved = isSaved(destination.id);

  const handleHeartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(destination.id);
  };

  return (
    <motion.article
      className="destination-card"
      initial={{
        opacity: 0,
        y: 45,
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
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link
        to={`/destination/${destination.id}`}
        className="destination-card__link"
      >
        <motion.div
          className={`destination-card__image-wrap ${
            loading ? "is-loading" : ""
          }`}
          whileHover={{
            y: -4,
          }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.img
            src={url}
            alt={`${destination.name}, ${destination.country}`}
            className="destination-card__image"
            loading="lazy"
            whileHover={{
              scale: 1.06,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          <div className="destination-card__image-overlay" />

          <motion.span
            className="destination-card__category"
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.08 + 0.25,
            }}
          >
            {destination.category}
          </motion.span>

          {/* Wishlist Heart Toggle */}
          <motion.button
            type="button"
            className={`destination-card__wishlist ${
              saved ? "destination-card__wishlist--saved" : ""
            }`}
            onClick={handleHeartClick}
            aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
          >
            <Heart
              size={17}
              fill={saved ? "#ff5370" : "none"}
              stroke={saved ? "#ff5370" : "#ffffff"}
            />
          </motion.button>

          <motion.div
            className="destination-card__location"
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: index * 0.08 + 0.3,
            }}
          >
            <MapPin size={14} strokeWidth={1.7} />
            <span>{destination.country}</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="destination-card__content"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: index * 0.08 + 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="destination-card__header-row">
            <h3>{destination.name}</h3>
            <span className="destination-card__budget-tag">
              {destination.budgetPerDay}
            </span>
          </div>

          <p className="destination-card__desc">{destination.description}</p>

          <div className="destination-card__footer-row">
            <span className="destination-card__season-badge">
              <Calendar size={13} strokeWidth={1.8} />
              <span>{destination.bestTime}</span>
            </span>

            <span className="destination-card__explore-link">
              Explore <span>→</span>
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.article>
  );
}

export default DestinationCard;