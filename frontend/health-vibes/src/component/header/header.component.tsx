import { useEffect, useState } from "react";
import "./header.css";
import logo from "../../images/logo3.jpeg";
import Link from "../link/link.component";
import Button from "../button/button.component";
import Image from "../image-component/image.component";
import axios from "axios";
import { admins } from "../adminDashboard/adminDashboard.component";

const Header = () => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [linkText, setLinkText] = useState<string>("LOGIN");
  const [showSignupBtn, setShowSignupBtn] = useState<boolean>(true);
  const [showDashBoardBtn, setShowDashboardBtn] = useState<boolean>(true);
  const [href, setHref] = useState<string>("#");

  useEffect(() => {
    const emailfromStorage = localStorage.getItem("email");
    if (emailfromStorage && emailfromStorage !== "") {
      setLinkText("LOGOUT");
      setShowDashboardBtn(true);
    } else {
      setLinkText("LOGIN");
      setShowDashboardBtn(false);
    }
    if (linkText === "LOGOUT") {
      setShowSignupBtn(false);
    }
    const checkEmail = async () => {
      const usersResponse = await axios.get(
        "http://localhost:3000/admin/all-users"
      );
      const professionalsResponse = await axios.get(
        "http://localhost:3000/professional"
      );
      const allAdmins = admins;
      const allUsers = usersResponse.data.data;
      const allProfessionals = professionalsResponse.data.data;
      if (emailfromStorage) {
        const currentUserEmail = JSON.parse(emailfromStorage);
        const currentUser = allUsers.find(
          (user: any) => user.email === currentUserEmail
        );
        const currentAdmin = allAdmins.find(
          (admin: any) => admin.email === currentUserEmail
        );
        const currentProfessional = allProfessionals.find(
          (prof: any) => prof.email === currentUserEmail
        );
        if (currentUser) {
          setHref("/userdashboard");
        } else if (currentAdmin) {
          setHref("/admindashboard");
        } else if (currentProfessional) {
          setHref("/professionaldashboard");
        }
      }
    };
    checkEmail();
  }, [linkText]);

  const logOut = () => {
    if (linkText === "LOGOUT") {
      localStorage.setItem("email", "");
      window.location.href = "/login";
    }
  };

  function toggleOptions() {
    setShowOptions(!showOptions);
  }
  return (
    <header>
      <Image src={logo} alt="" className="logo" />
      <nav className="nav-bar">
        <Link href="/" linkText="HOME" className="header-link" />
        <Link
          href="/login"
          linkText={linkText}
          className="header-link"
          onClick={logOut}
        />
        {showSignupBtn && (
          <Button
            className="signupBtn"
            onMouseEnter={toggleOptions}
            btnText="SIGN UP"
          />
        )}

        {showDashBoardBtn && (
          <Link href={href} linkText="DASHBOARD" className="header-link" />
        )}
        {showOptions && (
          <div id="signup-options">
            <Link
              href="/registrationuser"
              linkText="Client Sign-up"
              className="signup-link"
            />
            <hr />
            <Link
              href="/registrationprofessional"
              linkText="Professional Sign-up"
              className="signup-link"
            />
          </div>
        )}
        <Link
          href="/#contact-us"
          linkText="CONTACT US"
          className="header-link"
        />
      </nav>
    </header>
  );
};

export default Header;
