import React from 'react';
import { Link } from "react-router-dom";
import '../CSS/Tutors.css';

export default function Tutors() {
    const tutors = [
        {
            name: "John Doe",
            major: "CSS",
            email: "john.doe@example.com",
            payRate: 20
        },
        {
            name: "John Doe",
            major: "CSS",
            email: "john.doe@example.com",
            payRate: 20
        },
        {
            name: "John Doe",
            major: "CSS",
            email: "john.doe@example.com",
            payRate: 20
        }
        // Add more tutor objects as needed
    ];

    return (
        <div>
            <h1 className="tutors-heading">Tutors</h1> {/* Add class to h1 element */}
            <div className="tutor-table">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Major</th>
                            <th>Email</th>
                            <th>Pay Rate ($/hour)</th>
                            <th>Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tutors.map((tutor, index) => (
                            <tr key={index}>
                                <td>{tutor.name}</td>
                                <td>{tutor.major}</td>
                                <td>{tutor.email}</td>
                                <td>${tutor.payRate}</td>
                                <td>
                                    <Link to="/contact">Message</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
