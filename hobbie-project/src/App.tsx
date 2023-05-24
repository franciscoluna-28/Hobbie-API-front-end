import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import Activities from './components/Actitivites';
import SavedActivies from './components/SavedActivities';
import UserProfile from './components/UserProfile';

function App() {


  return (
  <>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Activities/>}/>
        <Route path="/my-activities" element={<SavedActivies/>}/>
        <Route path="/my-profile" element={<UserProfile/>}/>
        

      </Routes>

      <ToastContainer/>
    </BrowserRouter>

    </>
    )}


export default App
