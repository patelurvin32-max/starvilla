import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "./DashboardLayout.css";

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  /* Detect screen resize */
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar
        isAdmin={true}
        collapsed={!isMobile && collapsed}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <div
        className={`main-content ${
          collapsed && !isMobile ? "collapsed" : ""
        }`}
      >
        {/* TOP BAR */}
        <div className="topbar">
          <button
            className="menu-btn"
            onClick={() =>
              isMobile
                ? setMobileOpen(!mobileOpen)
                : setCollapsed(!collapsed)
            }
          >
            ☰
          </button>

          <span className="logged-user">Logged User: Admin</span>
        </div>

        {children}
      </div>

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
