"use client";

import { Button } from "@/components/ui/button";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// General idea of what I want to achieve with testing purposes
// This has a lot of room for improvement tbh
export default function Home() {
  const user = auth.currentUser;
  const router = useRouter();

  /*   useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);
    const handleLogout = () => {
        signOut(auth)
          .then(() => {
            router.push("/");
          })
          .catch((error) => {
            // An error happened.
          });
      }; */
  return (
    <main>
      <h1 className="text-accent font-bold text-5xl">Auth works!</h1>
      <Button>Logout</Button>
    </main>
  );
}
