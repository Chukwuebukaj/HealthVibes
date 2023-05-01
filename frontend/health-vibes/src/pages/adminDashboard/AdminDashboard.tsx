import AdminDashboard from "../../component/adminDashboard/adminDashboard.component";
import Footer from "../../component/footer/footer.component";
import Header from "../../component/header/header.component";

const AdminDashboardPage = () => {
  return (
    <div className="admin-page">
      <Header />
      <AdminDashboard />
      <Footer />
    </div>
  );
};
export default AdminDashboardPage;
