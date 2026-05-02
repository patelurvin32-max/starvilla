import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

/* ===== Public Components ===== */
import Header from "./components/Header";
import Footer from "./components/Footer";

/* ===== Public Pages ===== */
import Home from "./pages/Home";
import About from "./pages/About";
import Rooms from "./pages/Rooms";
import Dining from "./pages/Dining";
import Facilities from "./pages/Facilities";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";

/* ===== Auth / Admin Pages ===== */
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import SummaryReport from "./pages/admin/SummaryReport";
import Users from "./pages/admin/Users";
import AddUser from "./pages/admin/AddUser";
import EditUser from "./pages/admin/EditUser";
import UserTypes from "./pages/admin/UserTypes";
import Staff from "./pages/admin/Staff";
import AddStaff from "./pages/admin/AddStaff";
import NewBooking from "./pages/admin/NewBooking";
import Contacts from "./pages/admin/Contacts";
import Logout from "./pages/Logout";

/* ===== Layout ===== */
import DashboardLayout from "./layouts/DashboardLayout";

import "./App.css";

/* ===== Auth Check ===== */
const isAuthenticated = () => !!localStorage.getItem("token");

/* ===== Private Route Wrapper ===== */
const PrivateRoute = ({ children }) =>
  isAuthenticated() ? children : <Navigate to="/login" replace />;

/* ===== Layout Controller ===== */
const Layout = ({ children }) => {
  const location = useLocation();

  // Hide Header/Footer on admin routes
  const isAdminRoute =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/staff") ||
    location.pathname.startsWith("/bookings");

  return (
    <>
      {!isAdminRoute && <Header />}
      {children}
      {!isAdminRoute && <Footer />}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>

          {/* ===== Public Routes ===== */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/dining" element={<Dining />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking" element={<Booking />} />

          {/* ===== Login ===== */}
          <Route
            path="/login"
            element={
              isAuthenticated()
                ? <Navigate to="/dashboard" replace />
                : <AuthPage />
            }
          />

          {/* ===== Dashboard ===== */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/summary-report"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <SummaryReport />
                </DashboardLayout>
              </PrivateRoute>
            }
          />

          {/* ===== Admin Users ===== */}
          <Route
            path="/admin/users"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Users />
                </DashboardLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/users/add"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <AddUser />
                </DashboardLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/users/edit/:id"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <EditUser />
                </DashboardLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/admin/user-types"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <UserTypes />
                </DashboardLayout>
              </PrivateRoute>
            }
          />

          {/* ===== Staff ===== */}
          <Route
            path="/staff"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Staff />
                </DashboardLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/staff/add"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <AddStaff />
                </DashboardLayout>
              </PrivateRoute>
            }
          />

          {/* ===== Bookings ===== */}
          <Route
            path="/bookings/new"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <NewBooking />
                </DashboardLayout>
              </PrivateRoute>
            }
          />

          {/* ===== Contacts ===== */}
          <Route
            path="/admin/contacts"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Contacts />
                </DashboardLayout>
              </PrivateRoute>
            }
          />

          {/* ===== Logout ===== */}
          <Route path="/logout" element={<Logout />} />

          {/* ===== Fallback ===== */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
