import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const CURRENT_USER_KEY = "elsewhere_auth_user";
const REGISTERED_USERS_KEY = "elsewhere_registered_users";

// Curated high-res portraits for luxury travelers
const AVATAR_POOL = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
];

// Generates a consistent, permanent avatar for an email
function getPermanentAvatar(email) {
  const normalized = email.trim().toLowerCase();
  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    hash = (hash << 5) - hash + normalized.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % AVATAR_POOL.length;
  return AVATAR_POOL[index];
}

function getStoredUsers() {
  try {
    const raw = localStorage.getItem(REGISTERED_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveStoredUsers(users) {
  try {
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
  } catch {
    // Ignore storage errors
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(CURRENT_USER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" | "register"

  // Sync current active session
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    } catch {
      // Ignore storage errors
    }
  }, [user]);

  const openAuthModal = (mode = "login") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async (email, password) => {
    if (!email || !password) {
      throw new Error("Please fill in both email and password.");
    }
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters.");
    }

    const normalizedEmail = email.trim().toLowerCase();
    const registeredUsers = getStoredUsers();
    const existingUser = registeredUsers.find((u) => u.email === normalizedEmail);

    if (!existingUser) {
      throw new Error("No account found with this email. Please register first.");
    }

    if (existingUser.password && existingUser.password !== password) {
      throw new Error("Incorrect password. Please try again.");
    }

    // Always use the user's permanent stored profile avatar!
    const sessionUser = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      avatar: existingUser.avatar || getPermanentAvatar(existingUser.email),
      joinedAt: existingUser.joinedAt,
    };

    setUser(sessionUser);
    closeAuthModal();
    return sessionUser;
  };

  const register = async (name, email, password) => {
    if (!name || !name.trim()) {
      throw new Error("Please enter your full name.");
    }
    if (!email || !email.includes("@")) {
      throw new Error("Please enter a valid email address.");
    }
    if (!password || password.length < 6) {
      throw new Error("Password must be at least 6 characters long.");
    }

    const normalizedEmail = email.trim().toLowerCase();
    const registeredUsers = getStoredUsers();
    const existingUser = registeredUsers.find((u) => u.email === normalizedEmail);

    // Duplicate account check requirement
    if (existingUser) {
      throw new Error("Account already exists. Please sign in.");
    }

    // Assign a permanent profile picture that NEVER changes on logout/login
    const permanentAvatar = getPermanentAvatar(normalizedEmail);

    const newUserRecord = {
      id: "usr_" + Date.now(),
      name: name.trim(),
      email: normalizedEmail,
      password: password,
      avatar: permanentAvatar,
      joinedAt: new Date().toISOString(),
    };

    // Save to permanent accounts database in localStorage
    saveStoredUsers([...registeredUsers, newUserRecord]);

    const sessionUser = {
      id: newUserRecord.id,
      name: newUserRecord.name,
      email: newUserRecord.email,
      avatar: newUserRecord.avatar,
      joinedAt: newUserRecord.joinedAt,
    };

    setUser(sessionUser);
    closeAuthModal();
    return sessionUser;
  };

  const loginDemoUser = () => {
    const demoEmail = "alex.morgan@traveler.com";
    const registeredUsers = getStoredUsers();
    let demoUser = registeredUsers.find((u) => u.email === demoEmail);

    if (!demoUser) {
      demoUser = {
        id: "usr_demo",
        name: "Alex Morgan",
        email: demoEmail,
        password: "demopassword123",
        avatar: getPermanentAvatar(demoEmail),
        joinedAt: new Date().toISOString(),
      };
      saveStoredUsers([...registeredUsers, demoUser]);
    }

    const sessionUser = {
      id: demoUser.id,
      name: demoUser.name,
      email: demoUser.email,
      avatar: demoUser.avatar,
      joinedAt: demoUser.joinedAt,
    };

    setUser(sessionUser);
    closeAuthModal();
    return sessionUser;
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isAuthModalOpen,
    authMode,
    setAuthMode,
    openAuthModal,
    closeAuthModal,
    login,
    register,
    loginDemoUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
