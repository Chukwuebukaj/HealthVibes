import React, { useState } from "react";
import "./Registration.css";
import { countries } from "countries-list";
import InputField from "../input-field/input.component";
import Button from "../button/button.component";
import axios from "axios";

const countryOptions = Object.values(countries).map((country) => country.name);

const RegistrationUser = () => {
  const [formValues, setFormValues] = useState({
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/register",
        formValues
      );
      console.log(response);
      window.location.href = "/login";
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
    <>
      <div className="sign-up">
        <div id="color">
          <h1>Create An Account</h1>
        </div>
        <form method="POST" onSubmit={handleSubmit}>
          <p>
            Registering for this site is easy. Just fill in the fields below,
            and we'll get a new account set up for you in no time.
          </p>
          <h3>Account Details</h3>
          <div>
            <label htmlFor="email">Email Address (required)</label>
            <InputField
              type="email"
              id="signup-email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
            <p>Valid email is required for membership.</p>
          </div>
          <div>
            <label htmlFor="Name">Name (required)</label>
            <br />
            <InputField
              type="text"
              id="username"
              name="username"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Choose a Password (required)</label>
            <InputField
              type="password"
              id="signup-password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="confirm_password">
              Confirm Password (required)
            </label>
            <InputField
              type="password"
              id="confirm-password"
              name="confirm_password"
              onChange={handleChange}
            />
          </div>
          <h3>Profile Details</h3>
          <div>
            <label htmlFor="dob">Dob (required)</label>
            <br />
            <InputField
              type="date"
              id="dob"
              name="dob"
              value={formValues.dob}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="gender">Gender (required)</label>
            <select
              id="gender"
              name="gender"
              value={formValues.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label htmlFor="country">Select Country (required)</label>
            <select
              id="country"
              name="country"
              value={formValues.country}
              onChange={handleChange}
            >
              <option value="">-- Select a Country --</option>
              {countryOptions.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="city"> City (required)</label>
            <InputField
              type="text"
              name="city"
              id="city"
              value={formValues.city}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="interest">Personal interest</label>
            <InputField
              type="text"
              id="interest"
              name="interest"
              value={formValues.interest}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="emergencyContact">Emergency Contact</label>
            <InputField
              type="text"
              name="emergencyContact"
              id="emergencyContact"
              value={formValues.emergencyContact}
              onChange={handleChange}
            />
          </div>
          {/* <h3>Terms of Use</h3> */}
          {/* <div className="terms">
          <InputField
            type="checkbox"
            id="termsAccepted"
            name="acceptTerms"
            checked={formValues.acceptTerms}
            onChange={handleChange}
          />
          <label htmlFor="termsAccepted" className="terms-label">
            I accept the terms of use for The HealthVibes Community.
          </label>
        </div> */}
          {/* <a href="#">Please review our terms of use.</a> */}
          <div className="register-btn-div">
            <Button
              type="submit"
              btnText="Register"
              onClick={onsubmit}
              className="register-btn"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default RegistrationUser;
