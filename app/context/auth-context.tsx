import React, { createContext, useContext, useState } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  login: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext)!;
