import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import "./AdminTable.css";


const Users = () => {
  const [users] = useState([
    {
      id: 1,
      name: "Admin",
      username: "admin",
      type: "Admin",
      district: "",
      active: true,
    },
    // Add more mock users here for testing pagination/search
  ]);

  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.type.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * entries;
    return filteredUsers.slice(start, start + entries);
  }, [filteredUsers, currentPage, entries]);

  const totalPages = Math.ceil(filteredUsers.length / entries);

  return (
    <div className="admin-page">
        <div className="page-headeruser">
  <div className="header-row">
    {/* Left: Title */}
    <h1 className="page-title">
      List of Users
    </h1>

    {/* Right: Breadcrumb */}
    <nav className="breadcrumb">
      <span>Home</span>
      <span className="separator">/</span>
      <span>Admin Master Management</span>
      <span className="separator">/</span>
      <span className="active">Users</span>
    </nav>
  </div>
</div>

      {/* Numbered Breadcrumb */}
    

      <div className="users-card">
  <div className="card-header">
    <Link to="/admin/users/add" className="btn-add-user">Add New User
    </Link>
  </div>

        <div className="table-controls">


          <div className="search-control">
            Search:
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Table */}
        <table className="users-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Username</th>
              <th>Type</th>
              <th>Active / Deactivate</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, index) => (
              <tr key={user.id}>
                <td>{(currentPage - 1) * entries + index + 1}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.type}</td>
                <td>
                  <button className={`btn-status ${user.active ? "active" : "inactive"}`}>
                    {user.active ? "Active" : "Inactive"}
                  </button>
                </td>
                <td>
                  <button className="btn-edit">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="table-footer">
          <div className="entries-info">
            Showing {(currentPage - 1) * entries + 1} to{" "}
            {Math.min(currentPage * entries, filteredUsers.length)} of {filteredUsers.length} entries
          </div>

          <div className="pagination">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                className={currentPage === i + 1 ? "active" : ""}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;