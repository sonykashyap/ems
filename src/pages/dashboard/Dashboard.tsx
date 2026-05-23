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
    const role = localStorage.getItem("role");
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
            {/* <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
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
                
            </div> */}
            <div className='space-y-8'>

    {/* Dashboard Header */}
    <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <div>
            <h1 className='text-3xl font-bold text-gray-800'>
                {role === "admin" ? "Admin Dashboard" : "Employee Dashboard"}
            </h1>

            <p className='text-gray-500 mt-1'>
                {role === "admin"
                    ? "Manage employees, reports and company activities"
                    : "Track your attendance, leaves and daily activities"}
            </p>
        </div>

        <button
            className='h-12 px-6 rounded-2xl bg-gradient-to-r 
            from-blue-600 to-indigo-600 text-white font-semibold
            shadow-lg hover:shadow-xl transition-all duration-300'
        >
            {role === "admin" ? "Generate Report" : "Apply Leave"}
        </button>
    </div>

    {/* Dashboard Cards */}
    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'>
        {data &&
            data.map((d, i) => {
                return (
                    <div
                        key={i}
                        className='group relative overflow-hidden rounded-3xl 
                        bg-white border border-black/5 shadow-lg hover:shadow-2xl
                        transition-all duration-500 hover:-translate-y-1'
                    >

                        {/* Top Gradient */}
                        <div
                            className='absolute inset-0 bg-gradient-to-br 
                            from-blue-600 via-indigo-600 to-purple-600 
                            opacity-0 group-hover:opacity-100 transition-all duration-500'
                        />

                        {/* Content */}
                        <div className='relative z-10 p-6'>

                            {/* Top */}
                            <div className='flex items-start justify-between'>

                                <div>
                                    <p
                                        className='text-sm font-medium text-gray-500 
                                        group-hover:text-blue-100 transition-all duration-300'
                                    >
                                        {d.text}
                                    </p>

                                    <h2
                                        className='text-4xl font-bold text-gray-800 mt-4
                                        group-hover:text-white transition-all duration-300'
                                    >
                                        {d.value}
                                    </h2>
                                </div>

                                {/* Icon */}
                                <div
                                    className='h-14 w-14 rounded-2xl bg-blue-100
                                    flex items-center justify-center text-2xl
                                    group-hover:bg-white/20 transition-all duration-300'
                                >
                                    {role === "admin"
                                        ? i === 0
                                            ? "👨‍💼"
                                            : i === 1
                                            ? "👥"
                                            : i === 2
                                            ? "📊"
                                            : "📈"
                                        : i === 0
                                        ? "📅"
                                        : i === 1
                                        ? "🌴"
                                        : i === 2
                                        ? "⏰"
                                        : "✅"}
                                </div>
                            </div>

                            {/* Bottom */}
                            <div className='mt-8 flex items-center justify-between'>

                                <span
                                    className='text-sm font-medium text-green-600
                                    group-hover:text-green-200 transition-all duration-300'
                                >
                                    +12% from last month
                                </span>

                                <button
                                    className='text-sm font-semibold text-blue-600
                                    group-hover:text-white transition-all duration-300'
                                >
                                    View →
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
    </div>

    {/* Extra Section */}
    <div className='grid grid-cols-1 xl:grid-cols-3 gap-6'>

        {/* Left */}
        <div className='xl:col-span-2 bg-white rounded-3xl shadow-xl border border-black/5 p-6'>

            <div className='flex items-center justify-between mb-6'>
                <div>
                    <h2 className='text-2xl font-bold text-gray-800'>
                        {role === "admin"
                            ? "Company Overview"
                            : "Attendance Overview"}
                    </h2>

                    <p className='text-sm text-gray-500 mt-1'>
                        {role === "admin"
                            ? "Organization analytics and employee activity"
                            : "Your monthly attendance and productivity"}
                    </p>
                </div>

                <select
                    className='h-11 px-4 rounded-xl border border-gray-200 
                    bg-gray-50 outline-none'
                >
                    <option>This Month</option>
                    <option>Last Month</option>
                    <option>Last 3 Months</option>
                </select>
            </div>

            {/* Chart Placeholder */}
            <div
                className='h-[350px] rounded-3xl bg-gradient-to-br 
                from-slate-100 via-blue-50 to-indigo-100 
                flex items-center justify-center border border-dashed border-blue-200'
            >
                <div className='text-center'>
                    <div className='text-6xl mb-4'>
                        📊
                    </div>

                    <h3 className='text-2xl font-bold text-gray-700'>
                        Analytics Chart
                    </h3>

                    <p className='text-gray-500 mt-2'>
                        Integrate ApexCharts / Recharts here
                    </p>
                </div>
            </div>
        </div>

        {/* Right Sidebar */}
        <div className='space-y-6'>

            {/* Activity */}
            <div className='bg-white rounded-3xl shadow-xl border border-black/5 p-6'>

                <h2 className='text-2xl font-bold text-gray-800 mb-6'>
                    Recent Activity
                </h2>

                <div className='space-y-5'>

                    {[1, 2, 3, 4].map((_, i) => (
                        <div
                            key={i}
                            className='flex items-start gap-4'
                        >
                            <div
                                className='h-12 w-12 rounded-2xl bg-blue-100
                                flex items-center justify-center text-xl shrink-0'
                            >
                                {role === "admin" ? "👨‍💻" : "📝"}
                            </div>

                            <div>
                                <h3 className='font-semibold text-gray-800'>
                                    {role === "admin"
                                        ? "New employee joined"
                                        : "Leave request submitted"}
                                </h3>

                                <p className='text-sm text-gray-500 mt-1'>
                                    2 hours ago
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Performance */}
            <div className='bg-white rounded-3xl shadow-xl border border-black/5 p-6'>

                <h2 className='text-2xl font-bold text-gray-800 mb-6'>
                    {role === "admin"
                        ? "System Status"
                        : "Performance"}
                </h2>

                <div className='flex flex-col items-center justify-center text-center'>

                    <div
                        className='h-32 w-32 rounded-full 
                        bg-gradient-to-r from-blue-600 to-indigo-600
                        flex items-center justify-center text-white
                        text-4xl font-bold shadow-xl'
                    >
                        {role === "admin" ? "98%" : "A+"}
                    </div>

                    <h3 className='text-xl font-bold text-gray-800 mt-6'>
                        {role === "admin"
                            ? "Server Running Smoothly"
                            : "Excellent Performance"}
                    </h3>

                    <p className='text-gray-500 mt-2 leading-7'>
                        {role === "admin"
                            ? "All systems are operational without any issue."
                            : "Your productivity and attendance are above average."}
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
        </>
    )
}

export default Dashboard;