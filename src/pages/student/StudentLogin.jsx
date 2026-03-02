import { useNavigate } from "react-router-dom"
import { useState } from "react"

function StudentLogin() {
    const [role, setRole] = useState("student")
    const navigate = useNavigate()

    const [id, setId] = useState("")
    const [busNumber, setBusNumber] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleLogin = () => {

        const users = JSON.parse(localStorage.getItem("users")) || []

        const foundUser = users.find((user) => {

            if (role === "student") {
                return (
                    user.role === "student" &&
                    user.studentEmail === id &&   // ✅ fixed
                    user.password === password
                )
            }

            if (role === "driver") {
                return (
                    user.role === "driver" &&
                    user.driverId === id &&      // ✅ fixed
                    user.password === password
                )
            }

            if (role === "management") {
                return (
                    user.role === "management" &&
                    user.managementId === id &&  // ✅ fixed
                    user.password === password
                )
            }

            return false
        })

        if (!foundUser) {
            setError("Wrong credentials ❌")
            return
        }

        localStorage.setItem("currentUser", JSON.stringify(foundUser))

        if (foundUser.role === "driver") {
            navigate("/driver-dashboard")
        } else if (foundUser.role === "management") {
            navigate("/management-dashboard")
        } else {
            navigate("/home")
        }
    }

    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-yellow-400">

            <div
                className="absolute inset-0 bg-yellow-400"
                style={{
                    clipPath: "polygon(0 0, 65% 0, 45% 100%, 0% 100%)"
                }}
            />

            <div className="relative z-10 px-6 py-10 flex flex-col min-h-screen">

                <div className="flex justify-center mb-12">
                    <img
                        src="/wctm-logo.png"
                        alt="WCTM Logo"
                        className="w-40 h-40 object-contain"
                    />
                </div>

                <div className="bg-white border border-black rounded-2xl p-6 shadow-md">

                    <input
                        type="text"
                        placeholder={
                            role === "student"
                                ? "Student ID or Email"
                                : role === "driver"
                                    ? "Driver ID"
                                    : "Management ID"
                        }
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        className="w-full border border-black rounded-lg px-4 py-3 mb-4 outline-none"
                    />

                    {role === "driver" && (
                        <input
                            type="text"
                            placeholder="Bus Number"
                            value={busNumber}
                            onChange={(e) => setBusNumber(e.target.value)}
                            className="w-full border border-black rounded-lg px-4 py-3 mb-4 outline-none"
                        />
                    )}

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-black rounded-lg px-4 py-3 mb-2 outline-none"
                    />

                    {error && (
                        <p className="text-red-500 text-sm mb-3 text-center">
                            {error}
                        </p>
                    )}

                    <button
                        onClick={handleLogin}
                        className="w-full bg-cyan-500 text-white py-3 rounded-lg font-semibold"
                    >
                        {role.charAt(0).toUpperCase() + role.slice(1)} Login
                    </button>
                </div>

                <div className="mt-20">

                    <div className="flex justify-between border border-white rounded-full p-1 mb-4">

                        {["student", "driver", "management"].map((r) => (
                            <button
                                key={r}
                                onClick={() => setRole(r)}
                                className={`flex-1 py-2 rounded-full font-medium transition-all duration-300 ${
                                    role === r
                                        ? "bg-cyan-500 text-white"
                                        : "text-white"
                                }`}
                            >
                                {r.charAt(0).toUpperCase() + r.slice(1)}
                            </button>
                        ))}

                    </div>

                    <div className="text-center text-sm text-white">
                        Don’t have an account?{" "}
                        <span
                            onClick={() => navigate("/signup")}
                            className="text-cyan-500 cursor-pointer"
                        >
                            Sign Up
                        </span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default StudentLogin   // ✅ fixed