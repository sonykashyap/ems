import { useAppDispatch, useAppSelector } from '@/hooks';
import React, { useEffect, useState } from 'react';


interface dashboardType {
  text: string;
  value: number;
}

// EmployeeDashboard.jsx

const employeeStats = [
    {
        title: "Today Status",
        value: "Present",
        icon: "🟢",
        color: "from-emerald-500 to-green-600",
        bg: "bg-emerald-50",
    },
    {
        title: "Punch In Time",
        value: "09:12 AM",
        icon: "🕘",
        color: "from-blue-500 to-indigo-600",
        bg: "bg-blue-50",
    },
    {
        title: "Punch Out Time",
        value: "06:34 PM",
        icon: "🕕",
        color: "from-orange-500 to-amber-600",
        bg: "bg-orange-50",
    },
    {
        title: "Total Hours Today",
        value: "08h 22m",
        icon: "⏱️",
        color: "from-violet-500 to-purple-600",
        bg: "bg-violet-50",
    },
    {
        title: "Attendance %",
        value: "96%",
        icon: "📈",
        color: "from-cyan-500 to-sky-600",
        bg: "bg-cyan-50",
    },
    {
        title: "Leave Balance",
        value: "08 Days",
        icon: "🌴",
        color: "from-pink-500 to-rose-600",
        bg: "bg-pink-50",
    },
    {
        title: "Late Arrivals",
        value: "02 Days",
        icon: "⚠️",
        color: "from-red-500 to-rose-600",
        bg: "bg-red-50",
    },
    {
        title: "WFH Days",
        value: "05 Days",
        icon: "🏠",
        color: "from-indigo-500 to-blue-600",
        bg: "bg-indigo-50",
    },
];

