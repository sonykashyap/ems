

const Attendance = () => {
    return (
        <>
            <div className='grid grid-cols-1 xl:grid-cols-12 gap-6'>

    {/* Left Attendance Card */}
    <div
        className='xl:col-span-5 bg-white rounded-[32px]
        border border-black/5 shadow-xl overflow-hidden'
    >

        {/* Top Gradient */}
        <div
            className='relative overflow-hidden
            bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600
            p-8 text-white'
        >

            {/* Blur */}
            <div
                className='absolute -top-20 -right-20 h-60 w-60
                bg-white/10 rounded-full blur-3xl'
            />

            <div className='relative z-10'>

                <div className='flex items-center justify-between'>

                    <div>
                        <p className='text-white/70 text-sm font-medium'>
                            Today's Status
                        </p>

                        <h2 className='text-4xl font-bold mt-3'>
                            Checked In
                        </h2>
                    </div>

                    <div
                        className='h-16 w-16 rounded-3xl bg-white/20
                        backdrop-blur-md flex items-center justify-center
                        text-3xl'
                    >
                        🟢
                    </div>
                </div>

                {/* Working Timer */}
                <div className='mt-10'>

                    <p className='text-white/70 text-sm mb-2'>
                        Working Hours
                    </p>

                    <h1 className='text-5xl font-bold tracking-wide'>
                        06:24:12
                    </h1>

                    <p className='mt-3 text-white/80'>
                        Since 09:12 AM
                    </p>
                </div>
            </div>
        </div>

        {/* Bottom */}
        <div className='p-6'>

            {/* Punch Buttons */}
            <div className='grid grid-cols-2 gap-4'>

                <button
                    className='h-14 rounded-2xl bg-gradient-to-r
                    from-emerald-500 to-green-600 text-white
                    font-semibold shadow-lg hover:shadow-2xl
                    transition-all duration-300'
                >
                    Punch In
                </button>

                <button
                    className='h-14 rounded-2xl bg-gradient-to-r
                    from-red-500 to-rose-600 text-white
                    font-semibold shadow-lg hover:shadow-2xl
                    transition-all duration-300'
                >
                    Punch Out
                </button>
            </div>

            {/* Timings */}
            <div className='grid grid-cols-2 gap-4 mt-6'>

                <div
                    className='rounded-3xl bg-blue-50 p-5
                    border border-blue-100'
                >
                    <p className='text-sm text-gray-500'>
                        Punch In Time
                    </p>

                    <h3 className='text-2xl font-bold text-blue-700 mt-2'>
                        09:12 AM
                    </h3>
                </div>

                <div
                    className='rounded-3xl bg-red-50 p-5
                    border border-red-100'
                >
                    <p className='text-sm text-gray-500'>
                        Punch Out Time
                    </p>

                    <h3 className='text-2xl font-bold text-red-600 mt-2'>
                        -- : --
                    </h3>
                </div>
            </div>

            {/* Break */}
            <div
                className='mt-6 rounded-3xl border border-black/5
                bg-gray-50 p-5'
            >

                <div className='flex items-center justify-between'>

                    <div>
                        <p className='text-sm text-gray-500'>
                            Break Time
                        </p>

                        <h3 className='text-2xl font-bold text-gray-800 mt-2'>
                            00h 35m
                        </h3>
                    </div>

                    <button
                        className='h-12 px-5 rounded-2xl border
                        border-gray-200 bg-white hover:bg-gray-100
                        transition-all duration-300'
                    >
                        Start Break
                    </button>
                </div>
            </div>
        </div>
    </div>

    {/* Right Attendance Details */}
    <div className='xl:col-span-7 space-y-6'>

        {/* Today's Summary */}
        <div
            className='bg-white rounded-[32px]
            border border-black/5 shadow-xl p-6'
        >

            <div className='flex items-center justify-between mb-8'>

                <div>
                    <h2 className='text-2xl font-bold text-gray-800'>
                        Today's Summary
                    </h2>

                    <p className='text-gray-500 mt-1 text-sm'>
                        Real-time attendance insights
                    </p>
                </div>

                <button
                    className='h-11 px-5 rounded-2xl border
                    border-gray-200 bg-gray-50 hover:bg-gray-100
                    transition-all duration-300'
                >
                    Attendance History
                </button>
            </div>

            {/* Stats */}
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>

                {[
                    {
                        title: "Total Hours",
                        value: "06h 24m",
                        icon: "⏱️",
                        bg: "bg-blue-50",
                        text: "text-blue-700",
                    },
                    {
                        title: "Break Taken",
                        value: "35m",
                        icon: "☕",
                        bg: "bg-orange-50",
                        text: "text-orange-600",
                    },
                    {
                        title: "Productivity",
                        value: "92%",
                        icon: "📈",
                        bg: "bg-emerald-50",
                        text: "text-emerald-600",
                    },
                ].map((item, i) => (
                    <div
                        key={i}
                        className={`rounded-3xl p-5 ${item.bg}`}
                    >

                        <div className='flex items-start justify-between'>

                            <div>
                                <p className='text-sm text-gray-500'>
                                    {item.title}
                                </p>

                                <h2
                                    className={`text-3xl font-bold mt-3 ${item.text}`}
                                >
                                    {item.value}
                                </h2>
                            </div>

                            <div
                                className='h-12 w-12 rounded-2xl bg-white
                                flex items-center justify-center text-2xl'
                            >
                                {item.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

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
    </div>
</div>
        </>
    )
}

export default Attendance;