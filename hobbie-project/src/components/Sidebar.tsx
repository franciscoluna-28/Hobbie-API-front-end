import { MdOutlineExplore } from "react-icons/md";
import { BsFillBookmarksFill } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/UserAuthContext";

export default function Sidebar() {
  const { handleLogout } = useAuthContext();
  return (
    <aside className="w-min-full bg-accent shadow-lg min-h-screen max-w-screen-sm px-4 py-8">
      <h5 className="text-gray-700 font-medium text-xl px-4">Activities</h5>
      <ul className="py-2">
        <li className="group hover:bg-accentHover/40 rounded-lg flex gap-2 items-center p-4">
          <MdOutlineExplore className="text-gray-500 text-2xl group-hover:text-white" />
          <Link
            to="/find-activities"
            className="text-gray-500 text-2xl font-medium group-hover:text-white"
          >
            Find Activities
          </Link>
        </li>
        <li className="group hover:bg-accentHover/40 rounded-lg flex gap-2 items-center p-4">
          <BsFillBookmarksFill className="text-gray-500 text-2xl group-hover:text-white" />
          <Link
            to="/saved-activities"
            className="text-gray-500 text-2xl font-medium group-hover:text-white"
          >
            Saved Activities
          </Link>
        </li>
      </ul>
      <h5 className="text-gray-700 mt-4 font-semibold text-xl px-4">Me</h5>
      <ul className="py-2">
        <li className="group hover:bg-accentHover/40 rounded-lg flex gap-2 items-center p-4">
          <AiOutlineUser className="text-gray-500 text-2xl group-hover:text-white" />
          <Link
            to="/my-profile"
            className="text-gray-500 text-2xl font-medium group-hover:text-white"
          >
            My Profile
          </Link>
        </li>
        <li className="group hover:bg-accentHover/40 rounded-lg flex gap-2 items-center p-4">
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </aside>
  );
}
