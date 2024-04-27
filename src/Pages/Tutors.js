import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import '../CSS/Tutors.css';
import { supabase } from '../Libs/supabaseClient';

export default function Tutors() {

    const [tutors, setTutors] = useState(null);

    useEffect(() => {
        fetchTutors();
    }, []);

    async function fetchTutors() {
        try {
            let { data: tutors, error } = await supabase
                .from('tutors')
                .select('*');
            console.log(tutors);
            if (error) {
                throw error;
            }
            setTutors(tutors);
        } catch (error) {
            console.error('Error fetching tutors:', error.message);
        }
    }


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
                            <th>Classes</th>
                            <th>Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tutors && tutors.map((tutor, index) => (
                            <tr key={index}>
                                <td>{tutor.name}</td>
                                <td>{tutor.major}</td> {/* Assuming you have a 'major' field in your tutors table */}
                                <td>{tutor.email}</td>
                                <td>{tutor.payRate}</td> {/* Assuming you have a 'pay_rate' field in your tutors table */}
                                <td>{JSON.parse(tutor.subjectsTaught).join(', ')}</td>
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
