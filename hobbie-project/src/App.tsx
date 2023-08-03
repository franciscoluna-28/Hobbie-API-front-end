import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Activities from "./components/Actitivites";
import SavedActivities from "./pages/Saved-Activities";
import UserProfile from "./components/UserProfile";
import Login from "./pages/Login";
import { useAuthContext } from "./hooks/useAuthContext";
import PrivateWrapper from "./utils/PrivateWrapper";
import RootLayout from "./layouts/RootLayout";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./utils/Constants";
import FaqPage from "./pages/FAQ";
import ActivityDetails from "./pages/ActivityDetails";

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
              <Route path="/activities/:activityId" element={<ActivityDetails />} />
            </Route>
            <Route element={<PrivateWrapper currentUser={currentUser} />}>
              <Route path="/my-profile" element={<UserProfile />} />
            </Route>
            <Route element={<PrivateWrapper currentUser={currentUser} />}>
              <Route path="/faq" element={<FaqPage />} />
            </Route>
          </Route>
        </Route>
      </>
    )
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
        <ToastContainer></ToastContainer>
      </QueryClientProvider>
    </>
  );
}

export default App;
