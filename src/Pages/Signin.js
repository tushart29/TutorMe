import React from 'react';
import { Link, Form, redirect, useActionData } from "react-router-dom"
import '../CSS/Signin.css'; // Import CSS file for styling

import { supabase } from '../Libs/supabaseClient';

function SignIn() {
    const message = useActionData()

    return (
        <div className="signin-page"> {/* Add a container for centering */}
            <div className="signin-container">
                <h1 className="signin-title">Sign in</h1>

                <Form className="signin-form" method="post" action="/signin">

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
                    {message && message.error && (
                        <p style={{ color: '#ff0000', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
                            {message.error}
                        </p>
                    )}
                </Form>
                <div className="link-text">
                    <Link to="/signup">Don't have an account? Sign up</Link>
                </div>
            </div>
        </div>
    );
}

export default SignIn;

export const signInAction = (setIsLoggedIn) => async ({ request }) => {
    // use actual use states at the end and save the inputs there and call it here instead of request 
    // const data = await request.formData();

    const data = await request.formData()

    const submission = {
        email: data.get('email'),
        password: data.get('password')
    }
    console.log(submission)
    try {
        const { user, error } = await supabase.auth.signInWithPassword({
            email: data.get("email"),
            password: data.get("password"),
            // email: email,
            // password: password,

        });


        if (error) {
            console.error(error.message);
            // Handle error here
            return { error: error.message }
        } else {
            console.log("Successfully logged in");
            setIsLoggedIn(true)
            return redirect('/'); // Redirect only on successful sign-up

            // User logged in successfully, you can redirect or do something else
        }
    } catch (error) {
        console.error('Error logging in:', error.message);
        return { error: error.message }
    }
};
