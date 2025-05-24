import React from 'react'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Home from './pages/DashBoard/Home'
import Income from './pages/DashBoard/Income'
import Expense from './pages/DashBoard/Expense'
 import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate,
} from 'react-router-dom';
 
 const App = () => {
   return (
     <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root/>} />
          <Route path="/login" exact element={<Login/>} />
          <Route path="/signUp" exact element={<SignUp/>} />
          <Route path="/dashboard" exact element={<Home />} />
          <Route path="/income" exact element={<Income />} />
          <Route path="/Expense" exact element={<Expense />} />
          </Routes>
         </Router>
     </div>
   )
 }

 export default App
  
 const Root = () => {
  // Check if token exits in local storage
   const isAuthenticated = !!localStorage.getItem('token');

   // Redirect to login if authenticated,otherwise redirect to login
    return isAuthenticated ? (<Navigate to="/dashboard" /> )
    :( <Navigate to="/login" />);
  };