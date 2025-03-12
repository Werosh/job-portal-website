// AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import your components here
import Home from '../pages/Home';
import App from '../App'; // Update this path to where your App component is located
import Navbar from '../components/Navbar';
import Background from '../components/Background';
import FindJob from '../pages/Findjob';
import CompanyDirectory from '../pages/Company';
import MainCompanyPage from '../pages/MainCompanyPage';
import SignUp from '../LoginPages/SignUp';
import LoginPage from '../LoginPages/LoginPage';
import ForgotPassword from '../LoginPages/ForgotPWD';
import UserDashboard from '../dasboards/UserDash';
import { AuthProvider } from '../context/AuthContext';
import ApplyPage from '../dasboards/ApplyPage';
import PostJob from '../dasboards/PostJob';


const AppRouter = () => {
  return (
    <AuthProvider>
    <Router>

      <Navbar />
      <Background />
      <Routes>
        {/* Define the routes and their corresponding components */}
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/findjob" element={<FindJob />} />
        <Route path="/companies" element={<CompanyDirectory />} />
        <Route path="/ListOfCompanies" element={<MainCompanyPage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/pwdrec" element={<ForgotPassword />} />
        <Route path="/userprofile" element={<UserDashboard />} />
        <Route path="/ApplytoJob" element={<ApplyPage />} />
        <Route path="/postjob" element={<PostJob />} />

        
      </Routes>
      
    </Router>
    </AuthProvider>
  );
}

export default AppRouter;