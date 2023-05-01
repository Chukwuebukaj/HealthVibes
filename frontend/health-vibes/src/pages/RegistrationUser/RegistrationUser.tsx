import Header from "../../component/header/header.component";
import RegistrationUser from "../../component/RegistrationUser/Registration.component";
import Footer from "../../component/footer/footer.component";
import './Registration.css'
const RegistrationUserPage = () => {
  return (
    <div className="user-registration">
      <Header />
      <RegistrationUser />
      <Footer />
    </div>
  );
};
export default RegistrationUserPage;
