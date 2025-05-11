import { getDashboardData } from "@/api/api";
import Dashboard from "./_components/mainDashboard";

export default async  function Page() {

  const dashboard = await getDashboardData()
  
  return (
    <div>
      <Dashboard stats={dashboard?.data} />
    </div>
  );
}