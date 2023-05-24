// FirebaseAuthContext.tsx
import * as React from "react";
import firebase from "firebase/app";

type User = firebase.FirebaseApp | null;
type ContextState = { user: User };

const FirebaseAuthContext =
  React.createContext<ContextState | undefined>(undefined);

const FirebaseAuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<User>(null);
  const value = { user };

  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  return (
    <FirebaseAuthContext.Provider value={value}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export { FirebaseAuthProvider };