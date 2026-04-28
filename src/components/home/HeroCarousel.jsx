import { Link } from "react-router-dom";
import heroImg from "../../assets/room5.png";

const HeroCarousel = () => {
  return (
    <section className="hero-luxury">
      <div
        className="hero-slide"
        style={{
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(10,10,10,0.75) 0%,
              rgba(10,10,10,0.45) 45%,
              rgba(10,10,10,0.15) 100%
            ),
            url(${heroImg})
          `
        }}
      >
        <div className="container">
          <div className="hero-content-luxury">
            <span className="hero-eyebrow">WELCOME TO</span>

            <h1 className="hero-title font-serif">
              Patel Villa Resort
            </h1>

            <p className="hero-subtitle">
              An exclusive beachfront retreat where elegance, comfort,
              and timeless luxury come together.
            </p>

            <div className="hero-cta">
              <Link to="/booking" className="btn btn-gold">
                Book Your Stay
              </Link>

              <Link to="/rooms" className="btn btn-outline-luxury">
                Explore Rooms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
