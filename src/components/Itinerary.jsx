import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sunrise,
  Sun,
  Sunset,
  Lightbulb,
  Compass,
  Sparkles,
  MapPin,
  Clock,
  Layers,
  Printer,
  Share2,
  Check,
  ExternalLink,
  Luggage,
  CheckSquare,
  Square,
  Coins,
} from "lucide-react";

const PACKING_ITEMS = [
  "Valid Passport & Travel Visas",
  "Universal Travel Adapter (with USB-C)",
  "Comfortable Walking Shoes (Broken-in)",
  "Lightweight Rain Shell / Layered Jacket",
  "Portable 10,000mAh Power Bank",
  "Personal First-Aid & Hydration Salts",
  "Digital & Printed Hotel/Flight Vouchers",
  "Noise-Cancelling Travel Headphones",
];

const CURRENCIES = {
  INR: { symbol: "₹", rate: 94.97, name: "Indian Rupee" },
  USD: { symbol: "$", rate: 1.0, name: "US Dollar" },
  EUR: { symbol: "€", rate: 0.86, name: "Euro" },
  GBP: { symbol: "£", rate: 0.74, name: "British Pound" },
};

function Itinerary({ itinerary }) {
  const [copied, setCopied] = useState(false);
  const [showChecklist, setShowChecklist] = useState(false);
  const [checkedItems, setCheckedItems] = useState(new Set());
  const [selectedCurrency, setSelectedCurrency] = useState("INR");

  if (!itinerary) {
    return null;
  }

  const curr = CURRENCIES[selectedCurrency] || CURRENCIES.INR;

  const toggleCheckItem = (item) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(item)) {
        next.delete(item);
      } else {
        next.add(item);
      }
      return next;
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const daysList = Array.isArray(itinerary.days) ? itinerary.days : [];
  const rawTitle = itinerary.title || `${itinerary.destination || "Custom"} Journey`;
  const cleanTitle = rawTitle.replace(/\s*,\s*/g, ", ");
  const cleanDestination = (itinerary.destination || "").replace(/\s*,\s*/g, ", ");

  const handleShare = async () => {
    try {
      const destParam = encodeURIComponent(cleanDestination || cleanTitle);
      const daysParam = daysList.length || 3;
      const styleParam = encodeURIComponent(itinerary.style || itinerary.travelStyle || "Balanced");
      const shareUrl = `${window.location.origin}/plan?destination=${destParam}&days=${daysParam}&style=${styleParam}`;

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
    }
  };

  const ease = [0.22, 1, 0.36, 1];

  const dayVariants = {
    hidden: {
      opacity: 0,
      y: 35,
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.75,
        delay: index * 0.12,
        ease,
      },
    }),
  };

  const stopVariants = {
    hidden: {
      opacity: 0,
      x: -12,
    },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.55,
        delay: index * 0.08,
        ease,
      },
    }),
  };

  // Estimated daily spend in selected currency
  const estimatedDailySpendUsd = 65;
  const convertedSpend = Math.round(estimatedDailySpendUsd * curr.rate);

  return (
    <section className="itinerary-section" aria-label="AI generated itinerary">
      <motion.div
        className="itinerary-section__heading"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
      >
        <div className="itinerary-header-top">
          <div className="itinerary-badge-pill">
            <Sparkles size={13} className="text-gold" />
            <span>CURATED BY ELSEWHERE AI</span>
          </div>

          <div className="itinerary-meta-chips">
            {itinerary.duration && (
              <span className="itinerary-meta-chip">
                <Clock size={12} />
                <span>{itinerary.duration}</span>
              </span>
            )}
            {itinerary.style && (
              <span className="itinerary-meta-chip">
                <Layers size={12} />
                <span>{itinerary.style} Style</span>
              </span>
            )}
            {cleanDestination && (
              <span className="itinerary-meta-chip">
                <MapPin size={12} />
                <span>{cleanDestination}</span>
              </span>
            )}
            <span className="itinerary-meta-chip itinerary-meta-chip--budget">
              <Coins size={12} />
              <span>Est. {curr.symbol}{convertedSpend.toLocaleString()}/day</span>
            </span>
          </div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
        >
          {cleanTitle}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.38 }}
        >
          {itinerary.summary}
        </motion.p>

        {/* Currency Selector Toolbar */}
        <div className="itinerary-currency-bar">
          <span className="currency-bar-label">
            <Coins size={13} />
            <span>DISPLAY CURRENCY:</span>
          </span>
          <div className="currency-pills-group">
            {Object.keys(CURRENCIES).map((code) => {
              const isActive = selectedCurrency === code;
              return (
                <button
                  key={code}
                  type="button"
                  className={`currency-pill-btn ${isActive ? "currency-pill-btn--active" : ""}`}
                  onClick={() => setSelectedCurrency(code)}
                >
                  <span>{code} ({CURRENCIES[code].symbol})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Toolbar: Print PDF, Share Link, Google Maps, Packing Checklist */}
        <div className="itinerary-actions-bar">
          <button
            type="button"
            className="itinerary-action-btn itinerary-action-btn--primary"
            onClick={handlePrint}
            title="Download or print this itinerary as an executive PDF document"
          >
            <Printer size={14} />
            <span>Download / Print PDF</span>
          </button>

          <button
            type="button"
            className={`itinerary-action-btn ${copied ? "itinerary-action-btn--success" : ""}`}
            onClick={handleShare}
            title="Copy shareable link to this itinerary"
          >
            {copied ? <Check size={14} /> : <Share2 size={14} />}
            <span>{copied ? "Link Copied!" : "Share Itinerary"}</span>
          </button>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              cleanDestination || cleanTitle
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="itinerary-action-btn"
            title="Explore route in Google Maps"
          >
            <ExternalLink size={14} />
            <span>Open in Maps ↗</span>
          </a>

          <button
            type="button"
            className={`itinerary-action-btn ${showChecklist ? "itinerary-action-btn--active" : ""}`}
            onClick={() => setShowChecklist((prev) => !prev)}
            title="View smart travel packing list"
          >
            <Luggage size={14} />
            <span>{showChecklist ? "Hide Checklist" : "Packing Checklist"}</span>
          </button>
        </div>

        {/* Interactive Packing Checklist Drawer */}
        <AnimatePresence>
          {showChecklist && (
            <motion.div
              className="itinerary-checklist"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease }}
            >
              <div className="itinerary-checklist__header">
                <div>
                  <strong>Essential Trip Packing Checklist</strong>
                  <p>Tick items off as you prepare for your journey</p>
                </div>
                <span className="checklist-progress">
                  {checkedItems.size} of {PACKING_ITEMS.length} packed
                </span>
              </div>

              <div className="itinerary-checklist__grid">
                {PACKING_ITEMS.map((item) => {
                  const isChecked = checkedItems.has(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      className={`checklist-item ${isChecked ? "checklist-item--checked" : ""}`}
                      onClick={() => toggleCheckItem(item)}
                    >
                      {isChecked ? (
                        <CheckSquare size={16} className="text-emerald" />
                      ) : (
                        <Square size={16} className="text-muted" />
                      )}
                      <span>{item}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="itinerary-days">
        {daysList.map((day, dayIndex) => {
          const morning = day.morning || day.stops?.[0] || {
            activity: "Morning Exploration",
            description:
              "Begin your day discovering local landmarks and cultural highlights.",
          };
          const afternoon = day.afternoon || day.stops?.[1] || {
            activity: "Afternoon Discovery",
            description:
              "Experience regional arts, local markets, and hidden gems.",
          };
          const evening = day.evening || day.stops?.[2] || {
            activity: "Evening Stroll & Dinner",
            description:
              "Enjoy sunset viewpoints followed by an authentic culinary dinner.",
          };
          const tipText =
            day.tip ||
            day.practicalTip ||
            "Carry local currency and check regional opening hours in advance.";

          return (
            <motion.article
              key={day.day || dayIndex + 1}
              className="itinerary-day"
              custom={dayIndex}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15,
              }}
              variants={dayVariants}
            >
              <header className="itinerary-day__header-bar">
                <div className="itinerary-day__pill">
                  <span>DAY {String(day.day || dayIndex + 1).padStart(2, "0")}</span>
                </div>
                <h3>{day.title}</h3>
              </header>

              <div className="itinerary-day__timeline">
                {/* Morning Card */}
                <motion.div
                  className="itinerary-stop__card itinerary-stop__card--morning"
                  custom={0}
                  variants={stopVariants}
                >
                  <div className="itinerary-stop__time-badge itinerary-stop__time-badge--morning">
                    <Sunrise size={14} />
                    <span>MORNING</span>
                  </div>
                  <h4>{morning.activity}</h4>
                  <p>{morning.description}</p>
                </motion.div>

                {/* Afternoon Card */}
                <motion.div
                  className="itinerary-stop__card itinerary-stop__card--afternoon"
                  custom={1}
                  variants={stopVariants}
                >
                  <div className="itinerary-stop__time-badge itinerary-stop__time-badge--afternoon">
                    <Sun size={14} />
                    <span>AFTERNOON</span>
                  </div>
                  <h4>{afternoon.activity}</h4>
                  <p>{afternoon.description}</p>
                </motion.div>

                {/* Evening Card */}
                <motion.div
                  className="itinerary-stop__card itinerary-stop__card--evening"
                  custom={2}
                  variants={stopVariants}
                >
                  <div className="itinerary-stop__time-badge itinerary-stop__time-badge--evening">
                    <Sunset size={14} />
                    <span>EVENING</span>
                  </div>
                  <h4>{evening.activity}</h4>
                  <p>{evening.description}</p>
                </motion.div>
              </div>

              {tipText && (
                <div className="itinerary-day__tip">
                  <div className="itinerary-tip-icon-wrap">
                    <Lightbulb size={17} />
                  </div>
                  <div className="itinerary-tip-body">
                    <span className="tip-eyebrow">LOCAL INSIDER TIP</span>
                    <p>{tipText}</p>
                  </div>
                </div>
              )}
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

export default Itinerary;