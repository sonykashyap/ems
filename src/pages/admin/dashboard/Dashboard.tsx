import React, { useEffect, useState } from 'react';
import AdminLayout from '@/layouts/AdminLayouts';


const Dashboard = () => {

    useEffect(()=>{
        console.log("Dashboard Compoenent called");
    },[]);
    
    return(
        <>
        <AdminLayout>
            <h1>Dashboard</h1>
        </AdminLayout>
            
        </>
    )
}

export default Dashboard