export default function EmployeeDashboard() {
    return (
        <>
        
        {/* Main Employee Dashboard Layout */}
<div className='space-y-6'>

    {/* Top Stats */}
    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'>

        {employeeStats.map((item, i) => (
            <div
                key={i}
                className='group relative overflow-hidden rounded-[32px]
                border border-black/5 bg-white shadow-lg
                hover:shadow-2xl transition-all duration-500
                hover:-translate-y-1'
            >

                {/* Hover Overlay */}
                <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color}
                    opacity-0 group-hover:opacity-100 transition-all duration-500`}
                />

                <div className='relative z-10 p-6'>

                    {/* Top */}
                    <div className='flex items-start justify-between'>

                        <div>

                            <p
                                className='text-sm font-medium text-gray-500
                                group-hover:text-white/80 transition-all duration-300'
                            >
                                {item.title}
                            </p>

                            <h2
                                className='text-[30px] font-bold text-gray-800 mt-4
                                group-hover:text-white transition-all duration-300'
                            >
                                {item.value}
                            </h2>
                        </div>

                        {/* Icon */}
                        <div
                            className={`h-14 w-14 rounded-2xl ${item.bg}
                            flex items-center justify-center text-2xl
                            shadow-sm group-hover:bg-white/20
                            transition-all duration-300`}
                        >
                            {item.icon}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className='mt-8 flex items-center justify-between'>

                        <span
                            className='text-sm font-medium text-emerald-600
                            group-hover:text-emerald-100 transition-all duration-300'
                        >
                            Live Updated
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
        ))}
    </div>

    {/* Bottom Grid */}
    <div className='grid grid-cols-1 xl:grid-cols-12 gap-6'>

        {/* Leave Balance */}
        <div
            className='xl:col-span-4 bg-white rounded-[32px]
            border border-black/5 shadow-xl p-6'
        >

            {/* Header */}
            <div className='flex items-center justify-between mb-8'>

                <div>
                    <h2 className='text-2xl font-bold text-gray-800'>
                        Leave Balance
                    </h2>

                    <p className='text-gray-500 mt-1 text-sm'>
                        Available leave quota overview
                    </p>
                </div>

                <button
                    className='h-11 px-5 rounded-2xl bg-gradient-to-r
                    from-blue-600 to-indigo-600 text-white
                    font-semibold shadow-lg hover:shadow-xl
                    transition-all duration-300'
                >
                    Apply
                </button>
            </div>

            {/* Leave Items */}
            <div className='space-y-4'>

                {[
                    {
                        title: "Casual Leave",
                        value: "08",
                        icon: "🌴",
                        bg: "bg-blue-50",
                        text: "text-blue-600",
                    },
                    {
                        title: "Sick Leave",
                        value: "05",
                        icon: "💊",
                        bg: "bg-red-50",
                        text: "text-red-600",
                    },
                    {
                        title: "RH Leave",
                        value: "02",
                        icon: "🎉",
                        bg: "bg-purple-50",
                        text: "text-purple-600",
                    },
                    {
                        title: "WFH Balance",
                        value: "06",
                        icon: "🏠",
                        bg: "bg-emerald-50",
                        text: "text-emerald-600",
                    },
                ].map((leave, i) => (
                    <div
                        key={i}
                        className={`flex items-center justify-between
                        rounded-3xl p-4 ${leave.bg}`}
                    >

                        <div className='flex items-center gap-4'>

                            <div
                                className='h-12 w-12 rounded-2xl bg-white
                                flex items-center justify-center text-2xl'
                            >
                                {leave.icon}
                            </div>

                            <div>
                                <h3 className='font-semibold text-gray-800'>
                                    {leave.title}
                                </h3>

                                <p className='text-sm text-gray-500'>
                                    Remaining Balance
                                </p>
                            </div>
                        </div>

                        <h2
                            className={`text-2xl font-bold ${leave.text}`}
                        >
                            {leave.value}
                        </h2>
                    </div>
                ))}
            </div>
        </div>

        {/* Leave Requests History */}
        <div
            className='xl:col-span-8 bg-white rounded-[32px]
            border border-black/5 shadow-xl p-6'
        >

            {/* Header */}
            <div className='flex items-center justify-between mb-8'>

                <div>
                    <h2 className='text-2xl font-bold text-gray-800'>
                        Leave Requests
                    </h2>

                    <p className='text-gray-500 mt-1 text-sm'>
                        Your complete leave application history
                    </p>
                </div>

                <button
                    className='h-11 px-5 rounded-2xl border border-gray-200
                    bg-gray-50 hover:bg-gray-100 transition-all duration-300'
                >
                    View All
                </button>
            </div>

            {/* Table Header */}
            <div
                className='hidden md:grid grid-cols-12 gap-4 px-5 pb-4
                border-b border-gray-100'
            >
                <p className='col-span-3 text-sm font-semibold text-gray-500'>
                    Leave Type
                </p>

                <p className='col-span-3 text-sm font-semibold text-gray-500'>
                    Duration
                </p>

                <p className='col-span-3 text-sm font-semibold text-gray-500'>
                    Applied On
                </p>

                <p className='col-span-3 text-sm font-semibold text-gray-500 text-right'>
                    Status
                </p>
            </div>

            {/* Leave Requests */}
            <div className='divide-y divide-gray-100'>

                {[
                    {
                        type: "Casual Leave",
                        duration: "12 Aug - 14 Aug",
                        applied: "10 Aug 2026",
                        status: "Approved",
                        color: "bg-emerald-100 text-emerald-700",
                    },
                    {
                        type: "Sick Leave",
                        duration: "18 Aug",
                        applied: "17 Aug 2026",
                        status: "Pending",
                        color: "bg-amber-100 text-amber-700",
                    },
                    {
                        type: "WFH Request",
                        duration: "22 Aug",
                        applied: "20 Aug 2026",
                        status: "Rejected",
                        color: "bg-red-100 text-red-700",
                    },
                    {
                        type: "RH Leave",
                        duration: "29 Aug",
                        applied: "25 Aug 2026",
                        status: "Approved",
                        color: "bg-emerald-100 text-emerald-700",
                    },
                ].map((leave, i) => (
                    <div
                        key={i}
                        className='grid grid-cols-1 md:grid-cols-12
                        gap-4 items-center px-5 py-5 hover:bg-gray-50
                        transition-all duration-300 rounded-2xl'
                    >

                        <div className='md:col-span-3'>
                            <h3 className='font-semibold text-gray-800'>
                                {leave.type}
                            </h3>
                        </div>

                        <div className='md:col-span-3'>
                            <p className='text-gray-600'>
                                {leave.duration}
                            </p>
                        </div>

                        <div className='md:col-span-3'>
                            <p className='text-gray-500'>
                                {leave.applied}
                            </p>
                        </div>

                        <div
                            className='md:col-span-3 flex md:justify-end'
                        >
                            <span
                                className={`px-4 py-2 rounded-2xl text-sm
                                font-semibold ${leave.color}`}
                            >
                                {leave.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
</div>
        </>
    );
}
