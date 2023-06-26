import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Activities from "./components/Actitivites";
import SavedActivities from "./components/SavedActivities";
import UserProfile from "./components/UserProfile";
import Login from "./pages/Login";
import { useAuthContext } from "./context/UserAuthContext";
import { PrivateWrapper } from "../utils/PrivateWrapper";
import RootLayout from "./layouts/RootLayout";

function App() {
  const { currentUser } = useAuthContext();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route>
          <Route path="/" element={<Login />} />
          <Route element={<RootLayout />}>
            <Route element={<PrivateWrapper currentUser={currentUser} />}>
              <Route path="/find-activities" element={<Activities />} />
            </Route>
            <Route element={<PrivateWrapper currentUser={currentUser} />}>
              <Route path="/saved-activities" element={<SavedActivities />} />
            </Route>
            <Route element={<PrivateWrapper currentUser={currentUser} />}>
              <Route path="/my-profile" element={<UserProfile />} />
            </Route>
          </Route>
        </Route>
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default App;
