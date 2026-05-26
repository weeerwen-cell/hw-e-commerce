
import { useState } from "react";
import { AuthContext } from "../AuthContext";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);

  const login = async (username: string, password: string) => {
    const fakeUser = {
      id: 1,
      username,
    };

    setUser(fakeUser);
    localStorage.setItem("token", fakeUser.id.toString());

    return fakeUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  
  const isAuthenticated = !!user;

 
  const updateUser = (data: any) => {
    setUser((prev: any) => ({
      ...prev,
      ...data,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};