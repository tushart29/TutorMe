import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Signin.css'; // Import CSS file for styling
import { supabase } from '../Libs/supabaseClient';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';

function SignIn({ setIsLoggedIn, setUserId }) {
    const encrypt = (data, key) => {
        return CryptoJS.AES.encrypt(data, key).toString();
    };
    const [error, setError] = useState(null);
    const navigate = useNavigate();
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

    const handleSignIn = async (event) => {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(event.target); // Get form data
        const email = formData.get('email');
        const password = formData.get('password');

        try {



            const { user, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            })

            if (error) {
                console.error(error.message);
                setError(error.message); // Set error state
            } else {
                console.log("Successfully logged in");
                setIsLoggedIn(true); // Call the login function after successful sign-in
                // Redirect or handle success here
                const session = await getSession()
                const encryptedUserId = encrypt(session.user.id, '1234567');
                console.log("encryptedUserId in signin", encryptedUserId)
                setUserId(encryptedUserId)
                navigate(`/tutors`);
            }
        } catch (error) {
            console.error('Error logging in:', error.message);
            setError(error.message); // Set error state
        }
    };
    useEffect(() => {
        setError(null); // Clear error when component mounts or when email/password changes
    }, []);

    return (
        <div className="signin-page"> {/* Add a container for centering */}
            <div className="signin-container">
                <h1 className="signin-title">Sign in</h1>

                <form className="signin-form" onSubmit={handleSignIn}>
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
                    <button type="submit" className="submit-button">Sign In</button>
                    {error && (
                        <p style={{ color: '#ff0000', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
                            {error}
                        </p>
                    )}
                </form>
                <div className="link-text">
                    <Link to="/signup">Don't have an account? Sign up</Link>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
