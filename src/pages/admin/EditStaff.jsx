import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Staff.css";

const API_URL = "https://hotel-liart-three.vercel.app/api";

const EditStaff = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    phone: "",
    address: "",
    salary: "",
    status: "active",
  });

  useEffect(() => {
    fetchStaff();
  }, [id]);

  const fetchStaff = async () => {
    try {
      const response = await fetch(`${API_URL}/staff/${id}`);
      const data = await response.json();
      if (data.success) {
        const staff = data.data;
        setFormData({
          name: staff.name || "",
          email: staff.email || "",
          role: staff.role || "",
          department: staff.department || "",
          phone: staff.phone || "",
          address: staff.address || "",
          salary: staff.salary || "",
          status: staff.active ? "active" : "inactive",
        });
      } else {
        alert("Failed to fetch staff");
        navigate("/staff");
      }
    } catch (err) {
      console.error("Error fetching staff:", err);
      alert("Error fetching staff");
      navigate("/staff");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/staff/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          role: formData.role,
          department: formData.department,
          phone: formData.phone,
          address: formData.address,
          salary: formData.salary ? Number(formData.salary) : 0,
          active: formData.status === "active",
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Staff updated successfully!");
        navigate("/staff");
      } else {
        alert(data.message || "Failed to update staff");
      }
    } catch (err) {
      console.error("Error updating staff:", err);
      alert("Error updating staff. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="page-container">Loading...</div>;
  }

  return (
    <div className="page-container">
      <div className="form-card">
        <h3 style={{ marginBottom: "24px", fontSize: "1.5rem" }}>Edit Staff</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" placeholder="e.g. Rahul Sharma" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" placeholder="rahul@hotel.com" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Role</label>
            <select name="role" value={formData.role} onChange={handleChange} required>
              <option value="">Select a role</option>
              <option value="Manager">Manager</option>
              <option value="Receptionist">Receptionist</option>
              <option value="Housekeeping">Housekeeping</option>
              <option value="Security">Security</option>
              <option value="Chef">Chef</option>
              <option value="Waiter">Waiter</option>
            </select>
          </div>

          <div className="form-group">
            <label>Department</label>
            <input type="text" name="department" placeholder="e.g. Front Office" value={formData.department} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input type="tel" name="phone" placeholder="+91 98765 43210" value={formData.phone} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea name="address" rows="2" placeholder="Staff address..." value={formData.address} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Salary</label>
            <input type="number" name="salary" placeholder="25000" value={formData.salary} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/staff")}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Staff"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStaff;
