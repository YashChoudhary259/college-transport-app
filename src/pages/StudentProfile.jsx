import { useState, useEffect } from "react"
import BottomNav from "./BottomNav"

function StudentProfile() {

    const [student, setStudent] = useState(null)

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"))
        if (storedUser) {
            setStudent(storedUser)
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setStudent({ ...student, [name]: value })
    }

    const handleSave = () => {
        localStorage.setItem("user", JSON.stringify(student))

        // also update in users array
        const users = JSON.parse(localStorage.getItem("users")) || []
        const updatedUsers = users.map(user =>
            user.id === student.id ? student : user
        )

        localStorage.setItem("users", JSON.stringify(updatedUsers))

        alert("Details Updated Successfully ✅")
    }

    if (!student) {
        return <div className="p-6">Please login first</div>
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-400 to-black p-6">

            <div className="flex flex-col items-center mb-6">
                <img
                    src="/profile.png"
                    alt="profile"
                    className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
                />
                <h2 className="text-xl font-bold mt-4 text-white">
                    Student Details
                </h2>
            </div>

            <div className="space-y-4">

                {[
                    { label: "Bus ID", name: "id" },
                    { label: "Full Name", name: "fullName" },
                    { label: "Course", name: "course" },
                    { label: "Branch + Sem", name: "branchSem" },
                    { label: "Contact Number", name: "contact" },
                    { label: "Email ID", name: "email" },
                    { label: "Address", name: "address" }
                ].map((field, index) => (
                    <div key={index}>
                        <label className="text-white font-semibold">
                            {field.label}
                        </label>
                        <input
                            type="text"
                            name={field.name}
                            value={student[field.name] || ""}
                            onChange={handleChange}
                            className="w-full p-3 rounded-xl mt-1"
                        />
                    </div>
                ))}

                <button
                    onClick={handleSave}
                    className="w-full bg-green-500 text-white py-3 rounded-xl font-bold mt-4 active:scale-95 transition"
                >
                    Save Changes
                </button>

            </div>

        </div>
    )
}

export default StudentProfile