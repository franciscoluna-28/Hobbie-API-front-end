import './App.css'
import RecomendedActivities from './pages/RecommendedActivities'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import Sidebar from './components/Sidebar'
import SavedActivies from './pages/SavedActivities';

function App() {


  return (
  <>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RecomendedActivities/>}/>
          <Route path="/my-activities" element={<SavedActivies />} />
      </Routes>
      <ToastContainer/>
    </BrowserRouter>

    </>
    )}


export default App
