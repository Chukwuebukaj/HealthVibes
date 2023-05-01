import AboutUs from "../../component/about-us/about-us.component";
import ContactUs from "../../component/contact-us/contact-us.component";
import DisplayProfessional from "../../component/displayProfessionals/displayProfessionals.component";
import Footer from "../../component/footer/footer.component";
import Header from "../../component/header/header.component";
import Hero from "../../component/hero/hero.component";

const Landing = (professional) => {
  return (
    <div>
      <Header />
      <Hero />
      <AboutUs />
      <DisplayProfessional professional={professional} />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Landing;
