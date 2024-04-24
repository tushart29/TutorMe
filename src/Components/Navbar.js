import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink from React Router
import '../CSS/Navbar.css';
import { supabase } from '../Libs/supabaseClient';

function Navbar({ isLoggedIn, setIsLoggedIn }) {


    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            setIsLoggedIn(false); // Update the state to reflect user logout
        }
    };

    return (
        <nav className="navbar">
            <h1>Tutor Me</h1>
            <NavLink to='/' end activeClassName="active">Home</NavLink>
            <NavLink to='/about' activeClassName="active">About</NavLink>
            <NavLink to='/contact' activeClassName="active">Help</NavLink>
            <NavLink to='/tutors' activeClassName="active">Tutors</NavLink>
            {isLoggedIn ? (
                <button onClick={handleSignOut} className="sign-out-button">Sign Out</button>
            ) : (
                <NavLink to='/signup' className={({ isActive }) => isActive ? 'active' : ''}>Sign Up</NavLink>
            )}
        </nav>
    );
}

export default Navbar;
