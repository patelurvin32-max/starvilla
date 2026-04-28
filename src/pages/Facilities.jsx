import React from "react";

const Facilities = () => {
  const facilities = [
    {
      icon: "fas fa-swimming-pool",
      title: "Infinity Swimming Pool",
      desc: "Temperature-controlled infinity pool overlooking the Arabian Sea."
    },
    {
      icon: "fas fa-utensils",
      title: "Multi-Cuisine Restaurant",
      desc: "Enjoy authentic local and international cuisine at our fine dining restaurant."
    },
    {
      icon: "fas fa-spa",
      title: "Luxury Spa & Wellness",
      desc: "Rejuvenating therapies and massages at our premium wellness center."
    },
    {
      icon: "fas fa-wifi",
      title: "High-Speed Wi-Fi",
      desc: "Complimentary high-speed internet access throughout the property."
    },
    {
      icon: "fas fa-car",
      title: "Car & Bike Rental",
      desc: "Explore Daman conveniently with our car and bike rental services."
    },
    {
      icon: "fas fa-shuttle-van",
      title: "Drop & Pickup Service",
      desc: "Airport and railway station pickup & drop service on request."
    },
    {
      icon: "fas fa-concierge-bell",
      title: "24×7 Concierge",
      desc: "Round-the-clock concierge assistance for bookings and local guidance."
    },
    {
      icon: "fas fa-gamepad",
      title: "Kids & Game Zone",
      desc: "Indoor games, pool tables and a dedicated play area for children."
    },
    {
      icon: "fas fa-users",
      title: "Banquet & Conference Hall",
      desc: "Elegant banquet halls for weddings, meetings and corporate events."
    },
    {
      icon: "fas fa-mug-hot",
      title: "Café & Lounge",
      desc: "Relax with premium beverages and light snacks in our cozy lounge."
    },
    {
      icon: "fas fa-parking",
      title: "Free Parking",
      desc: "Spacious and secure parking facility available for all guests."
    },
    {
      icon: "fas fa-broom",
      title: "Daily Housekeeping",
      desc: "Professional housekeeping services to ensure a clean and comfortable stay."
    }
  ];

  return (
    <div className="facilities-page">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="page-title">Our Facilities</h1>
          <p className="page-subtitle">
            Designed to elevate your stay with comfort, elegance, and luxury.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="row g-4">
          {facilities.map((item, index) => (
            <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
              <div className="facility-card">
                <div className="facility-icon">
                  <i className={item.icon}></i>
                </div>
                <h5>{item.title}</h5>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .facilities-page {
          padding: 120px 0 60px;
          background: #0b0b0b;
          color: #fff;
          font-family: 'Inter', sans-serif;
        }

        .page-title {
          font-family: 'Playfair Display', serif;
          color: #c5a059;
          letter-spacing: 2px;
        }

        .page-subtitle {
          color: #aaa;
          font-size: 14px;
          max-width: 600px;
          margin: 10px auto 0;
        }

        .facility-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(197, 160, 89, 0.25);
          border-radius: 8px;
          padding: 30px 20px;
          text-align: center;
          height: 100%;
          transition: all 0.3s ease;
        }

        .facility-card:hover {
          transform: translateY(-6px);
          background: rgba(197, 160, 89, 0.08);
        }

        .facility-icon {
          width: 60px;
          height: 60px;
          margin: 0 auto 15px;
          border-radius: 50%;
          border: 1px solid rgba(197, 160, 89, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c5a059;
          font-size: 24px;
        }

        .facility-card h5 {
          font-family: 'Playfair Display', serif;
          margin-bottom: 10px;
          font-size: 16px;
        }

        .facility-card p {
          font-size: 13px;
          color: #ccc;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .facilities-page {
            padding: 100px 15px 40px;
          }
          .page-title {
            font-size: 26px;
          }
        }
      `}</style>
    </div>
  );
};

export default Facilities;
