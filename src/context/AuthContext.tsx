import { createContext, useContext, useState, ReactNode } from "react";

type AuthContextType = {
  custId: string | null;
  token: string | null;
  setAuthData: (data: { custId: string; token: string }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authData, setAuthDataState] = useState<{ custId: string | null; token: string | null }>({
    custId: null,
    token: null,
  });

  const setAuthData = (data: { custId: string; token: string }) => {
    setAuthDataState({
      custId: data.custId,
      token: data.token,
    });

    // Optional: Store in localStorage for persistence
    localStorage.setItem("auth", JSON.stringify(data));
  };

  const logout = () => {
    setAuthDataState({ custId: null, token: null });
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider
      value={{
        custId: authData.custId,
        token: authData.token,
        setAuthData,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
