import { useRef, useState } from "react";
import { login, signup } from "../../firebase/firebase";
import { Navigate } from "react-router-dom";



import { useAuthContext } from "../context/UserAuthContext";

export default function Login() {

    const { currentUser, handleLogout } = useAuthContext();
    const emailRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [loading, setLoading] = useState<any>(false);
    
    async function handleLogin() {
        try {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          await login(emailRef.current!.value, passwordRef.current!.value);
          
        } catch {
          alert("Error!");
        }
        setLoading(false);
      }

      async function handleSignup() {
        try {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          await signup(emailRef.current!.value, passwordRef.current!.value);
        } catch {
          alert("Error!");
        }
        setLoading(false);
      }

      if (currentUser) {
        return <Navigate to="/find-activities" replace={true} />;
      }
    

    return(
        <>
    <div className="flex justify-center py-8">
    <div className="flex flex-col gap-12">
      <input ref={emailRef} placeholder="Email" />
      <input ref={passwordRef} type="password" placeholder="Password" />
      <div className="flex gap-4">
      <button disabled={loading || currentUser} onClick={handleSignup}>
        Sign up
      </button>
      <button disabled={loading || currentUser} onClick={handleLogin}>
        Login
      </button>


    <button disabled={loading || !currentUser} onClick={handleLogout}>
      Log out
    </button>
    </div>

    </div>
  </div>
  
  </>
    )
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