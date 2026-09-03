import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

function LanguageDropdown() {
  const { language, setLanguage, languages, currentLanguageMeta } =
    useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="lang-dropdown" ref={dropdownRef}>
      <button
        type="button"
        className="lang-dropdown__trigger"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <Globe size={16} strokeWidth={1.7} />
        <span className="lang-dropdown__code">
          {currentLanguageMeta.code.toUpperCase()}
        </span>
        <ChevronDown
          size={14}
          className={`lang-dropdown__chevron ${
            isOpen ? "lang-dropdown__chevron--open" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="lang-dropdown__menu">
          <div className="lang-dropdown__menu-header">Select Language</div>
          {languages.map((lang) => {
            const isSelected = lang.code === language;
            return (
              <button
                key={lang.code}
                type="button"
                className={`lang-dropdown__option ${
                  isSelected ? "lang-dropdown__option--active" : ""
                }`}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
              >
                <span className="lang-dropdown__flag">{lang.flag}</span>
                <span className="lang-dropdown__name">{lang.name}</span>
                {isSelected && (
                  <Check size={14} className="lang-dropdown__check" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default LanguageDropdown;
