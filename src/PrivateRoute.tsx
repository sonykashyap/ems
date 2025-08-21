import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Example authentication check
let url = "/login";
const isAuthenticated = () => {
  if(localStorage.getItem('token') !== null){
    if(localStorage.getItem('role') === 'admin'){
      url = ("/admin/login");
    }
    return true;
  }else{
    const location = window.location.href;
    if(location.includes('admin')){
      url = ("/admin/login")
    }else{
      url = "/login";
    }
    return false;
  }
};

// PrivateRoute Component
const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to={url} />;
};

export default PrivateRoute;