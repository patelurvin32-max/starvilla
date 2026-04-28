import React, { useState, useEffect } from "react"; // 1. Import hooks
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  // 2. Initialize state with the current local time
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    // 3. Setup a timer to update the state every minute
    // This ensures that when midnight passes, the display updates automatically
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Checks every 60 seconds

    // 4. Cleanup the interval on component unmount to prevent memory leaks
    return () => clearInterval(timer);
  }, []);

  // 5. Format the date (e.g., "Friday, Oct 24")
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  const stats = {
    revenue: "₹1,24,500",
    occupancy: "82%",
    totalRooms: 42,
    available: 28,
    onDuty: 15,
    offDuty: 3,
  };

  const guestList = [
    { id: 1, name: "John Doe", room: "102", type: "Suite", checkout: "Oct 26, 2023", time: "11:00 AM", status: "In-House", payment: "Card" },
    { id: 2, name: "Sarah Jenkins", room: "405", type: "Deluxe", checkout: "Oct 25, 2023", time: "10:30 AM", status: "Checking Out", payment: "Cash" },
    { id: 3, name: "Michael Ross", room: "301", type: "Standard", checkout: "Oct 28, 2023", time: "12:00 PM", status: "In-House", payment: "Card" },
    { id: 4, name: "Suman Rao", room: "204", type: "Premium", checkout: "Oct 24, 2023", time: "02:00 PM", status: "Late Checkout", payment: "Cash" },
  ];

  return (
    <div className="dash-container">
      <header className="dash-header">
        <div className="dash-title-group">
          <h1>Dashboard</h1>
          {/* 6. Use the dynamic formattedDate variable here */}
          <p>{formattedDate}</p>
        </div>
        <div className="dash-actions">
          <button className="dash-btn-sec" onClick={() => navigate("/admin/contacts")}>
            View Contacts
          </button>
          <button className="dash-btn-sec">Print Report</button>
          <button 
            className="dash-btn-pri" 
            onClick={() => navigate("/bookings/new")}
          >
            + New Booking
          </button>
        </div>
      </header>

      {/* ... rest of your code remains the same ... */}
      <div className="dash-hero-grid">
        <div className="dash-hero-card gold-border">
          <div className="dash-hero-content">
            <span className="dash-label">TOTAL REVENUE (24H)</span>
            <span className="dash-hero-value">{stats.revenue}</span>
            <span className="dash-trend up">↑ 12% vs last week</span>
          </div>
          <div className="dash-hero-icon">💰</div>
        </div>
        <div className="dash-hero-card blue-border">
          <div className="dash-hero-content">
            <span className="dash-label">OCCUPANCY RATE</span>
            <span className="dash-hero-value">{stats.occupancy}</span>
            <span className="dash-trend up">↑ 5% today</span>
          </div>
          <div className="dash-hero-icon">🏨</div>
        </div>
      </div>

      <div className="dash-stats-grid">
        <div className="dash-stat-item status-blue">
          <span className="dash-label">Total Rooms</span>
          <span className="dash-val">{stats.totalRooms}</span>
        </div>
          <div className="dash-stat-item status-gold">
          <span className="dash-label">Available Rooms</span>
          <span className="dash-val">{stats.available}</span>
        </div>
        <div className="dash-stat-item status-green">
          <span className="dash-label">Staff On Duty</span>
          <span className="dash-val">{stats.onDuty}</span>
        </div>
        <div className="dash-stat-item status-red">
          <span className="dash-label">Staff Off Duty</span>
          <span className="dash-val">{stats.offDuty}</span>
        </div>
      </div>

      <div className="dash-panel">
        <div className="dash-panel-head">
          <h3>Current Guest List & Expected Check-out</h3>
          <span className="dash-badge-info">{guestList.length} Guests In-House</span>
        </div>
        
        <div className="dash-table-container">
          <table className="dash-guest-table">
            <thead>
              <tr>
                <th>Guest Name</th>
                <th>Room Info</th>
                <th>Check-out Date</th>
                <th>Check-out Time</th>
                <th>Status</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {guestList.map((guest) => (
                <tr key={guest.id}>
                  <td><div className="dash-guest-name">{guest.name}</div></td>
                  <td>
                    <div className="dash-room-info">
                      <strong>Room {guest.room}</strong>
                      <span>{guest.type}</span>
                    </div>
                  </td>
                  <td><div className="dash-date">{guest.checkout}</div></td>
                  <td><div className="dash-time">{guest.time}</div></td>
                  <td>
                    <span className={`dash-status-tag ${guest.status.replace(/\s+/g, '-').toLowerCase()}`}>
                      {guest.status}
                    </span>
                  </td>
                  <td>
                    <div className={`dash-pay-method ${guest.payment.toLowerCase()}`}>
                      {guest.payment === "Card" ? "💳 " : "💵 "}
                      {guest.payment}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;