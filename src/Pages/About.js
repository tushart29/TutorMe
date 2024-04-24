import React from 'react';
import '../CSS/About.css'; // Import CSS file for styling

const About = () => {
    return (
        <div className="about-container">
            <h1>About Us</h1>
            <p>Welcome to TutorMe, where learning meets opportunity! Our platform is designed to connect students with knowledgeable tutors who are passionate about helping others succeed.</p>
            <p>At TutorMe, we understand that every student has unique learning needs and preferences. That's why we offer a diverse range of tutors specializing in various subjects, teaching styles, and educational backgrounds.</p>
            <p>Our mission is to empower students to excel academically by providing them with access to high-quality tutoring services tailored to their individual requirements. Whether you're struggling with algebra, preparing for a standardized test, or seeking guidance on advanced topics, our tutors are here to support you every step of the way.</p>

            <div className="feature-section">
                <div className="feature">
                    <h2>Personalized Learning</h2>
                    <p>Our tutors provide personalized learning experiences tailored to your specific goals and learning style. Whether you prefer one-on-one sessions or group lessons, we've got you covered.</p>
                </div>
                <div className="feature">
                    <h2>Supportive Community</h2>
                    <p>Join our supportive community of students and tutors who are passionate about learning and teaching. Share knowledge, ask questions, and collaborate with others to achieve academic success.</p>
                </div>
            </div>

            <h2>Frequently Asked Questions</h2>
            <div className="faq-section">
                <div className="faq">
                    <h3>How do I sign up as a student?</h3>
                    <p>Signing up as a student is easy! Simply click on the "Sign Up" button on the top right corner of the page and follow the prompts to create your account. Once you're signed up, you can start browsing tutors and scheduling sessions.</p>
                </div>
                <div className="faq">
                    <h3>What subjects do your tutors cover?</h3>
                    <p>Our tutors cover a wide range of subjects, including math, science, language arts, history, computer science, and more. You can find tutors specializing in specific subjects by using our search filters.</p>
                </div>
                <div className="faq">
                    <h3>How are tutoring sessions conducted?</h3>
                    <p>Tutoring sessions can be conducted online through Zoom. Once you talked to your tutor, you'll receive a link to join the zoom call at the scheduled time from your tutor. During the session, you can interact with your tutor using video, audio, and chat.</p>
                </div>
                {/* Add more FAQ items as needed */}
            </div>

            <p>Whether you're a student seeking academic assistance or a tutor looking to share your expertise, TutorMe is your go-to destination for educational support. Join us today and embark on a journey of growth, discovery, and achievement!</p>
        </div>
    );
}

export default About;
