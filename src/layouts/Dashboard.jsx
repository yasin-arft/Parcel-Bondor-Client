import DashboardSidebar from "@/pages/shared/dashboardSidebar/DashboardSidebar";
import { Outlet } from "react-router-dom";


const Dashboard = () => {

  return (
    <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row gap-4 md:gap-6">
      <aside className="bg-red-light lg:min-h-screen p-4 ">
        <div className="hidden lg:block">
          <DashboardSidebar />
        </div>
        <div className="lg:hidden">
          <DashboardSidebar drawer={true} />
        </div>
      </aside>
      <main className="flex-1 md:my-10 pr-5 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;