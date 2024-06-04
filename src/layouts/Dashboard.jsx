import DashboardSidebar from "@/pages/shared/dashboardSidebar/DashboardSidebar";
import { Outlet } from "react-router-dom";


const Dashboard = () => {

  return (
    <div className="max-w-screen-2xl mx-auto flex gap-6">
      <DashboardSidebar />
      <main className="flex-1 my-10">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;