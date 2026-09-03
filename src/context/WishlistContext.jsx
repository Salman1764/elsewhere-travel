import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext(null);

const STORAGE_KEY = "elsewhere_wishlist";

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // Ignore
    }
  }, [wishlist]);

  const toggleWishlist = (destinationId) => {
    setWishlist((prev) =>
      prev.includes(destinationId)
        ? prev.filter((id) => id !== destinationId)
        : [...prev, destinationId]
    );
  };

  const isSaved = (destinationId) => wishlist.includes(destinationId);

  const value = {
    wishlist,
    toggleWishlist,
    isSaved,
    wishlistCount: wishlist.length,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
