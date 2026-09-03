import { useState, useRef, useEffect } from "react";
import { Coins, ArrowRightLeft, X, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DEFAULT_RATES = {
  USD: 1.0,
  INR: 94.97,
  EUR: 0.86,
  GBP: 0.74,
  JPY: 159.1,
  AUD: 1.40,
  CAD: 1.39,
  CHF: 0.81,
};

const SYMBOLS = {
  USD: "$",
  INR: "₹",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  AUD: "A$",
  CAD: "C$",
  CHF: "CHF",
};

function CurrencyModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [rates, setRates] = useState(DEFAULT_RATES);
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [isUpdating, setIsUpdating] = useState(false);
  const modalRef = useRef(null);

  // Fetch live exchange rates on mount
  useEffect(() => {
    let isMounted = true;
    async function fetchLiveRates() {
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/USD");
        if (res.ok) {
          const data = await res.json();
          if (data && data.rates && isMounted) {
            setRates((prev) => ({
              ...prev,
              USD: 1.0,
              INR: data.rates.INR || 94.97,
              EUR: data.rates.EUR || 0.86,
              GBP: data.rates.GBP || 0.74,
              JPY: data.rates.JPY || 159.1,
              AUD: data.rates.AUD || 1.40,
              CAD: data.rates.CAD || 1.39,
              CHF: data.rates.CHF || 0.81,
            }));
          }
        }
      } catch {
        // Fallback to default accurate rates
      }
    }
    fetchLiveRates();
    return () => {
      isMounted = false;
    };
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const refreshRates = async () => {
    setIsUpdating(true);
    try {
      const res = await fetch("https://open.er-api.com/v6/latest/USD");
      if (res.ok) {
        const data = await res.json();
        if (data?.rates) {
          setRates((prev) => ({
            ...prev,
            INR: data.rates.INR || 94.97,
            EUR: data.rates.EUR || 0.86,
            GBP: data.rates.GBP || 0.74,
            JPY: data.rates.JPY || 159.1,
            AUD: data.rates.AUD || 1.40,
            CAD: data.rates.CAD || 1.39,
            CHF: data.rates.CHF || 0.81,
          }));
        }
      }
    } catch {
      // Keep existing
    } finally {
      setTimeout(() => setIsUpdating(false), 500);
    }
  };

  const numAmount = parseFloat(amount) || 0;
  // Convert from source currency to USD, then to target currency
  const amountInUsd = numAmount / (rates[fromCurrency] || 1);
  const convertedTarget = amountInUsd * (rates[toCurrency] || 1);

  const formattedTarget =
    convertedTarget > 1000
      ? convertedTarget.toLocaleString("en-US", { maximumFractionDigits: 2 })
      : convertedTarget.toFixed(2);

  const inrRate = rates.INR ? rates.INR.toFixed(2) : "94.97";

  return (
    <div className="currency-converter-wrap" ref={modalRef}>
      <button
        type="button"
        className={`navbar__currency-btn ${isOpen ? "navbar__currency-btn--active" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        title="Live Currency Converter (1 USD = 94.97 INR)"
        aria-label="Open Currency Converter"
      >
        <Coins size={14} />
        <span>1 USD = ₹{inrRate}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="currency-modal-popover"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="currency-modal__header">
              <div className="currency-modal__title">
                <ArrowRightLeft size={14} />
                <span>Live Travel Currency Converter</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <button
                  type="button"
                  className={`currency-modal__refresh ${isUpdating ? "spinning" : ""}`}
                  onClick={refreshRates}
                  title="Refresh live exchange rates"
                >
                  <RefreshCw size={13} />
                </button>
                <button
                  type="button"
                  className="currency-modal__close"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Direct 1-to-1 Interactive Converter */}
            <div className="currency-calc-box">
              <div className="currency-calc-row">
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount"
                  className="currency-input"
                />
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="currency-select"
                >
                  {Object.keys(rates).map((c) => (
                    <option key={c} value={c}>
                      {c} ({SYMBOLS[c]})
                    </option>
                  ))}
                </select>
              </div>

              <div className="currency-calc-equals">
                <span>=</span>
              </div>

              <div className="currency-calc-row">
                <div className="currency-output-display">
                  <span className="currency-output-symbol">{SYMBOLS[toCurrency]}</span>
                  <span className="currency-output-number">{formattedTarget}</span>
                </div>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="currency-select"
                >
                  {Object.keys(rates).map((c) => (
                    <option key={c} value={c}>
                      {c} ({SYMBOLS[c]})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Live Comparison Breakdown */}
            <div className="currency-grid-heading">
              <span>{amount || 1} {fromCurrency} in other world currencies:</span>
            </div>

            <div className="currency-conversions-grid">
              {Object.keys(rates)
                .filter((c) => c !== fromCurrency)
                .map((c) => {
                  const val = amountInUsd * rates[c];
                  const formatted =
                    val > 1000
                      ? val.toLocaleString("en-US", { maximumFractionDigits: 2 })
                      : val.toFixed(2);

                  return (
                    <div
                      key={c}
                      className={`currency-conversion-item ${c === toCurrency ? "currency-conversion-item--selected" : ""}`}
                      onClick={() => setToCurrency(c)}
                      style={{ cursor: "pointer" }}
                      title={`Click to set as target currency`}
                    >
                      <span className="currency-code">{c}</span>
                      <strong className="currency-val">
                        {SYMBOLS[c]}
                        {formatted}
                      </strong>
                    </div>
                  );
                })}
            </div>

            <div className="currency-modal__footer">
              <span>Live mid-market rates • 1 USD = ₹{inrRate} INR</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CurrencyModal;
