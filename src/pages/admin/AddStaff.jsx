import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Staff.css";

const AddStaff = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", role: "", status: "active" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Staff Added:", formData);
    navigate("/staff");
  };

  return (
    <div className="page-container">
      <div className="form-card">
        <h3 style={{ marginBottom: '24px', fontSize: '1.5rem' }}>Add New Staff</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" placeholder="e.g. Rahul Sharma" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" placeholder="rahul@hotel.com" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select name="role" onChange={handleChange} required>
              <option value="">Select a role</option>
              <option value="Manager">Manager</option>
              <option value="Receptionist">Receptionist</option>
              <option value="Housekeeping">Housekeeping</option>
              <option value="Security">Security</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/staff")}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Member</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStaff;