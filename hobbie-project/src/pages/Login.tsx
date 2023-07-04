import { useRef, useState } from "react";
import { login, signup, signUpAndLoginWithGoogle } from "../../firebase/firebase";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/UserAuthContext";
import myLogo from "../assets/logo.png";


export default function Login() {
  const { currentUser } = useAuthContext();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log(loading);

  async function handleLogin() {
    try {
      if (emailRef.current && passwordRef.current) {
        setLoading(true);
        setError(null); // Limpiar cualquier error anterior
        await login(emailRef.current.value, passwordRef.current.value);
      }
    } catch (error) {
      setError("There was an error while trying to login. Please, double check your credentials.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSignup() {
    try {
      if (emailRef.current && passwordRef.current) {
        setLoading(true);
        setError(null); 
        await signup(emailRef.current.value, passwordRef.current.value);
      }
    } catch (error) {
      setError("There was an error while creating your account...");
    } finally {
      setLoading(false);
    }
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
        <img className="max-h-24 lg:max-h-32 max-w-xl flex justify-center m-auto" src={myLogo}></img>
        <h1 className="text-center text-5xl leading-tight font-semibold text-accent">Welcome Back!</h1>
        <div className="flex justify-center py-8 w-full m-auto">
          <form
            className="flex flex-col gap-12 md:w-1/2 justify-center"
            onSubmit={handleFormSubmit}
          >
            <input
              className="border-2 p-4 rounded-md"
              ref={emailRef}
              placeholder="Email"
            />
            <input
              className="border-2 p-4 rounded-md"
              ref={passwordRef}
              type="password"
              placeholder="Password"
            />


            <button className="flex w-full text-main" onClick={handleSignup}>
              Or signup here
            </button>
            <button
              className="bg-main p-6 text-white font-bold rounded-md hover:brightness-90 duration-200"
              disabled={currentUser !== null || loading}
              onClick={handleLogin}
            >
              Continue
            </button>


            <button
              className="bg-white text-gray-600 flex hover:brightness-95 duration-200 items-center justify-center gap-2 shadow-sm border-2 p-6 rounded-md"
              disabled={currentUser !== null || loading}
              onClick={signUpAndLoginWithGoogle}
            >
              Continue with Google
              <img
                className="h-4 w-4"
                src={
                 "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/588px-Google_%22G%22_Logo.svg.png?20230305195327"
}
alt="Google logo"
></img>
</button>
{error && <p className="text-red-500">{error}</p>}
</form>
</div>
</div>
</>
);
}