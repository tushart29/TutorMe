import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Contact.css'; // Import CSS file for styling

function Contact() {
    return (
        <div className="contact-page">
            <div className="contact-container">
                <h1>Contact Us</h1>
                <form className="contact-form">
                    <div className="form-input">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                        />
                    </div>
                    <div className="form-input">
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Your Phone Number"
                        />
                    </div>
                    <div className="form-input">
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            rows="5"
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-button">Submit</button>
                </form>
                <div className="link-text">
                    <Link to="/">Back to Home</Link>
                </div>
            </div>
        </div>
    );
}

export default Contact;
