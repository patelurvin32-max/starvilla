import React from "react";

const About = () => {
  return (
    <div className="container mt-5 pt-5">
      {/* Header Section */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">About Patel Villa Hotel</h1>
        <p className="text-muted mt-3">
          Comfort, affordability, and warm hospitality — your perfect 3-star stay.
        </p>
      </div>

      {/* Intro Section */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6 mb-4 mb-md-0">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
            alt="Hotel"
            className="img-fluid rounded-4 shadow"
          />
        </div>
        <div className="col-md-6">
          <h3 className="fw-semibold mb-3">Welcome to Patel Villa Hotel</h3>
          <p className="text-muted">
            Patel Villa Hotel is a modern 3-star hotel designed for travelers who
            seek comfort, convenience, and excellent service at an affordable
            price. Whether you're traveling for business or leisure, we ensure
            a relaxing and memorable stay.
          </p>
          <p className="text-muted">
            Located in a prime area, our hotel offers easy access to major
            attractions, business centers, and transportation hubs.
          </p>
        </div>
      </div>

      {/* Card Section */}
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm rounded-4">
            <div className="card-body text-center">
              <div className="fs-1 mb-3">🏨</div>
              <h5 className="card-title fw-bold">Comfortable Rooms</h5>
              <p className="card-text text-muted">
                Well-furnished rooms with modern amenities to ensure a peaceful
                and comfortable stay.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm rounded-4">
            <div className="card-body text-center">
              <div className="fs-1 mb-3">🍽️</div>
              <h5 className="card-title fw-bold">Quality Dining</h5>
              <p className="card-text text-muted">
                Enjoy delicious local and international cuisine prepared by our
                experienced chefs.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 border-0 shadow-sm rounded-4">
            <div className="card-body text-center">
              <div className="fs-1 mb-3">⭐</div>
              <h5 className="card-title fw-bold">Friendly Service</h5>
              <p className="card-text text-muted">
                Our dedicated staff is always ready to assist you with a smile,
                ensuring a pleasant experience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center mt-5">
        <h4 className="fw-semibold">Why Choose Us?</h4>
        <p className="text-muted mt-2">
          At Patel Villa Hotel, we combine quality service, modern facilities,
          and affordable pricing to give you the best value for your stay.
        </p>
      </div>
    </div>
  );
};

export default About;
