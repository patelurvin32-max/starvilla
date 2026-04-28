import React, { useState, useEffect, useMemo } from "react";
import "./AdminTable.css";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [entries, setEntries] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('https://hotel-liart-three.vercel.app/api/contacts');
      const data = await response.json();
      if (data.success) {
        setContacts(data.data);
      } else {
        setError('Failed to fetch contacts');
      }
    } catch (err) {
      setError('Error fetching contacts');
    } finally {
      setLoading(false);
    }
  };

  const filteredContacts = useMemo(() => {
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(search.toLowerCase()) ||
        contact.email.toLowerCase().includes(search.toLowerCase()) ||
        contact.subject.toLowerCase().includes(search.toLowerCase())
    );
  }, [contacts, search]);

  const paginatedContacts = useMemo(() => {
    const start = (currentPage - 1) * entries;
    return filteredContacts.slice(start, start + entries);
  }, [filteredContacts, currentPage, entries]);

  const totalPages = Math.ceil(filteredContacts.length / entries);

  if (loading) {
    return <div className="admin-page">Loading...</div>;
  }

  if (error) {
    return <div className="admin-page">Error: {error}</div>;
  }

  return (
    <div className="admin-page">
      <div className="page-headeruser">
        <div className="header-row">
          <h1 className="page-title">
            Contact Submissions
          </h1>
          <nav className="breadcrumb">
            <span>Home</span>
            <span className="separator">/</span>
            <span>Admin</span>
            <span className="separator">/</span>
            <span className="active">Contacts</span>
          </nav>
        </div>
      </div>

      <div className="users-card">
        <div className="card-header">
          <h3>Contact Form Submissions</h3>
        </div>

        <div className="table-controls">
          <div className="search-control">
            Search:
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
              placeholder="Search by name, email, or subject"
            />
          </div>
        </div>

        <table className="users-table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {paginatedContacts.length > 0 ? (
              paginatedContacts.map((contact, index) => (
                <tr key={contact._id}>
                  <td>{(currentPage - 1) * entries + index + 1}</td>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.subject}</td>
                  <td style={{ maxWidth: '300px', wordWrap: 'break-word' }}>
                    {contact.message}
                  </td>
                  <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                  No contact submissions found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="table-footer">
          <div className="entries-info">
            Showing {filteredContacts.length > 0 ? (currentPage - 1) * entries + 1 : 0} to{" "}
            {Math.min(currentPage * entries, filteredContacts.length)} of {filteredContacts.length} entries
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

export default Contacts;
