import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Staff.css";

const Staff = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const staffList = [
    { id: 1, name: "Rahul Sharma", role: "Manager", status: "present" },
    { id: 2, name: "Amit Verma", role: "Receptionist", status: "leave" },
    { id: 3, name: "Suman Patel", role: "Housekeeping", status: "present" },
    { id: 4, name: "Kiran Singh", role: "Security", status: "present" },
  ];

  // Logic: Search Filter
  const filteredStaff = staffList.filter((staff) =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Logic: Role-based counts
  const roleCounts = staffList.reduce((acc, staff) => {
    acc[staff.role] = (acc[staff.role] || 0) + 1;
    return acc;
  }, {});

  const getInitials = (name) => name.split(' ').map(n => n[0]).join('');

  return (
    <div className="page-container">
      <div className="page-header1">
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>Team Directory</h2>
          <p style={{ color: "var(--text-muted)" }}>Overview of hotel staff and their status</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate("/staff/add")}>
          <span style={{marginRight: '8px'}}>+</span> New Member
        </button>
      </div>

      {/* Primary Stats Grid (Attendance) */}
      <div className="stats-grid">
        <div className="stat-card">
          <h4>TOTAL STAFF</h4>
          <p>{staffList.length}</p>
        </div>
        <div className="stat-card" style={{ borderLeft: "4px solid #10b981" }}>
          <h4>ON DUTY</h4>
          <p style={{ color: "#10b981" }}>
            {staffList.filter(s => s.status === "present").length}
          </p>
        </div>
        <div className="stat-card" style={{ borderLeft: "4px solid #ef4444" }}>
          <h4>OFF DUTY</h4>
          <p style={{ color: "#ef4444" }}>
            {staffList.filter(s => s.status === "leave").length}
          </p>
        </div>
      </div>

      {/* New: Role-wise Stats Grid */}
      <div className="section-container">
        <h3 className="section-title">Staff by Designation</h3>
        <div className="role-grid">
          {Object.entries(roleCounts).map(([role, count]) => (
            <div key={role} className="role-stat-card">
              <span className="role-label">{role}</span>
              <span className="role-count">{count}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="table-controls" style={{ marginTop: '2rem' }}>
        <input 
          type="text" 
          placeholder="Search by name, role, or ID..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="staff-table-container">
        <table className="staff-table">
          <thead>
            <tr>
              <th>Employee Details</th>
              <th>Designation</th>
              <th>Attendance</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.length > 0 ? (
              filteredStaff.map((staff) => (
                <tr key={staff.id}>
                  <td>
                    <div className="name-cell">
                      <div className="avatar-circle">{getInitials(staff.name)}</div>
                      <div>
                        <div style={{ fontWeight: "700", color: 'var(--text-dark)' }}>{staff.name}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Staff ID: #STR-{staff.id}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="role-badge">{staff.role}</span></td>
                  <td>
                    <span className={`badge ${staff.status === "present" ? "active" : "inactive"}`}>
                      {staff.status === "present" ? "● Present" : "○ Leave"}
                    </span>
                  </td>
                  <td style={{ textAlign: "right" }}>
                    <div className="action-btn-group">
                       <button className="icon-btn" title="Edit Staff">Edit</button>
                       <button className="icon-btn delete" title="Remove Staff">Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                  No staff members found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Staff;