import "./about-us.css";
import workout from "../../images/blackcoupleexercising.jpeg";
import therapy from "../../images/Caerlyle-Counsel-768x512.jpeg";
import group from "../../images/gettyimages-1308950633-612x612.jpeg";
import remote from "../../images/gettyimages-1346651717-612x612.jpeg";
import remoteWorkout from "../../images/remote_gym.jpeg";
import { useState, useEffect } from "react";
import axios from "axios";

const AboutUs = () => {
  const [name, setName] = useState("Friend");
  const [href, setHref] = useState("/registrationuser");

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/all-users");
      const allUsers = response.data.data;
      const profsResponse = await axios.get(
        "http://localhost:3000/professional"
      );
      const professionalsFromDb = await profsResponse.data.data;
      const emailFromStorage = localStorage.getItem("email");
      if (emailFromStorage && emailFromStorage !== "") {
        const currentUserEmail = JSON.parse(emailFromStorage);
        const currentUser = allUsers.find(
          (user: any) => user.email === currentUserEmail
        );
        const currentProf = professionalsFromDb.find(
          (prof: { email: string | undefined }) =>
            prof.email === currentUserEmail
        );
        if (currentUser) {
          setName(currentUser.username);
          setHref("/userdashboard");
        } else if (currentProf) {
          setName(currentProf.name);
          setHref("#");
        } else {
          setHref("/registrationuser");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="about-us">
      <article className="welcome">
        <h3>Hello {`${name}`}</h3>
        <p>
          Welcome to <strong>HEALTHVIBES</strong> our mental health and fitness
          community, where we believe that taking care of your mind and body is
          essential for a happy and fulfilling life. We are here to support you
          on your journey towards improved well-being and offer a safe space to
          connect with others who share your goals. Let's work together to
          achieve mental clarity, physical strength, and a balanced lifestyle.
          We're glad you're here!
        </p>
      </article>
      <aside>
        <div>
          <img src={therapy} alt="therapy session" className="service" />
          <p className="mental-health">
            Our highly trained mental health professionals are waiting to listen
            to you
          </p>
          <a className="link-up" href={href}>
            Speak to a therapist
          </a>
        </div>
        <div>
          <img src={workout} alt="man working out" className="service" />
          <p className="fitness">
            Our fitness experts are all fired up and excited to train with you
          </p>
          <a className="link-up" href={href}>
            Get in touch with a trainer
          </a>
        </div>
        <div>
          <img src={group} alt="man working out" className="service" />
          <p className="fitness">
            Take advantage of our group therapy sessions to connect and grow
          </p>
          <a className="link-up" href={href}>
            Join Group Therapy
          </a>
        </div>
        <div>
          <img src={remote} alt="man working out" className="service" />
          <p className="fitness">
            Virtual therapy sessions available for your convenience
          </p>
          <a className="link-up" href={href}>
            Book a session
          </a>
        </div>
        <div>
          <img src={remoteWorkout} alt="man working out" className="service" />
          <p className="fitness">
            Virtual workout sessions, with routines tailored to suit your needs.
          </p>
          <a className="link-up" href={href}>
            Enroll now
          </a>
        </div>
      </aside>
    </div>
  );
};
export default AboutUs;
