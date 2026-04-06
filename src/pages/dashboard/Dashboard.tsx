import { useAppDispatch, useAppSelector } from '@/hooks';
import { dashboardData } from '@/reducers/dashboardReducer';
import React, { useEffect, useState } from 'react';

interface dashboardType {
  text: string;
  value: number;
}

const Dashboard = () => {
    const dispatch = useAppDispatch();
    const totalUsers = useAppSelector(state=> state.dashboardReducer.totalUsers);
    const totalRoles = useAppSelector(state=> state.dashboardReducer.totalRoles);
    const data: dashboardType[] = [
        {text: "Total Users", value: totalUsers},
        {text: "Total Roles", value: totalRoles},
        {text: "Total Employees", value: 400},
        {text: "Total Projects", value: 100},
    ];

    useEffect(()=>{
        console.log("Dashboard Component called");
        dispatch(dashboardData());
    },[]);
    
    return(
        <>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                {data && data.map((d, i)=>{
                    return <div key={i} className='bg-linear-to-r bg-radial-[at_25%_25%] from-purple-400 to-purple-700 rounded-lg text-white py-4 px-4'>
                        <p className='tracking-wide capitalize'> {d.text} </p>
                        <div className='text-center mt-4'>
                            <span className='text-3xl text-purple-100 font-bold text-center'> {d.value} </span>
                        </div>
                    </div>
                })}
                
            </div>
        </>
    )
}

export default Dashboard;