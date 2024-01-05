import React, { useState, useEffect } from "react";
import Task from "./Task";
import "./TaskList.css"; 

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/tasks", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const filterTasks = (priority) => {
    return tasks.filter(task => {
      if (task.priority !== priority) return false;
      if (selectedDate === '') return true; 
  
      const taskDueDate = new Date(task.dueDate).toDateString();
      const filterDueDate = new Date(selectedDate).toDateString();
  
      return taskDueDate === filterDueDate;
    });
  };

  return (
    <div className="container">
      <button
        className="logout-button"
        onClick={() => (window.location.href = "/")}
      >
        Logout
      </button>
      <h2 className="title">My Tasks</h2>
      <button
        className="add-task-button"
        onClick={() => (window.location.href = `http://localhost:3000/add`)}
      >
        Add Task
      </button>
      <div className="date-filter">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <div className="task-columns">
        <div className="task-column">
          <h3>High Priority</h3>
          {filterTasks("high").map((task) => (
            <Task key={task.id} {...task} />
          ))}
        </div>
        <div className="task-column">
          <h3>Medium Priority</h3>
          {filterTasks("medium").map((task) => (
            <Task key={task.id} {...task} />
          ))}
        </div>
        <div className="task-column">
          <h3>Low Priority</h3>
          {filterTasks("low").map((task) => (
            <Task key={task.id} {...task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
