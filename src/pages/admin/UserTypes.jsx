import React, { useState, useMemo, useEffect } from "react";
import "./AdminTable.css";



const API_URL = "http://localhost:5173/api/user-types";

const UserTypes = () => {
  const [userTypes, setUserTypes] = useState([]);
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [currentType, setCurrentType] = useState({ id: null, type: "" });

  /* ===============================
     FETCH USER TYPES FROM DATABASE
  =============================== */
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setUserTypes(data))
      .catch(() => alert("Failed to load user types"));
  }, []);

  /* ===============================
     FILTER & PAGINATION
  =============================== */
  const filteredTypes = useMemo(() => {
    return userTypes.filter((ut) =>
      ut.type.toLowerCase().includes(search.toLowerCase())
    );
  }, [userTypes, search]);

  const paginatedTypes = useMemo(() => {
    const start = (currentPage - 1) * entries;
    return filteredTypes.slice(start, start + entries);
  }, [filteredTypes, currentPage, entries]);

  const totalPages = Math.ceil(filteredTypes.length / entries);

  /* ===============================
     MODAL HANDLERS
  =============================== */
  const openAddModal = () => {
    setModalMode("add");
    setCurrentType({ id: null, type: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (type) => {
    setModalMode("edit");
    setCurrentType(type);
    setIsModalOpen(true);
  };

  /* ===============================
     ADD USER TYPE → DATABASE
  =============================== */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (modalMode === "add") {
      fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: currentType.type }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.status) {
            setUserTypes([
              { id: response.id, type: response.type },
              ...userTypes,
            ]);
            setIsModalOpen(false);
          } else {
            alert(response.message);
          }
        })
        .catch(() => alert("Insert failed"));
    } else {
      // EDIT logic (UI only for now)
      setUserTypes(
        userTypes.map((ut) =>
          ut.id === currentType.id ? currentType : ut
        )
      );
      setIsModalOpen(false);
    }
  };

  return (
    <div className="admin-page">
      {/* PAGE HEADER */}
      <div className="page-headeruser">
        <div className="header-row">
          <h1 className="page-title">List of User Types</h1>

          <nav className="breadcrumb">
            <span className="breadcrumb-item">Home</span>
            <span>/</span>
            <span className="breadcrumb-item">Admin Master Management</span>
            <span>/</span>
            <span className="breadcrumb-item active">User Types</span>
          </nav>
        </div>
      </div>

      {/* CONTENT CARD */}
      <div className="content-card">
        {/* ADD BUTTON */}
        <div className="card-top-actions">
          <button onClick={openAddModal} className="btn-add">
            Add New User Type
          </button>
        </div>

        {/* SEARCH */}
        <div className="table-header">
          <div className="search-control">
            Search:
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="table-responsive">
          <table className="types-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>User Type</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTypes.map((ut, index) => (
                <tr key={ut.id}>
                  <td>{(currentPage - 1) * entries + index + 1}</td>
                  <td><strong>{ut.type}</strong></td>
                  <td className="text-center">
                    <button
                      onClick={() => openEditModal(ut)}
                      className="btn-action btn-edit"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="table-footer">
          <div className="entries-info">
            Showing {(currentPage - 1) * entries + 1} to{" "}
            {Math.min(currentPage * entries, filteredTypes.length)} of{" "}
            {filteredTypes.length} entries
          </div>

          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
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
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{modalMode === "add" ? "Add New User Type" : "Edit User Type"}</h2>
              <button onClick={() => setIsModalOpen(false)} className="close-btn">
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>User Type <span className="required">*</span></label>
                <input
                  type="text"
                  value={currentType.type}
                  onChange={(e) =>
                    setCurrentType({ ...currentType, type: e.target.value })
                  }
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="submit" className="btn-submit">
                  {modalMode === "add" ? "Add" : "Update"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-cancel"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTypes;
