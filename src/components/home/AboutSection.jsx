import aboutImg from "../../assets/room2.jpg";

const AboutSection = () => {
  return (
    <section className="home-section bg-ivory">
      <div className="container">
        <div className="row align-items-center g-5">

          <div className="col-lg-6 fade-up">
            <h6 className="text-uppercase text-muted mb-2">
              Our Story
            </h6>
            <h2 className="font-serif mb-4">
              A Golden Touch of Luxury
            </h2>
            <p className="text-muted fs-5">
              Nestled along the serene shores of Daman, Patel Villa Resort
              offers an immersive experience of elegance, comfort, and
              world-class hospitality.
            </p>
            <a href="/about" className="btn-gold mt-3">
              Discover More
            </a>
          </div>

          <div className="col-lg-6">
            <img
              src={aboutImg}
              className="img-fluid rounded-4 shadow-lg"
              alt="Resort"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
