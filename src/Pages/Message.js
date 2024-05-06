import React from 'react';
import '../CSS/Message.css'

const Message = () => {
    return (
        <div className="message-container">

            <div className="conversation">
                {/* Conversation with the selected user */}
                <div className="messages">
                    {/* Display messages here */}
                    <div className="message">
                        <div className="sender">User 1:</div>
                        <div className="text">Hello!</div>
                    </div>
                    {/* Add more messages here */}
                </div>
                <div className="input">
                    {/* Input field for sending messages */}
                    <input type="text" placeholder="Type your message..." />
                    <button>Send</button>
                </div>
            </div>
        </div>
    );
}

export default Message;
