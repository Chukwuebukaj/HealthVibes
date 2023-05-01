import { GrFacebookOption } from "react-icons/gr";
import { SiTwitter } from "react-icons/si";
import { ImLinkedin2 } from "react-icons/im";
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoWhatsapp } from "react-icons/io";
import "./footer.css";
import Link from "../link/link.component";

const Footer = (props: any) => {
  return (
    <footer className={props.className}>
      <div className="details">
        <div className="address">
          <p>
            HealthVibes <br /> 7 Asajon Way, Sangotedo, <br /> Lagos Nigeria{" "}
            <br /> Phone: +1 1234 55488 55 <br /> Email: healthvibes@medical.com
          </p>
        </div>
        <div className="links">
          <Link href="" linkText="About Us" />
          <Link href="" linkText="Terms and Conditions" />
          <Link href="" linkText="Privacy Policy" />
        </div>
        <div className="services">
          <h1>OUR SERVICES</h1>
          <Link href="registrationuser" linkText="Therapy Sessions" />
          <Link href="registrationuser" linkText="Counselling" />
          <Link href="registrationuser" linkText="Rehabilitation" />
          <Link href="registrationuser" linkText="Fitness Training" />
        </div>
      </div>
      <div className="bottom">
        <nav className="social-media-links">
          <a
            href="http://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GrFacebookOption className="icon" />
          </a>
          <a
            href="http://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiTwitter className="icon" />
          </a>
          <a
            href="http://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ImLinkedin2 className="icon" />
          </a>
          <a
            href="http://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <RiInstagramFill className="icon" />
          </a>
          <a
            href="https://wa.me/2347064527012"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IoLogoWhatsapp className="icon" />
          </a>
        </nav>
        <p>&copy; 2023 HealthVibes Inc.</p>
      </div>
    </footer>
  );
};
export default Footer;
