import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";

function Dashboard() {
  return (
    <>
      <Heading title="Dashboard" size="text-2xl sm:text-3xl" />
      <DashboardLayout />
    </>
  );
}

export default Dashboard;
