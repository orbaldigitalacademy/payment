import {
 BrowserRouter,
 Routes,
 Route
} from "react-router-dom";

import EnrollmentPage from "./pages/EnrollmentPage";
import EnrollmentForm from "./components/EnrollmentForm";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
 return (
  <BrowserRouter>
   <Routes>

    <Route
      path="/"
      element={<EnrollmentPage />}
    />

    <Route
      path="/payment-success"
      element={<PaymentSuccess />}
    />

    <Route
      path="/payment-failed"
      element={<PaymentFailed />}
    />

    <Route
      path="/"
      element={<EnrollmentForm />}
    />

    <Route
      path="/admin"
      element={<AdminDashboard />}
    />

    <Route
      path="/login"
      element={<Login />}
    />

    <Route
      path="/admin"
      element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      }
    />

   </Routes>
  </BrowserRouter>
 );
}