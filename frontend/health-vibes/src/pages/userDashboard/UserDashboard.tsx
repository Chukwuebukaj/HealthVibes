import DashboardUser from "../../component/dashboardUser/dashboardUser.component";
import Footer from "../../component/footer/footer.component";
import Header from "../../component/header/header.component";
import "./UserDashboard.css";

const UserDashboardPage = () => {
  return (
    <div>
      <Header />
      <DashboardUser />
      <Footer className="user-footer" />
    </div>
  );
};
export default UserDashboardPage;
