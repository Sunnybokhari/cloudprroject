import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import Home from './components/Home';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/home" element={<TaskList />} />
                <Route path="/add" element={<AddTaskForm />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>

    );
}

export default App;
