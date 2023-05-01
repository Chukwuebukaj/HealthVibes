import "./dashboardprofessionalitems.css";
import { Link } from "react-router-dom";
import Button from "../button/button.component";
import { useState, useEffect } from "react";
import axios from "axios";

const DashboardProfessionalItems = ({
  professional,
  setProfessionals,
  onVerifyProfessional,
}) => {
  const { id, name, email, availability, phoneNumber, rate } = professional;
  const [deleted, setDeleted] = useState(false);
  const [verified, setVerified] = useState(false);
  const [btnText, setBtnText] = useState("Verify");
  const [profs, setProfs] = useState([]);
  const [imageSrc, setImageSrc] = useState(null);
  const [status, setStatus] = useState("Pending");

  const deleteProfessional = async () => {
    if (!professional) {
      console.error("professional is not defined");
      return;
    }
    // Delete the selected professional
    try {
      await fetch(
        `http://localhost:3000/admin/professional/${professional.id}`,
        { method: "DELETE" }
      );
      setDeleted(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getProfessional = async () => {
      const response = await axios.get(`http://localhost:3000/professional/`);
      const professionalsFromDb = response.data.data;
      setProfs(professionalsFromDb);
      professionalsFromDb.map((prof) => {
        if (prof.id === id) {
          if (prof.status === "Pending") {
            setBtnText("Verify");
            setVerified(false);
          } else {
            setBtnText("Verified");
            setVerified(true);
          }
        }
        return prof;
      });
    };
    getProfessional();
  }, [id]);

  const handleVerify = async () => {
    if (id) {
      if (btnText === "Verified") {
        setStatus("Pending");
        setBtnText("Verify");
      } else {
        setStatus("Verified");
        setBtnText("Verified");
      }
      try {
        await axios.patch(
          `http://localhost:3000/admin/update-professional/${id}`,
          {
            status: status,
          }
        );
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (deleted) {
    return null;
  }

  return (
    <article className="professional">
      <h1>
        <Link to={`/professional/${id}`}>{name}</Link>
      </h1>
      <section className="professional-details">
        {/* {image ? (
          <div className="professional-detail">
            <h3>Image:</h3>
            <img src={image} alt="Professional Image" />
          </div>
        ) : (
          <p>No image available</p>
        )} */}
        <div className="professional-detail">
          <h3>Email:</h3>
          <p>{email}</p>
        </div>
        <div className="professional-detail">
          <h3>Availability:</h3>
          <p>{availability}</p>
        </div>
        <div className="professional-detail">
          <h3>Phone Number:</h3>
          <p>{phoneNumber}</p>
        </div>
        <div className="professional-detail">
          <h3>Rate:</h3>
          <p>{rate}</p>
        </div>
        <div className="vud-container">
          <Button
            key={id}
            btnText={btnText}
            className={`vud-btn verify ${verified ? "disabled" : ""}`}
            onClick={() => handleVerify(id, status, btnText)}
            disabled={verified}
          />
          <Button
            btnText="Delete"
            className="vud-btn delete"
            onClick={deleteProfessional}
          />
        </div>
      </section>
    </article>
  );
};

export default DashboardProfessionalItems;
