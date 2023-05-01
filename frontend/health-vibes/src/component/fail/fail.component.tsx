import { BsHeartbreakFill } from "react-icons/bs";
import Header from "../header/header.component";
import Footer from "../footer/footer.component";
import './fail.css'

const Fail = () => {
  return (
    <div className="failed">
      <Header />
      <BsHeartbreakFill className="heart" />
      <p>Transaction failed!!! Please check card details and try again 🙁</p>
      <Footer />
    </div>
  );
};

export default Fail;
