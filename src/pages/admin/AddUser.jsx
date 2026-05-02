import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AddUser.css";

const API_URL = "https://hotel-liart-three.vercel.app/api";

const AddUser = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    userType: "",
    active: true,
    district: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          username: formData.username,
          password: formData.password,
          type: formData.userType,
          active: formData.active,
          district: formData.district,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("User added successfully!");
        navigate("/admin/users");
      } else {
        alert(data.message || "Failed to add user");
      }
    } catch (err) {
      console.error("Error adding user:", err);
      alert("Error adding user. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-user-page">
     
      <div className="add-user-card">
        <h2 className="form-title">Add New User</h2>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-group">
            <label>
              Name <span className="required">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Name !"
              required
            />
          </div>

          {/* Username & Password Row */}
          <div className="form-row">
            <div className="form-group half">
              <label>
                Username <span className="required">*</span>
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="enter username !"
                required
              />
            </div>

            <div className="form-group half">
              <label>
                Password <span className="required">*</span>
              </label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Admin@1819"
                  required
                />
                <i
                  className={`fas ${showPassword ? "fa-eye" : "fa-eye-slash"} toggle-password`}
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          </div>

          {/* User Type & Active/Deactive Row */}
          <div className="form-row">
            <div className="form-group half">
              <label>
                User Type <span className="required">*</span>
              </label>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                required
              >
                <option value="">Select User Type !</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Staff">Staff</option>
                <option value="Receptionist">Receptionist</option>
              </select>
            </div>

            <div className="form-group half">
              <label>
                Active / Deactive <span className="required">*</span>
              </label>
              <select
                name="active"
                value={formData.active}
                onChange={(e) => handleChange({ target: { name: "active", value: e.target.value === "true" } })}
              >
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="form-actions">
            <button type="submit" className="btn-submit" disabled={isSubmitting}>
              <i className="fas fa-check me-2" /> {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            <Link to="/admin/users" className="btn-cancel">
              <i className="fas fa-times me-2" /> Cancel
            </Link>
          </div>

          {/* Password Policy */}
          <div className="password-policy">
            <h4>Password Policy</h4>
            <ol>
              <li>No consecutive numbers: This means no two or more digits in sequence can appear next to each other, like 1,2,3.</li>
              <li>Password must be between 8 to 16 characters long.</li>
              <li>Contain at least one digit and two alphabetic character.</li>
              <li>At least one upper case and one lower case character.</li>
              <li>Contain at least one special character of !@#$%^&*_+=-</li>
            </ol>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;