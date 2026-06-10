import "./ContactUs.css";

export default function ContactUs() {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>

      <p className="contact-description">
        We'd love to hear from you. If you have any questions,
        feedback, or suggestions, feel free to reach out.
      </p>

      <div className="contact-info">
        <div className="contact-card">
          <h3>📧 Email</h3>
          <p>support@bakasstore.com</p>
        </div>

        <div className="contact-card">
          <h3>📞 Phone</h3>
          <p>+977 9765868767</p>
        </div>

        <div className="contact-card">
          <h3>📍 Address</h3>
          <p>
            Nawalpur, Nepal
          </p>
        </div>
      </div>

      <form className="contact-form">
        <input
          type="text"
          placeholder="Your Name"
        />

        <input
          type="email"
          placeholder="Your Email"
        />

        <textarea
          rows="6"
          placeholder="Your Message"
        ></textarea>

        <button type="submit">
          Send Message
        </button>
      </form>
    </div>
  );
}