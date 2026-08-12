import React from 'react'


type Props = {
    summaryTotalHours: string;
    summaryBreakTime: string;
    summaryProductivity: string;
}


const TodaySummary = ({ summaryTotalHours, summaryBreakTime, summaryProductivity }: Props) => {
  return (
    <>
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
                        value: summaryTotalHours,
                        icon: "⏱️",
                        bg: "bg-blue-50",
                        text: "text-blue-700",
                    },
                    {
                        title: "Break Taken",
                            value: summaryBreakTime,
                        icon: "☕",
                        bg: "bg-orange-50",
                        text: "text-orange-600",
                    },
                    {
                        title: "Productivity",
                        value: summaryProductivity,
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
    </>
  )
}

export default TodaySummary;