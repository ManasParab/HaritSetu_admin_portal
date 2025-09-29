import { useState } from "react";
import { AdminLayout } from "./components/AdminLayout";
import { Dashboard } from "./components/Dashboard";
import { ProjectManagement } from "./components/ProjectManagement";
import { UserManagement } from "./components/UserManagement";
import { MarketplaceOversight } from "./components/MarketplaceOversight";
import { Reporting } from "./components/Reporting";

export default function App() {
  const [activeView, setActiveView] = useState("dashboard");

  const renderActiveView = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />;
      case "projects":
        return <ProjectManagement />;
      case "users":
        return <UserManagement />;
      case "marketplace":
        return <MarketplaceOversight />;
      case "reporting":
        return <Reporting />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AdminLayout activeView={activeView} onViewChange={setActiveView}>
      {renderActiveView()}
    </AdminLayout>
  );
}