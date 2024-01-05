import React from 'react';
import './Home.css'; 
import { useNavigate } from 'react-router-dom'; 


const TaskList = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        console.log("Button clicked");
        navigate('/auth/google'); 
    };

    return (
        <div className="container">
            <div className="title">Task Manager</div>
            <button className="login-button" onClick={handleLogin}>login</button>
        </div>
    );
};

export default TaskList;
