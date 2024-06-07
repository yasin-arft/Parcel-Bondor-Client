import useUser from "@/hooks/useUser";
import Profile from "../profile/Profile";
import Statistics from "../adminDashboard/Statistics";

const DashboardHome = () => {
  const { userData, isUserLoading } = useUser();

  if (isUserLoading) return

  if (userData.role !== 'admin') {
    return <Profile />
  } else {
    return <Statistics />
  }
};

export default DashboardHome;