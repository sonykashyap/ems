import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom'


type MyComponentProps = {
  children: React.ReactNode;
};

const AdminLayout = ({children} : MyComponentProps) => {
    
  return(
      <>
          <h1>Admin Layout</h1>
          {children}
      </>
  )
}

export default AdminLayout