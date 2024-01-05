import React from 'react';
import './Home.css'; 

const TaskList = () => {
    const handleLogin = () => {
        console.log("Button clicked");
        window.location.href = `http://localhost:3001/auth/google`;
    };

    return (
        <div className="container">
            <div className="title">Task Manager</div>
            <button className="login-button" onClick={handleLogin}>login</button>
        </div>
    );
};

export default TaskList;
