

const Projects = () => {
  return (
    <>
        <div className='space-y-6'>

            {/* Header */}
            <div
                className='flex flex-col lg:flex-row lg:items-center
                lg:justify-between gap-5'
            >

                <div>
                    <h1 className='text-4xl font-bold text-gray-800'>
                        Projects Management
                    </h1>

                    <p className='text-gray-500 mt-2'>
                        Manage company projects, teams and progress tracking
                    </p>
                </div>

                {/* Actions */}
                <div className='flex flex-wrap items-center gap-4'>

                    {/* Search */}
                    <div className='relative'>

                        <input
                            type='text'
                            placeholder='Search projects...'
                            className='h-12 w-[280px] rounded-2xl border
                            border-black/5 bg-white px-5 pr-12 outline-none
                            shadow-sm focus:ring-2 focus:ring-blue-500'
                        />

                        <span
                            className='absolute right-4 top-1/2
                            -translate-y-1/2 text-gray-400'
                        >
                            🔍
                        </span>
                    </div>

                    {/* Filter */}
                    <button
                        className='h-12 px-5 rounded-2xl border border-black/5
                        bg-white shadow-sm hover:bg-gray-50 transition-all duration-300'
                    >
                        Filter
                    </button>

                    {/* Add Project */}
                    <button
                        className='h-12 px-6 rounded-2xl bg-gradient-to-r
                        from-blue-600 to-indigo-600 text-white font-semibold
                        shadow-lg hover:shadow-2xl transition-all duration-300'
                    >
                        + Create Project
                    </button>
                </div>
            </div>

            {/* Top Stats */}
            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6'>

                {[
                    {
                        title: "Total Projects",
                        value: 24,
                        icon: "📁",
                        bg: "bg-blue-50",
                        text: "text-blue-700",
                    },
                    {
                        title: "In Progress",
                        value: 12,
                        icon: "🚀",
                        bg: "bg-amber-50",
                        text: "text-amber-600",
                    },
                    {
                        title: "Completed",
                        value: 8,
                        icon: "✅",
                        bg: "bg-emerald-50",
                        text: "text-emerald-600",
                    },
                    {
                        title: "Delayed",
                        value: 4,
                        icon: "⚠️",
                        bg: "bg-red-50",
                        text: "text-red-600",
                    },
                ].map((item, i) => (
                    <div
                        key={i}
                        className='bg-white rounded-[30px]
                        border border-black/5 shadow-lg p-6'
                    >

                        <div className='flex items-start justify-between'>

                            <div>

                                <p className='text-sm text-gray-500'>
                                    {item.title}
                                </p>

                                <h2
                                    className={`text-4xl font-bold mt-4 ${item.text}`}
                                >
                                    {item.value}
                                </h2>
                            </div>

                            <div
                                className={`h-14 w-14 rounded-2xl ${item.bg}
                                flex items-center justify-center text-2xl`}
                            >
                                {item.icon}
                            </div>
                        </div>

                        <div className='mt-8'>
                            <span className='text-sm text-emerald-600 font-medium'>
                                +12% this month
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Projects Grid */}
            <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>

                {[
                    {
                        name: "Employee Management System",
                        client: "Internal Project",
                        progress: 78,
                        status: "In Progress",
                        statusColor: "bg-amber-100 text-amber-700",
                        due: "15 Sep 2026",
                        team: 8,
                    },
                    {
                        name: "HR Automation Platform",
                        client: "TechNova Ltd.",
                        progress: 100,
                        status: "Completed",
                        statusColor: "bg-emerald-100 text-emerald-700",
                        due: "02 Aug 2026",
                        team: 5,
                    },
                    {
                        name: "Finance Dashboard",
                        client: "FinCorp",
                        progress: 45,
                        status: "Delayed",
                        statusColor: "bg-red-100 text-red-700",
                        due: "28 Sep 2026",
                        team: 6,
                    },
                    {
                        name: "CRM System",
                        client: "SalesFlow Inc.",
                        progress: 65,
                        status: "In Progress",
                        statusColor: "bg-blue-100 text-blue-700",
                        due: "12 Oct 2026",
                        team: 10,
                    },
                ].map((project, i) => (
                    <div
                        key={i}
                        className='bg-white rounded-[32px]
                        border border-black/5 shadow-xl p-6
                        hover:shadow-2xl transition-all duration-500'
                    >

                        {/* Top */}
                        <div className='flex items-start justify-between gap-5'>

                            <div>

                                <h2 className='text-2xl font-bold text-gray-800'>
                                    {project.name}
                                </h2>

                                <p className='text-gray-500 mt-2'>
                                    {project.client}
                                </p>
                            </div>

                            <span
                                className={`px-4 py-2 rounded-2xl text-sm
                                font-semibold whitespace-nowrap
                                ${project.statusColor}`}
                            >
                                {project.status}
                            </span>
                        </div>

                        {/* Progress */}
                        <div className='mt-8'>

                            <div className='flex items-center justify-between mb-3'>

                                <p className='text-sm font-medium text-gray-500'>
                                    Progress
                                </p>

                                <p className='text-sm font-bold text-gray-700'>
                                    {project.progress}%
                                </p>
                            </div>

                            <div
                                className='h-3 rounded-full bg-gray-100 overflow-hidden'
                            >

                                <div
                                    style={{
                                        width: `${project.progress}%`,
                                    }}
                                    className='h-full rounded-full bg-gradient-to-r
                                    from-blue-600 to-indigo-600'
                                />
                            </div>
                        </div>

                        {/* Bottom */}
                        <div
                            className='grid grid-cols-2 gap-5 mt-8'
                        >

                            <div
                                className='rounded-3xl bg-gray-50 p-5'
                            >
                                <p className='text-sm text-gray-500'>
                                    Due Date
                                </p>

                                <h3 className='text-lg font-bold text-gray-800 mt-2'>
                                    {project.due}
                                </h3>
                            </div>

                            <div
                                className='rounded-3xl bg-gray-50 p-5'
                            >
                                <p className='text-sm text-gray-500'>
                                    Team Members
                                </p>

                                <h3 className='text-lg font-bold text-gray-800 mt-2'>
                                    {project.team} Members
                                </h3>
                            </div>
                        </div>

                        {/* Footer */}
                        <div
                            className='flex items-center justify-between mt-8 pt-6
                            border-t border-gray-100'
                        >

                            {/* Avatars */}
                            <div className='flex -space-x-3'>

                                {[1, 2, 3, 4].map((_, i) => (
                                    <div
                                        key={i}
                                        className='h-11 w-11 rounded-full
                                        border-4 border-white bg-gradient-to-r
                                        from-blue-500 to-indigo-600'
                                    />
                                ))}
                            </div>

                            {/* Actions */}
                            <div className='flex items-center gap-3'>

                                <button
                                    className='h-11 px-5 rounded-2xl border
                                    border-gray-200 bg-gray-50
                                    hover:bg-gray-100 transition-all duration-300'
                                >
                                    Details
                                </button>

                                <button
                                    className='h-11 px-5 rounded-2xl bg-gradient-to-r
                                    from-blue-600 to-indigo-600 text-white
                                    font-semibold shadow-lg hover:shadow-xl
                                    transition-all duration-300'
                                >
                                    Manage
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
    
  );
}

export default Projects;