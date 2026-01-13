import { createContext, useState } from "react";

// ✅ named export
export const AuthContext = createContext(null);

// ✅ named export
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
