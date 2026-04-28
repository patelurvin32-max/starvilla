import { Link } from "react-router-dom";

const Cta = () => {
  return (
    <section className="py-5 bg-dark text-white text-center">
      <div className="container">
        <h2 className="font-serif mb-3">
          Ready to Experience Luxury?
        </h2>
        <p className="lead text-white-50 mb-4">
          Book your stay today and enjoy these exclusive amenities.
        </p>
        <Link to="/booking" className="btn btn-gold btn-lg px-5">
          Book Now
        </Link>
      </div>
    </section>
  );
};

export default Cta;
