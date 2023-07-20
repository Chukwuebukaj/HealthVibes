import Button from "../button/button.component";
import InputField from "../input-field/input.component";
import Link from "../link/link.component";
import axios from "axios";
import { useState } from "react";
import "./login.css";
import { toast, ToastContainer } from "react-toastify";
import { displayError } from "../ToastErrorDisplay";

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    password: "",
  });

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
        setTimeout(() => {
          window.location.href = "/userdashboard";
        }, 2000);
        localStorage.setItem("email", JSON.stringify(formValues.email));
      }
      if (userResponse.data.message === "Professional logged in Successfully") {
        setTimeout(() => {
          window.location.href = "/professionaldashboard";
        }, 2000);
        localStorage.setItem("email", JSON.stringify(formValues.email));
      }
      if (userResponse.data.message === "Admin logged in Successfully") {
        setTimeout(() => {
          window.location.href = "/admindashboard";
        }, 2000);
        localStorage.setItem("email", JSON.stringify(formValues.email));
      }
      toast.success(userResponse.data.message);
    } catch (error) {
      console.error(error);
      displayError(error);
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
      </form>
      <ToastContainer />
    </div>
  );
};
export default Login;
