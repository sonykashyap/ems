import { useAppDispatch, useAppSelector } from '@/hooks';
import { applyLeave } from '@/reducers/leavesReducer';
import { clearToast } from '@/reducers/userReducer';
import { e164 } from 'node_modules/zod/v4/core/regexes.cjs';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import z from 'zod';

export const employeeSchema = z.object({
    leaveType: z.string().min(2, "Name must be at least 2 characters"),
    totalDays: z.string().email("Invalid email address"),
    role: z.string().min(1, "Role is required"),
    age: z.number({ invalid_type_error: "Age must be a number" })
        .min(18, "Minimum age is 18"),
    isActive: z.boolean().optional(),
});

type leaveType = {
    leaveType: string;
    totalDays: number;
    startDate: string;
    endDate: string;
    reasonForLeave: string;
    attachment: File | null;
}


const Leave = () =>{

    const dispatch = useAppDispatch();
    const toaster = useAppSelector(state=> state.leaveReducer.toast);
    const [leaves, setLeaves] = useState<leaveType>({
        leaveType: "",
        totalDays:0,
        startDate: "",
        endDate: "",
        reasonForLeave: "",
        attachment: null
    });


    const handleChange = (field: string, value:any) =>{
        setLeaves(prev=>({
            ...prev, [field]: value
        }))
    }

    useEffect(() => {
        if (!toaster.message) return;
        
        toast(toaster.message, {
            classNames: {
            toast:
                toaster.type === "success"
                ? "!bg-green-200"
                : "!bg-red-200",
            title:
                toaster.type === "success"
                ? "!text-green-600 font-bold"
                : "!text-red-600 font-bold",
            },
        });
        dispatch(clearToast());
    }, [toaster]);

    const handleSubmit = () => {
        console.log("Submit called");
        const user = JSON.parse(localStorage.getItem("userData") ?? "");
        const formData = new FormData();
        formData.append("leave_type", leaves.leaveType);
        formData.append("total_days", String(leaves.totalDays));
        formData.append("start_date", leaves.startDate);
        formData.append("end_date", leaves.endDate);
        formData.append("reason_for_leave", leaves.reasonForLeave);
        formData.append("user_id", user.id);
        
        if (leaves.attachment) {
            formData.append("attachment", leaves.attachment);
        }
        dispatch(applyLeave(formData));
    }

    return(
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6">
                <div className="max-w-5xl mx-auto">

                    {/* Top Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">
                                Apply Leave
                            </h1>

                            <p className="text-gray-500 mt-1">
                                Submit your leave request and track approval status
                            </p>
                        </div>

                        <button
                            className="h-12 px-6 rounded-xl bg-gradient-to-r 
                            from-blue-600 to-indigo-600 text-white font-semibold
                            shadow-lg hover:shadow-xl hover:scale-[1.02]
                            transition-all duration-300"
                        >
                            View Leave History
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                        {/* Left Section */}
                        <div className="lg:col-span-2">

                            <div className="bg-white rounded-3xl shadow-xl border border-black/5 p-6 md:p-8">

                                {/* Form Title */}
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        Leave Request Form
                                    </h2>

                                    <p className="text-gray-500 text-sm mt-2">
                                        Fill in the details below to request leave
                                    </p>
                                </div>

                                {/* Form Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    {/* Leave Type */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Leave Type
                                        </label>

                                        <select
                                            className="w-full h-14 rounded-2xl border border-gray-200 
                                            bg-gray-50 px-4 outline-none transition-all duration-300
                                            focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                            onChange={(e)=>handleChange("leaveType", e.target.value)}
                                        >
                                            <option>Select Leave Type</option>
                                            <option>Casual Leave</option>
                                            <option>Sick Leave</option>
                                            <option>Paid Leave</option>
                                            <option>Emergency Leave</option>
                                            <option>RH</option>
                                        </select>
                                    </div>

                                    {/* Total Days */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Total Days
                                        </label>

                                        <input
                                            type="number"
                                            placeholder="Enter total leave days"
                                            className="w-full h-14 rounded-2xl border border-gray-200 
                                            bg-gray-50 px-4 outline-none transition-all duration-300
                                            focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                            onChange={(e)=>handleChange("totalDays", e.target.value)}
                                        />
                                    </div>

                                    {/* Start Date */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Start Date
                                        </label>

                                        <input
                                            type="date"
                                            className="w-full h-14 rounded-2xl border border-gray-200 
                                            bg-gray-50 px-4 outline-none transition-all duration-300
                                            focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                            onChange={(e)=> handleChange("startDate",e.target.value)}
                                        />
                                    </div>

                                    {/* End Date */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            End Date
                                        </label>

                                        <input
                                            type="date"
                                            className="w-full h-14 rounded-2xl border border-gray-200 
                                            bg-gray-50 px-4 outline-none transition-all duration-300
                                            focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                            onChange={(e)=> handleChange("endDate",e.target.value)}
                                        />
                                    </div>
                                    {/* Applying To */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Applying To
                                        </label>

                                        <input
                                            type="text"
                                            value={"Rahul Sharma"}
                                            readOnly
                                            className="w-full h-14 rounded-2xl border border-gray-200 
                                            bg-gray-100 px-4 text-gray-600 cursor-not-allowed
                                            outline-none"
                                        />

                                        <p className="text-xs text-gray-400 mt-2">
                                            Reporting manager is auto-selected
                                        </p>
                                    </div>

                                    {/* CC To */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            CC To
                                        </label>

                                        <select
                                            className="w-full h-14 rounded-2xl border border-gray-200 
                                            bg-gray-50 px-4 outline-none transition-all duration-300
                                            focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                            onChange={(e)=> handleChange("ccTo", e.target.value)}
                                        >
                                            <option value="">Select Top Manager</option>
                                            <option value="Amit Verma">Amit Verma</option>
                                            <option value="Neha Kapoor">Neha Kapoor</option>
                                            <option value="Rohit Mehta">Rohit Mehta</option>
                                            <option value="Priya Singh">Priya Singh</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Reason */}
                                <div className="mt-6">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Reason for Leave
                                    </label>

                                    <textarea
                                        rows={5}
                                        placeholder="Write your reason here..."
                                        className="w-full rounded-2xl border border-gray-200 
                                        bg-gray-50 p-4 outline-none resize-none
                                        transition-all duration-300
                                        focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                        onChange={(e)=> handleChange("reasonForLeave", e.target.value) }
                                    />
                                </div>

                                {/* Attachment */}
                                <div className="mt-6">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Attachment (Optional)
                                    </label>

                                    <div
                                        className="border-2 border-dashed border-gray-300 
                                        rounded-2xl p-6 bg-gray-50 text-center hover:border-blue-400 
                                        transition-all duration-300"
                                    >
                                        <p className="text-gray-500 text-sm">
                                            Upload medical certificate or supporting document
                                        </p>

                                        <input
                                            type="file"
                                            className="mt-4"
                                            onChange={(e)=> handleChange("attachment", e.target.files?.[0]) }
                                        />
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                                    <button
                                        className="flex-1 h-14 rounded-2xl border border-gray-300 
                                        font-semibold text-gray-700 hover:bg-gray-100
                                        transition-all duration-300"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        className="flex-1 h-14 rounded-2xl bg-gradient-to-r 
                                        from-blue-600 to-indigo-600 text-white font-semibold
                                        shadow-lg hover:shadow-xl hover:scale-[1.01]
                                        transition-all duration-300"
                                        onClick={handleSubmit}
                                    >
                                        Submit Leave Request
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="space-y-6">

                            {/* Leave Balance */}
                            <div className="bg-white rounded-3xl shadow-xl border border-black/5 p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-6">
                                    Leave Balance
                                </h3>

                            <div className="space-y-4">
                                    <div
                                        className="flex items-center justify-between 
                                        p-4 rounded-2xl bg-blue-50"
                                    >
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Casual Leave
                                            </p>

                                            <h4 className="text-xl font-bold text-blue-700">
                                                08
                                            </h4>
                                        </div>

                                        <div
                                            className="h-12 w-12 rounded-xl bg-blue-100 
                                            flex items-center justify-center"
                                        >
                                            📅
                                        </div>
                                    </div>

                                    <div
                                        className="flex items-center justify-between 
                                        p-4 rounded-2xl bg-green-50"
                                    >
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Sick Leave
                                            </p>

                                            <h4 className="text-xl font-bold text-green-700">
                                                05
                                            </h4>
                                        </div>

                                        <div
                                            className="h-12 w-12 rounded-xl bg-green-100 
                                            flex items-center justify-center"
                                        >
                                            🏥
                                        </div>
                                    </div>

                                    <div
                                        className="flex items-center justify-between 
                                        p-4 rounded-2xl bg-purple-50"
                                    >
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Paid Leave
                                            </p>

                                            <h4 className="text-xl font-bold text-purple-700">
                                                12
                                            </h4>
                                        </div>

                                        <div
                                            className="h-12 w-12 rounded-xl bg-purple-100 
                                            flex items-center justify-center"
                                        >
                                            ✈️
                                        </div>
                                    </div>

                                    {/* RH Leave */}
                                    <div
                                        className="flex items-center justify-between 
                                        p-4 rounded-2xl bg-orange-50"
                                    >
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                RH Leave
                                            </p>

                                            <h4 className="text-xl font-bold text-orange-700">
                                                02
                                            </h4>
                                        </div>

                                        <div
                                            className="h-12 w-12 rounded-xl bg-orange-100 
                                            flex items-center justify-center"
                                        >
                                            🎉
                                        </div>
                                    </div>

                                    {/* WFH */}
                                    <div
                                        className="flex items-center justify-between 
                                        p-4 rounded-2xl bg-cyan-50"
                                    >
                                        <div>
                                            <p className="text-sm text-gray-500">
                                                Work From Home
                                            </p>

                                            <h4 className="text-xl font-bold text-cyan-700">
                                                10
                                            </h4>
                                        </div>

                                        <div
                                            className="h-12 w-12 rounded-xl bg-cyan-100 
                                            flex items-center justify-center"
                                        >
                                            💻
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* Recent Request */}
                            <div className="bg-white rounded-3xl shadow-xl border border-black/5 p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-6">
                                    Recent Request
                                </h3>

                                <div
                                    className="p-4 rounded-2xl border border-gray-200"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-semibold text-gray-800">
                                                Casual Leave
                                            </h4>

                                            <p className="text-sm text-gray-500 mt-1">
                                                12 Jun - 15 Jun
                                            </p>
                                        </div>

                                        <span
                                            className="px-4 py-1 rounded-full 
                                            bg-yellow-100 text-yellow-700 text-sm font-medium"
                                        >
                                            Pending
                                        </span>
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

export default Leave;