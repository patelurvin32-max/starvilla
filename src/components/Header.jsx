import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      const progress = (scrollTop / docHeight) * 100;

      setScrolled(scrollTop > 50);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const navItems = [
    { key: "home", label: "Home", path: "/" },
    { key: "about", label: "About", path: "/about" },
    { key: "rooms", label: "Rooms", path: "/rooms" },
    { key: "facilities", label: "Facilities", path: "/facilities" },
    { key: "contact", label: "Contact", path: "/contact" },
    // { key: "login", label: "Login", path: "/login" },
  ];

  return (
    <>
      {/* Premium Scroll Indicator */}
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      <nav className={`navbar navbar-expand-lg fixed-top custom-navbar ${scrolled ? "nav-scrolled" : ""}`}>
        <div className="container">

          <Link to="/" className="navbar-brand luxury-brand" onClick={closeMenu}>
            Patel Villa
          </Link>

          <button
            className={`navbar-toggler custom-toggler ${menuOpen ? "open" : ""}`}
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
            <ul className="navbar-nav ms-auto align-items-lg-center">
              {navItems.map((item) => (
                <li key={item.key} className="nav-item">
                  <NavLink
                    to={item.path}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `nav-link luxury-link ${isActive ? "active-link" : ""}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}

              <li className="nav-item ms-lg-4 mt-4 mt-lg-0">
                <Link to="/booking" className="btn-luxury" onClick={closeMenu}>
                  BOOK NOW
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;