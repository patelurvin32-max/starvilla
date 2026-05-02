import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const API_URL = "https://hotel-liart-three.vercel.app/api";

const Auth = () => {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isRegister) {
        // 📝 REGISTER - Create new user in backend
        const response = await fetch(`${API_URL}/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            username: form.username,
            password: form.password,
            email: "",
            type: "Receptionist", // Default role
            district: "",
            active: true,
          }),
        });

        const data = await response.json();

        if (data.success) {
          alert("Registration successful. Please login.");
          setIsRegister(false);
          setForm({ name: "", username: "", password: "" });
        } else {
          setError(data.message || "Registration failed");
        }
      } else {
        // 🔐 LOGIN - Check against backend users
        const response = await fetch(`${API_URL}/users`);
        const data = await response.json();

        if (data.success) {
          // Find user by username and password
          const user = data.data.find(
            (u) =>
              u.username === form.username &&
              u.password === form.password &&
              u.active === true
          );

          if (user) {
            localStorage.setItem("token", "auth-token-" + user._id);
            localStorage.setItem(
              "user",
              JSON.stringify({
                id: user._id,
                name: user.name,
                role: user.type,
                username: user.username,
              })
            );
            navigate("/dashboard", { replace: true });
          } else {
            setError("Invalid username or password");
          }
        } else {
          setError("Failed to fetch users from server");
        }
      }
    } catch (err) {
      console.error("Auth error:", err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>{isRegister ? "Create Account" : "Welcome Back 👋"}</h2>
        <p className="subtitle">
          {isRegister ? "Register to continue" : "Login to continue"}
        </p>

        {error && <div className="error-msg">{error}</div>}

        {isRegister && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            onChange={handleChange}
          />
        )}

        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading
            ? "Please wait..."
            : isRegister
            ? "Register"
            : "Login"}
        </button>

        {/* <div className="switch-auth">
          {isRegister ? (
            <>
              Already have an account?
              <span onClick={() => setIsRegister(false)}> Login</span>
            </>
          ) : (
            <>
              Don't have an account?
              <span onClick={() => setIsRegister(true)}> Register</span>
            </>
          )}
        </div> */}
      </form>
    </div>
  );
};

export default Auth;
