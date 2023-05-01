import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./professionalDetails.css";

const ProfessionalDetails = () => {
  const { id } = useParams();
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:3000/professional/${id}`
      );
      setDetails(response.data.data);
    };
    fetchData();
  }, [id]);

  const { name, email, availability, phoneNumber, rate } = details;

  return (
    <div className="professional-details">
      <h1>{name}</h1>
      <div className="professional-details-row">
        <label>Email:</label>
        <span>{email}</span>
      </div>
      <div className="professional-details-row">
        <label>Availability:</label>
        <span>{availability}</span>
      </div>
      <div className="professional-details-row">
        <label>Phone Number:</label>
        <span>{phoneNumber}</span>
      </div>
      <div className="professional-details-row">
        <label>Rate:</label>
        <span>{rate}</span>
      </div>
    </div>
  );
};
export default ProfessionalDetails;
