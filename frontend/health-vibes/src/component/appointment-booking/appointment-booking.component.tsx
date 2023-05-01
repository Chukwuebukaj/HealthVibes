import React, { useEffect, useState } from "react";
import "./appointment-booking.css";
import axios from "axios";
import Button from "../button/button.component";
import InputField from "../input-field/input.component";
import TextArea from "../textarea/textarea.component";

const AppointmentBooking = () => {
  const [profId, setProfId] = useState("");
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    sessionType: "",
    serviceType: "",
    sessionDate: "",
    sessionFrequency: "",
    additionalInfo: "",
  });

  useEffect(() => {
    const profFromStorage = localStorage.getItem("prof-id");
    if (profFromStorage) {
      const professionalId = JSON.parse(profFromStorage);
      setProfId(professionalId);
    }

    const emailFromStorage = localStorage.getItem("email");
    if (emailFromStorage) {
      const userEmail = JSON.parse(emailFromStorage);
      const getAllUsers = async () => {
        const result = await axios.get("http://localhost:3000/admin/all-users");
        const allUsers = result.data.data;
        if (userEmail === formValues.email) {
          setUserEmail(userEmail);
          const requiredUser = allUsers.find(
            (user: any) => user.email === userEmail
          );
          setUserId(requiredUser.id);
        }
      };
      getAllUsers();
    }
  }, [formValues.email]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement> | any
  ) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3000/appointment/booking/${profId}`,
        formValues
      );
      console.log("Appointment created successfully!");
      const responseData = response.data;
      if (
        responseData.msg === "Appointment created successfully" &&
        userEmail === formValues.email
      ) {
        window.location.href = "/appointment/payment";
        console.log(responseData.msg);
      } else {
        window.location.href = "/registrationuser";
      }
    } catch (error) {
      console.error("Something went wrong, try again:", error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | any) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div id="appointment-page" className="appointment">
      <div className="appointment-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <InputField
              type="text"
              className="form-control"
              id="fullName"
              name="fullName"
              value={formValues.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <InputField
              type="text"
              className="form-control"
              id="ap-email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="serviceType">
              What type of service do you want?
            </label>
            <select
              className="form-control"
              id="serviceType"
              name="serviceType"
              value={formValues.serviceType}
              onChange={handleChange}
            >
              <option value="">Please select an option</option>
              <option value="fitness">Physical fitness</option>
              <option value="therapy">Therapy</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="sessionType">Please select a session type</label>
            <select
              className="form-control"
              id="sessionType"
              name="sessionType"
              value={formValues.sessionType}
              onChange={handleChange}
            >
              <option value="">Please select an option</option>
              <option value="physical">Physical session</option>
              <option value="virtual">Virtual session</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="sessionFrequency">
              How often do you want the session?
            </label>
            <select
              className="form-control"
              id="sessionFrequency"
              name="sessionFrequency"
              value={formValues.sessionFrequency}
              onChange={handleChange}
            >
              <option value="">Please select an option</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="biweekly">Bi-weekly</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="sessionDate">
              When do you want to start the session?
            </label>
            <InputField
              type="date"
              className="form-control"
              id="sessionDate"
              name="sessionDate"
              value={formValues.sessionDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="additionalInfo">Additional Information</label>
            <TextArea
              className="form-control"
              id="additionalInfo"
              name="additionalInfo"
              rows={3}
              value={formValues.additionalInfo}
              onChange={handleChange}
            />
          </div>
          <Button
            type="submit"
            className="btn btn-primary my-button"
            btnText="Submit"
          />
        </form>
      </div>
    </div>
  );
};
export default AppointmentBooking;
