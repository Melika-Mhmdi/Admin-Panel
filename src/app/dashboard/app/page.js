import ProtectedRoute from "../../components/ProtectionRoute/ProtectionRoute";
import DashboardApp from "../../components/DashboardApp";
import DashboardLayout from "../../layouts/dashboard";
export default function Page1() {
  return (
    <ProtectedRoute>
        <DashboardLayout>
        <DashboardApp/>
        </DashboardLayout>
    </ProtectedRoute>
  );
}


