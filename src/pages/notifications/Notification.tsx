import React from 'react';

const Notification = () =>{
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6">
                <div className="max-w-6xl mx-auto">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">
                                Notifications
                            </h1>

                            <p className="text-gray-500 mt-1">
                                Stay updated with all announcements and updates from admin
                            </p>
                        </div>

                        <button
                            className="h-12 px-6 rounded-2xl bg-white border border-gray-200
                            text-gray-700 font-semibold shadow-sm hover:shadow-md
                            transition-all duration-300"
                        >
                            Mark All as Read
                        </button>
                    </div>

                    {/* Notification Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

                        {/* Total */}
                        <div className="bg-white rounded-3xl p-5 shadow-lg border border-black/5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Total Notifications
                                    </p>

                                    <h2 className="text-3xl font-bold text-gray-800 mt-1">
                                        24
                                    </h2>
                                </div>

                                <div
                                    className="h-14 w-14 rounded-2xl bg-blue-100 
                                    flex items-center justify-center text-2xl"
                                >
                                    🔔
                                </div>
                            </div>
                        </div>

                        {/* Unread */}
                        <div className="bg-white rounded-3xl p-5 shadow-lg border border-black/5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Unread
                                    </p>

                                    <h2 className="text-3xl font-bold text-red-500 mt-1">
                                        05
                                    </h2>
                                </div>

                                <div
                                    className="h-14 w-14 rounded-2xl bg-red-100 
                                    flex items-center justify-center text-2xl"
                                >
                                    📩
                                </div>
                            </div>
                        </div>

                        {/* Important */}
                        <div className="bg-white rounded-3xl p-5 shadow-lg border border-black/5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Important
                                    </p>

                                    <h2 className="text-3xl font-bold text-yellow-500 mt-1">
                                        03
                                    </h2>
                                </div>

                                <div
                                    className="h-14 w-14 rounded-2xl bg-yellow-100 
                                    flex items-center justify-center text-2xl"
                                >
                                    ⭐
                                </div>
                            </div>
                        </div>

                        {/* Announcements */}
                        <div className="bg-white rounded-3xl p-5 shadow-lg border border-black/5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Announcements
                                    </p>

                                    <h2 className="text-3xl font-bold text-indigo-500 mt-1">
                                        16
                                    </h2>
                                </div>

                                <div
                                    className="h-14 w-14 rounded-2xl bg-indigo-100 
                                    flex items-center justify-center text-2xl"
                                >
                                    📢
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notifications List */}
                    <div className="space-y-5">

                        {/* Notification Card */}
                        <div
                            className="bg-white rounded-3xl p-6 shadow-lg border border-blue-100
                            hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                        >
                            {/* Unread Indicator */}
                            <div
                                className="absolute top-6 right-6 h-3 w-3 rounded-full bg-blue-500"
                            />

                            <div className="flex flex-col md:flex-row md:items-start gap-5">

                                {/* Icon */}
                                <div
                                    className="h-16 w-16 rounded-2xl bg-blue-100 
                                    flex items-center justify-center text-3xl shrink-0"
                                >
                                    📢
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                                        <div>
                                            <h2 className="text-xl font-bold text-gray-800">
                                                Company Annual Meeting
                                            </h2>

                                            <p className="text-sm text-gray-500 mt-1">
                                                Posted by Admin • 2 hours ago
                                            </p>
                                        </div>

                                        <span
                                            className="px-4 py-2 rounded-full 
                                            bg-blue-100 text-blue-700 text-sm font-semibold w-fit"
                                        >
                                            Important
                                        </span>
                                    </div>

                                    <p className="text-gray-600 leading-7 mt-4">
                                        All employees are requested to attend the annual
                                        company meeting on Friday at 11:00 AM in the main
                                        conference hall. Attendance is mandatory for all
                                        departments.
                                    </p>

                                    {/* Footer */}
                                    <div className="flex flex-wrap gap-3 mt-5">

                                        <button
                                            className="px-5 h-11 rounded-xl bg-gradient-to-r 
                                            from-blue-600 to-indigo-600 text-white font-medium
                                            hover:shadow-lg transition-all duration-300"
                                        >
                                            View Details
                                        </button>

                                        <button
                                            className="px-5 h-11 rounded-xl border border-gray-200 
                                            text-gray-700 font-medium hover:bg-gray-100
                                            transition-all duration-300"
                                        >
                                            Mark as Read
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Notification Card */}
                        <div
                            className="bg-white rounded-3xl p-6 shadow-lg border border-black/5
                            hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="flex flex-col md:flex-row md:items-start gap-5">

                                {/* Icon */}
                                <div
                                    className="h-16 w-16 rounded-2xl bg-green-100 
                                    flex items-center justify-center text-3xl shrink-0"
                                >
                                    🎉
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                                        <div>
                                            <h2 className="text-xl font-bold text-gray-800">
                                                Holiday Announcement
                                            </h2>

                                            <p className="text-sm text-gray-500 mt-1">
                                                Posted by HR Team • Yesterday
                                            </p>
                                        </div>

                                        <span
                                            className="px-4 py-2 rounded-full 
                                            bg-green-100 text-green-700 text-sm font-semibold w-fit"
                                        >
                                            Announcement
                                        </span>
                                    </div>

                                    <p className="text-gray-600 leading-7 mt-4">
                                        The office will remain closed on Monday due to the
                                        public holiday. Regular working hours will resume
                                        from Tuesday onwards.
                                    </p>

                                    <div className="flex flex-wrap gap-3 mt-5">

                                        <button
                                            className="px-5 h-11 rounded-xl border border-gray-200 
                                            text-gray-700 font-medium hover:bg-gray-100
                                            transition-all duration-300"
                                        >
                                            Read Again
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Notification Card */}
                        <div
                            className="bg-white rounded-3xl p-6 shadow-lg border border-black/5
                            hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="flex flex-col md:flex-row md:items-start gap-5">

                                {/* Icon */}
                                <div
                                    className="h-16 w-16 rounded-2xl bg-yellow-100 
                                    flex items-center justify-center text-3xl shrink-0"
                                >
                                    ⚠️
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                                        <div>
                                            <h2 className="text-xl font-bold text-gray-800">
                                                System Maintenance
                                            </h2>

                                            <p className="text-sm text-gray-500 mt-1">
                                                Posted by IT Department • 3 days ago
                                            </p>
                                        </div>

                                        <span
                                            className="px-4 py-2 rounded-full 
                                            bg-yellow-100 text-yellow-700 text-sm font-semibold w-fit"
                                        >
                                            Maintenance
                                        </span>
                                    </div>

                                    <p className="text-gray-600 leading-7 mt-4">
                                        The EMS portal will be temporarily unavailable from
                                        12:00 AM to 3:00 AM due to scheduled system
                                        maintenance and security updates.
                                    </p>

                                    <div className="flex flex-wrap gap-3 mt-5">

                                        <button
                                            className="px-5 h-11 rounded-xl border border-gray-200 
                                            text-gray-700 font-medium hover:bg-gray-100
                                            transition-all duration-300"
                                        >
                                            Read Again
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Notification;