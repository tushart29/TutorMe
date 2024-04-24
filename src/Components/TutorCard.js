import React from 'react';
import { Link } from "react-router-dom";

const TutorCard = ({ name, classes = [], email, payRate }) => {
    return (
        <div className="tutor-card">
            <div className="tutor-info">
                <h2>{name}</h2>
                <p><strong>Classes:</strong> {classes.join(', ')}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Pay Rate:</strong> ${payRate}/hour</p>
            </div>
            <div className="message-me">
                <Link to="/contact">Message Me</Link>
            </div>
        </div>
    );
}

export default TutorCard;
