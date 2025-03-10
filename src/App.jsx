import React from 'react'
import {  useNavigate } from "react-router-dom";
import Home from './pages/Home';
import ImageMarquee from './components/ImageSlider';
import Imageslider2 from './components/Imageslider2';
import FindJob from './pages/Findjob';
import Company from './pages/Company';
import { AuthProvider } from './context/AuthContext';


import Footer from './components/Footer';



const App = () => {

  return (
    <div>
      

       
      <Home/>
      <ImageMarquee />
      <FindJob/>
      <Imageslider2/>
      <Company/>
     
   <Footer/>
    
      
    </div>
  )
}

export default App
