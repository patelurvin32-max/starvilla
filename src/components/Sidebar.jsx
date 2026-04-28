import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isAdmin = true, collapsed, mobileOpen }) => {
  const [openAdmin, setOpenAdmin] = useState(false);

  return (
    <aside
      className={`main-sidebar 
        ${collapsed ? "collapsed" : ""} 
        ${mobileOpen ? "mobile-open" : ""}`}
    >
      {/* LOGO */}
      <div className="logo">
        <i className="fas fa-hotel" />
        {!collapsed && <span>Hotel Admin</span>}
      </div>

      {/* NAV */}
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="fas fa-tachometer-alt" />
              {!collapsed && <span>Dashboard</span>}
            </NavLink>
          </li>

          {/* <li>
            <NavLink
              to="/summary-report"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="fas fa-file-invoice-dollar" />
              {!collapsed && <span>Summary Report</span>}
            </NavLink>
          </li> */}

          <li>
            <NavLink
              to="/staff"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className="fas fa-users-cog" />
              {!collapsed && <span>Staff Details</span>}
            </NavLink>
          </li>

          {isAdmin && (
            <li className={`treeview ${openAdmin ? "is-open" : ""}`}>
              <div
                className="treeview-header"
                onClick={() => setOpenAdmin(!openAdmin)}
              >
                <i className="fas fa-shield-halved" />
                {!collapsed && <span>User Management</span>}
                {!collapsed && (
                  <i className="arrow fas fa-chevron-right" />
                )}
              </div>

              {!collapsed && (
                <ul className="submenu">
                  <li>
                    <NavLink to="/admin/users">
                      <i className="fas fa-circle submenu-dot" />
                      <span>Users</span>
                    </NavLink>
                  </li>
                  {/* <li>
                    <NavLink to="/admin/user-types">
                      <i className="fas fa-circle submenu-dot" />
                      <span>User Types</span>
                    </NavLink>
                  </li> */}
                </ul>
              )}
            </li>
          )}

          <li className="logout-item">
            <NavLink to="/logout">
              <i className="fas fa-power-off" />
              {!collapsed && <span>Logout</span>}
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
