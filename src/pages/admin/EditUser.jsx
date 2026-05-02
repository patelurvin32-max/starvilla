import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./AddUser.css";

const API_URL = "https://hotel-liart-three.vercel.app/api";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    userType: "",
    active: true,
    district: "",
  });

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await fetch(`${API_URL}/users/${id}`);
      const data = await response.json();
      if (data.success) {
        const user = data.data;
        setFormData({
          name: user.name || "",
          username: user.username || "",
          password: "",
          userType: user.type || "",
          active: user.active !== undefined ? user.active : true,
          district: user.district || "",
        });
      } else {
        alert("Failed to fetch user");
        navigate("/admin/users");
      }
    } catch (err) {
      console.error("Error fetching user:", err);
      alert("Error fetching user");
      navigate("/admin/users");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updateData = {
      name: formData.name,
      username: formData.username,
      type: formData.userType,
      active: formData.active,
      district: formData.district,
    };

    if (formData.password) {
      updateData.password = formData.password;
    }

    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (data.success) {
        alert("User updated successfully!");
        navigate("/admin/users");
      } else {
        alert(data.message || "Failed to update user");
      }
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Error updating user. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="add-user-page">Loading...</div>;
  }

  return (
    <div className="add-user-page">
      <div className="add-user-card">
        <h2 className="form-title">Edit User</h2>

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
                Password <span className="optional">(Leave blank to keep current)</span>
              </label>
              <div className="password-input">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                />
                <i className="fas fa-eye-slash toggle-password" />
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
              <i className="fas fa-check me-2" /> {isSubmitting ? "Updating..." : "Update"}
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

export default EditUser;
