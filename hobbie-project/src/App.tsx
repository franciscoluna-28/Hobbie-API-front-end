import { BrowserRouter, Routes, Route  } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Activities from './components/Actitivites'
import SavedActivities from './components/SavedActivities';
import UserProfile from './components/UserProfile';
import Login from './pages/Login';
import { useAuthContext } from './context/UserAuthContext';
import { PrivateWrapper } from "../utils/PrivateWrapper"






function App() {
  const { currentUser } = useAuthContext();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateWrapper currentUser={currentUser} />}>
            <Route path="/find-activities" element={<Activities />} />
          </Route><Route element={<PrivateWrapper currentUser={currentUser} />}>
            <Route path="/saved-activities" element={<SavedActivities />} />
          </Route><Route element={<PrivateWrapper currentUser={currentUser} />}>
            <Route path="/my-profile" element={<UserProfile />} />
          </Route>
        </Routes>

        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
