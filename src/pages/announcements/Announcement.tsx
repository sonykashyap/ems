import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Award, BellRing, CalendarCheck2, Laptop, Megaphone, ShieldAlert } from 'lucide-react';
import React from 'react';

const Announcement = () => {
    return(
        <>
           <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50 p-4 md:p-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10">

                    <div>
                        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                            Announcements
                        </h1>

                        <p className="text-slate-500 mt-2 text-sm md:text-base">
                            Stay updated with the latest company news, updates, and notices.
                        </p>
                    </div>

                    <div className="flex gap-3">

                        <Button
                            variant="outline"
                            className="rounded-2xl border-slate-200 hover:bg-violet-50"
                        >
                            Filter
                        </Button>

                        <Button className="rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-700 hover:to-fuchsia-600 shadow-lg">
                            + New Announcement
                        </Button>

                    </div>

                </div>

                {/* Featured Announcement */}
                <Card className="overflow-hidden border-0 rounded-3xl shadow-xl bg-white/80 backdrop-blur-md mb-10">

                    <div className="grid lg:grid-cols-2">

                        {/* Left Content */}
                        <div className="p-8 md:p-12 flex flex-col justify-center">

                            <div className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-medium mb-6">
                                <span className="w-2 h-2 rounded-full bg-violet-600"></span>
                                Featured Update
                            </div>

                            <h2 className="text-4xl font-bold text-slate-900 leading-tight">
                                Annual EMS Tech Conference 2026
                            </h2>

                            <p className="mt-5 text-slate-600 leading-relaxed text-base">
                                We are excited to announce our upcoming annual conference focused
                                on innovation, technology, and team collaboration. Employees from
                                all departments are invited to participate and share ideas.
                            </p>

                            <div className="flex flex-wrap gap-4 mt-8">

                                <Button className="rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-700 hover:to-fuchsia-600 shadow-md">
                                    Read More
                                </Button>

                                <Button
                                    variant="outline"
                                    className="rounded-2xl border-slate-200 hover:bg-slate-100"
                                >
                                    Share
                                </Button>

                            </div>

                        </div>

                        {/* Right Image */}
                        <div className="relative min-h-[300px]">

                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                                alt="Conference"
                                className="w-full h-full object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>

                            <div className="absolute bottom-6 left-6">
                                <div className="bg-white/20 backdrop-blur-md border border-white/20 px-4 py-2 rounded-2xl text-white text-sm">
                                    March 12, 2026
                                </div>
                            </div>

                        </div>

                    </div>

                </Card>

                {/* Announcement Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">

                    {/* Card 1 */}
                    <Card className="border-0 rounded-3xl bg-white/80 backdrop-blur-md shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">

                        <div className="h-2 bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>

                        <CardContent className="p-7">

                            <div className="flex items-center justify-between mb-5">

                                <div className="flex items-center gap-2 text-violet-600 text-sm font-medium">
                                    <BellRing size={16} />
                                    HR Update
                                </div>

                                <span className="text-xs text-slate-400">
                                    2 hrs ago
                                </span>

                            </div>

                            <h3 className="text-2xl font-bold text-slate-800 mb-3">
                                New Leave Policy Released
                            </h3>

                            <p className="text-slate-600 text-sm leading-relaxed">
                                EMS has introduced updated leave management policies
                                to improve employee flexibility and work-life balance.
                            </p>

                            <Button
                                variant="ghost"
                                className="mt-5 px-0 text-violet-600 hover:text-violet-700 hover:bg-transparent"
                            >
                                Read More →
                            </Button>

                        </CardContent>

                    </Card>

                    {/* Card 2 */}
                    <Card className="border-0 rounded-3xl bg-white/80 backdrop-blur-md shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">

                        <div className="h-2 bg-gradient-to-r from-sky-500 to-cyan-500"></div>

                        <CardContent className="p-7">

                            <div className="flex items-center justify-between mb-5">

                                <div className="flex items-center gap-2 text-sky-600 text-sm font-medium">
                                    <Megaphone size={16} />
                                    Company News
                                </div>

                                <span className="text-xs text-slate-400">
                                    Yesterday
                                </span>

                            </div>

                            <h3 className="text-2xl font-bold text-slate-800 mb-3">
                                Office Expansion Announcement
                            </h3>

                            <p className="text-slate-600 text-sm leading-relaxed">
                                EMS is expanding operations with a new branch office
                                to support growing teams and future opportunities.
                            </p>

                            <Button
                                variant="ghost"
                                className="mt-5 px-0 text-sky-600 hover:text-sky-700 hover:bg-transparent"
                            >
                                Read More →
                            </Button>

                        </CardContent>

                    </Card>

                    {/* Card 3 */}
                    <Card className="border-0 rounded-3xl bg-white/80 backdrop-blur-md shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">

                        <div className="h-2 bg-gradient-to-r from-emerald-500 to-lime-500"></div>

                        <CardContent className="p-7">

                            <div className="flex items-center justify-between mb-5">

                                <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
                                    <CalendarCheck2 size={16} />
                                    Event Notice
                                </div>

                                <span className="text-xs text-slate-400">
                                    3 days ago
                                </span>

                            </div>

                            <h3 className="text-2xl font-bold text-slate-800 mb-3">
                                Team Building Retreat
                            </h3>

                            <p className="text-slate-600 text-sm leading-relaxed">
                                Join us for a weekend retreat filled with collaboration,
                                networking, and exciting outdoor activities.
                            </p>

                            <Button
                                variant="ghost"
                                className="mt-5 px-0 text-emerald-600 hover:text-emerald-700 hover:bg-transparent"
                            >
                                Read More →
                            </Button>

                        </CardContent>

                    </Card>

                    {/* Card 4 */}
                    <Card className="border-0 rounded-3xl bg-white/80 backdrop-blur-md shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">

                        <div className="h-2 bg-gradient-to-r from-orange-500 to-amber-500"></div>

                        <CardContent className="p-7">

                            <div className="flex items-center justify-between mb-5">

                                <div className="flex items-center gap-2 text-orange-600 text-sm font-medium">
                                    <ShieldAlert size={16} />
                                    Security Alert
                                </div>

                                <span className="text-xs text-slate-400">
                                    1 week ago
                                </span>

                            </div>

                            <h3 className="text-2xl font-bold text-slate-800 mb-3">
                                Password Update Required
                            </h3>

                            <p className="text-slate-600 text-sm leading-relaxed">
                                All employees are requested to update their passwords
                                before the end of this month for enhanced security.
                            </p>

                            <Button
                                variant="ghost"
                                className="mt-5 px-0 text-orange-600 hover:text-orange-700 hover:bg-transparent"
                            >
                                Read More →
                            </Button>

                        </CardContent>

                    </Card>

                    {/* Card 5 */}
                    <Card className="border-0 rounded-3xl bg-white/80 backdrop-blur-md shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">

                        <div className="h-2 bg-gradient-to-r from-rose-500 to-pink-500"></div>

                        <CardContent className="p-7">

                            <div className="flex items-center justify-between mb-5">

                                <div className="flex items-center gap-2 text-rose-600 text-sm font-medium">
                                    <Award size={16} />
                                    Achievement
                                </div>

                                <span className="text-xs text-slate-400">
                                    2 weeks ago
                                </span>

                            </div>

                            <h3 className="text-2xl font-bold text-slate-800 mb-3">
                                Employee Excellence Awards
                            </h3>

                            <p className="text-slate-600 text-sm leading-relaxed">
                                Congratulations to our outstanding employees who
                                achieved remarkable performance this quarter.
                            </p>

                            <Button
                                variant="ghost"
                                className="mt-5 px-0 text-rose-600 hover:text-rose-700 hover:bg-transparent"
                            >
                                Read More →
                            </Button>

                        </CardContent>

                    </Card>

                    {/* Card 6 */}
                    <Card className="border-0 rounded-3xl bg-white/80 backdrop-blur-md shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">

                        <div className="h-2 bg-gradient-to-r from-indigo-500 to-violet-500"></div>

                        <CardContent className="p-7">

                            <div className="flex items-center justify-between mb-5">

                                <div className="flex items-center gap-2 text-indigo-600 text-sm font-medium">
                                    <Laptop size={16} />
                                    IT Department
                                </div>

                                <span className="text-xs text-slate-400">
                                    3 weeks ago
                                </span>

                            </div>

                            <h3 className="text-2xl font-bold text-slate-800 mb-3">
                                System Maintenance Schedule
                            </h3>

                            <p className="text-slate-600 text-sm leading-relaxed">
                                Scheduled maintenance will occur this weekend to
                                improve overall system stability and performance.
                            </p>

                            <Button
                                variant="ghost"
                                className="mt-5 px-0 text-indigo-600 hover:text-indigo-700 hover:bg-transparent"
                            >
                                Read More →
                            </Button>

                        </CardContent>

                    </Card>

                </div>

            </div>
        </>
    )
}

export default Announcement;