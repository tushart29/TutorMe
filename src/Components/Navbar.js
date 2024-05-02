import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink from React Router
import '../CSS/Navbar.css';
import { supabase } from '../Libs/supabaseClient';
import { useNavigate } from 'react-router-dom';


function Navbar({ isLoggedIn, setIsLoggedIn }) {

    const navigate = useNavigate();

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (!error) {
            setIsLoggedIn(false); // Update the state to reflect user logout
            navigate('/')
        }
    };
    const handleSettingsClick = () => {
        // Navigate to the settings page
        navigate('/settings');
    };

    return (
        <nav className="navbar">
            <h1>Tutor Me</h1>
            <NavLink to='/' end >About</NavLink>

            <NavLink to='/tutors' >Tutors</NavLink>
            {isLoggedIn ? (
                <div>
                    <button onClick={handleSettingsClick} className="sign-out-button">Settings</button>
                    <button onClick={handleSignOut} className="sign-out-button">Sign Out</button>

                </div>

            ) : (
                <NavLink to='/signup' className={({ isActive }) => isActive ? 'active' : ''}>Sign Up</NavLink>
            )}
        </nav>
    );
}

export default Navbar;
