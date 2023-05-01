import "./success.css";
import success from "../../images/success2.jpeg";
import Header from "../header/header.component";
import Footer from "../footer/footer.component";
import Image from "../image-component/image.component";

const Successful = () => {
  return (
    <div className="success">
      <Header />
      <Image src={success} alt="happy person" className='success-img'/>
      <p>Transaction successful!!! Thank you for believeing in us 😀</p>
      <Footer />
    </div>
  );
};

export default Successful;
