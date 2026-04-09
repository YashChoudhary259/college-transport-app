import { Bell, AlertTriangle } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import BottomNav from "./BottomNav"

function Home() {

    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [trackingData, setTrackingData] = useState({
        arrivalTime: 20,
        distance: 2.8
    })

    // 🔔 Alarm State
    const [alarmTime, setAlarmTime] = useState(
        Number(localStorage.getItem("alarmTime")) || 10
    )
    const [alarmTriggered, setAlarmTriggered] = useState(false)

    useEffect(() => {

        const storedUser = JSON.parse(localStorage.getItem("user"))

        if (!storedUser) {
            navigate("/")
        } else {
            setUser(storedUser)
        }

        const storedTracking = JSON.parse(localStorage.getItem("trackingData"))
        if (storedTracking) {
            setTrackingData(storedTracking)
        }

    }, [navigate])

    // 🔥 Alarm Logic
    useEffect(() => {
        if (!trackingData?.arrivalTime) return

        const interval = setInterval(() => {

            if (
                trackingData.arrivalTime <= alarmTime &&
                !alarmTriggered
            ) {
                setAlarmTriggered(true)

                const audio = new Audio("/alarm.mp3")
                audio.play()

                alert(`🚨 Bus arriving in ${trackingData.arrivalTime} minutes!`)
            }

        }, 5000)

        return () => clearInterval(interval)

    }, [trackingData, alarmTime, alarmTriggered])

    const handleAlarmChange = (time) => {
        setAlarmTime(time)
        localStorage.setItem("alarmTime", time)
        setAlarmTriggered(false)
    }

    if (!user) return null

    const firstName = user.fullName?.split(" ")[0] || "Student"

    const hour = new Date().getHours()
    let greeting = "Good Morning"
    if (hour >= 12 && hour < 17) greeting = "Good Afternoon"
    if (hour >= 17) greeting = "Good Evening"

    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-400 to-black relative">

            <div className="px-6 pt-2 pb-8 relative">

                {/* Top Section */}
                <div className="flex justify-between items-center mb-6">

                    <div className="flex items-center gap-3">
                        <img
                            src={user.profileImage || "/profile.png"}
                            alt="profile"
                            onClick={() => navigate("/account")}
                            className="w-12 h-12 rounded-full cursor-pointer object-cover border-2 border-white"
                        />
                        <div>
                            <p className="font-semibold text-sm text-black">
                                Name: {firstName}
                            </p>
                            <p className="text-sm text-black/80">
                                {user.branchSem}
                            </p>
                        </div>
                    </div>

                    <div className="relative mr-6 cursor-pointer">
                        <Bell size={42} />
                        <span className="absolute top-1 right-1 w-3 h-3 bg-red-600 rounded-full border-2 border-white"></span>
                    </div>

                </div>

                <h1 className="text-3xl font-extrabold mb-2 tracking-wide">
                    {greeting}, {firstName}
                </h1>

                <p className="text-black/80 font-medium mb-4">
                    Track your bus in real-time and stay updated.
                </p>

                {/* 🔥 LIVE TRACKING CARD */}
                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/30 relative">

                    {/* 🔥 PREMIUM ALARM SECTION */}
                    <div className="flex flex-col gap-2 mb-3">

                        <div className="flex items-center justify-between">

                            <div className="flex items-center gap-2">
                                <div className="relative">
                                    <span className="absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75 animate-ping"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </div>

                                <span className="text-sm font-semibold text-green-900">
                                    LIVE TRACKING
                                </span>
                            </div>

                            {/* 🔔 Alarm Box */}
                            <div className="relative">

                                <div className="absolute inset-0 bg-yellow-400 rounded-xl blur-md opacity-30"></div>

                                <div className="relative flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-xl border border-yellow-400/40 shadow-lg">

                                    <span className="text-sm">⏰</span>

                                    <input
                                        type="number"
                                        min="1"
                                        value={alarmTime}
                                        onChange={(e) => handleAlarmChange(Number(e.target.value))}
                                        className="w-12 bg-transparent text-sm outline-none text-yellow-200 font-bold text-center"
                                    />

                                    <span className="text-xs text-yellow-300">min</span>
                                </div>

                            </div>

                        </div>

                        <p className="text-xs text-black/70 font-medium">
                            Alert me before arrival
                        </p>

                        {alarmTriggered ? (
                            <div className="flex items-center gap-2 text-xs text-red-600 font-semibold">
                                <span className="animate-bounce">🔔</span>
                                Alarm Triggered
                            </div>
                        ) : (
                            <div className="text-xs text-black/60">
                                Alarm set for <span className="font-semibold">{alarmTime} min</span> before arrival
                            </div>
                        )}

                    </div>

                    {/* Data */}
                    <p className="text-2xl font-bold text-green-900 mt-1">
                        {trackingData.arrivalTime} mins
                    </p>

                    <p className="text-sm text-black/80">
                        {trackingData.distance} km away
                    </p>

                    <div className="grid grid-cols-2 gap-4 mt-4">

                        <div className="bg-white rounded-xl p-4 shadow">
                            <p className="text-gray-500 text-sm">Bus ID</p>
                            <p className="text-lg font-bold">
                                {user.busId || "Not Assigned"}
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-4 shadow">
                            <p className="text-gray-500 text-sm">Student Name</p>
                            <p className="text-lg font-bold">
                                {user.fullName || "Unknown"}
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-4 shadow">
                            <p className="text-gray-500 text-sm">Course</p>
                            <p className="text-lg font-bold">
                                {user.course || "-"}
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-4 shadow">
                            <p className="text-gray-500 text-sm">Branch + Sem</p>
                            <p className="text-lg font-bold">
                                {user.branchSem || "-"}
                            </p>
                        </div>

                    </div>

                    <div
                        onClick={() => navigate("/live-tracking")}
                        className="mt-3 text-blue-800 font-semibold cursor-pointer"
                    >
                        📍 Trace Live Location
                    </div>
                </div>

                {/* SOS */}
                <div className="absolute right-6 top-56">
                    <div className="absolute inset-0 bg-red-600 rounded-full blur-2xl opacity-50"></div>
                    <button
                        onClick={() => navigate("/sos")}
                        className="relative bg-red-600 text-white w-20 h-20 rounded-full shadow-2xl flex items-center justify-center active:scale-95 transition"
                    >
                        <AlertTriangle size={32} />
                    </button>
                </div>

            </div>

            {/* Bottom Section */}
            <div className="bg-black rounded-t-3xl px-6 py-8 min-h-[60vh]">

                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 mb-6 text-center shadow-xl">
                    <button
                        onClick={() => navigate("/live-tracking?type=morning")}
                        className="text-2xl font-bold text-white mb-4 w-full"
                    >
                        MORNING ROUTE
                    </button>

                    <button
                        onClick={() => navigate("/morning-attendance")}
                        className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md">
                        Mark your attendance
                    </button>
                </div>

                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 mb-6 text-center shadow-xl">
                    <button
                        onClick={() => navigate("/live-tracking?type=evening")}
                        className="text-2xl font-bold text-white mb-4 w-full"
                    >
                        EVENING ROUTE
                    </button>

                    <button
                        onClick={() => navigate("/evening-attendance")}
                        className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md">
                        Mark your attendance
                    </button>
                </div>

                <button
                    onClick={() => navigate("/fee-status")}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-bold mb-4 shadow-md">
                    CHECK YOUR BUS FEE STATUS
                </button>

                <button
                    onClick={() => navigate("/complaint")}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-bold mb-4 shadow-md">
                    COMPLAINT SECTION
                </button>

                <button
                    onClick={() => navigate("/suggestions")}
                    className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white py-3 rounded-xl font-bold shadow-md">
                    SUGGESTIONS
                </button>

            </div>

            <BottomNav />

        </div>
    )
}

export default Home