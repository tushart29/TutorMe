import React from 'react';
import '../CSS/AdditionalInfo.css';
import { Link } from "react-router-dom";


const AdditionalInfo = ({ userState }) => {
    return (
        <div className="info-box">

            <div className="info-container">
                <h2>{userState.name}</h2>
                <p><strong>Major:</strong> {userState.major}</p>
                <p><strong>College:</strong> {userState.college}</p>
                <p><strong>Email:</strong> {userState.email}</p>
                <p><strong>Pay Rate ($/hour):</strong> {userState.payRate}</p>
                <p><strong>Classes:</strong> {JSON.parse(userState.subjectsTaught).join(', ')}</p>
            </div>
            < Link to="/tutors" > Back to Tutors </Link>
        </div>
    );
}

export default AdditionalInfo;
