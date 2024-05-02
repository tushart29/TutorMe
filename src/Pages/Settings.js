import React, { useState, useEffect } from 'react';
import { supabase } from '../Libs/supabaseClient';
import { useNavigate } from 'react-router-dom';

import '../CSS/Settings.css'
import CryptoJS from 'crypto-js';

export default function Settings({ userId }) {
    const navigate = useNavigate();

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
    const [user, setUser] = useState(null);
    const [name, setName] = useState('John Doe');
    const [college, setCollege] = useState('Example University');
    const [email, setEmail] = useState('john.doe@example.com');
    const [major, setMajor] = useState('Computer Science');
    const [payRate, setPayRate] = useState(0);
    const [subjectsTaught, setSubjectsTaught] = useState([]);
    let decryptedUserId = ""

    // let subjectsTaught = []

    useEffect(() => {
        fetchTutors();
    }, []);

    async function fetchTutors() {
        console.log("user id in settings", userId)


        if (userId) {
            // ID is provided
            decryptedUserId = decrypt(decodeURIComponent(userId), '1234567');
            // Use decryptedUserId for further processing
        } else {
            // ID is not provided, handle accordingly
            console.log("id not provided from signup/sign-in")
        }
        try {
            let { data: user, error } = await supabase
                .from('tutors')
                .select('*')
                .eq('authID', decryptedUserId);
            if (error) {
                throw error;
            }
            setUser(user);
            if (user && user.length > 0) {
                const userData = user[0];
                setName(userData.name);
                setCollege(userData.college);
                setEmail(userData.email);
                setMajor(userData.major);
                setPayRate(userData.payRate);
                setSubjectsTaught(user.subjectsTaught || []);
                // console.log("subjects taught", userData.subjectsTaught)
                // setSubjectsTaught(userData.subjectsTaught)
                // console.log("subjectsTaught", subjectsTaught)
            }
        } catch (error) {
            console.error('Error fetching tutors:', error.message);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!decryptedUserId && userId) {
                // Decrypt the user ID if it's not already decrypted
                decryptedUserId = decrypt(decodeURIComponent(userId), '1234567');
            }

            console.log("major", major)
            console.log('decryptedUserId before major', decryptedUserId)
            const { error } = await supabase
                .from('tutors')
                .update({
                    name: name,
                    college: college,
                    email: email,
                    major: major,
                    payRate: payRate,
                    subjectsTaught: subjectsTaught
                })
                .eq('authID', decryptedUserId);

            if (error) {
                throw error;
            }

            console.log('Data updated successfully');
            navigate('/')
        } catch (error) {
            console.error('Error updating data:', error.message);
        }
    };



    return (
        <div className="dashboard-container">
            <div className="greeting">
                <h1>Hello, {name}</h1>
            </div>
            <div className="profile-section">
                <h2>Edit Profile Information</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>College:</label>
                        <input type="text" value={college} onChange={(e) => setCollege(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Major:</label>
                        <input type="text" value={major} onChange={(e) => setMajor(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Pay Rate ($/hour):</label>
                        <input type="number" value={payRate} onChange={(e) => setPayRate(e.target.value)} />
                    </div>
                    {/* <div className="form-group">
                        <label>Subjects Taught:</label>
                        <ul>
                            {user && user.length > 0 && user[0].subjectsTaught.map((subject, index) => (
                                <li key={index}>{subject}</li>
                            ))}
                        </ul>
                    </div> */}
                    <button type="submit">Save Changes</button>
                </form>
            </div>

        </div>
    );
}
