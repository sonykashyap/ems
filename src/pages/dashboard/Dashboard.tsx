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
        {text: "Total Employees", value: totalUsers},
        {text: "Total Roles", value: totalRoles},
        {text: "Total Present", value: 400},
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
                    return <div key={i} 
                        className={`rounded-lg z-1 group relative before:absolute bg-white
                        before:content[""] before:top-0 transition before:z-[-1] before:h-0
                        before:bg-purple-500 before:w-full before:left-0 hover:before:h-4/5 
                        before:rounded-b-[50%] text-black py-8 px-4 shadow
                        before:transition-all before:duration-500 before:ease-out
                        transition-all duration-500 ease-out
                        hover:border-b-2  hover:border-purple-500
                        `}>
                        <p className='tracking-wide capitalize text-black group-hover:text-white'> {d.text} </p>
                        <div className='text-center mt-4'>
                            <span className='text-3xl group-hover:text-white text-black font-bold text-center'> {d.value} </span>
                        </div>
                    </div>
                })}
                
            </div>
        </>
    )
}

export default Dashboard;