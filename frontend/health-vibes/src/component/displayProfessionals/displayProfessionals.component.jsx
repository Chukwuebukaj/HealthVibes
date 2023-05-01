import "./displayProfessionals.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../button/button.component";
import Favour from "../../images/WhatsApp Image 2023-04-17 at 03.45.09.jpeg";
import Prof2 from "../../images/OIP (3).jpeg";
import Prof3 from "../../images/th (2).jpeg";
import Prof4 from "../../images/OIP (5).jpeg";
import Prof5 from "../../images/OIP (2).jpeg";
import Prof6 from "../../images/OIF (1).jpeg";
import Prof7 from "../../images/OIP (4).jpeg";
import Prof8 from "../../images/OIP (1).jpeg";
import Prof9 from "../../images/OIF (3).jpeg";
import Prof10 from "../../images/OIF (2).jpeg";

export const imgArr = [
  Favour,
  Prof2,
  Prof3,
  Prof4,
  Prof5,
  Prof6,
  Prof7,
  Prof8,
  Prof9,
  Prof10,
];

const DisplayProfessional = ({ professional }) => {
  const [profs, setProfs] = useState([]);
  const [allProfs, setAllProfs] = useState([]);

  useEffect(() => {
    try {
      const fetchVerifiedProfs = async () => {
        const response = await axios.get("http://localhost:3000/professional");
        const professionalsFromDb = await response.data.data;
        setAllProfs(professionalsFromDb);
        const verifiedProfs = professionalsFromDb.filter(
          (prof) => prof.status === "Verified"
        );
        setProfs(verifiedProfs);
      };
      fetchVerifiedProfs();
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleBooking = (id) => {
    const emailFromStorage = localStorage.getItem("email");
    if (emailFromStorage && emailFromStorage !== "") {
      const currentProf = allProfs.find(
        (prof) => prof.email === JSON.parse(emailFromStorage)
      );
      if (currentProf) {
        return;
      }
      window.location.href = `/appointment/booking/${id}`;
      localStorage.setItem("prof-id", JSON.stringify(id));
    } else {
      window.location.href = "/registrationuser";
    }
  };

  if (profs.length === 0) {
    return (
      <div className="empty">
        Our Health and Fitness Professionals are currently unavailable.
      </div>
    );
  }

  return (
    <div className="prof">
      <p>
        Choose from our wealth of seasoned mental health and fitness
        professionals
      </p>
      <article className="verified-prof">
        {profs.map(
          (prof, index) =>
            prof.status === "Verified" && (
              <div key={prof.id} className="professional">
                <img
                  src={imgArr[index]}
                  alt={`Prof ${index}`}
                  className="prof-image"
                />
                <h1>{prof.name}</h1>
                <h1>{prof.email}</h1>
                <h1>Available for {prof.availability} in a week</h1>
                <h1>{prof.phoneNumber}</h1>
                <h1>${prof.rate} per hour</h1>
                <Button
                  btnText="Book Appointment"
                  className="booking-btn"
                  onClick={() => handleBooking(prof.id)}
                />
              </div>
            )
        )}
      </article>
    </div>
  );
};
export default DisplayProfessional;
