import React, { useContext, useState } from 'react';


import { Link, Form, redirect, useActionData } from "react-router-dom"

import '../CSS/Signup.css'; // Import CSS file for styling
import { supabase } from '../Libs/supabaseClient';


function SignUp() {
    // instead of calling this function , follow the last few videos of the react router


    const message = useActionData()
    return (
        <div className="signup-page">
            <div className="signup-container">
                <h1 className="signup-title">Sign up</h1>
                <Form className="signup-form" method="post" action="/signup">

                    <div className="form-input">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                        // onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-input">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                        // onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="submit-button">Sign Up</button>
                    {message && message.error && (
                        <p style={{ color: '#ff0000', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
                            {message.error}
                        </p>
                    )}
                </Form>
                <div className="link-text">
                    <Link to="/signin">Already have an account? Sign in</Link>
                </div>
            </div>
        </div>
    );
}

export default SignUp;


export const signUpAction = (setIsLoggedIn) => async ({ request }) => {


    const data = await request.formData()

    const submission = {
        email: data.get('email'),
        password: data.get('password')
    }
    console.log(submission)

    try {
        const { user, error } = await supabase.auth.signUp({
            email: data.get('email'),
            password: data.get('password'),
        });

        if (error) {
            console.error(error.message);
            return { error: error.message }
        } else {
            console.log("Successfully signed up");
            setIsLoggedIn(true); // Call the login function after successful signup

            return redirect('/')
        }
    } catch (error) {
        console.error('Error signing up:', error.message);
        return { error: error.message }
    }


}
