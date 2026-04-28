import React, { useEffect, useState, useRef } from "react";

const testimonials = [
  {
    name: "Kevin Shah",
    text:
      "Perfectly located on Devka Beach with direct access. The new rooms feel serene, spacious, and thoughtfully designed. A truly calming stay.",
    image: "/images/testimonial-bg-1.jpg",
  },
  {
    name: "Rohit Mehta",
    text:
      "Impeccable hospitality and refined service. The sea-view rooms are breathtaking, and every detail feels intentional.",
    image: "/images/testimonial-bg-2.jpg",
  },
  {
    name: "Anita Desai",
    text:
      "An elegant escape by the sea. The ambience, cleanliness, and modern interiors create a peaceful luxury experience.",
    image: "/images/testimonial-bg-3.jpg",
  },
];

const FeedbackSection = () => {
  const [active, setActive] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setTimeout(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 7000);

    return () => clearTimeout(timer.current);
  }, [active]);

  return (
    <section
      className="testimonial-luxury d-flex align-items-center"
      style={{
        backgroundImage: `url(${testimonials[active].image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "520px",
        position: "relative",
        transition: "background-image 1.2s ease-in-out",
      }}
    >
      {/* Dark luxury overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.8), rgba(0,0,0,0.6))",
        }}
      />

      <div className="container position-relative text-center text-white">
        <span
          style={{
            letterSpacing: "3px",
            fontSize: "12px",
            opacity: 0.75,
          }}
        >
          GUEST EXPERIENCES
        </span>

        <h2
          className="mt-2 mb-5"
          style={{
            fontFamily: "Playfair Display, serif",
            fontWeight: 500,
          }}
        >
          What Our Guests Say
        </h2>

        {/* Glass Card */}
        <div
          style={{
            maxWidth: "780px",
            margin: "0 auto",
            padding: "45px 50px",
            background: "rgba(15,15,15,0.55)",
            backdropFilter: "blur(8px)",
            borderRadius: "18px",
            animation: "luxFade 1s ease",
          }}
        >
          <p
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "20px",
              lineHeight: "1.9",
              marginBottom: "28px",
            }}
          >
            “ {testimonials[active].text} ”
          </p>

          <div
            style={{
              height: "1px",
              width: "60px",
              background: "#c9a14a",
              margin: "0 auto 18px",
            }}
          />

          <h5
            style={{
              fontWeight: 500,
              letterSpacing: "1px",
            }}
          >
            {testimonials[active].name}
          </h5>
        </div>

        {/* Minimal Dots */}
        <div className="mt-5">
          {testimonials.map((_, index) => (
            <span
              key={index}
              onClick={() => setActive(index)}
              style={{
                height: "6px",
                width: active === index ? "28px" : "6px",
                margin: "0 8px",
                display: "inline-block",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "all 0.4s ease",
                background:
                  active === index
                    ? "#c9a14a"
                    : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes luxFade {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </section>
  );
};

export default FeedbackSection;
