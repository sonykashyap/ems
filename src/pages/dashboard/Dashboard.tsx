import { useAppDispatch, useAppSelector } from '@/hooks';
import React, { useEffect, useState } from 'react';
const AdminDashboard = React.lazy(() => import("./AdminDashboard"));
const EmployeeDashboard = React.lazy(() => import("./EmployeeDashboard"));

interface dashboardType {
  text: string;
  value: number;
}

const dashboardComponents: Record<string, React.ComponentType> = {
    admin: AdminDashboard ,
    user: EmployeeDashboard,
};

const Dashboard = () => {
    const role = localStorage.getItem("role") || "user";
    
     const Component =
        dashboardComponents[role] || EmployeeDashboard;

    return <Component />;
}

export default Dashboard;