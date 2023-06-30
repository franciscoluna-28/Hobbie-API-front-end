import { createContext, useContext } from "react";
import { logout } from "../../firebase/firebase";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { User } from "@firebase/auth-types";

interface AuthContextType {
  currentUser: User;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleLogout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
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
  async function handleLogout() {
    try {
      await logout();
      <Navigate to="/" replace={true}></Navigate>;
    } catch {
      alert("Error!");
    }
  }

  const authContextValue = {
    currentUser: useAuth(),
    handleLogout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
