import React, { useState, useEffect } from "react";
import "./adminDashboard.css";
import axios from "axios";
import DashboardProfessionalItems from "../dashboardprofessionalitems/dashboardprofessionalitems.component";
import Link from "../link/link.component";
import Modal from "../modal/modal.component";
import Button from "../button/button.component";
import Modal2 from "../modal/modal2.component";

export const admins = [
  {
    email: "muhammadalkali.muawiya@decagon.dev",
    name: "MM Alkali",
    phone: "+2347080407711",
  },
  {
    email: "favour.adjushi@decagon.dev",
    name: "Favour Adjushi",
    phone: "+2348122788996",
  },
  {
    email: "otonye.amietubodie@decagon.dev",
    name: "Otonye Amietubodie",
    phone: "+2348124015475",
  },
  {
    email: "damilola.adegoke@decagon.dev",
    name: "Damilola Adegoke",
    phone: "+2348188270170",
  },
  {
    email: "chukwuebuka.anunihu@decagon.dev",
    name: "Chukwuebuka Anunihu",
    phone: "+2347064527012",
  },
];

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [selectedOption, setSelectedOption] = useState("users");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [adminName, setAdminName] = useState("");

  const handleOpenModal = (appointment) => {
    setSelectedAppointment(appointment);
    setSelectedUser(appointment);
    setModalOpen(true);
    console.log(appointment);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const fetchUsers = async () => {
    const result = await axios.get("http://localhost:3000/admin/all-users");
    setUsers(result.data.data);
    setSelectedOption("users");
  };

  const fetchData = async () => {
    const result = await axios.get("http://localhost:3000/professional");
    setData(result.data.data);
    setSelectedOption("professionals");
  };
  const fetchAppointments = async () => {
    const result = await axios.get(
      "http://localhost:3000/admin/all-appointments"
    );
    setAppointments(result.data.data);
    setSelectedOption("appointments");
  };

  const deleteAppointment = async () => {
    if (!selectedAppointment) {
      console.error("selectedAppointment is not defined");
      return;
    }
    // Delete the selected appointment
    await axios.delete(
      `http://localhost:3000/admin/appointment/${selectedAppointment.id}`
    );

    // Fetch the updated list of appointments and update the state
    const result = await axios.get(
      "http://localhost:3000/admin/all-appointments"
    );
    setAppointments(result.data.data);
    handleCloseModal();
  };
  const deleteUser = async () => {
    if (!selectedUser) {
      console.error("selected user is not defined");
      return;
    }
    // Delete the selected appointment
    await axios.delete(`http://localhost:3000/admin/users/${selectedUser.id}`);

    // Fetch the updated list of appointments and update the state
    const result = await axios.get("http://localhost:3000/admin/all-users");
    setUsers(result.data.data);
    handleCloseModal();
  };

  useEffect(() => {
    const emailFromStorage = localStorage.getItem("email");
    const loggedInUserEmail = JSON.parse(emailFromStorage);
    if (loggedInUserEmail) {
      const currentAdmin = admins.find(
        (admin) => admin.email === loggedInUserEmail
      );
      if (currentAdmin) {
        setAdminName(currentAdmin.name);
      }
    }
    fetchUsers();
  }, []);

  const handleVerifyProfessional = (professional) => {
    setSelectedProfessional(professional);
  };

  const renderDashboardContent = () => {
    if (selectedOption === "professionals") {
      return (
        <div className="professionals-container">
          {data.map((professional, index) => {
            return (
              <div className="professionals-details" key={professional.id}>
                <DashboardProfessionalItems
                  professional={professional}
                  setProfessionals={setData}
                  onVerifyProfessional={handleVerifyProfessional}
                />
              </div>
            );
          })}
        </div>
      );
    } else if (selectedOption === "appointments") {
      return (
        <div className="appointments-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Appointment Type</th>
                <th>Session Type</th>
                <th>Session Date</th>
                <th>Session Frequency</th>
                <th>Additional Info</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td
                    id="name-cell"
                    onClick={() => handleOpenModal(appointment)}
                  >
                    {appointment.fullName}
                  </td>
                  <td>{appointment.email}</td>
                  <td>{appointment.serviceType}</td>
                  <td>{appointment.sessionType}</td>
                  <td>
                    {new Date(appointment.sessionDate).toLocaleDateString()}
                  </td>
                  <td>{appointment.sessionFrequency} </td>
                  <td>{appointment.additionalInfo}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {modalOpen && (
            <Modal2
              btn2Txt="Delete"
              onBtnClick={deleteAppointment}
              onClick={handleCloseModal}
            />
          )}
        </div>
      );
    } else {
      return (
        <div className="appointments-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>Country</th>
                <th>City</th>
                <th>Interests</th>
                <th>Emergency Contact</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td id="name-cell" onClick={() => handleOpenModal(user)}>
                    {user.username}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>{new Date(user.dob).toLocaleDateString()}</td>
                  <td>{user.country} </td>
                  <td>{user.city} </td>
                  <td>{user.interest}</td>
                  <td>{user.emergencyContact}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {modalOpen && (
            <Modal2
              btn2Txt="Delete"
              onBtnClick={deleteUser}
              onClick={handleCloseModal}
            />
          )}
        </div>
      );
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dash">
        <h1>Admin Dashboard - {adminName}</h1>
      </div>
      <div className="dashboard-content">
        <nav className="list">
          <Link
            href="#"
            linkText="USERS"
            className={`admin-link${
              selectedOption === "users" ? " active" : ""
            }`}
            onClick={fetchUsers}
          />
          <Link
            href="#"
            linkText="PROFESSIONALS"
            className={`admin-link${
              selectedOption === "professionals" ? " active" : ""
            }`}
            onClick={fetchData}
          />
          <Link
            href="#"
            linkText="APPOINTMENTS"
            className={`admin-link${
              selectedOption === "appointments" ? " active" : ""
            }`}
            onClick={fetchAppointments}
          />
        </nav>
        {renderDashboardContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
