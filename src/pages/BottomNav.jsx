import { Home as HomeIcon, Info, Phone, User } from "lucide-react"
import { useNavigate } from "react-router-dom"

function BottomNav() {
    const navigate = useNavigate()

    return (
        <div className="
            fixed bottom-4 left-1/2 -translate-x-1/2
            bg-white/90 backdrop-blur-md
            rounded-full px-8 py-3
            flex gap-8
            shadow-2xl
            z-50
        ">

            <HomeIcon
                size={26}
                className="cursor-pointer hover:scale-110 transition"
                onClick={() => navigate("/home")}
            />

            <Info
                size={26}
                className="cursor-pointer hover:scale-110 transition"
                onClick={() => navigate("/info")}
            />

            <Phone
                size={26}
                className="cursor-pointer hover:scale-110 transition"
                onClick={() => navigate("/contact")}
            />

            <User
                size={26}
                className="cursor-pointer hover:scale-110 transition"
                onClick={() => navigate("/account")}
            />
        </div>
    )
}

export default BottomNav