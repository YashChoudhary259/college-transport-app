import { Routes, Route } from "react-router-dom"
import Layout from "./pages/Layout"

import StudentLogin from "./pages/student/StudentLogin"
import ForgotPassword from "./pages/ForgotPassword"
import NewPassword from "./pages/NewPassword"
import Signup from "./pages/Signup"
import DriverDashboard from "./pages/DriverDashboard"
import ManagementDashboard from "./pages/ManagementDashboard"
import Contact from "./pages/Contact"

import Home from "./pages/Home"
import MorningRoute from "./pages/MorningRoute"
import EveningRoute from "./pages/EveningRoute"
import MorningAttendance from "./pages/MorningAttendance"
import EveningAttendance from "./pages/EveningAttendance"
import SOS from "./pages/SOS"
import BusFeeStatus from "./pages/BusFeeStatus"
import Complaint from "./pages/Complaint"
import Suggestions from "./pages/Suggestions"
import Account from "./pages/Account"
import LiveTracking from "./pages/LiveTracking"

function App() {
  return (
    <Routes>

      {/* Authentication Screens (NO Layout) */}
      <Route path="/" element={<StudentLogin />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/new-password" element={<NewPassword />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/driver-dashboard" element={<DriverDashboard />} />
      <Route path="/management-dashboard" element={<ManagementDashboard />} />
      <Route path="/contact" element={<Contact />} />
      

      {/* All App Screens (WITH Layout) */}
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/morning-route" element={<MorningRoute />} />
        <Route path="/evening-route" element={<EveningRoute />} />
        <Route path="/morning-attendance" element={<MorningAttendance />} />
        <Route path="/evening-attendance" element={<EveningAttendance />} />
        <Route path="/sos" element={<SOS />} />
        <Route path="/fee-status" element={<BusFeeStatus />} />
        <Route path="/complaint" element={<Complaint />} />
        <Route path="/suggestions" element={<Suggestions />} />
        <Route path="/account" element={<Account />} />
        <Route path="/live-tracking" element={<LiveTracking />} />
      </Route>

    </Routes>
  )
}

export default App