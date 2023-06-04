import Sidebar from "../components/Sidebar"
import { Outlet } from "react-router-dom"
import { AiOutlineClose } from "react-icons/ai"

export default function RootLayout() {
    return (
        <>
        <div className="fixed bottom-0 mt-4 z-50 bg-main shadow-md p-4 rounded-full">
            <AiOutlineClose className="text-4xl right-0 text-white"/>
        </div>
      <div className="lg:grid lg:grid-cols-1 lg:grid-cols-5">
        <div className="lg:grid-span-1 hidden lg:block ">
          <Sidebar />
        </div>
        <div className="lg:col-span-4 container p-12 flex">
          <Outlet />
        </div>
      </div>
      </>
    );
  }