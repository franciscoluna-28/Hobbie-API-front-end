import { useRef, useState } from "react";
import { login, signup, signupWithGoogle } from "../../firebase/firebase";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/UserAuthContext";

export default function Login() {
  const { currentUser } = useAuthContext();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);

  console.log(loading)

  async function handleLogin() {
    try {
      if (emailRef.current && passwordRef.current) {
        setLoading(true);
        await login(emailRef.current.value, passwordRef.current.value);
      }
    } catch {
      alert('Error!');
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
      alert('Error!');
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
        <h1 className="text-center text-5xl font-semibold">Welcome!</h1>
        <div className="flex justify-center py-8 w-full m-auto">
          <form className="flex flex-col gap-12 md:w-1/2 justify-center" onSubmit={handleFormSubmit}>
            <input className="border-2 p-2 rounded-md" ref={emailRef} placeholder="Email" />
            <input className="border-2 p-2 rounded-md" ref={passwordRef} type="password" placeholder="Password" />
            <button className="flex w-full text-main" onClick={handleSignup}>Or signup here</button>
            <button className="flex w-full text-main" onClick={signupWithGoogle}>Or signup here but with Google</button>
            <button className="bg-main p-4 text-white font-semibold rounded-md" disabled={currentUser !== null } onClick={handleLogin}>
              Login
            </button>
            <p className="flex flex-col">Bro password should have more than 8 characters please</p> 
          </form>
  
        </div>

      </div>
////////////////////////////////////////////////////////////////////////////////////////////////////
    </>
  );
}
/*   const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth();

  async function handleSignup() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      await signup(emailRef.current!.value, passwordRef.current!.value);
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }

  async function handleLogout() {
    try {
      await logout();
    } catch {
      alert("Error!");
    }
    setLoading(false);
}

  async function handleLogin() {
    try {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        await login(emailRef.current!.value, passwordRef.current!.value);
    } catch {
      alert("Error!");
    }
    setLoading(false);
  }




  return (
    <div>
      <div>
        <p>Currently logged in as: {currentUser?.email}</p>
        <input ref={emailRef} placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <button disabled={loading || currentUser} onClick={handleSignup}>
          Sign up
        </button>
        <button disabled={loading || currentUser} onClick={handleLogin}>
          Login
        </button>
      </div>

      <button disabled={loading || !currentUser} onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
}
 */