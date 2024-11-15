import React, { useState, useEffect } from "react";

const TaskItem = ({ task, onDelete, onEdit, refreshPage }) => {
    // const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({...task });
  
    // function handleEditClick() {
    //     setIsEditing(!isEditing);
    // }

    // useEffect(() => {
    //     console.log("isEditing:", isEditing); 
    // }, [isEditing]);
  
    // const handleCancelClick = () => {
    //   setEditedTask({ ...task });
    //   setIsEditing(!isEditing);
    // };
  
    function handleSubmit() {
      
        // Create a new object with only status and id
        
        const acceptedTask = {
          id: editedTask.id,
          status: editedTask.status
        };

        const updatedTask = {...acceptedTask, status: (acceptedTask.status==="pending" ? "completed" : "pending")}
      
        onEdit(updatedTask); // Pass the filtered task to onEdit function
        // setIsEditing(!isEditing);
      };
  
    // const handleChange = (e) => {
    //   const { name, value } = e.target;
    //   setEditedTask((prevTask) => ({ ...prevTask, [name]: value }));
    // };
  
    return (
      <form className="task-item">
        <h3>Task ID - {task.id}</h3>
  
        <div className="form-element">
          <div className="title-input">
            <label><b>Title:</b></label>
            <input
              type="text"
              name="title"
              value={task.title}
              readOnly={true}
            />
          </div>
  
          <div className="status-container">
            {/* <label><b>Status:</b></label>
            <select
              name="status"
              value={editedTask.status}
              onChange={handleChange}
              disabled={!isEditing}
              style={{ color: editedTask.status === 'pending' ? 'red' : 'green' }}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select> */}
            <b>Status:</b>&nbsp;<p className={task.status=="pending" ? "status-red" : "status-green"}>{task.status}</p>
          </div>
        </div>
  
        <div className="form-element">
          <label><b>Description:</b></label>
          <input
            type="text"
            name="description"
            value={task.description}
            readOnly={true}
          />
        </div>
  
        <div className="task-info">
          <p className="created-at"><b>Created at:</b> {task.created_at}</p>
          <p className="updated-at"><b>Updated at:</b> {task.updated_at}</p>
        </div>
  
        <div className="buttons-div">
              <button type="button" className="edit-button" onClick={handleSubmit}>{task.status==="pending" ? "Mark as completed" : "Mark as pending"}</button>
              <button type="button" className="delete-button" onClick={() => onDelete(task.id)}>Delete</button>
        </div>
      </form>
    );
};

export default TaskItem;
  