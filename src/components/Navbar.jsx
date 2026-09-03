import {
  Compass,
  Menu,
  X,
  MapPin,
  User,
  LogOut,
  Sparkles,
  Heart,
} from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useLocationContext } from "../context/LocationContext";
import { useWishlist } from "../context/WishlistContext";
import { getDestinationById } from "../data/destinations";
import LanguageDropdown from "./LanguageDropdown";
import CurrencyModal from "./CurrencyModal";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [savedDropdownOpen, setSavedDropdownOpen] = useState(false);
  const userDropdownRef = useRef(null);
  const savedDropdownRef = useRef(null);

  const { user, isAuthenticated, openAuthModal, logout } = useAuth();
  const { t } = useLanguage();
  const { location, openLocationModal } = useLocationContext();
  const { wishlist, toggleWishlist, wishlistCount } = useWishlist();
  const routerLocation = useLocation();

  const savedDestinations = useMemo(() => {
    return wishlist.map((id) => getDestinationById(id)).filter(Boolean);
  }, [wishlist]);

  const handleSavedClick = () => {
    if (wishlist.length === 1) {
      navigate(`/destination/${wishlist[0]}`);
    } else if (wishlist.length > 1) {
      setSavedDropdownOpen((prev) => !prev);
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setUserDropdownOpen(false);
    setSavedDropdownOpen(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(e.target)
      ) {
        setUserDropdownOpen(false);
      }
      if (
        savedDropdownRef.current &&
        !savedDropdownRef.current.contains(e.target)
      ) {
        setSavedDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle smooth scroll if navigating to hash on homepage
  const handleAnchorClick = (anchorId) => {
    closeMenu();
    if (routerLocation.pathname === "/") {
      const element = document.getElementById(anchorId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo" onClick={closeMenu}>
          <span className="navbar__logo-icon">
            <Compass size={20} strokeWidth={1.8} />
          </span>
          <span className="navbar__logo-text">
            Else<span>where</span>
          </span>
        </Link>

        {/* Desktop & Mobile Main Navigation */}
        <nav
          className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}
          aria-label="Main navigation"
        >
          <Link to="/" onClick={closeMenu}>
            {t("navDiscover")}
          </Link>

          {routerLocation.pathname === "/" ? (
            <a
              href="#destinations"
              onClick={(e) => {
                e.preventDefault();
                handleAnchorClick("destinations");
              }}
            >
              {t("navDestinations")}
            </a>
          ) : (
            <Link to="/#destinations" onClick={closeMenu}>
              {t("navDestinations")}
            </Link>
          )}

          {routerLocation.pathname === "/" ? (
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                handleAnchorClick("about");
              }}
            >
              {t("navAbout")}
            </a>
          ) : (
            <Link to="/#about" onClick={closeMenu}>
              {t("navAbout")}
            </Link>
          )}

          <Link to="/plan" onClick={closeMenu} className="navbar__plan-link">
            <Sparkles size={15} />
            <span>{t("navPlanTrip")}</span>
          </Link>

          {/* Mobile-only controls integrated inside dropdown drawer */}
          <div className="navbar__mobile-controls">
            <button
              type="button"
              className="navbar__loc-btn navbar__loc-btn--mobile"
              onClick={() => {
                closeMenu();
                openLocationModal();
              }}
            >
              <MapPin size={16} />
              <span>
                {location
                  ? location.name
                  : t("navSelectLocation")}
              </span>
            </button>

            <div className="navbar__mobile-lang-auth">
              <LanguageDropdown />

              {!isAuthenticated ? (
                <button
                  type="button"
                  className="navbar__auth-btn navbar__auth-btn--primary"
                  onClick={() => {
                    closeMenu();
                    openAuthModal("login");
                  }}
                >
                  <User size={15} />
                  <span>{t("navSignIn")}</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="navbar__auth-btn navbar__auth-btn--outline"
                  onClick={() => {
                    closeMenu();
                    logout();
                  }}
                >
                  <LogOut size={15} />
                  <span>{t("navSignOut")}</span>
                </button>
              )}
            </div>
          </div>
        </nav>

        {/* Right Action Toolbar (Location, Language, Auth) */}
        <div className="navbar__actions">
          {/* Location Quick Button */}
          <button
            type="button"
            className={`navbar__loc-btn ${
              location ? "navbar__loc-btn--active" : ""
            }`}
            onClick={openLocationModal}
            title={
              location
                ? `Current: ${location.name}${
                    location.country ? `, ${location.country}` : ""
                  }`
                : "Set starting location"
            }
            aria-label="Select location"
          >
            <MapPin size={15} strokeWidth={1.8} />
            <span className="navbar__loc-text">
              {location ? location.name : t("navLocation")}
            </span>
          </button>

          {/* Language Dropdown */}
          <LanguageDropdown />

          {/* Quick Currency Converter */}
          <CurrencyModal />

          {/* Saved Cities Quick Action / Redirect */}
          {wishlistCount > 0 && (
            <div className="navbar__saved-wrap" ref={savedDropdownRef}>
              <button
                type="button"
                className="navbar__saved-btn"
                onClick={handleSavedClick}
                title={
                  wishlistCount === 1
                    ? `Click to view saved destination: ${savedDestinations[0]?.name || "City"}`
                    : `View ${wishlistCount} saved destinations`
                }
              >
                <Heart size={14} fill="#ff5370" stroke="#ff5370" />
                <span>
                  {wishlistCount === 1
                    ? savedDestinations[0]?.name || "Saved City"
                    : `Saved (${wishlistCount})`}
                </span>
              </button>

              {savedDropdownOpen && wishlistCount > 1 && (
                <div className="navbar__saved-dropdown">
                  <div className="navbar__saved-header">
                    <span>Saved Destinations ({wishlistCount})</span>
                  </div>
                  <div className="navbar__saved-list">
                    {savedDestinations.map((dest) => (
                      <div key={dest.id} className="navbar__saved-item">
                        <Link
                          to={`/destination/${dest.id}`}
                          className="navbar__saved-item-link"
                          onClick={() => setSavedDropdownOpen(false)}
                        >
                          <div className="navbar__saved-item-info">
                            <strong>{dest.name}</strong>
                            <span>{dest.country}</span>
                          </div>
                        </Link>
                        <button
                          type="button"
                          className="navbar__saved-remove-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(dest.id);
                          }}
                          title="Remove from saved"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Auth Button or User Profile */}
          {!isAuthenticated ? (
            <div className="navbar__auth-group">
              <button
                type="button"
                className="navbar__auth-btn navbar__auth-btn--login"
                onClick={() => openAuthModal("login")}
              >
                {t("navSignIn")}
              </button>
              <button
                type="button"
                className="navbar__auth-btn navbar__auth-btn--register"
                onClick={() => openAuthModal("register")}
              >
                {t("navRegister")}
              </button>
            </div>
          ) : (
            <div className="navbar__user" ref={userDropdownRef}>
              <button
                type="button"
                className="navbar__user-btn"
                onClick={() => setUserDropdownOpen((prev) => !prev)}
                aria-expanded={userDropdownOpen}
                aria-label="User menu"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="navbar__user-avatar"
                />
                <span className="navbar__user-name">{user.name}</span>
              </button>

              {userDropdownOpen && (
                <div className="navbar__user-menu">
                  <div className="navbar__user-info">
                    <strong>{user.name}</strong>
                    <span>{user.email}</span>
                  </div>
                  <div className="navbar__user-divider" />
                  <button
                    type="button"
                    className="navbar__user-item"
                    onClick={() => {
                      setUserDropdownOpen(false);
                      openLocationModal();
                    }}
                  >
                    <MapPin size={15} />
                    <span>Change Starting City</span>
                  </button>
                  <button
                    type="button"
                    className="navbar__user-item navbar__user-item--danger"
                    onClick={() => {
                      setUserDropdownOpen(false);
                      logout();
                    }}
                  >
                    <LogOut size={15} />
                    <span>{t("navSignOut")}</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="navbar__menu-button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;