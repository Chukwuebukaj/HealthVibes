import "./AppointmentBookingPage.css";
import Header from "../../component/header/header.component";
import AppointmentBooking from "../../component/appointment-booking/appointment-booking.component";
import Footer from "../../component/footer/footer.component";

const AppointmentBookingPage = () => {
  return (
    <div>
      <Header />
      <AppointmentBooking />
      <Footer/>
    </div>
  );
};

export default AppointmentBookingPage;
