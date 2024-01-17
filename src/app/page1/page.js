import ProtectedRoute from "../components/ProtectionRoute/ProtectionRoute";
export default function Page1() {
  return (
    <ProtectedRoute>
      <h1>Page1</h1>
    </ProtectedRoute>
  );
}
