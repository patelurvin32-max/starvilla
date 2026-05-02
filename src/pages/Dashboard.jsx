import React, { useState, useEffect } from "react"; // 1. Import hooks
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const API_URL = "https://hotel-liart-three.vercel.app/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch bookings from API
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${API_URL}/bookings`);
      const data = await response.json();
      if (data.success) {
        // Filter active bookings (not checked-out or cancelled)
        const activeBookings = data.data.filter(
          booking => booking.status !== 'Checked-out' && booking.status !== 'Cancelled'
        );
        setBookings(activeBookings);
      } else {
        setError("Failed to fetch bookings");
      }
    } catch (err) {
      setError("Error fetching bookings");
    } finally {
      setLoading(false);
    }
  };

  // Timer for date
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

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

  // Format booking data for display
  const guestList = bookings.map(booking => {
    const checkOutDate = new Date(booking.checkOut);
    return {
      id: booking._id,
      name: booking.guestName,
      room: booking.roomNumber || 'TBD',
      type: booking.roomType,
      checkout: checkOutDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: checkOutDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: booking.status === 'Active' ? 'In-House' : booking.status,
      payment: booking.paymentMethod,
    };
  });

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
          {loading ? (
            <div style={{ padding: '2rem', textAlign: 'center' }}>Loading bookings...</div>
          ) : error ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#ef4444' }}>{error}</div>
          ) : guestList.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
              No active bookings. <button onClick={() => navigate('/bookings/new')} style={{ color: '#c5a46d', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>Create a new booking</button>
            </div>
          ) : (
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
                        {guest.payment === "Card" ? "💳 " : guest.payment === "UPI" ? "📱 " : "💵 "}
                        {guest.payment}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;