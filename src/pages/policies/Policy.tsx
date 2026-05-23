import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, Clock3, FileWarning, Laptop, ShieldCheck, Users } from 'lucide-react';
import React from 'react';

const Policy = () =>{
    return(
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50">

                {/* Header */}
                <div className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center shadow-md">
                        <h1 className="text-white font-bold text-sm tracking-wide">
                            EMS
                        </h1>
                        </div>

                        <div>
                        <h1 className="text-xl font-bold text-slate-800">
                            EMS Policies
                        </h1>
                        <p className="text-xs text-slate-500">
                            Company Rules & Guidelines
                        </p>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        className="rounded-xl border-slate-200 hover:bg-violet-50"
                    >
                        Download PDF
                    </Button>

                    </div>
                </div>

                {/* Hero Section */}
                <section className="relative overflow-hidden">
                    
                    <div className="absolute top-0 left-0 w-96 h-96 bg-violet-200/30 blur-3xl rounded-full"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-200/30 blur-3xl rounded-full"></div>

                    <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
                    
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                        <span className="w-2 h-2 bg-violet-600 rounded-full"></span>
                        Updated Policies 2026
                        </div>

                        <h1 className="text-5xl font-extrabold leading-tight text-slate-900">
                        Employee Policies &
                        <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                            {" "}Workplace Guidelines
                        </span>
                        </h1>

                        <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                        Please review all company policies carefully to maintain a healthy,
                        secure, and productive workplace environment at EMS.
                        </p>

                        <div className="flex gap-4 mt-8">
                        <Button className="rounded-2xl px-6 h-12 bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-700 hover:to-fuchsia-600 shadow-lg">
                            Read Policies
                        </Button>

                        <Button
                            variant="outline"
                            className="rounded-2xl px-6 h-12 border-slate-200 hover:bg-slate-100"
                        >
                            Contact HR
                        </Button>
                        </div>
                    </div>

                    </div>
                </section>

                {/* Policy Cards */}
                <section className="max-w-7xl mx-auto px-6 py-14">

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {/* Card 1 */}
                    <Card className="border-0 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-md">
                        <CardContent className="p-7">
                        
                        <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center mb-5">
                            <ShieldCheck className="text-violet-600" size={28} />
                        </div>

                        <h2 className="text-xl font-bold text-slate-800 mb-3">
                            Code of Conduct
                        </h2>

                        <p className="text-slate-600 text-sm leading-relaxed">
                            Employees are expected to maintain professionalism, integrity,
                            and ethical behavior in the workplace.
                        </p>

                        <Button
                            variant="ghost"
                            className="mt-5 px-0 text-violet-600 hover:text-violet-700 hover:bg-transparent"
                        >
                            Learn More →
                        </Button>

                        </CardContent>
                    </Card>

                    {/* Card 2 */}
                    <Card className="border-0 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-md">
                        <CardContent className="p-7">
                        
                        <div className="w-14 h-14 rounded-2xl bg-fuchsia-100 flex items-center justify-center mb-5">
                            <Clock3 className="text-fuchsia-600" size={28} />
                        </div>

                        <h2 className="text-xl font-bold text-slate-800 mb-3">
                            Attendance Policy
                        </h2>

                        <p className="text-slate-600 text-sm leading-relaxed">
                            Maintain punctuality and regular attendance to ensure smooth
                            workflow and operational efficiency.
                        </p>

                        <Button
                            variant="ghost"
                            className="mt-5 px-0 text-fuchsia-600 hover:text-fuchsia-700 hover:bg-transparent"
                        >
                            Learn More →
                        </Button>

                        </CardContent>
                    </Card>

                    {/* Card 3 */}
                    <Card className="border-0 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-md">
                        <CardContent className="p-7">
                        
                        <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-5">
                            <Laptop className="text-emerald-600" size={28} />
                        </div>

                        <h2 className="text-xl font-bold text-slate-800 mb-3">
                            Remote Work Policy
                        </h2>

                        <p className="text-slate-600 text-sm leading-relaxed">
                            Employees working remotely must follow communication,
                            reporting, and security protocols.
                        </p>

                        <Button
                            variant="ghost"
                            className="mt-5 px-0 text-emerald-600 hover:text-emerald-700 hover:bg-transparent"
                        >
                            Learn More →
                        </Button>

                        </CardContent>
                    </Card>

                    {/* Card 4 */}
                    <Card className="border-0 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-md">
                        <CardContent className="p-7">
                        
                        <div className="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center mb-5">
                            <FileWarning className="text-orange-600" size={28} />
                        </div>

                        <h2 className="text-xl font-bold text-slate-800 mb-3">
                            Data Privacy
                        </h2>

                        <p className="text-slate-600 text-sm leading-relaxed">
                            Sensitive company and client information must remain secure
                            and confidential at all times.
                        </p>

                        <Button
                            variant="ghost"
                            className="mt-5 px-0 text-orange-600 hover:text-orange-700 hover:bg-transparent"
                        >
                            Learn More →
                        </Button>

                        </CardContent>
                    </Card>

                    {/* Card 5 */}
                    <Card className="border-0 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-md">
                        <CardContent className="p-7">
                        
                        <div className="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center mb-5">
                            <Users className="text-sky-600" size={28} />
                        </div>

                        <h2 className="text-xl font-bold text-slate-800 mb-3">
                            Workplace Behavior
                        </h2>

                        <p className="text-slate-600 text-sm leading-relaxed">
                            Maintain respectful communication and promote an inclusive
                            and positive workplace culture.
                        </p>

                        <Button
                            variant="ghost"
                            className="mt-5 px-0 text-sky-600 hover:text-sky-700 hover:bg-transparent"
                        >
                            Learn More →
                        </Button>

                        </CardContent>
                    </Card>

                    {/* Card 6 */}
                    <Card className="border-0 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-md">
                        <CardContent className="p-7">
                        
                        <div className="w-14 h-14 rounded-2xl bg-rose-100 flex items-center justify-center mb-5">
                            <Briefcase className="text-rose-600" size={28} />
                        </div>

                        <h2 className="text-xl font-bold text-slate-800 mb-3">
                            Leave Policy
                        </h2>

                        <p className="text-slate-600 text-sm leading-relaxed">
                            Employees must follow leave request procedures and inform
                            managers in advance whenever possible.
                        </p>

                        <Button
                            variant="ghost"
                            className="mt-5 px-0 text-rose-600 hover:text-rose-700 hover:bg-transparent"
                        >
                            Learn More →
                        </Button>

                        </CardContent>
                    </Card>

                    </div>

                </section>

                {/* Footer */}
                <footer className="border-t bg-white/70 backdrop-blur-md mt-10">
                    <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-3">
                    
                    <p className="text-sm text-slate-500">
                        © 2026 EMS. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6 text-sm text-slate-500">
                        <button className="hover:text-violet-600 transition">
                        Privacy Policy
                        </button>

                        <button className="hover:text-violet-600 transition">
                        Terms
                        </button>

                        <button className="hover:text-violet-600 transition">
                        Help Center
                        </button>
                    </div>

                    </div>
                </footer>

            </div>
        </>
    )
}

export default Policy;