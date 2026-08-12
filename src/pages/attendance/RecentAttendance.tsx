import React from 'react'

const RecentAttendance = () => {
  return (
    <>
        {/* Recent Attendance */}
        <div
            className='bg-white rounded-[32px]
            border border-black/5 shadow-xl p-6'
        >

            <div className='flex items-center justify-between mb-8'>

                <div>
                    <h2 className='text-2xl font-bold text-gray-800'>
                        Recent Attendance
                    </h2>

                    <p className='text-gray-500 mt-1 text-sm'>
                        Your last attendance records
                    </p>
                </div>

                <button
                    className='text-blue-600 font-semibold hover:text-blue-700'
                >
                    View All
                </button>
            </div>

            {/* Attendance List */}
            <div className='space-y-4'>

                {[
                    {
                        date: "27 Aug 2026",
                        in: "09:12 AM",
                        out: "-- : --",
                        status: "Working",
                        color: "bg-blue-100 text-blue-700",
                    },
                    {
                        date: "26 Aug 2026",
                        in: "09:04 AM",
                        out: "06:31 PM",
                        status: "Completed",
                        color: "bg-emerald-100 text-emerald-700",
                    },
                    {
                        date: "25 Aug 2026",
                        in: "09:28 AM",
                        out: "06:22 PM",
                        status: "Late",
                        color: "bg-red-100 text-red-700",
                    },
                ].map((attendance, i) => (
                    <div
                        key={i}
                        className='flex flex-col md:flex-row md:items-center
                        md:justify-between gap-5 rounded-3xl border
                        border-black/5 p-5 hover:bg-gray-50
                        transition-all duration-300'
                    >

                        {/* Left */}
                        <div className='flex items-center gap-4'>

                            <div
                                className='h-14 w-14 rounded-2xl bg-blue-50
                                flex items-center justify-center text-2xl'
                            >
                                📅
                            </div>

                            <div>
                                <h3 className='font-semibold text-gray-800'>
                                    {attendance.date}
                                </h3>

                                <p className='text-sm text-gray-500 mt-1'>
                                    Punch In: {attendance.in}
                                </p>
                            </div>
                        </div>

                        {/* Center */}
                        <div className='flex items-center gap-10'>

                            <div>
                                <p className='text-sm text-gray-500'>
                                    Punch Out
                                </p>

                                <h3 className='font-semibold text-gray-800 mt-1'>
                                    {attendance.out}
                                </h3>
                            </div>

                            <div>
                                <p className='text-sm text-gray-500'>
                                    Status
                                </p>

                                <span
                                    className={`inline-flex mt-1 px-4 py-2
                                    rounded-2xl text-sm font-semibold
                                    ${attendance.color}`}
                                >
                                    {attendance.status}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
  )
}

export default RecentAttendance;