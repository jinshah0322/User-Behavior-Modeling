import React, { useState } from "react";
import DashboardContent from "../components/Dashboard/DashboardContent";
import Sidebar from "../components/Dashboard/Sidebar";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <DashboardContent className="md:flex-1" />
    </div>
  );
};

export default Dashboard;