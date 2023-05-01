import Button from "../button/button.component";
import InputField from "../input-field/input.component";
import Link from "../link/link.component";
import axios from "axios";
import { useState } from "react";
import "./login.css";

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | any) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userResponse = await axios.post(
        "http://localhost:3000/login",
        formValues
      );
      if (userResponse.data.message === "User logged in Successfully") {
        window.location.href = "/userdashboard";
        localStorage.setItem("email", JSON.stringify(formValues.email));
      }
      if (userResponse.data.message === "Professional logged in Successfully") {
        window.location.href = "/professionaldashboard";
        localStorage.setItem("email", JSON.stringify(formValues.email));
      }
      if (userResponse.data.message === "Admin logged in Successfully") {
        window.location.href = "/admindashboard";
        localStorage.setItem("email", JSON.stringify(formValues.email));
      }
    } catch (error) {
      console.error(error);
      setError("Invalid email/password");
    }
  };

  return (
    <div id="container">
      Login to access your account.
      <br />
      <form onSubmit={handleLogin} className="login-form">
        <label htmlFor="">Email</label>
        <InputField
          type="email"
          name="email"
          id="email"
          value={formValues.email}
          onChange={handleChange}
        />
        <label htmlFor="">Password</label>
        <InputField
          type="password"
          name="password"
          id="password"
          value={formValues.password}
          onChange={handleChange}
        />
        <div className="check-box">
          <InputField type="checkbox" value="" name="" id="checkbox" />
          <label htmlFor="">Remember me</label>
        </div>
        <Link
          className="forgot"
          href="/registrationuser"
          linkText="forgot password?"
        />
        <Button
          type="submit"
          className="login-btn"
          btnText="LOGIN"
          id="login-btn"
        />
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};
export default Login;
