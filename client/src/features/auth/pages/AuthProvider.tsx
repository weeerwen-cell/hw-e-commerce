import { useState } from "react";
import { AuthContext } from "../AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
    const login = () => {};
  const logout = () => {};

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};