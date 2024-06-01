import Footer from "@/pages/shared/footer/Footer";
import Navbar from "@/pages/shared/navbar/Navbar";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <Navbar />
      Main Layout
      <div className="container mx-auto px-3">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Main;