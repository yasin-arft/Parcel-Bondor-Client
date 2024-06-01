import Footer from "@/pages/shared/footer/Footer";
import Navbar from "@/pages/shared/navbar/Navbar";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto px-3">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Main;