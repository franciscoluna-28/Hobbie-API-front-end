import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import Activities from './components/Actitivites';

function App() {


  return (
  <>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Activities/>}/>

      </Routes>
      <ToastContainer/>
    </BrowserRouter>

    </>
    )}


export default App
