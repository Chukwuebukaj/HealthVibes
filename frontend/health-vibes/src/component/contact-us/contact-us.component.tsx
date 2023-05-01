import Button from "../button/button.component";
import InputField from "../input-field/input.component";
import TextArea from "../textarea/textarea.component";
import "./contact-us.css";

const ContactUs = () => {
  return (
    <section id="contact-us">
      <form action="https://formspree.io/f/xayzppbe" method="POST">
        <InputField type="hidden" name="_subject" value="New Submission" />
        <h2>WE WOULD LOVE TO HEAR FROM YOU</h2>
        <label htmlFor="">Full Name</label>
        <InputField type="text" name="full-name" id="" />
        <label htmlFor="">Email address</label>
        <InputField type="text" name="email" id="" />
        <label htmlFor="">Phone number</label>
        <InputField type="text" name="phone" id="" />
        <label htmlFor="">Leave us a message</label>
        <TextArea name="message" id="" cols={30} rows={10} />
        <Button type="submit" className="submit-btn" btnText="Submit" />
      </form>
    </section>
  );
};
export default ContactUs;
