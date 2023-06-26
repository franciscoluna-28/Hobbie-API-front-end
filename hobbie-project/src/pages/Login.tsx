import { useRef, useState } from "react";
import { login, signup, signupWithGoogle } from "../../firebase/firebase";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/UserAuthContext";
import myLogo from "../assets/logo.png";

export default function Login() {
  const { currentUser } = useAuthContext();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  console.log(loading);

  async function handleLogin() {
    try {
      if (emailRef.current && passwordRef.current) {
        setLoading(true);
        await login(emailRef.current.value, passwordRef.current.value);
      }
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }

  async function handleSignup() {
    try {
      if (emailRef.current && passwordRef.current) {
        setLoading(true);
        await signup(emailRef.current.value, passwordRef.current.value);
      }
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  if (currentUser) {
    return <Navigate to="/find-activities" replace={true} />;
  }

  return (
    <>
      <div className="m-auto flex-col justify-center py-8 px-8">
        <img className="max-h-48 max-w-3xl flex justify-center m-auto" src={myLogo}></img>
        <h1 className="text-center text-5xl font-semibold">Welcome!</h1>
        <div className="flex justify-center py-8 w-full m-auto">
          <form
            className="flex flex-col gap-12 md:w-1/2 justify-center"
            onSubmit={handleFormSubmit}
          >
            <input
              className="border-2 p-2 rounded-md"
              ref={emailRef}
              placeholder="Email"
            />
            <input
              className="border-2 p-2 rounded-md"
              ref={passwordRef}
              type="password"
              placeholder="Password please"
            />
            <button className="flex w-full text-main" onClick={handleSignup}>
              Or signup here
            </button>
            <button
              className="bg-main p-4 text-white font-semibold rounded-md"
              disabled={currentUser !== null}
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              className="bg-white text-gray-500 flex justify-center gap-4 shadow-sm border-2 p-4 font-semibold rounded-md"
              disabled={currentUser !== null}
              onClick={signupWithGoogle}
            >Sign in with Google
              <img
                className="h-6 w-6"
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
                }
              ></img>
            </button>
          </form>
        </div>
      </div>
    </>
)}