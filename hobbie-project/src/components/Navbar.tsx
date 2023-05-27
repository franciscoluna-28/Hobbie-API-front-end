import { Link } from "react-router-dom"
import { useAuthContext } from "../context/UserAuthContext";



export default function TempNavbar(){
    const { handleLogout } = useAuthContext();
    return(
        <div className="h-8 bg-accent py-12 sticky top-0 shadow-xl">
            <div>
                <ul className="flex gap-4">

{/*                     <li><Link to="/find-activities">Activities</Link></li>
                    <li><Link to="/my-activities">Saved Activities</Link></li>
                    <li><Link to="/my-profile">Profile</Link></li>
                    <li><Link to="/my-profile">Profile test</Link></li>
                    <button onClick={handleLogout}>Logout</button> */}
                </ul>
            </div>
        </div>
    )
}