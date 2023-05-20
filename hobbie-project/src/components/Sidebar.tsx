import { MdOutlineExplore } from "react-icons/md"
import { BsFillBookmarksFill } from "react-icons/bs"
import { Link } from "react-router-dom"

export default function Sidebar(){
    return(
        <aside className="w-1/4 bg-white shadow-lg min-h-screen">
            <ul className="py-4">
                <li className="py-4">
                    <div className="flex justify-center">
                        <div className="flex gap-4
                         items-center">
                             <MdOutlineExplore className="text-gray-500 text-2xl"/>
                            <Link to="/" className="text-gray-500 font-semibold text-2xl">Explore Activities</Link>
                           
                        </div>
                    </div>
                </li>
                <li className="py-4">
                    <div className="flex justify-center">
                        <div className="flex gap-4
                         items-center">
                             <BsFillBookmarksFill className="text-gray-500 text-2xl"/>
                            <Link to="/my-activities" className="text-gray-500 font-semibold text-2xl">Saved Activities</Link>
                           
                        </div>
                    </div>
                </li>
            </ul>
        </aside>
    )
}
