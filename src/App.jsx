import { Routes, Route } from "react-router-dom"
import Layout from "./pages/Layout"

import StudentLogin from "./pages/student/StudentLogin"
import ForgotPassword from "./pages/ForgotPassword"
import NewPassword from "./pages/NewPassword"
import Signup from "./pages/Signup"
import DriverDashboard from "./pages/DriverDashboard"
import ManagementDashboard from "./pages/ManagementDashboard"
import Contact from "./pages/Contact"
import InfoPage from "./pages/InfoPage"
import AttendancePage from "./pages/AttendancePage"
import BusAttendanceDetails from "./pages/BusAttendanceDetails"
import ManaDashboard from "./pages/ManaDashboard"
import ManagementDrivers from "./pages/ManagementDrivers"
import DriverDetails from "./pages/DriverDetails"
import ManagementRoutes from "./pages/ManagementRoutes"
import RouteDetails from "./pages/RouteDetails"
import ManagementReports from "./pages/ManagementReports"
import AttendanceReports from "./pages/AttendanceReports"
import BusAttendanceReportDetails from "./pages/BusAttendanceReportsDetails"
import RoutesReports from "./pages/RoutesReports"
import RouteReportDetails from "./pages/RoutesReportsDetails"
import DriverReports from "./pages/DriversReports"
import DriverReportDetails from "./pages/DriverReportsDetails"
import VehiclesReports from "./pages/VehiclesReports"
import VehicleReportDetails from "./pages/VehicleReportDetails"
import LicenceReports from "./pages/LicenseReports"
import LicenceReportDetails from "./pages/LicenseReportDetails"
import AccidentReports from "./pages/AccidentReports"
import AccidentReportDetails from "./pages/AccidentReportDetails"
import EditSOS from "./pages/EditSOS"


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
      <Route path="/info" element={<InfoPage />} />
      <Route path="/attendance" element={<AttendancePage />} />
      <Route path="/busattendance/:busNumber" element={<BusAttendanceDetails />} />
      <Route path="/management" element={<ManaDashboard />} />
      <Route path="/drivers" element={<ManagementDrivers />} />
      <Route path="/driver-details/:busNumber" element={<DriverDetails />} />
      <Route path="/routes" element={<ManagementRoutes />} />
      <Route path="/route-details/:busNumber" element={<RouteDetails />} />
      <Route path="/reports" element={<ManagementReports />} />
      <Route path="/attendance-reports" element={<AttendanceReports />} />
      <Route path="/bus-attendance-report/:busId" element={<BusAttendanceReportDetails />} />
      <Route path="/routes-reports" element={<RoutesReports />} />
      <Route path="/route-report/:busId" element={<RouteReportDetails />} />
      <Route path="/driver-reports" element={<DriverReports />} />
      <Route path="/driver-report/:driverId" element={<DriverReportDetails />} />
      <Route path="/vehicle-reports" element={<VehiclesReports />} />
      <Route path="/vehicle-report/:busId" element={<VehicleReportDetails />} />
      <Route path="/licence-reports" element={<LicenceReports />} />
      <Route path="/licence-report/:id" element={<LicenceReportDetails />} />
      <Route path="/accident-reports" element={<AccidentReports />} />
      <Route path="/accident-report/:id" element={<AccidentReportDetails />} />
      <Route path="/edit-sos" element={<EditSOS />} />



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