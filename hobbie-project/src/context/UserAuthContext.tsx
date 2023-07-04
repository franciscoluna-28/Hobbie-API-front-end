import { createContext, useContext, useState } from "react";
import { logout } from "../../firebase/firebase";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { User } from "@firebase/auth-types";

interface AuthContextType {
  currentUser: User;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleLogout: () => Promise<void>;
  token: string | null;
  setToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error(
      "AuthContext is undefined. Make sure you are rendering the Login component within AuthContext.Provider."
    );
  }

  return authContext;
};

export default function AuthProvider({ children }: React.PropsWithChildren) {
  const [token, setToken] = useState<string | null>(sessionStorage.getItem("accessToken"));
  const currentUser = useAuth();

  async function handleLogout() {
    try {
      await logout();
      <Navigate to="/" replace={true}></Navigate>;
    } catch {
      alert("Error!");
    }
  }

  const authContextValue = {
    currentUser,
    handleLogout,
    token,
    setToken,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
