import React from 'react';
import { Link } from "react-router-dom";
import '../CSS/Tutors.css';

export default function Tutors() {


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
                        {/* {tutors.map((tutor, index) => (
                            <tr key={index}>
                                <td>{tutor.name}</td>
                                <td>{tutor.major}</td>
                                <td>{tutor.email}</td>
                                <td>${tutor.payRate}</td>
                                <td>
                                    <Link to="/contact">Message</Link>
                                </td>
                            </tr>
                        ))} */}
                        <td>Tushar</td>
                        <td>Computer Science</td>
                        <td>tusha@gmail.com</td>
                        <td>20</td>
                        <td>
                            <Link to="/contact">Message</Link>
                        </td>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
