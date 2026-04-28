import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Auth = () => {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (isRegister) {
        // 📝 REGISTER (demo)
        localStorage.setItem(
          "registeredUser",
          JSON.stringify(form)
        );
        alert("Registration successful. Please login.");
        setIsRegister(false);
      } else {
        // 🔐 LOGIN (demo)
        if (
          form.email === "admin@mail.com" &&
          form.password === "admin"
        ) {
          localStorage.setItem("token", "demo-auth-token");
          localStorage.setItem(
            "user",
            JSON.stringify({ email: form.email, role: "admin" })
          );
          navigate("/dashboard", { replace: true });
        } else {
          setError("Invalid email or password");
        }
      }
      setLoading(false);
    }, 800);
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
          type="email"
          name="email"
          placeholder="Email"
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

        <div className="switch-auth">
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
        </div>
      </form>
    </div>
  );
};

export default Auth;
