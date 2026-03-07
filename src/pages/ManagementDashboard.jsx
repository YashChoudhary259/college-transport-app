import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function ManagementDashboard() {

    const navigate = useNavigate()

    const [management, setManagement] = useState(null)
    const [drivers, setDrivers] = useState([])
    const [students, setStudents] = useState([])
    const [attendance, setAttendance] = useState([])
    const [isLandscape, setIsLandscape] = useState(
        window.innerWidth > window.innerHeight
    )

    useEffect(() => {
        const handleResize = () => {
            setIsLandscape(window.innerWidth > window.innerHeight)
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("user"))
        const users = JSON.parse(localStorage.getItem("users")) || []
        const attendanceData = JSON.parse(localStorage.getItem("attendance")) || []

        if (!currentUser || currentUser.role !== "management") {
            navigate("/")
            return
        }

        setManagement(currentUser)
        setDrivers(users.filter(u => u.role === "driver"))
        setStudents(users.filter(u => u.role === "student"))
        setAttendance(attendanceData)

    }, [navigate])

    const logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("isLoggedIn")
        navigate("/")
    }

    const getCheckedCount = (busNumber) => {
        const busStudents = students.filter(s => String(s.busId) === String(busNumber))
        const checked = attendance.filter(a =>
            String(a.busId) === String(busNumber) && a.status === "present"
        )

        return `${checked.length}/${busStudents.length}`
    }

    const getBusStatus = (busNumber) => {

        const checked = attendance.filter(a =>
            String(a.busId) === String(busNumber) &&
            a.status === "present"
        )

        if (checked.length === 0) return "NOT STARTED"
        if (checked.length < 3) return "DELAY"

        return "ON TIME"
    }

    if (!isLandscape) {
        return (
            <div className="h-screen flex items-center justify-center bg-black text-white text-center p-6">
                <div>
                    <h1 className="text-2xl font-bold mb-4">
                        Please Rotate Your Device
                    </h1>
                    <p className="text-gray-400">
                        Management dashboard works best in landscape mode.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white flex">

            <div className="w-72 bg-black p-5 space-y-6">

                <div>
                    <h1 className="text-lg font-bold leading-tight">
                        WORLD COLLEGE OF TECHNOLOGY & MANAGEMENT
                    </h1>
                </div>

                <div className="bg-gray-800 p-4 rounded-xl">
                    <p className="text-gray-400 text-sm">Total Buses</p>
                    <h2 className="text-3xl font-bold">
                        {drivers.length}
                    </h2>
                </div>

                <div className="space-y-3">
                    <button className="w-full bg-yellow-400 text-black py-2 rounded-lg font-semibold">
                        Bus List →
                    </button>
                    <button className="w-full bg-gray-700 py-2 rounded-lg">
                        Attendance →
                    </button>
                    <button className="w-full bg-gray-700 py-2 rounded-lg">
                        Reports →
                    </button>
                    <button className="w-full bg-gray-700 py-2 rounded-lg">
                        Drivers →
                    </button>
                    <button className="w-full bg-gray-700 py-2 rounded-lg">
                        Routes →
                    </button>
                </div>

                <button
                    onClick={logout}
                    className="w-full bg-red-500 py-2 rounded-lg mt-6"
                >
                    Logout
                </button>

            </div>

            <div className="flex-1 p-6">

                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold">
                            {management?.fullName}
                        </h1>
                        <p className="text-gray-400">
                            Transportation Head
                        </p>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-2xl h-64 mb-6 flex items-center justify-center">
                    <p className="text-gray-400">
                        Live Map Integration Coming Soon
                    </p>
                </div>

                <div className="bg-gray-800 rounded-2xl overflow-hidden">

                    <div className="grid grid-cols-5 bg-black p-3 font-semibold text-sm">
                        <div>Bus</div>
                        <div>Driver</div>
                        <div>Location</div>
                        <div>Students</div>
                        <div>Status</div>
                    </div>

                    {drivers?.map((driver, index) => {

                        const studentCount = getCheckedCount(driver.busNumber)
                        const status = getBusStatus(driver.busNumber)

                        return (
                            <div
                                key={index}
                                className="grid grid-cols-5 p-3 border-t border-gray-700 text-sm"
                            >
                                <div>Bus {driver.busNumber}</div>
                                <div>{driver.fullName}</div>
                                <div>SECTOR 21</div>
                                <div>{studentCount}</div>
                                <div
                                    className={
                                        status === "ON TIME"
                                            ? "text-green-400 font-bold"
                                            : "text-red-400 font-bold"
                                    }
                                >
                                    {status}
                                </div>
                            </div>
                        )
                    })}

                    {drivers.length === 0 && (
                        <div className="p-6 text-center text-gray-400">
                            No drivers found.
                        </div>
                    )}

                </div>

            </div>

        </div>
    )
}

export default ManagementDashboard