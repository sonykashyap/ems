
type props = {
    data: Object
}

const Filter = ({data}: props) => {

    const filterName = (query:string) =>{
        console.log(query);
    }

    const debounce = (fn, delay) => {
        let timer;
        return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
        };
    };

    const debouncedSearch = debounce(filterName, 500);

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6">
                <div className="max-w-7xl mx-auto">

                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">
                                Reports & Analytics
                            </h1>

                            <p className="text-gray-500 mt-1">
                                Track your attendance, leaves, and work performance
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button
                                className="h-12 px-6 rounded-2xl border border-gray-200 
                                bg-white text-gray-700 font-semibold hover:bg-gray-100
                                transition-all duration-300"
                            >
                                Download PDF
                            </button>

                            <button
                                className="h-12 px-6 rounded-2xl bg-gradient-to-r 
                                from-blue-600 to-indigo-600 text-white font-semibold
                                shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                Export Report
                            </button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

                        {/* Attendance */}
                        <div className="bg-white rounded-3xl p-6 shadow-lg border border-black/5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Attendance
                                    </p>

                                    <h2 className="text-3xl font-bold text-gray-800 mt-2">
                                        92%
                                    </h2>

                                    <p className="text-green-600 text-sm mt-2 font-medium">
                                        +4% this month
                                    </p>
                                </div>

                                <div
                                    className="h-16 w-16 rounded-2xl bg-blue-100 
                                    flex items-center justify-center text-3xl"
                                >
                                    📅
                                </div>
                            </div>
                        </div>

                        {/* Leaves */}
                        <div className="bg-white rounded-3xl p-6 shadow-lg border border-black/5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Leaves Taken
                                    </p>

                                    <h2 className="text-3xl font-bold text-gray-800 mt-2">
                                        08
                                    </h2>

                                    <p className="text-yellow-600 text-sm mt-2 font-medium">
                                        12 remaining
                                    </p>
                                </div>

                                <div
                                    className="h-16 w-16 rounded-2xl bg-yellow-100 
                                    flex items-center justify-center text-3xl"
                                >
                                    🌴
                                </div>
                            </div>
                        </div>

                        {/* Tasks */}
                        <div className="bg-white rounded-3xl p-6 shadow-lg border border-black/5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Completed Tasks
                                    </p>

                                    <h2 className="text-3xl font-bold text-gray-800 mt-2">
                                        126
                                    </h2>

                                    <p className="text-blue-600 text-sm mt-2 font-medium">
                                        +18 this week
                                    </p>
                                </div>

                                <div
                                    className="h-16 w-16 rounded-2xl bg-green-100 
                                    flex items-center justify-center text-3xl"
                                >
                                    ✅
                                </div>
                            </div>
                        </div>

                        {/* Performance */}
                        <div className="bg-white rounded-3xl p-6 shadow-lg border border-black/5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Performance
                                    </p>

                                    <h2 className="text-3xl font-bold text-gray-800 mt-2">
                                        A+
                                    </h2>

                                    <p className="text-purple-600 text-sm mt-2 font-medium">
                                        Excellent
                                    </p>
                                </div>

                                <div
                                    className="h-16 w-16 rounded-2xl bg-purple-100 
                                    flex items-center justify-center text-3xl"
                                >
                                    📈
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                        {/* Left Section */}
                        <div className="xl:col-span-2 space-y-6">

                            {/* Attendance Report */}
                            <div className="bg-white rounded-3xl shadow-xl border border-black/5 p-6">

                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">
                                            Attendance Report
                                        </h2>

                                        <p className="text-sm text-gray-500 mt-1">
                                            Monthly attendance summary
                                        </p>
                                    </div>

                                    <select
                                        className="h-11 px-4 rounded-xl border border-gray-200 
                                        bg-gray-50 outline-none"
                                    >
                                        <option>This Month</option>
                                        <option>Last Month</option>
                                        <option>Last 3 Months</option>
                                    </select>
                                </div>

                                {/* Fake Chart */}
                                <div
                                    className="h-80 rounded-3xl bg-gradient-to-br 
                                    from-blue-50 to-indigo-100 flex items-center 
                                    justify-center border border-dashed border-blue-200"
                                >
                                    <div className="text-center">
                                        <div className="text-6xl mb-4">
                                            📊
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-700">
                                            Attendance Chart
                                        </h3>

                                        <p className="text-gray-500 mt-2">
                                            Integrate Recharts / ApexCharts here
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Work Summary */}
                            <div className="bg-white rounded-3xl shadow-xl border border-black/5 p-6">

                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-800">
                                            Work Summary
                                        </h2>

                                        <p className="text-sm text-gray-500 mt-1">
                                            Daily productivity insights
                                        </p>
                                    </div>

                                    <button
                                        className="h-11 px-5 rounded-xl border border-gray-200 
                                        hover:bg-gray-100 transition-all duration-300"
                                    >
                                        View Details
                                    </button>
                                </div>

                                <div className="space-y-4">

                                    {/* Row */}
                                    <div
                                        className="flex items-center justify-between 
                                        p-5 rounded-2xl bg-gray-50"
                                    >
                                        <div>
                                            <h3 className="font-semibold text-gray-800">
                                                Tasks Completed
                                            </h3>

                                            <p className="text-sm text-gray-500 mt-1">
                                                Weekly completed tasks
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <h3 className="text-2xl font-bold text-green-600">
                                                18
                                            </h3>

                                            <p className="text-sm text-green-500">
                                                +12%
                                            </p>
                                        </div>
                                    </div>

                                    {/* Row */}
                                    <div
                                        className="flex items-center justify-between 
                                        p-5 rounded-2xl bg-gray-50"
                                    >
                                        <div>
                                            <h3 className="font-semibold text-gray-800">
                                                Late Check-ins
                                            </h3>

                                            <p className="text-sm text-gray-500 mt-1">
                                                Delayed office entries
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <h3 className="text-2xl font-bold text-red-500">
                                                02
                                            </h3>

                                            <p className="text-sm text-red-400">
                                                Needs attention
                                            </p>
                                        </div>
                                    </div>

                                    {/* Row */}
                                    <div
                                        className="flex items-center justify-between 
                                        p-5 rounded-2xl bg-gray-50"
                                    >
                                        <div>
                                            <h3 className="font-semibold text-gray-800">
                                                Extra Hours
                                            </h3>

                                            <p className="text-sm text-gray-500 mt-1">
                                                Overtime this month
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            <h3 className="text-2xl font-bold text-blue-600">
                                                14h
                                            </h3>

                                            <p className="text-sm text-blue-500">
                                                Great work
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <div className="space-y-6">

                            {/* Leave Overview */}
                            <div className="bg-white rounded-3xl shadow-xl border border-black/5 p-6">

                                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                    Leave Overview
                                </h2>

                                <div className="space-y-4">

                                    <div
                                        className="p-5 rounded-2xl bg-blue-50 
                                        flex items-center justify-between"
                                    >
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Casual Leave
                                            </p>

                                            <h3 className="text-2xl font-bold text-blue-700 mt-1">
                                                08
                                            </h3>
                                        </div>

                                        <div className="text-3xl">
                                            📅
                                        </div>
                                    </div>

                                    <div
                                        className="p-5 rounded-2xl bg-green-50 
                                        flex items-center justify-between"
                                    >
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Sick Leave
                                            </p>

                                            <h3 className="text-2xl font-bold text-green-700 mt-1">
                                                05
                                            </h3>
                                        </div>

                                        <div className="text-3xl">
                                            🏥
                                        </div>
                                    </div>

                                    <div
                                        className="p-5 rounded-2xl bg-purple-50 
                                        flex items-center justify-between"
                                    >
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Paid Leave
                                            </p>

                                            <h3 className="text-2xl font-bold text-purple-700 mt-1">
                                                12
                                            </h3>
                                        </div>

                                        <div className="text-3xl">
                                            ✈️
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Performance Rating */}
                            <div className="bg-white rounded-3xl shadow-xl border border-black/5 p-6">

                                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                                    Performance Rating
                                </h2>

                                <div className="flex flex-col items-center justify-center text-center">

                                    <div
                                        className="h-36 w-36 rounded-full 
                                        bg-gradient-to-r from-blue-600 to-indigo-600
                                        flex items-center justify-center text-white
                                        text-5xl font-bold shadow-xl"
                                    >
                                        A+
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-800 mt-6">
                                        Excellent Performance
                                    </h3>

                                    <p className="text-gray-500 mt-2 leading-7">
                                        Your attendance and productivity are above average.
                                        Keep maintaining this consistency.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Filter;