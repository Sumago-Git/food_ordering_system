import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/protectroute/ProtectedRoute";

import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import NotAuthorized from "./pages/OtherPage/NotAuthorized";

// Admin Dashboard Sidebar Menuitem
import AppFeedbackManagement from "./components/admin/AppUserFeedback";
import CategoryManagement from "./components/admin/CategoryManagement";
import MenuManagement from "./components/admin/MenuManagement";
import OrderManagement from "./components/admin/OrderManagement";

// Super Admin Dashboard Sidebar Menuitem
import Dashboard from "./components/superadmin/Dashboard";
import AppUserManagement from "./components/superadmin/AppUserManagement";
import QRcodeManagement from "./components/superadmin/QRcodeManagement";
import HotelAdminUsers from "./components/superadmin/HotelAdminUsers";
import Hotels from "./components/superadmin/Hotels";
import Reports from "./components/superadmin/Reports";
import FeedbackManagement from "./components/superadmin/FeedbackManagement";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Home />} />
            <Route path="categorymanagement" element={<CategoryManagement />} />
            <Route path="menumanagement" element={<MenuManagement />} />
            <Route path="appfeedbackmanagement" element={<AppFeedbackManagement />} />
            <Route path="ordermanagement" element={<OrderManagement />} />
            <Route path="profile" element={<UserProfiles />} />
            {/* Add more admin routes here */}
          </Route>

          {/* Super Admin Routes */}
          <Route
            path="/superadmin"
            element={
              <ProtectedRoute allowedRoles={["superadmin"]}>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="appusermanagement" element={<AppUserManagement />} />
            <Route path="qrcodemanagement" element={<QRcodeManagement />} />
            <Route path="hoteladminusers" element={<HotelAdminUsers />} />
            <Route path="hotels" element={<Hotels />} />
            <Route path="reports" element={<Reports />} />
            <Route path="feedbackmanagement" element={<FeedbackManagement />} />
            {/* Add more superadmin routes here */}
          </Route>

          {/* Public Routes */}
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/not-authorized" element={<NotAuthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;