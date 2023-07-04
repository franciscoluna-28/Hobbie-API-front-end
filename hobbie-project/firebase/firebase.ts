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
  Auth,
} from "firebase/auth";
import axios from "axios";

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


export async function signup(email: string, password: string) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);

    const user: any | null = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      sessionStorage.setItem("accessToken", token);
      console.log("Token:", token);
      await axios.post("http://localhost:3000/api/user/register-user", {
        email: user.email,
        uid: user.uid,
        bearedToken: token,
      });
    }
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
  }
}


export function logout() {
  return signOut(auth);
}
export async function login(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (user) {
      const token = await user.getIdToken();
      // Almacenar el token en sessionStorage
      sessionStorage.setItem("accessToken", token);
      console.log("Token:", token);
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }
}






export function signUpAndLoginWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

const analytics = getAnalytics(app);
console.log(analytics);
