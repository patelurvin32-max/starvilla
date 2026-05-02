import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Dashboard.css";

const API_URL = "https://hotel-liart-three.vercel.app/api";

const NewBooking = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        guestName: "",
        email: "",
        phone: "",
        paymentMethod: "Card",
        roomType: "Standard",
        roomNumber: "",
        numberOfPersons: 1,
        checkIn: "",
        checkOut: "",
        totalAmount: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch(`${API_URL}/bookings`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    guestName: formData.guestName,
                    email: formData.email,
                    phone: formData.phone,
                    paymentMethod: formData.paymentMethod,
                    roomType: formData.roomType,
                    roomNumber: formData.roomNumber,
                    numberOfPersons: Number(formData.numberOfPersons),
                    checkIn: formData.checkIn,
                    checkOut: formData.checkOut,
                    totalAmount: formData.totalAmount ? Number(formData.totalAmount) : 0,
                }),
            });

            const data = await response.json();

            if (data.success) {
                alert("Booking created successfully!");
                navigate("/dashboard");
            } else {
                alert(data.message || "Failed to create booking");
            }
        } catch (err) {
            console.error("Error creating booking:", err);
            alert("Error creating booking. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
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
                        <label className="dash-label">Guest Full Name *</label>
                        <input
                            type="text"
                            name="guestName"
                            className="dash-input"
                            required
                            placeholder="Enter name"
                            value={formData.guestName}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Email & Phone */}
                    <div className="form-row">
                        <div className="form-group">
                            <label className="dash-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="dash-input"
                                placeholder="guest@email.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="dash-label">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                className="dash-input"
                                placeholder="+91 98765 43210"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Payment Method Dropdown */}
                    <div className="form-group">
                        <label className="dash-label">Payment Method *</label>
                        <select
                            name="paymentMethod"
                            className="dash-input"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                            required
                        >
                            <option value="Card">💳 Card</option>
                            <option value="Cash">💵 Cash</option>
                            <option value="UPI">📱 UPI / Online</option>
                        </select>
                    </div>

                    {/* Room Info */}
                    <div className="form-row">
                        <div className="form-group">
                            <label className="dash-label">Room Type *</label>
                            <select
                                name="roomType"
                                className="dash-input"
                                value={formData.roomType}
                                onChange={handleChange}
                                required
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
                                name="roomNumber"
                                className="dash-input"
                                placeholder="e.g. 102"
                                value={formData.roomNumber}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Number of Persons & Total Amount */}
                    <div className="form-row">
                        <div className="form-group">
                            <label className="dash-label">Number of Persons</label>
                            <input
                                type="number"
                                name="numberOfPersons"
                                className="dash-input"
                                min="1"
                                max="10"
                                placeholder="1"
                                value={formData.numberOfPersons}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="dash-label">Total Amount (₹)</label>
                            <input
                                type="number"
                                name="totalAmount"
                                className="dash-input"
                                placeholder="5000"
                                value={formData.totalAmount}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Date & Time Selection */}
                    <div className="form-row">
                        <div className="form-group">
                            <label className="dash-label">Check-In Date & Time *</label>
                            <input
                                type="datetime-local"
                                name="checkIn"
                                className="dash-input"
                                required
                                value={formData.checkIn}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label className="dash-label">Check-Out Date & Time *</label>
                            <input
                                type="datetime-local"
                                name="checkOut"
                                className="dash-input"
                                required
                                value={formData.checkOut}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="dash-actions" style={{ marginTop: "30px", justifyContent: "flex-end" }}>
                        <button type="submit" className="dash-btn-pri" disabled={isSubmitting}>
                            {isSubmitting ? "Creating..." : "Confirm Booking"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewBooking;
