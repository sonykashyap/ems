import { useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayouts';


// Example authentication check
// let url = "/login";
const isAuthenticated = () => {
  const location = useLocation();
  const userData = JSON.parse(localStorage.getItem('userData') ?? "");
  if(localStorage.getItem('token') !== null){
    console.log("Tokne found");
    // if(userData?.role === 'admin'){
    //   url = ("/admin/login");
    // }
    return true;
  }else{
    console.log("Tokne not found");
    // const location = window.location.href;
    // if(location.includes('admin')){
    //   url = ("/admin/login")
    // }else{
    //   url = "/login";
    // }
    return false;
  }
};

// PrivateRoute Component
const PrivateRoute = () => {
  return isAuthenticated() ? 
    <AdminLayout> 
      <Outlet />  
    </AdminLayout> : 
    <Navigate to="/login" />;
};

export default PrivateRoute;