import React, { useState } from "react";
import "../Dashboard.css";

const NewBooking = () => {
    const [formData, setFormData] = useState({
        guestName: "",
        paymentMethod: "Card",
        roomType: "Standard",
        roomNumber: "",
        checkIn: "",
        checkOut: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Saving Booking:", formData);
        // Add API call logic here
    };

    return (
        <div className="dash-container">
            <header className="dash-header">
                <div className="dash-title-group">
                    <h1>New Booking</h1>
                    <p>Register a new guest entry</p>
                </div>
            </header>

            <div className="dash-panel">
                <form onSubmit={handleSubmit} className="booking-form-stack">
                    {/* Guest Name */}
                    <div className="form-group">
                        <label className="dash-label">Guest Full Name</label>
                        <input
                            type="text"
                            className="dash-input"
                            required
                            placeholder="Enter name"
                            onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
                        />
                    </div>

                    {/* Payment Method Dropdown */}
                    <div className="form-group">
                        <label className="dash-label">Payment Method</label>
                        <select
                            className="dash-input"
                            onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                        >
                            <option value="Card">💳 Card</option>
                            <option value="Cash">💵 Cash</option>
                            <option value="UPI">📱 UPI / Online</option>
                        </select>
                    </div>

                    {/* Room Info */}
                    <div className="form-row">
                        <div className="form-group">
                            <label className="dash-label">Room Type</label>
                            <select
                                className="dash-input"
                                onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                            >
                                <option value="Standard">Standard</option>
                                <option value="Deluxe">Deluxe</option>
                                <option value="Suite">Suite</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="dash-label">Room Number</label>
                            <input
                                type="text"
                                className="dash-input"
                                placeholder="e.g. 102"
                                onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Date & Time Selection */}
                    <div className="form-row">
                        <div className="form-group">
                            <label className="dash-label">Check-In Date & Time</label>
                            <input
                                type="datetime-local"
                                className="dash-input"
                                required
                                onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="dash-label">Check-Out Date & Time</label>
                            <input
                                type="datetime-local"
                                className="dash-input"
                                required
                                onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="dash-actions" style={{ marginTop: "30px", justifyContent: "flex-end" }}>
                        <button type="submit" className="dash-btn-pri">
                            Confirm Booking
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewBooking;
