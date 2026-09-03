import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Mail, Lock, User, Sparkles, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

function AuthModal() {
  const {
    isAuthModalOpen,
    authMode,
    setAuthMode,
    closeAuthModal,
    login,
    register,
    loginDemoUser,
  } = useAuth();

  const { t } = useLanguage();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (authMode === "login") {
        await login(email, password);
      } else {
        await register(name, email, password);
      }
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = () => {
    setError("");
    loginDemoUser();
  };

  const switchMode = (mode) => {
    setError("");
    setAuthMode(mode);
  };

  return (
    <AnimatePresence>
      <div className="auth-modal-overlay" onClick={closeAuthModal}>
        <motion.div
          className="auth-modal"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className="auth-modal__close"
            onClick={closeAuthModal}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          <div className="auth-modal__header">
            <span className="auth-modal__eyebrow">ELSEWHERE MEMBERSHIP</span>
            <h2>
              {authMode === "login"
                ? t("authSignInTitle")
                : t("authRegisterTitle")}
            </h2>
            <p>
              {authMode === "login"
                ? t("authSignInSubtitle")
                : t("authRegisterSubtitle")}
            </p>
          </div>

          <div className="auth-modal__tabs">
            <button
              type="button"
              className={`auth-modal__tab ${
                authMode === "login" ? "auth-modal__tab--active" : ""
              }`}
              onClick={() => switchMode("login")}
            >
              {t("authSignInTab")}
            </button>
            <button
              type="button"
              className={`auth-modal__tab ${
                authMode === "register" ? "auth-modal__tab--active" : ""
              }`}
              onClick={() => switchMode("register")}
            >
              {t("authRegisterTab")}
            </button>
          </div>

          <button
            type="button"
            className="auth-modal__demo-btn"
            onClick={handleDemoLogin}
          >
            <Sparkles size={16} />
            <span>{t("authDemoLogin")}</span>
          </button>

          <div className="auth-modal__divider">
            <span>or continue with email</span>
          </div>

          {error && (
            <div className="auth-modal__error" role="alert">
              <AlertCircle size={18} className="auth-modal__error-icon" />
              <div className="auth-modal__error-content">
                <span>{error}</span>
                {error.includes("already exists") && (
                  <button
                    type="button"
                    className="auth-modal__error-btn"
                    onClick={() => switchMode("login")}
                  >
                    Click here to Sign In →
                  </button>
                )}
                {error.includes("No account found") && (
                  <button
                    type="button"
                    className="auth-modal__error-btn"
                    onClick={() => switchMode("register")}
                  >
                    Click here to Create Account →
                  </button>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-modal__form">
            {authMode === "register" && (
              <div className="auth-input-group">
                <label htmlFor="auth-name">{t("authFullName")}</label>
                <div className="auth-input-wrapper">
                  <User size={18} className="auth-input-icon" />
                  <input
                    id="auth-name"
                    type="text"
                    required
                    placeholder={t("authFullNamePlaceholder")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="auth-input-group">
              <label htmlFor="auth-email">{t("authEmail")}</label>
              <div className="auth-input-wrapper">
                <Mail size={18} className="auth-input-icon" />
                <input
                  id="auth-email"
                  type="email"
                  required
                  placeholder={t("authEmailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label htmlFor="auth-password">{t("authPassword")}</label>
              <div className="auth-input-wrapper">
                <Lock size={18} className="auth-input-icon" />
                <input
                  id="auth-password"
                  type="password"
                  required
                  placeholder={t("authPasswordPlaceholder")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="auth-modal__submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Processing..."
                : authMode === "login"
                ? t("authSignInSubmit")
                : t("authRegisterSubmit")}
            </button>
          </form>

          <div className="auth-modal__footer">
            {authMode === "login" ? (
              <p>
                {t("authNoAccount")}{" "}
                <button
                  type="button"
                  className="auth-modal__link"
                  onClick={() => switchMode("register")}
                >
                  {t("navRegister")}
                </button>
              </p>
            ) : (
              <p>
                {t("authHaveAccount")}{" "}
                <button
                  type="button"
                  className="auth-modal__link"
                  onClick={() => switchMode("login")}
                >
                  {t("navSignIn")}
                </button>
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default AuthModal;
