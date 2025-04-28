import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/protectroute/ProtectedRoute";
import Loader from "./components/ui/lazyloading/Loader";  // Lazy Loading Spinner

import { ScrollToTop } from "./components/common/ScrollToTop";

// Lazy-loaded components
const SignIn = React.lazy(() => import("./pages/AuthPages/SignIn"));
const SignUp = React.lazy(() => import("./pages/AuthPages/SignUp"));
const NotFound = React.lazy(() => import("./pages/OtherPage/NotFound"));
const UserProfiles = React.lazy(() => import("./pages/UserProfiles"));
const AppLayout = React.lazy(() => import("./layout/AppLayout"));
// const Home = React.lazy(() => import("./pages/Dashboard/Home"));
const NotAuthorized = React.lazy(() => import("./pages/OtherPage/NotAuthorized"));

// Admin Dashboard Sidebar Menuitem
const Dashboards = React.lazy(()=> import("./components/admin/Dashboard") );
const AppUserFeedback = React.lazy(() => import("./components/admin/AppUserFeedback"));
const CategoryManagement = React.lazy(() => import("./components/admin/CategoryManagement"));
const MenuManagement = React.lazy(() => import("./components/admin/MenuManagement"));
const OrderManagement = React.lazy(() => import("./components/admin/OrderManagement"));

// Super Admin Dashboard Sidebar Menuitem
const Dashboard = React.lazy(() => import("./components/superadmin/Dashboard"));
const AppUserManagement = React.lazy(() => import("./components/superadmin/AppUserManagement"));
const QRcodeManagement = React.lazy(() => import("./components/superadmin/QRcodeManagement"));
const HotelAdminUsers = React.lazy(() => import("./components/superadmin/HotelAdminUsers"));
const Hotels = React.lazy(() => import("./components/superadmin/Hotels"));
const Reports = React.lazy(() => import("./components/superadmin/Reports"));
const FeedbackManagement = React.lazy(() => import("./components/superadmin/FeedbackManagement"));

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Suspense fallback={<Loader />}>
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
              <Route path="dashboard" element={<Dashboards/>} />
              <Route path="categorymanagement" element={<CategoryManagement />} />
              <Route path="menumanagement" element={<MenuManagement />} />
              <Route path="appfeedbackmanagement" element={<AppUserFeedback />} />
              <Route path="ordermanagement" element={<OrderManagement />} />
              <Route path="profile" element={<UserProfiles />} />
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
            </Route>

            {/* Public Routes */}
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/not-authorized" element={<NotAuthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
};

export default App;
