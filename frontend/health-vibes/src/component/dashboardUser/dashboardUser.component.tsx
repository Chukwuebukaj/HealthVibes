import { useState, useEffect } from "react";
import "./dashboardUser.css";
import Link from "../link/link.component";
import axios from "axios";
import TextArea from "../textarea/textarea.component";
import Button from "../button/button.component";
import Modal from "../modal/modal.component";
import InputField from "../input-field/input.component";
import DisplayProfessional from "../displayProfessionals/displayProfessionals.component";
import Modal2 from "../modal/modal2.component";

interface Record {
  id: number;
  value: string;
  timestamp: number;
  email: string;
}

interface Props {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  dob: string;
  gender: string;
  country: string;
  city: string;
  interest: string;
  emergencyContact: string;
}

interface Appointments {
  id: string;
  email: string;
  fullName: string;
  serviceType: string;
  sessionType: string;
  sessionDate: Date;
  sessionFrequency: string;
  additionalInfo: string;
  status: string;
  professionalId: string;
}

function DashboardUser() {
  const [user, setUser] = useState<any>({});
  const [selectedOption, setSelectedOption] = useState("profile");
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Record | null>(
    null
  );
  const [inputValue, setInputValue] = useState<string>("");
  const [records, setRecords] = useState<Record[]>([]);
  const [recordToUpdate, setRecordToUpdate] = useState<Record | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Props>({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    dob: "",
    gender: "",
    country: "",
    city: "",
    interest: "",
    emergencyContact: "",
  });

  useEffect(() => {
    const storedRecords = localStorage.getItem("records");
    if (storedRecords) {
      const recordsArr = JSON.parse(storedRecords);
      const userRecords = recordsArr.filter(
        (record: any) => record.email === user.email
      );
      setRecords(userRecords);
    }
    findUser();
    getAppointments();
  }, [user.email]);

  const findUser = async () => {
    const emailFromStorage = localStorage.getItem("email");
    if (emailFromStorage) {
      const currentUserEmail = JSON.parse(emailFromStorage);
      const response = await axios.get("http://localhost:3000/admin/all-users");
      const usersData = response.data.data;
      const requiredUser = usersData.find(
        (user: any) => user.email === currentUserEmail
      );
      setUser(requiredUser);
    }
  };

  const getAppointments = async () => {
    const emailFromStorage = localStorage.getItem("email");
    if (emailFromStorage) {
      const currentUserEmail = JSON.parse(emailFromStorage);
      const response = await axios.get(
        "http://localhost:3000/admin/all-appointments"
      );
      const allAppointments = response.data.data;
      const userAppointments = allAppointments.filter(
        (appointment: any) => appointment.email === currentUserEmail
      );
      setAppointments(userAppointments);
    }
  };

  const handleGetProfile = () => {
    setSelectedOption("profile");
  };
  const handleGetTherapy = () => {
    setSelectedOption("appointments");
  };

  const handleOpenModal = (appointment: any) => {
    setSelectedAppointment(appointment);
    setModalOpen(true);
  };

  const deleteAppointment = async () => {
    if (!selectedAppointment) {
      console.error("selectedAppointment is not defined");
      return;
    }
    const response = await axios.delete(
      `http://localhost:3000/admin/appointment/${selectedAppointment}`
    );
    getAppointments();
    handleCloseModal();
  };

  const handleGetJournal = () => {
    setSelectedOption("journal");
  };

  const handleCreateRecord = (): void => {
    if (inputValue === "") {
      return;
    }
    if (recordToUpdate) {
      const updatedRecords: Record[] = records.map((record) => {
        if (record.id === recordToUpdate.id) {
          return { ...record, value: inputValue };
        }
        return record;
      });
      setRecords(updatedRecords);
      setRecordToUpdate(null);
      localStorage.setItem("records", JSON.stringify(updatedRecords));
    } else {
      const newRecord: Record = {
        id: Date.now(),
        value: inputValue,
        timestamp: new Date().getTime(),
        email: user.email,
      };
      setRecords([...records, newRecord]);
      localStorage.setItem("records", JSON.stringify([...records, newRecord]));
    }
    setInputValue("");
  };

  const handleUpdateRecord = (record: Record): void => {
    setInputValue(record.value);
    setRecordToUpdate(record);
  };

  const handleDeleteRecord = (id: number): void => {
    const updatedRecords: Record[] = records.filter(
      (record) => record.id !== id
    );
    setRecords(updatedRecords);
    localStorage.setItem("records", JSON.stringify(updatedRecords));
  };

  const handleEditProfile = () => {
    setModalOpen(true);
    setFormData(user);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitUpdate = async (id: string) => {
    console.log(id);
    const response = await axios.patch(
      `http://localhost:3000/register/${id}`,
      formData
    );
    handleCloseModal();
  };

  const renderUserDashboard = () => {
    if (selectedOption === "profile") {
      return (
        <section className="appointments-container">
          <div className="profile-content">
            <h1>Hi {user.username}</h1>
            <p>Welcome to the family. Sending you lots of love 😊</p>
            <p>Name: {user.username}</p>
            <p>Email address: {user.email}</p>
            <p>Date of Birth: {user.dob}</p>
            <p>Gender: {user.gender}</p>
            <p>Country: {user.country}</p>
            <p>City: {user.city}</p>
            <p>Interests: {user.interest}</p>
            <p>Emergency Contact: {user.emergencyContact}</p>
            <Button
              btnText="Edit Profile"
              onClick={handleEditProfile}
              className="edit-profile-btn"
            />
          </div>
          {modalOpen && (
            <Modal
              parentclassName="modal"
              contentClassName="modalContent"
              secondContentClassName=""
              closeBtnClassName="closeUpdate"
              onClick={handleCloseModal}
              modalContent={
                <div className="modalContent">
                  <InputField
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="profile-update"
                  />
                  <InputField
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="profile-update"
                  />
                  <InputField
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="profile-update"
                  />
                  <InputField
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="profile-update"
                  />
                  <InputField
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="profile-update"
                  />
                  <InputField
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="profile-update"
                  />
                  <InputField
                    name="interest"
                    value={formData.interest}
                    onChange={handleInputChange}
                    className="profile-update"
                  />
                  <InputField
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    className="profile-update"
                  />
                  <Button
                    btnText="Submit"
                    className="submit-edit"
                    onClick={() => handleSubmitUpdate(user.id)}
                  />
                </div>
              }
            />
          )}
        </section>
      );
    } else if (selectedOption === "appointments") {
      return (
        <div className="appointments-container">
          <DisplayProfessional professional={undefined} />
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
              {appointments?.map((appointment: any) => (
                <tr key={appointment.id}>
                  <td
                    id="name-cell"
                    onClick={() => {
                      handleOpenModal(appointment.id);
                    }}
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
        <div className="appointments-container journal">
          <h1>
            Hi {user.username}! Feel free to pendown your thoughts here 😉
          </h1>
          <section className="journal-form">
            <div className="text">
              <TextArea
                name="message"
                id="journal-input"
                cols={30}
                rows={10}
                value={inputValue}
                onChange={(e: any) => setInputValue(e.target.value)}
              />
              <button onClick={handleCreateRecord}>
                {recordToUpdate ? "Update Record" : "Create Record"}
              </button>
            </div>
            <div className="wrapper">
              {records.map((record: Record) => (
                <div key={record.id} className="thoughts">
                  <span>
                    On {new Date(record.timestamp).toLocaleDateString()} at{" "}
                    {new Date(record.timestamp).toLocaleTimeString()} you wrote:
                  </span>
                  <span>{record.value}</span>
                  <div className="update-delete">
                    <button onClick={() => handleUpdateRecord(record)}>
                      Update
                    </button>
                    <button onClick={() => handleDeleteRecord(record.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      );
    }
  };
  return (
    <div className="user-dashboard">
      <div className="dash">
        <h1>{user.username}'s Dashboard</h1>
      </div>
      <div className="display">
        <nav className="user-links">
          <Link
            href="#"
            linkText="PROFILE"
            className={`user-link${
              selectedOption === "profile" ? " active" : ""
            }`}
            onClick={handleGetProfile}
          />
          <Link
            href="#"
            linkText="APPOINTMENTS"
            className={`user-link${
              selectedOption === "appointments" ? " active" : ""
            }`}
            onClick={handleGetTherapy}
          />
          <Link
            href="#"
            linkText="JOURNAL"
            className={`user-link${
              selectedOption === "journal" ? " active" : ""
            }`}
            onClick={handleGetJournal}
          />
        </nav>
        {renderUserDashboard()}
      </div>
    </div>
  );
}

export default DashboardUser;
