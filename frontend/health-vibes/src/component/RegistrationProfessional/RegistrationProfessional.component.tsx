import { useState } from "react";
import axios from "axios";
import "./RegistrationProfessional.css";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router";

interface UserValues {
  name: string;
  email: string;
  password: string;
  image: File | null;
  CV: File | null;
  availability: string;
  rate: string;
  phoneNumber: string;
  linkedin: string;
}

const RegistrationProfessional = (): JSX.Element => {
  const navigate = useNavigate();
  const [userValues, setUserValues] = useState<UserValues>({
    name: "",
    email: "",
    password: "",
    image: null,
    CV: null,
    availability: "",
    rate: "",
    phoneNumber: "",
    linkedin: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setUserValues((prevValues) => ({ ...prevValues, CV: selectedFile }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", userValues.name);
    formData.append("email", userValues.email);
    formData.append("password", userValues.password);
    if (userValues.image) {
      formData.append("image", userValues.image);
    }
    if (userValues.CV) {
      formData.append("CV", userValues.CV);
    }
    formData.append("availability", userValues.availability);
    formData.append("rate", userValues.rate);
    formData.append("phoneNumber", userValues.phoneNumber);
    formData.append("linkedin", userValues.linkedin);
    try {
      let response = await axios.post(
        `http://localhost:3000/registerprofessional`,
        formData
      );
      if (response.data) {
        window.localStorage.setItem(
          "professionalData",
          JSON.stringify(response.data)
        );
        navigate("/login");
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="registration-container">
      <h1 className="registration-professional-title">
        Professional Registration
      </h1>
      <form onSubmit={handleSubmit} className="registration-professional-form">
        <div className="name-container">
          <TextField
            name="name"
            onChange={handleChange}
            className="textfield"
            label="Name"
            variant="outlined"
            required
            helperText="This field is required"
          />
        </div>
        <div className="name-container">
          <TextField
            name="email"
            type="email"
            onChange={handleChange}
            className="textfield"
            label="Email"
            variant="outlined"
            required
            helperText="This field is required"
          />
        </div>
        <div className="name-container">
          <TextField
            name="password"
            onChange={handleChange}
            className="textfield"
            type="password"
            label="Password"
            variant="outlined"
            required
            helperText="This field is required"
          />
        </div>
        <div className="name-container">
          <label>Profile Picture</label>
          <TextField
            name="image"
            onChange={handleFileChange}
            className="textfield"
            type="file"
            variant="outlined"
            required
            helperText="This field is required"
          />
        </div>
        <div className="name-container">
          <label>CV</label>
          <TextField
            name="CV"
            onChange={handleFileChange}
            className="textfield"
            type="file"
            variant="outlined"
            required
            helperText="This field is required"
          />
        </div>
        <div className="name-container">
          <TextField
            onChange={handleChange}
            name="availability"
            className="textfield"
            label="Availability"
            variant="outlined"
            required
            helperText="This field is required"
          />
        </div>
        <div className="name-container">
          <TextField
            onChange={handleChange}
            name="rate"
            className="textfield"
            label="Rate"
            variant="outlined"
            required
            helperText="This field is required"
          />
        </div>
        <div className="name-container">
          <TextField
            onChange={handleChange}
            name="phoneNumber"
            className="textfield"
            label="Phone Number"
            variant="outlined"
            required
            helperText="This field is required"
          />
        </div>
        <div className="name-container">
          <TextField
            onChange={handleChange}
            name="linkedin"
            className="textfield"
            label="Linkedin"
            variant="outlined"
            required
            helperText="This field is required"
          />
        </div>
        <button>REGISTER</button>
      </form>
    </div>
  );
};
export default RegistrationProfessional;
