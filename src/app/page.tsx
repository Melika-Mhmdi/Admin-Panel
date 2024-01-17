import ProtectedRoute from "./components/ProtectionRoute/ProtectionRoute";
export default function Home() {
  return (
    <ProtectedRoute>
      <div>home</div>;
    </ProtectedRoute>
  );
}
