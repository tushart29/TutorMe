import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';

import '../CSS/Signup.css'; // Import CSS file for styling
import { supabase } from '../Libs/supabaseClient';

function SignUp({ setIsLoggedIn, setUserId }) {
    const encrypt = (data, key) => {
        return CryptoJS.AES.encrypt(data, key).toString();
    };

    const getSession = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            console.log("session: ", session);
            return session;
        } catch (error) {
            console.error('Error getting session:', error.message);
            // Handle error if needed
            return null; // Or throw the error
        }
    };

    const [error, setError] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        setError(null); // Clear error when component mounts or when email/password changes
    }, []);

    const handleSignup = async (event) => {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(event.target); // Get form data
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const { user, error } = await supabase.auth.signUp({ email, password });

            if (error) {
                console.error(error.message);
                setError(error.message); // Set error state
            } else {
                console.log("Successfully signed up");
                setIsLoggedIn(true); // Call the login function after successful signup
                // Redirect or handle success here
                const session = await getSession()
                const encryptedUserId = encrypt(session.user.id, '1234567');
                console.log("encryptedUserId in signup", encryptedUserId)
                setUserId(encryptedUserId)
                navigate(`/profile`);
            }
        } catch (error) {
            console.error('Error signing up:', error.message);
            setError(error.message); // Set error state
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <h1 className="signup-title">Sign up</h1>
                <form className="signup-form" onSubmit={handleSignup}>
                    <div className="form-input">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                        />
                    </div>
                    <div className="form-input">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                        />
                    </div>
                    <button type="submit" className="submit-button">Sign Up</button>
                    {error && (
                        <p style={{ color: '#ff0000', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
                            {error}
                        </p>
                    )}
                </form>
                <div className="link-text">
                    <Link to="/signin">Already have an account? Sign in</Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
