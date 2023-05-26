import { Link } from "react-router-dom"

export default function TempNavbar(){
    return(
        <div className="h-8 bg-white shadow-xl">
            <div>
                <ul className="flex gap-4">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/my-activities">Saved Activities</Link></li>
                    <li><Link to="/my-profile">Profile</Link></li>
                    <li><Link to="/my-profile">Profile test</Link></li>
                </ul>
            </div>
        </div>
    )
}