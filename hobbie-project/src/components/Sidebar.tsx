import { MdOutlineExplore } from "react-icons/md";
import { BsFillBookmarksFill } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/UserAuthContext";
import { ImExit } from "react-icons/im";
/* import { useState } from "react" */
import { useNavigate } from "react-router-dom";


export default function Sidebar() {
/*   const [isOpen, setIsOpen] = useState<boolean>(true); */

  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    try {
      await handleLogout();
      navigate("/", { replace: true });
    } catch (error) {
      alert("Error");
    }
  };



  const { handleLogout } = useAuthContext();
  return (
    <div className="sticky max-h-4 top-0">
    <aside className="bg-white shadow-lg min-h-screen w-full px-8 py-8 border-r-2 max-w-xs">

      <h5 className="text-accent/80 font-bold text-xl">Activities</h5>
      <ul className="py-2">
        <li className="group hover:bg-main rounded-lg flex gap-2 items-center p-4">
          <MdOutlineExplore className="text-accent/80 text-xl mb-1 group-hover:text-white" />
          <Link
            to="/find-activities"
            className="text-xl text-accent/80 group-hover:text-white font-normal w-full"
          >
            Find Activities
          </Link>
        </li>
        <li className="group hover:bg-main rounded-lg flex gap-2 items-center p-4">
          <BsFillBookmarksFill className="text-accent/80 text-xl group-hover:text-white" />
          <Link
            to="/saved-activities"
            className="text-accent/80 text-xl font-normal group-hover:text-white w-full"
          >
            Saved Activities
          </Link>
        </li>
      </ul>
      <hr></hr>
      <h5 className="text-accent/80 mt-4 font-bold text-xl">Me</h5>
      <ul className="py-2">
        <li className="group hover:bg-main rounded-lg flex gap-2 items-center p-4">
          <AiOutlineUser className="text-accent/80 text-xl group-hover:text-white" />
          <Link
            to="/my-profile"
            className="text-accent/80 text-xl font-normal group-hover:text-white"
          >
            My Profile
          </Link>
        </li>
        <li className="group hover:bg-main rounded-lg flex gap-2 items-center p-4">
          <button
            className="flex gap-2 group-hover:text-white text-accent/80 text-xl font-normal items-center"
            onClick={handleLogoutClick}
          >
            <ImExit />
            Logout
          </button>
        </li>
      </ul>
      <hr></hr>
      </aside>
      </div>

  );
}
