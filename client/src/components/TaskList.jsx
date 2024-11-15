import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';

const TaskList = ({ view, refreshPage }) => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    const time = date.toTimeString().split(' ')[0]; // Extracts HH:MM:SS

    return `${day}/${month}/${year}, ${time}`;
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_GET_TASKS_API);
        console.log(response.data);
        if (response && response.data) {
          const transformedData = response.data.map((task) => {
            const createdAt = new Date(task.created_at);
            const updatedAt = new Date(task.updated_at);
  
            return {
              ...task,
              created_at: formatDate(createdAt),
              updated_at: formatDate(updatedAt)
            };
          });
  
          console.log(transformedData);
          setTasks(transformedData);
        }
      }
      catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
  
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(import.meta.env.VITE_DELETE_TASK_API, { params: { id } });
      setTasks(tasks.filter(task => task.id !== id));
    }
    catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEdit = async (updatedTask) => {
    try {
      const res = await axios.put(import.meta.env.VITE_UPDATE_TASK_API, updatedTask, {
        params: { id: updatedTask.id },
      });
      console.log(res);
      setTasks(tasks.map(task => (task.id === updatedTask.id) ? {...task, status: updatedTask.status} : task));
    }
    catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleAddTask = async () => {
    if (title && description) {
      try {
        const newTask = { title, description, status: 'pending' };
        const response = await axios.post(import.meta.env.VITE_ADD_TASK_API, newTask);
        const createdAt = new Date(response.data.task.created_at);
        const updatedAt = new Date(response.data.task.updated_at);
        setTasks([...tasks, {
            ...response.data.task,
            created_at: formatDate(createdAt),
            updated_at: formatDate(updatedAt)
          }]); // Assuming the response contains the new task
        setShowForm(false);
        setTitle('');
        setDescription('');
      } 
      catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setShowForm(false);
  };

  const filteredTasks = tasks.filter(task => task.status === view.toLowerCase());

  return (
    <div className="task-list">
      {filteredTasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={handleDelete}
          onEdit={handleEdit}
          refreshPage={refreshPage}
        />
      ))}
      
      {view === 'Pending' && (
        <>
          {showForm && (
            <div className="task-form">
              <div className="form-element">
                <label>Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter task title"
                />
              </div>
              <div className="form-element">
                <label>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter task description"
                />
              </div>
              <div className="buttons-div">
                <button className="save-button" onClick={handleAddTask}>Save</button>
                <button className="cancel-button" onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          )}

          {!showForm && <button onClick={() => setShowForm(true)} className="add-task" disabled={showForm}>
            <b>Add Task</b>
          </button>}
        </>
      )}
    </div>
  );
};

export default TaskList;