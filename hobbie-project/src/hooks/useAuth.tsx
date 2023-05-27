import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";

export default function useAuth(){
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [ currentUser, setCurretUser ] = useState<any>();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => setCurretUser(user))
        return unsub;
    }, 
    [])

    return currentUser;


}