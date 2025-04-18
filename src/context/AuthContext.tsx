import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  role: string | null;
  login: (role: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  role: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<string | null>(null);
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const login = (userRole: string) => {
    localStorage.setItem("role", userRole);
    
    setRole(userRole);
  };

  const logout = () => {
    localStorage.clear();
    setRole(null);
  };


  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
