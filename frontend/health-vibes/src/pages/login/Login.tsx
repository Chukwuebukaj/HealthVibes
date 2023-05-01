import Login from "../../component/login/login.component";
import Header from "../../component/header/header.component";
import Footer from "../../component/footer/footer.component";
import "./Login.css";

const LoginPage = () => {
  return (
    <div className="login-page">
      <Header />
      <Login />
      <Footer />
    </div>
  );
};
export default LoginPage;
