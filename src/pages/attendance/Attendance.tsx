import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { endBreak, fetchTodayAttendance, punchIn, punchOut, startBreak } from "@/reducers/attendanceReducer";

const Attendance = () => {
    const dispatch = useAppDispatch();
    const reduxPunchInTime = useAppSelector((state) => state.attendanceReducer.punchInTime);
    const [punchInTime, setPunchInTime] = useState<string>("-- : --");
    const [punchOutTime, setPunchOutTime] = useState<string>("-- : --");
    const [workingTime, setWorkingTime] = useState<string>("00:00:00");
    const [breakTime, setBreakTime] = useState<string>("00:00:00");
    const [breakSeconds, setBreakSeconds] = useState(0);
    const [punchInTimestamp, setPunchInTimestamp] = useState<number | null>(null);
    const [punchOutTimestamp, setPunchOutTimestamp] = useState<number | null>(null);
    const [breakStartTimestamp, setBreakStartTimestamp] = useState<number | null>(null);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [isPunchedIn, setIsPunchedIn] = useState(false);

    let userId: string | null = null;
    try {
        const userData = localStorage.getItem("userData");
        userId = userData ? JSON.parse(userData)?.id ?? null : null;
    } catch {
        userId = null;
    }

    const isToday = (dateValue: Date) => dateValue.toDateString() === new Date().toDateString();

    const formatTwoDigits = (value: number) => (value < 10 ? `0${value}` : `${value}`);

    const formatElapsedTime = (startTimestamp: number) => {
        const totalSeconds = Math.max(0, Math.floor((Date.now() - startTimestamp) / 1000));
        const hours = formatTwoDigits(Math.floor(totalSeconds / 3600));
        const minutes = formatTwoDigits(Math.floor((totalSeconds % 3600) / 60));
        const seconds = formatTwoDigits(totalSeconds % 60);

        return `${hours}:${minutes}:${seconds}`;
    };

    const toSeconds = (value: string) => {
        const [hours, minutes, seconds] = value.split(":").map((part) => Number(part) || 0);
        return (hours * 3600) + (minutes * 60) + seconds;
    };

    const formatSeconds = (totalSeconds: number) => {
        const safeSeconds = Math.max(0, Math.floor(totalSeconds));
        const hours = formatTwoDigits(Math.floor(safeSeconds / 3600));
        const minutes = formatTwoDigits(Math.floor((safeSeconds % 3600) / 60));
        const seconds = formatTwoDigits(safeSeconds % 60);

        return `${hours}:${minutes}:${seconds}`;
    };

    const formatHoursMinutes = (value: string) => {
        const [hoursPart, minutesPart] = value.split(":");
        const hours = Number(hoursPart) || 0;
        const minutes = Number(minutesPart) || 0;

        return `${formatTwoDigits(hours)}h ${formatTwoDigits(minutes)}m`;
    };

    const displayPunchInTime = reduxPunchInTime
        ? new Date(reduxPunchInTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        })
        : punchInTime;

    const getLiveBreakSeconds = () => {
        if (!breakStartTimestamp) {
            return breakSeconds;
        }

        return breakSeconds + Math.max(0, Math.floor((Date.now() - breakStartTimestamp) / 1000));
    };

    const getEffectiveWorkingSeconds = () => {
        if (!punchInTimestamp) {
            return 0;
        }

        const elapsedSincePunchIn = Math.max(0, Math.floor((Date.now() - punchInTimestamp) / 1000));
        return Math.max(0, elapsedSincePunchIn - getLiveBreakSeconds());
    };

    const getProductivity = () => {
        if (!punchInTimestamp) {
            return 0;
        }

        const elapsedSincePunchIn = Math.max(1, Math.floor((Date.now() - punchInTimestamp) / 1000));
        const workingSeconds = getEffectiveWorkingSeconds();
        return Math.min(100, Math.round((workingSeconds / elapsedSincePunchIn) * 100));
    };

    const syncAttendance = (
        attendance: {
            punch_in?: string | Date;
            punch_out?: string | Date;
            break_time?: string;
            break_seconds?: number;
            break_started_at?: string | Date;
            is_on_break?: boolean;
        },
        effectiveBreakSeconds = 0
    ) => {
        if (!attendance?.punch_in) {
            throw new Error("Attendance entry is missing punch in time");
        }

        const punchInDate = new Date(attendance.punch_in);

        if (!isToday(punchInDate)) {
            throw new Error("Attendance entry is not from today");
        }

        setPunchInTimestamp(punchInDate.getTime());
        setPunchInTime(
            punchInDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            })
        );
        const persistedBreakSeconds = Number(attendance.break_seconds ?? effectiveBreakSeconds ?? 0);
        const activeBreakStartedAt = attendance.is_on_break && attendance.break_started_at
            ? new Date(attendance.break_started_at).getTime()
            : null;

        if (attendance.punch_out) {
            const punchOutDate = new Date(attendance.punch_out);
            setPunchOutTimestamp(punchOutDate.getTime());
            setPunchOutTime(
                punchOutDate.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                })
            );
            setBreakStartTimestamp(null);
            setBreakSeconds(persistedBreakSeconds);
            setBreakTime(attendance.break_time ?? formatSeconds(persistedBreakSeconds));
            setWorkingTime(
                formatSeconds(
                    Math.max(
                        0,
                        Math.floor((punchOutDate.getTime() - punchInDate.getTime()) / 1000) - persistedBreakSeconds
                    )
                )
            );
            setIsPunchedIn(false);
            setStatusMessage("Punched out for today");
            return;
        }

        setPunchOutTimestamp(null);
        setPunchOutTime("-- : --");
        setBreakSeconds(persistedBreakSeconds);
        setBreakTime(attendance.break_time ?? formatSeconds(persistedBreakSeconds));
        setBreakStartTimestamp(activeBreakStartedAt);
        setIsPunchedIn(true);
        setStatusMessage(attendance.is_on_break ? "Break in progress" : "Checked in for today");
    };

    useEffect(() => {
        if (!userId) {
            return;
        }

        const loadTodayAttendance = async () => {
            try {
                const response = await dispatch(fetchTodayAttendance(userId)).unwrap();
                if (response?.attendance) {
                    syncAttendance(response.attendance);
                }
            } catch {
                setPunchInTimestamp(null);
                setPunchInTime("-- : --");
                setPunchOutTimestamp(null);
                setPunchOutTime("-- : --");
                setWorkingTime("00:00:00");
                setBreakStartTimestamp(null);
                setBreakSeconds(0);
                setBreakTime("00:00:00");
                setIsPunchedIn(false);
            }
        };

        void loadTodayAttendance();
    }, [dispatch, userId]);

    useEffect(() => {
        if (!punchInTimestamp || punchOutTimestamp) {
            return;
        }

        const updateTimer = () => {
            const totalElapsedSeconds = Math.max(0, Math.floor((Date.now() - punchInTimestamp) / 1000));
            const liveBreakSeconds = getLiveBreakSeconds();

            setBreakTime(formatSeconds(liveBreakSeconds));
            setWorkingTime(formatSeconds(totalElapsedSeconds));
        };

        updateTimer();
        const intervalId = window.setInterval(updateTimer, 1000);

        return () => window.clearInterval(intervalId);
    }, [punchInTimestamp, punchOutTimestamp, breakStartTimestamp, breakSeconds]);

    const handleBreakToggle = async () => {
        if (!isPunchedIn || punchOutTimestamp) {
            setStatusMessage("Punch in first to start a break");
            return;
        }

        try {
            if (!breakStartTimestamp) {
                setBreakStartTimestamp(Date.now());
                setBreakTime("00:00:00");
                setStatusMessage("Break started");
                await dispatch(startBreak(userId as string)).unwrap();
            } else {
                const breakDuration = Math.max(0, Math.floor((Date.now() - breakStartTimestamp) / 1000));
                const updatedBreakSeconds = breakSeconds + breakDuration;

                setBreakSeconds(updatedBreakSeconds);
                setBreakStartTimestamp(null);
                setBreakTime(formatSeconds(updatedBreakSeconds));
                setStatusMessage("Break ended");

                await dispatch(endBreak(userId as string)).unwrap();
            }

            const response = await dispatch(fetchTodayAttendance(userId as string)).unwrap();
            syncAttendance(response.attendance);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to update break";
            setStatusMessage(message);
        }
    };

    const handleAttendanceToggle = async () => {
        if (!userId) {
            setStatusMessage("Unable to detect the current user");
            return;
        }

        try {
            const effectiveBreakSeconds = getLiveBreakSeconds();

            if (!isPunchedIn) {
                const response = await dispatch(punchIn(userId)).unwrap();
                if (response?.attendance) {
                    syncAttendance(response.attendance, effectiveBreakSeconds);
                    toast(response?.message ?? "Attendance marked for the day", {
                        className: "!bg-emerald-100",
                    });
                    return;
                }
            } else {
                await dispatch(punchOut(userId)).unwrap();
            }

            const response = await dispatch(fetchTodayAttendance(userId)).unwrap();

            if (response?.attendance) {
                syncAttendance(response.attendance, effectiveBreakSeconds);
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to update attendance";
            setStatusMessage(message);
        }
    }

    const summaryTotalHours = workingTime;

    const summaryBreakTime = formatHoursMinutes(breakTime);
    const summaryProductivity = `${punchOutTimestamp ? Math.round((toSeconds(workingTime) / Math.max(1, toSeconds(workingTime) + toSeconds(breakTime))) * 100) : getProductivity()}%`;

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
                                    {isPunchedIn ? "🟢" : "🔴"}
                                </div>
                            </div>

                            {/* Working Timer */}
                            <div className='mt-10'>

                                <p className='text-white/70 text-sm mb-2'>
                                        Total Working Hours
                                </p>

                                <h1 className='text-5xl font-bold tracking-wide'>
                                        {summaryTotalHours}
                                </h1>

                                <p className='mt-3 text-white/80'>
                                    Since {displayPunchInTime}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className='p-6'>

                        {/* Punch Buttons */}
                        <div className='grid grid-cols-1 gap-4'>

                            <button
                                className={`h-14 rounded-2xl text-white font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 ${
                                    isPunchedIn
                                        ? "bg-gradient-to-r from-red-500 to-rose-600"
                                        : "bg-gradient-to-r from-emerald-500 to-green-600"
                                }`}
                                onClick={handleAttendanceToggle}
                            >
                                {isPunchedIn ? "Punch Out" : "Punch In"}
                            </button>
                        </div>

                        {statusMessage ? (
                            <p className='mt-4 text-sm text-gray-500'>
                                {statusMessage}
                            </p>
                        ) : null}

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
                                    {displayPunchInTime}
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
                                    {punchOutTime}
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
                                        {summaryBreakTime}
                                    </h3>
                                </div>

                                <button
                                    className={`h-12 px-5 rounded-2xl border transition-all duration-300 ${
                                        breakStartTimestamp
                                            ? "border-amber-300 bg-amber-50 text-amber-700 hover:bg-amber-100"
                                            : "border-gray-200 bg-white hover:bg-gray-100"
                                    }`}
                                    onClick={handleBreakToggle}
                                >
                                    {breakStartTimestamp ? "End Break" : "Start Break"}
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