import { Link } from "react-router-dom";

// ✅ IMPORT IMAGES (Vite way)
import room1 from "../assets/room1.jpg";
import room2 from "../assets/room2.jpg";
import room3 from "../assets/room3.jpg";
import roomVilla from "../assets/room-villa.jpg";
import roomBanner from "../assets/room5.png";

const rooms = [
  {
    title: "Executive Deluxe Room",
    price: "₹ 3,500",
    size: "350 sq ft",
    image: room1,
    description:
      "Comfortable and elegantly designed rooms with garden or partial sea views. Equipped with modern amenities for a relaxing stay.",
    features: [
      "King or Twin Bed",
      "Mini-Bar",
      "High-Speed Wi-Fi",
      "Luxury Bath Amenities",
      "Work Desk",
    ],
  },
  {
    title: "Ocean View Super Deluxe",
    price: "₹ 4,500",
    size: "450 sq ft",
    image: room2,
    description:
      "Spacious rooms with breathtaking Arabian Sea views from a private balcony. Ideal for couples and families.",
    features: [
      "Private Balcony",
      "Sea View",
      "49-inch Smart TV",
      "Sofa Seating Area",
      "Complimentary Breakfast",
    ],
  },
  {
    title: "Royal Suite with Jacuzzi",
    price: "₹ 7,000",
    size: "600 sq ft",
    image: room3,
    description:
      "A luxury suite with separate living area and in-built Jacuzzi. Perfect for honeymooners and premium guests.",
    features: [
      "Separate Living Area",
      "In-built Jacuzzi",
      "Butler Service",
      "Nespresso Machine",
      "Priority Check-in",
    ],
  },
  {
    title: "Presidential Villa",
    price: "₹ 10,000",
    size: "1200 sq ft",
    image: roomVilla,
    description:
      "Our most exclusive villa with private plunge pool, two bedrooms, and personalized hospitality services.",
    features: [
      "Two Bedrooms",
      "Private Plunge Pool",
      "Dedicated Staff",
      "Private Dinner Setup",
      "Beach Access",
    ],
  },
];

const Rooms = () => {
  return (
    <>
      {/* HERO SECTION */}
      <header
        className="d-flex align-items-center text-white text-center"
        style={{
          backgroundImage: `url(${roomBanner})`,
          minHeight: "60vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold">Rooms & Suites</h1>
          <p className="lead mt-3">
            Choose your perfect sanctuary overlooking the Arabian Sea
          </p>
        </div>
      </header>

      {/* ROOMS LIST */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Luxury Accommodation</h2>
            <p className="text-muted">
              Crafted for comfort, designed for elegance
            </p>
          </div>

          <div className="row g-4">
            {rooms.map((room, index) => (
              <div className="col-lg-6" key={index}>
                <div className="card h-100 border-0 shadow-lg overflow-hidden">
                  {/* IMAGE */}
                  <div style={{ overflow: "hidden" }}>
                    <img
                      src={room.image}
                      alt={room.title}
                      className="w-100"
                      style={{
                        height: "260px",
                        objectFit: "cover",
                        transition: "transform 0.4s ease",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.transform = "scale(1.05)")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="fw-bold mb-0">{room.title}</h5>
                      <span className="badge bg-dark fs-6">
                        {room.price} / night
                      </span>
                    </div>

                    <p className="text-muted small">{room.size}</p>
                    <p className="text-muted">{room.description}</p>

                    <ul className="list-unstyled row small text-muted">
                      {room.features.map((feature, i) => (
                        <li className="col-6 mb-1" key={i}>
                          ✔ {feature}
                        </li>
                      ))}
                    </ul>

                    <Link
                      to={`/booking?room=${encodeURIComponent(room.title)}`}
                      className="btn btn-dark w-100 mt-auto"
                    >
                      Book This Room
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* HELP */}
          <div className="text-center mt-5">
            <h5 className="text-muted">Need help choosing a room?</h5>
            <p className="fs-4 fw-bold">📞 +91 11111 11111</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Rooms;
