import React, { useState } from 'react';
import { Form, redirect, useActionData } from "react-router-dom"
import '../CSS/Profile.css';

export default function Profile() {
    // State for managing subjects taught
    const [subjectsTaught, setSubjectsTaught] = useState([]);
    const [subjectInput, setSubjectInput] = useState('');

    // Function to add a subject taught
    const addSubjectTaught = () => {
        if (subjectInput.trim() !== '') {
            setSubjectsTaught([...subjectsTaught, subjectInput.trim()]);
            setSubjectInput('');
        }
    };

    // Function to remove a subject taught
    const removeSubjectTaught = (index) => {
        const updatedSubjectsTaught = [...subjectsTaught];
        updatedSubjectsTaught.splice(index, 1);
        setSubjectsTaught(updatedSubjectsTaught);
    };

    return (
        <div className="profile-container">
            <h1 className="profile-heading">Create Profile</h1>
            <Form method="post" action="/profile">
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" />
                </div>
                <div className="form-group">
                    <label>College:</label>
                    <input type="text" name="college" />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" />
                </div>
                <div className="form-group">
                    <label>Major:</label>
                    <input type="text" name="major" />
                </div>
                <div className="form-group">
                    <label>Subjects Taught:</label>
                    <div>
                        {subjectsTaught.map((subject, index) => (
                            <div key={index}>
                                {subject} <button type="button" onClick={() => removeSubjectTaught(index)}>Remove</button>
                            </div>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={subjectInput}
                        onChange={(e) => setSubjectInput(e.target.value)}
                        placeholder="Enter subject"
                    />
                    <button type="button" onClick={addSubjectTaught}>Add Subject</button>
                </div>
                <div className="form-group">
                    <label>Pay Rate ($/hour):</label>
                    <input type="number" name="payRate" />
                </div>
                <button type="submit">Submit</button>
            </Form>
        </div>
    );
}

export const profileInAction = async ({ request }) => {
    console.log("comes here")
    const data = await request.formData();

    // Collecting form data
    const name = data.get('name');
    const college = data.get('college');
    const email = data.get('email');
    const major = data.get('major');
    const payRate = parseFloat(data.get('payRate')); // Parsing pay rate as a number

    // Subjects taught are already being collected in the state, so no need to handle here

    const submission = {
        name,
        college,
        email,
        major,
        payRate,
        subjectsTaught: Array.from(data.getAll('subjectsTaught[]')) // Collecting multiple subjects as an array
    };
    console.log("comes here")
    console.log(submission);
    try {
        // Here you can further process the form data, such as sending it to a server, etc.
        // Return success message or any other necessary response
        return { message: 'Profile submitted successfully!' };
    } catch (error) {
        console.error('Error submitting profile:', error.message);
        return { error: error.message };
    }
};
