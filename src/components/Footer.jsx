import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "About Us", path: "/about" },
    { label: "Rooms & Suites", path: "/rooms" },
    { label: "Facilities", path: "/facilities" },
    { label: "Book Your Stay", path: "/booking" },
  ];

  return (
    <footer className="luxury-footer">
      <div className="footer-container">
        <div className="footer-grid">
          
          {/* Brand Section */}
          <div className="footer-col brand-col">
            <Link to="/" className="footer-brand">
              Patel Villa
              <span className="brand-subtitle">DAMAN • EST 1998</span>
            </Link>
            <p className="footer-desc">
              A sanctuary of sophistication where coastal charm meets world-class luxury.
            </p>

            <div className="footer-social">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>

          {/* Links */}
          <div className="footer-col">
            <h6 className="footer-title">The Estate</h6>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h6 className="footer-title">Concierge</h6>
            <p><span>Address:</span> Beach Road, Devka, Daman</p>
            <p><span>Reservations:</span> +91 99999 88888</p>
          </div>

          {/* Location */}
          <div className="footer-col">
            <h6 className="footer-title">Location</h6>
            <div className="footer-map">
              <Link to="/contact" className="view-map-btn">
                Get Directions
              </Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {currentYear} Hotel Patel Villa. All Rights Reserved.
            <span> | </span>
            Design by{" "}
            <a
              href="https://www.linkedin.com/in/urvin-patel-4294a62a8/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Urvin Patel
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;