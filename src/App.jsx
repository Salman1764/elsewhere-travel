import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DestinationDetails from "./pages/DestinationDetails";
import PlanTrip from "./pages/PlanTrip";
import Chatbot from "./components/Chatbot";
import AuthModal from "./components/AuthModal";
import LocationModal from "./components/LocationModal";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import { LocationProvider } from "./context/LocationContext";
import { WishlistProvider } from "./context/WishlistContext";
import "./App.css";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <LocationProvider>
          <WishlistProvider>
            <BrowserRouter>
              <ScrollToTop />
              <Navbar />

              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/destination/:destinationId"
                  element={<DestinationDetails />}
                />
                <Route path="/plan" element={<PlanTrip />} />
              </Routes>

              <Chatbot />
              <AuthModal />
              <LocationModal />
            </BrowserRouter>
          </WishlistProvider>
        </LocationProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;