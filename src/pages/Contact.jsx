import React, { useState } from "react";
import { Link } from "react-router-dom";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('');

        try {
            const response = await fetch('https://hotel-liart-three.vercel.app/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="contact-page">
            {/* HERO HEADER */}
            <header className="contact-hero d-flex align-items-center justify-content-center text-center">
                <div className="container">
                    <h1 className="display-4 fw-bold text-white mb-3">GET IN TOUCH</h1>
                    <div className="gold-divider mx-auto mb-3"></div>
                    <p className="lead text-white-50">Experience the gold standard of hospitality in Daman</p>
                </div>
            </header>

            {/* CONTACT CONTENT SECTION */}
            <section className="py-5 bg-white">
                <div className="container">
                    <div className="row g-5 align-items-center">
                        {/* LEFT – INFO */}
                        <div className="col-lg-5 pe-lg-5">
                            <span className="text-gold fw-bold letter-spacing-2 mb-2 d-block small">
                                CONTACT DETAILS
                            </span>
                            <h2 className="mb-4 font-serif display-6">We'd Love to Hear From You</h2>
                            <p className="text-muted mb-5">
                                Whether you have a question about our suites, dining options, or special event venues,
                                our dedicated team is here to assist you 24/7.
                            </p>

                            <div className="info-item d-flex mb-4">
                                <div className="icon-box me-3">
                                    <i className="fas fa-map-marker-alt"></i>
                                </div>
                                <div>
                                    <h6 className="fw-bold mb-1">Our Location</h6>
                                    <p className="text-muted small mb-0">Beach Road, Devka, Daman, 396210, India</p>
                                </div>
                            </div>

                            <div className="info-item d-flex mb-4">
                                <div className="icon-box me-3">
                                    <i className="fas fa-phone-alt"></i>
                                </div>
                                <div>
                                    <h6 className="fw-bold mb-1">Reservations</h6>
                                    <p className="text-muted small mb-0">
                                        <a href="tel:+919999988888">+91 99999 88888</a>
                                    </p>
                                </div>
                            </div>

                            <div className="info-item d-flex mb-5">
                                <div className="icon-box me-3">
                                    <i className="fas fa-envelope"></i>
                                </div>
                                <div>
                                    <h6 className="fw-bold mb-1">Email Inquiry</h6>
                                    <p className="text-muted small mb-0">
                                        <a href="mailto:stay@starvilla.com">stay@starvilla.com</a>
                                    </p>
                                </div>
                            </div>

                            <Link to="/booking" className="btn btn-gold btn-lg rounded-0 px-5 shadow-sm">
                                RESERVE NOW
                            </Link>
                        </div>

                        {/* RIGHT – PREMIUM FORM */}
                        <div className="col-lg-7">
                            <div className="card contact-card border-0 shadow-lg p-2">
                                <div className="card-body p-4 p-md-5">
                                    <h4 className="fw-bold mb-4">Message Our Concierge</h4>
                                    <form className="hotel-form" onSubmit={handleSubmit}>
                                        <div className="row g-4">
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="name"
                                                        placeholder="Full Name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <label htmlFor="name">Full Name</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        id="email"
                                                        placeholder="Email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <label htmlFor="email">Email Address</label>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="subject"
                                                        placeholder="Subject"
                                                        value={formData.subject}
                                                        onChange={handleChange}
                                                        required
                                                    />
                                                    <label htmlFor="subject">Subject</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <textarea
                                                        className="form-control"
                                                        id="message"
                                                        placeholder="Message"
                                                        style={{ height: "150px" }}
                                                        value={formData.message}
                                                        onChange={handleChange}
                                                        required
                                                    ></textarea>
                                                    <label htmlFor="message">How can we help you?</label>
                                                </div>
                                            </div>
                                            {submitStatus === 'success' && (
                                                <div className="col-12">
                                                    <div className="alert alert-success">
                                                        Thank you! Your message has been sent successfully.
                                                    </div>
                                                </div>
                                            )}
                                            {submitStatus === 'error' && (
                                                <div className="col-12">
                                                    <div className="alert alert-danger">
                                                        Sorry, there was an error sending your message. Please try again.
                                                    </div>
                                                </div>
                                            )}
                                            <div className="col-12">
                                                <button
                                                    type="submit"
                                                    className="btn btn-dark btn-lg rounded-0 w-100 py-3 letter-spacing-2"
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MAP SECTION */}
            <section className="map-section">
                <div className="map-wrapper">
                    <iframe
                        title="Patel Villa Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14948.336444855856!2d72.8252271871582!3d20.440742100000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0da01700662d5%3A0x673193e887f1c1f4!2sDevka%20Beach!5e0!3m2!1sen!2sin!4v1700000000000"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </section>
        </div>
    );
};

export default Contact;
