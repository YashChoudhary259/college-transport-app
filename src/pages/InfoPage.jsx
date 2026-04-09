import { useEffect, useState } from "react"

function InfoPage() {

    const [info, setInfo] = useState({
        student: {
            fullName: "",
            course: "",
            contact: ""
        },
        management: {
            hodName: "",
            contact: ""
        },
        driver: {
            name: "",
            contact: ""
        },
        conductor: {
            name: "",
            contact: ""
        }
    })

    useEffect(() => {
        const storedInfo = JSON.parse(localStorage.getItem("contactInfo"))
        if (storedInfo) {
            setInfo(storedInfo)
        }
    }, [])

    return (

        <div className="min-h-screen bg-gradient-to-b from-yellow-400 via-yellow-500 to-black p-4">

            {/* Header */}
            <div className="text-center text-black text-xl font-bold mb-6 tracking-wide">
                ℹ️ Info Page
            </div>

            <div className="space-y-6">

                {[
                    {
                        title: "STUDENT",
                        data: [
                            info.student.fullName || "Full Name",
                            info.student.course || "Course + Branch + Sem",
                            info.student.contact || "Contact"
                        ]
                    },
                    {
                        title: "MANAGEMENT",
                        data: [
                            info.management.hodName || "H.O.D Name",
                            info.management.contact || "Contact"
                        ]
                    },
                    {
                        title: "DRIVER",
                        data: [
                            info.driver.name || "Name",
                            info.driver.contact || "Contact"
                        ]
                    },
                    {
                        title: "CONDUCTOR",
                        data: [
                            info.conductor.name || "Name",
                            info.conductor.contact || "Contact"
                        ]
                    }
                ].map((section, index) => (

                    <div
                        key={index}
                        className="bg-black/70 backdrop-blur-md border border-yellow-400/30 rounded-3xl p-5 shadow-xl"
                    >

                        {/* Section Title */}
                        <h2 className="text-center font-bold text-lg mb-4 text-yellow-300 tracking-wide">
                            {section.title}
                        </h2>

                        <div className="space-y-3">
                            {section.data.map((item, i) => (
                                <div
                                    key={i}
                                    className="bg-black/60 text-yellow-200 rounded-xl p-3 text-sm border border-yellow-400/40 shadow-md hover:shadow-yellow-400/30 transition"
                                >
                                    {item}
                                </div>
                            ))}
                        </div>

                    </div>
                ))}

            </div>

        </div>
    )
}

export default InfoPage