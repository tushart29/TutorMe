import React from 'react';
import '../CSS/Footer.css';

function StickyFooter() {
    return (
        <div className="wrapper">
            <div className="content">

            </div>
            <footer className="footer">
                <div className="container">
                    <p>Tushar Thonupunoori</p>
                    <p>&copy; {new Date().getFullYear()}</p>
                </div>
            </footer>
        </div>
    );
}

export default StickyFooter;
