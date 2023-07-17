import { createContext, useEffect, useState } from "react";
import { logout } from "../../firebase/firebase";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { User } from "firebase/auth";
interface AuthContextType {
  currentUser: User | null;
  handleLogout: () => Promise<void>;
  token: string | null;
  setToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: React.PropsWithChildren) {
  const [token, setToken] = useState<string | null>(
    sessionStorage.getItem("accessToken")
  );

  const currentUser = useAuth();

  useEffect(() => {
    const fetchToken = async () => {
      if (sessionStorage.getItem("accessToken") === null) {
        const userToken = await currentUser?.getIdToken();
        if (userToken) {
          sessionStorage.setItem("accessToken", userToken);
          setToken(userToken);
        }
      }
    };

    fetchToken();
  }, [currentUser]);

  async function handleLogout() {
    try {
      await logout();
      <Navigate to="/" replace={true} />;
    } catch {
      alert("Error!");
    }
  }

  const authContextValue: AuthContextType = {
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
