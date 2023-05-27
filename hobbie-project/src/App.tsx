import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Activities from './components/Actitivites'
import SavedActivities from './components/SavedActivities';
import UserProfile from './components/UserProfile';
import Login from './pages/Login';
import { useAuthContext } from './context/UserAuthContext';
import { Outlet } from 'react-router-dom';






function App() {
  const { currentUser } = useAuthContext();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PrivateWrapper = ({ currentUser }: any) => {
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateWrapper currentUser={currentUser} />}>
  <Route path="/find-activities" element={<Activities />} />
</Route><Route element={<PrivateWrapper currentUser={currentUser} />}>
  <Route path="/saved-activities" element={<SavedActivities />} />
</Route><Route element={<PrivateWrapper currentUser={currentUser} />}>
  <Route path="/my-profile" element={<UserProfile/>} />
</Route>
        </Routes>

        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
