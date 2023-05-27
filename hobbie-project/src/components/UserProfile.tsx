import TempNavbar from "./Navbar"
import { useAuthContext } from "../context/UserAuthContext";




export default function UserProfile(){
    const { currentUser } = useAuthContext();
    console.log(currentUser)
    return(
        <div>
                <TempNavbar/>
            <h2>Profile</h2>
            <h3>Email: {currentUser?.email}</h3>
            <h3>Email: {currentUser?.metadata.creationTime}</h3>
            
        </div>
    )
}