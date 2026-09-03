import { ArrowDown, MapPin, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

function Hero({ onSearchSubmit }) {
  const { t } = useLanguage();
  const [heroSearch, setHeroSearch] = useState("");

  const scrollToDestinations = () => {
    document
      .getElementById("destinations")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleHeroSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(heroSearch);
    }
    scrollToDestinations();
  };

  const heroEase = [0.22, 1, 0.36, 1];

  return (
    <section className="hero" aria-label="Travel discovery">
      <motion.div
        className="hero__media"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 2.2,
          ease: heroEase,
        }}
      >
        <video
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2000&q=80"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-a-woman-walking-in-a-desert-1574/1080p.mp4"
            type="video/mp4"
          />
        </video>
      </motion.div>

      <motion.div
        className="hero__overlay"
        initial={{ opacity: 0.25 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.6,
          ease: "easeOut",
        }}
      />

      <div className="hero__content">
        <motion.div
          className="hero__eyebrow"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.25,
            ease: heroEase,
          }}
        >
          <span className="hero__eyebrow-line" />
          <span>{t("heroEyebrow")}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 45, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 1.15,
            delay: 0.38,
            ease: heroEase,
          }}
        >
          {t("heroTitleLine1")}
          <br />
          <em>{t("heroTitleLine2")}</em>
        </motion.h1>

        <motion.p
          className="hero__description"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.62,
            ease: heroEase,
          }}
        >
          {t("heroDesc")}
        </motion.p>

        <motion.form
          className="hero__search"
          onSubmit={handleHeroSearchSubmit}
          initial={{
            opacity: 0,
            y: 28,
            scale: 0.97,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.9,
            delay: 0.78,
            ease: heroEase,
          }}
          whileHover={{
            y: -2,
            scale: 1.01,
          }}
        >
          <MapPin size={19} strokeWidth={1.7} />

          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            aria-label="Search for a destination"
            value={heroSearch}
            onChange={(e) => setHeroSearch(e.target.value)}
          />

          <button type="submit" aria-label="Search destination">
            <Search size={19} strokeWidth={1.8} />
          </button>
        </motion.form>
      </div>

      <motion.button
        type="button"
        className="hero__scroll"
        onClick={scrollToDestinations}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.9,
          delay: 1.25,
          ease: heroEase,
        }}
        whileHover={{
          y: -3,
        }}
        whileTap={{
          scale: 0.96,
        }}
        aria-label="Scroll to destinations"
      >
        <span>Scroll to explore</span>
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ArrowDown size={17} strokeWidth={1.5} />
        </motion.span>
      </motion.button>

      <motion.div
        className="hero__meta"
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.9,
          delay: 1.35,
          ease: heroEase,
        }}
      >
        <span>01</span>
        <span className="hero__meta-line" />
        <span>DISCOVER</span>
      </motion.div>
    </section>
  );
}

export default Hero;