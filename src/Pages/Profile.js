import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import '../CSS/Profile.css';
import { supabase } from '../Libs/supabaseClient';
import CryptoJS from 'crypto-js';


let globalSubjectsTaught = [];

const addSubjectTaughtGlobal = (subject) => {
    if (subject.trim() !== '') {
        globalSubjectsTaught.push(subject.trim());
    }
};

const removeSubjectTaughtGlobal = (subject) => {
    const index = globalSubjectsTaught.indexOf(subject);
    if (index !== -1) {
        globalSubjectsTaught.splice(index, 1);
    }
};

const decrypt = (encryptedData, key) => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, key);
        const originalData = bytes.toString(CryptoJS.enc.Utf8);
        return originalData;
    } catch (error) {
        console.error('Error decrypting data:', error.message);
        return null; // Or handle the error appropriately
    }
};

export default function Profile({ userId }) {
    const navigate = useNavigate();

    let decryptedUserId = ""

    if (userId) {
        // ID is provided
        decryptedUserId = decrypt(decodeURIComponent(userId), '1234567');
        // Use decryptedUserId for further processing
    } else {
        // ID is not provided, handle accordingly
        console.log("id not provided from signup/sign-in")
    }

    const [subjectsTaught, setSubjectsTaught] = useState([]);
    const [subjectInput, setSubjectInput] = useState('');
    const [error, setError] = useState('');

    const addSubjectTaught = () => {
        if (subjectInput.trim() !== '') {
            setSubjectsTaught([...subjectsTaught, subjectInput.trim()]);
            addSubjectTaughtGlobal(subjectInput.trim());
            setSubjectInput('');
        }
    };

    const removeSubjectTaught = (index) => {
        const updatedSubjectsTaught = [...subjectsTaught];
        const removedSubject = updatedSubjectsTaught.splice(index, 1)[0];
        setSubjectsTaught(updatedSubjectsTaught);
        removeSubjectTaughtGlobal(removedSubject);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const name = formData.get('name');
        const college = formData.get('college');
        const email = formData.get('email');
        const major = formData.get('major');
        const payRate = parseFloat(formData.get('payRate'));

        const subjectsTaughtJSON = JSON.stringify(globalSubjectsTaught);

        const submission = {

            name,
            college,
            email,
            major,
            payRate,
            subjectsTaught: subjectsTaughtJSON,
            authID: decryptedUserId
        };

        try {
            const { data, error } = await supabase
                .from('tutors')
                .insert([submission])
                .select();

            if (error) {
                console.error('Error inserting user profile:', error.message);
                setError(error.message);
            } else {
                console.log('User profile inserted successfully:', data);
                // Clear subjects taught after successful submission
                globalSubjectsTaught = [];
                setSubjectsTaught([]);
                setError('');
                navigate(`/tutors`);
            }
        } catch (error) {
            console.error('Error submitting profile:', error.message);
            setError(error.message);
        }
    };

    return (
        <div className="profile-container">
            <h1 className="profile-heading">Create Profile</h1>
            <form className="profile-form" onSubmit={handleSubmit}>
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
                                {subject} <button type="button" onClick={() => { removeSubjectTaught(index); }}>Remove</button>
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
                {error && (
                    <p style={{ color: '#ff0000', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
                        {error}
                    </p>
                )}
            </form>
        </div>
    );
}
