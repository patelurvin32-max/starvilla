const services = [
  {
    icon: "bi-water",
    title: "Infinity Swimming Pool",
    text: "Temperature-controlled infinity pool overlooking the Arabian Sea.",
  },
  {
    icon: "bi-activity",
    title: "Health Club & Gym",
    text: "Modern fitness center with advanced cardio and strength equipment.",
  },
  {
    icon: "bi-stars",
    title: "Luxury Spa",
    text: "Rejuvenating therapies and massages at our wellness center.",
  },
  {
    icon: "bi-controller",
    title: "Kids & Game Zone",
    text: "Indoor games, pool tables and a dedicated children’s play area.",
  },
  {
    icon: "bi-people-fill",
    title: "Banquet & Conference",
    text: "Pillar-less banquet halls for weddings & corporate events.",
  },
  {
    icon: "bi-cup-hot-fill",
    title: "Fine Dining",
    text: "Authentic local & international cuisine at Spice Galleon.",
  },
];

const Services = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <span className="text-uppercase letter-spacing-2 small text-muted">
            Facilities
          </span>
          <h2 className="display-5 fw-bold font-serif">
            Resort Services
          </h2>
          <div className="divider mx-auto mt-3"></div>
        </div>

        <div className="row g-4">
          {services.map((item, index) => (
            <div className="col-md-6 col-lg-4" key={index}>
              <div className="amenity-card text-center h-100 p-4 shadow-sm bg-white">
                <div className="amenity-icon-circle mb-3">
                  <i className={`bi ${item.icon} fs-2 text-gold-accent`}></i>
                </div>
                <h5 className="fw-bold font-serif">{item.title}</h5>
                <p className="text-muted small mt-3">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
