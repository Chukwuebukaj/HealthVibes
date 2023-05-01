import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/landing";
import RegistrationUserPage from "./pages/RegistrationUser/RegistrationUser";
import RegistrationProfessionalPage from "./pages/RegistrationProfessional/RegistrationProfessional";
import AdminDashboard from "./pages/adminDashboard/AdminDashboard";
import AppointmentBookingPage from "./pages/AppointmentBookingPage/AppointmentBookingPage";
import Login from "./pages/login/Login";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import ProfessionalsDashboardPage from "./pages/ProfessionalsDashboard/ProfessionalsDashboard";
import UserDashboardPage from "./pages/userDashboard/UserDashboard";
import PaymentStatusPage from "./pages/PaymentStatusPage/PaymentStatusPage";
import Successful from "./component/success/success.component";
import Fail from "./component/fail/fail.component";
import ProfessionalDetails from "./component/professionalDetails/professionalDetails.component";

function App(): JSX.Element {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/registrationuser" element={<RegistrationUserPage />} />
        <Route
          path="/registrationprofessional"
          element={<RegistrationProfessionalPage />}
        />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route
          path="/appointment/booking/:id"
          element={<AppointmentBookingPage />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/appointment/payment" element={<PaymentPage />} />
        <Route path="/professional/:id" element={<ProfessionalDetails />} />
        <Route
          path="/professionaldashboard"
          element={<ProfessionalsDashboardPage />}
        />
        <Route path="/userdashboard" element={<UserDashboardPage />} />
        <Route path="/paymentstatus" element={<PaymentStatusPage />} />
        <Route path="/successful" element={<Successful />} />
        <Route path="/failed" element={<Fail />} />
      </Routes>
    </div>
  );
}

export default App;
