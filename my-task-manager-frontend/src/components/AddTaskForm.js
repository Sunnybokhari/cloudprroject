import React, { useState } from 'react';
import './AddTaskForm.css'; 
import { useNavigate } from 'react-router-dom'; 

const AddTaskForm = () => {
    const navigate = useNavigate();

    const [task, setTask] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: '',
        userEmail: '',
    });
    const [file, setFile] = useState(null); 

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', task.title);
        formData.append('description', task.description);
        formData.append('dueDate', task.dueDate);
        formData.append('priority', task.priority);
        formData.append('file', file); 

        fetch('http://localhost:3001/task', {
            method: 'POST',
            credentials: 'include',
            body: formData 
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Task added:', data);
            navigate('/home'); 
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const handleCancel = () => {
        navigate('/home'); 
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="title" 
                    className="form-input" 
                    value={task.title} 
                    onChange={handleChange} 
                    placeholder="Title"
                />
                <textarea
                    name="description"
                    className="form-input" 
                    value={task.description}
                    onChange={handleChange}
                    placeholder="Description"
                />
                <input 
                    type="date" 
                    name="dueDate" 
                    className="form-input" 
                    value={task.dueDate} 
                    onChange={handleChange} 
                />
                <select
                    name="priority"
                    className="form-input" 
                    value={task.priority}
                    onChange={handleChange}
                >
                    <option value="">Select Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                <input 
                    type="file" 
                    onChange={handleFileChange}
                    className="form-input"
                />
                
                <button type="submit" className="form-button">Add Task</button> 
                <button type="button" className="form-button cancel-button" onClick={handleCancel}>Cancel</button> 

            </form>
        </div>
    );
};

export default AddTaskForm;
