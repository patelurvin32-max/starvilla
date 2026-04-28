import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import "./SummaryReport.css";

const SummaryReport = () => {
  // Mock data - replace with API fetches later
  const topStats = [
    { label: "Total Bookings", value: "22,998", change: "+12.5%", icon: "fa-calendar-check" },
    { label: "Total Revenue", value: "$7.54K", change: "+8.3%", icon: "fa-dollar-sign" },
    { label: "Occupancy Rate", value: "85.1%", change: "+5.2%", icon: "fa-chart-pie" },
    { label: "Avg Stay", value: "2.7 Days", change: "-1.1%", icon: "fa-clock" },
  ];

  const monthlyData = [
    { month: "Jan", bookings: 1800, revenue: 5200 },
    { month: "Feb", bookings: 2200, revenue: 6800 },
    { month: "Mar", bookings: 1900, revenue: 5900 },
    { month: "Apr", bookings: 2500, revenue: 7500 },
    { month: "May", bookings: 2800, revenue: 8200 },
    { month: "Jun", bookings: 3200, revenue: 9540 },
  ];

  const roomStatus = [
    { label: "Booked", value: 85, color: "#6f42c1" },
    { label: "Pending", value: 10, color: "#ffc107" },
    { label: "Available", value: 5, color: "#28a745" },
  ];

  const roomTypes = [
    { name: "Deluxe", value: 40, color: "#6f42c1" },
    { name: "Standard", value: 30, color: "#9d5cff" },
    { name: "Suite", value: 20, color: "#bb86fc" },
    { name: "Family", value: 10, color: "#e1bee7" },
  ];

  const arrivalsDepartures = [
    { day: "Mon", arrivals: 12, departures: 8 },
    { day: "Tue", arrivals: 15, departures: 10 },
    { day: "Wed", arrivals: 18, departures: 14 },
    { day: "Thu", arrivals: 20, departures: 12 },
    { day: "Fri", arrivals: 25, departures: 18 },
    { day: "Sat", arrivals: 30, departures: 22 },
    { day: "Sun", arrivals: 28, departures: 20 },
  ];

  return (
    <div className="summary-dashboard">
      <h1 className="page-title">Summary Report</h1>

      {/* Top Stats Cards */}
      <div className="stats-grid">
        {topStats.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <div className="stat-icon">
              <i className={`fas ${stat.icon} fa-2x`} />
            </div>
            <div className="stat-info">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
              <span className={`change ${stat.change.startsWith("+") ? "positive" : "negative"}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        {/* Monthly Bookings Bar Chart */}
        <div className="chart-card large">
          <h3>Monthly Bookings & Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" fill="#6f42c1" name="Bookings" />
              <Bar dataKey="revenue" fill="#bb86fc" name="Revenue ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Room Status Progress */}
        <div className="chart-card">
          <h3>Room Status</h3>
          <div className="progress-container">
            {roomStatus.map((item) => (
              <div key={item.label} className="progress-item">
                <div className="progress-label">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="progress-bar">
                  <div style={{ width: `${item.value}%`, backgroundColor: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Room Types Pie Chart */}
        <div className="chart-card">
          <h3>Room Types Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={roomTypes}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {roomTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Arrivals & Departures */}
        <div className="chart-card">
          <h3>Arrivals vs Departures (This Week)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={arrivalsDepartures}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="arrivals" fill="#28a745" name="Arrivals" />
              <Bar dataKey="departures" fill="#dc3545" name="Departures" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SummaryReport;