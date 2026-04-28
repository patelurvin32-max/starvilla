import { Link } from "react-router-dom";
import room1 from "../../assets/room1.jpg";
import room2 from "../../assets/room2.jpg";
import room3 from "../../assets/room3.jpg";

const rooms = [
  {
    title: "Deluxe Room",
    img: room1,
    size: "350 sq ft",
    price: "₹ 7,500",
    desc: "Well-equipped room with modern amenities."
  },
  {
    title: "Super Deluxe",
    img: room2,
    size: "450 sq ft",
    price: "₹ 9,500",
    desc: "Spacious rooms with sea-facing views."
  },
  {
    title: "Royal Suite",
    img: room3,
    size: "Jacuzzi",
    price: "₹ 14,000",
    desc: "Luxury suite with living area and Jacuzzi."
  }
];

const RoomsPreview = () => {
  return (
   <section id="rooms" className="py-5 bg-light mt-5">

      <div className="container">
        <div className="text-center mb-5">
          <div className="section-subtitle text-gold-accent">Stay</div>
          <h2 className="section-title">Our Rooms & Suites</h2>
          <div className="divider"></div>
        </div>

        <div className="row g-4">
          {rooms.map((room, i) => (
            <div className="col-md-4" key={i}>
              <div className="card room-card h-100 shadow-sm">
                <img src={room.img} alt={room.title} />
                <div className="card-body text-center">
                  <h4 className="font-serif">{room.title}</h4>
                  <p className="text-muted small">{room.desc}</p>
                  <div className="fw-bold text-gold-accent">
                    {room.price} / night
                  </div>
                  <Link to="/rooms" className="btn btn-outline-dark-gold mt-3">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <Link to="/rooms" className="btn btn-gold btn-lg px-5">
            View All Accommodation
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RoomsPreview;
