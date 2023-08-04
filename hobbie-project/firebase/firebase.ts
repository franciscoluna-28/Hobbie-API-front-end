// Import the functions you need from the SDKs you need
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  Auth,
} from "firebase/auth";
import axios from "axios";
import { createNewUser, createNewUserWithGoogle } from "../src/api/users";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initializing Firebase
const app = initializeApp(firebaseConfig);

// Handling the authentication
export const auth: Auth = getAuth();

// Manejar el cambio de estado de autenticación
onAuthStateChanged(auth, (user) => {
  if (user) {
    // Usuario autenticado
    const token = sessionStorage.getItem("accessToken");
    console.log("Token:", token);
  } else {
    // Usuario no autenticado
    sessionStorage.removeItem("accessToken");
    console.log("Usuario no autenticado. Token eliminado.");
  }
});

export async function signup(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    console.log(user);

    if (user) {
      const token = await user.getIdToken();

      console.log(token);

      sessionStorage.setItem("accessToken", token);
      console.log("Token:", token);

      await createNewUser();
    }
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
  }
}

export function logout() {
  sessionStorage.removeItem("accessToken");
  return signOut(auth);
}

export async function login(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    if (user) {
      const token = await user.getIdToken();
      // Almacenar el token en sessionStorage
      sessionStorage.setItem("accessToken", token);
      console.log("Token:", token);

      console.log(auth.currentUser);

      // Agregar el token como encabezado de autorización en la solicitud de registro de usuario
      await axios.post(
        `http://localhost:3000/api/user/register-user-token/${auth.currentUser?.uid}`,
        {
          bearedToken: token,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }
}

export async function signUpAndLoginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    console.log(result.user);

    await createNewUserWithGoogle(result.user);

    console.log();

    // User signed in successfully, now create the user in the database
    return result;
  } catch (error) {
    // Handle errors here, if needed
    console.error("Error during Google sign-up and login:", error);
    throw error; // Rethrow the error to the caller, if required
  }
}

const analytics = getAnalytics(app);
console.log(analytics);
