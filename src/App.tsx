// import { BrowserRouter as Router, Routes, Route } from "react-router";
// import SignIn from "./pages/AuthPages/SignIn";
// import SignUp from "./pages/AuthPages/SignUp";
// import NotFound from "./pages/OtherPage/NotFound";
// import UserProfiles from "./pages/UserProfiles";
// import Videos from "./pages/UiElements/Videos";
// import Images from "./pages/UiElements/Images";
// import Alerts from "./pages/UiElements/Alerts";
// import Badges from "./pages/UiElements/Badges";
// import Avatars from "./pages/UiElements/Avatars";
// import Buttons from "./pages/UiElements/Buttons";
// import LineChart from "./pages/Charts/LineChart";
// import BarChart from "./pages/Charts/BarChart";
// import Calendar from "./pages/Calendar";
// import BasicTables from "./pages/Tables/BasicTables";
// import FormElements from "./pages/Forms/FormElements";
// import Blank from "./pages/Blank";
// import AppLayout from "./layout/AppLayout";
// import { ScrollToTop } from "./components/common/ScrollToTop";
// import Home from "./pages/Dashboard/Home";

// export default function App() {
//   return (
//     <>
//       <Router>
//         <ScrollToTop />
//         <Routes>
//           {/* Dashboard Layout */}
//           <Route element={<AppLayout />}>
//             <Route index path="/" element={<Home />} />

//             {/* Others Page */}
//             <Route path="/profile" element={<UserProfiles />} />
//             <Route path="/calendar" element={<Calendar />} />
//             <Route path="/blank" element={<Blank />} />

//             {/* Forms */}
//             <Route path="/form-elements" element={<FormElements />} />

//             {/* Tables */}
//             <Route path="/basic-tables" element={<BasicTables />} />

//             {/* Ui Elements */}
//             <Route path="/alerts" element={<Alerts />} />
//             <Route path="/avatars" element={<Avatars />} />
//             <Route path="/badge" element={<Badges />} />
//             <Route path="/buttons" element={<Buttons />} />
//             <Route path="/images" element={<Images />} />
//             <Route path="/videos" element={<Videos />} />

//             {/* Charts */}
//             <Route path="/line-chart" element={<LineChart />} />
//             <Route path="/bar-chart" element={<BarChart />} />
//           </Route>






//           {/* Auth Layout */}
//           <Route path="/signin" element={<SignIn />} />
//           <Route path="/signup" element={<SignUp />} />

//           {/* Fallback Route */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </Router>
//     </>
//   );
// }

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/protectroute/ProtectedRoute";

import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
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
          {/* Protected Routes for authenticated users */}
          <Route
            path="/"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />

            {/* Admin Dashboard Sidebar Menuitem Routes */}
            <Route path="categorymanagement" element={<CategoryManagement/>} />
            <Route path="menumanagement" element={<MenuManagement/>} />
            <Route path="appfeedbackmanagement" element={< AppFeedbackManagement/>} />
            <Route path="ordermanagement" element={< OrderManagement/>} />
            <Route path="profile" element={<UserProfiles />} />

              {/* Admin Dashboard Sidebar Menuitem Routes */}
            <Route path="dashboard" element={< Dashboard/>} />
            <Route path="appusermanagement" element={< AppUserManagement/>} />
            <Route path="qrcodemanagement" element={< QRcodeManagement/>} />
            <Route path="hoteladminusers" element={< HotelAdminUsers/>} />
            <Route path="hotels" element={< Hotels/>} />
            <Route path="reports" element={< Reports/>} />
            <Route path="feedbackmanagement" element={< FeedbackManagement/>} />

            <Route path="calendar" element={<Calendar />} />
            <Route path="blank" element={<Blank />} />
            <Route path="form-elements" element={<FormElements />} />
            <Route path="basic-tables" element={<BasicTables />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="avatars" element={<Avatars />} />
            <Route path="badge" element={<Badges />} />
            <Route path="buttons" element={<Buttons />} />
            <Route path="images" element={<Images />} />
            <Route path="videos" element={<Videos />} />
            <Route path="line-chart" element={<LineChart />} />
            <Route path="bar-chart" element={<BarChart />} />
          </Route>

          {/* Public Routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/not-authorized" element={<NotAuthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;