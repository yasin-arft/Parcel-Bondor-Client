import Footer from "@/pages/shared/footer/Footer";
import Navbar from "@/pages/shared/navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

const Main = () => {
  return (
    <div>
      <Navbar />
      <Toaster />
      <main className="container mx-auto px-3">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Main;