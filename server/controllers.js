import db from "./connectDB.js";

export const getTasks = (req, res) => {
    const query = 'SELECT * FROM todos';
    db.query(query, (error, result) => {
        if (error) {
            res.status(400).json({message: "Database query failed"});
            return;
        }
        res.json(result);
    })
}

export const addTask = (req, res) => {
    const data = req.body;

    const columns = Object.keys(data).join(", ");
    const placeholders = Object.keys(data).map(() => "?").join(", ");
    const values = Object.values(data);

    const query = `INSERT INTO todos (${columns}) VALUES (${placeholders})`;

    db.query(query, values, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: "Error inserting task" });
            return;
        }

        const taskId = results.insertId;

        // Fetch the newly added task to return it
        const selectQuery = 'SELECT * FROM todos WHERE id = ?';
        db.query(selectQuery, [taskId], (error, taskResult) => {
            if (error) {
                console.error(error);
                res.status(500).json({ message: "Error fetching added task" });
                return;
            }
            res.status(201).json({ message: "Task added successfully", task: taskResult[0] });
        });
    });
};


export const deleteTask = (req, res) => {
    const taskId = req.query.id;
    const query = `DELETE FROM todos WHERE id = ?`;

    db.query(query, [taskId], (error, result) => {
        if (error) {
            console.error("Error deleting task:", error);
            res.status(500).json({ message: "Error deleting task" });
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).json({ message: "Task not found" });
        }
        else {
            res.status(200).json({ message: "Task deleted successfully" });
        }
    });
};


export const updateTask = (req, res) => {
    const taskId = req.query.id;
    const data = req.body;

    const updates = Object.keys(data).map(key => `${key} = ?`).join(", ");
    const values = [...Object.values(data), taskId];

    const query = `UPDATE todos SET ${updates} WHERE id = ?`;

    db.query(query, values, (error, result) => {
        if (error) {
            console.error("Error updating task:", error);
            res.status(500).json({ message: "Error updating task" });
            return;
        }
        // console.log(result);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: "Task not found" });
        }
        else {
            res.status(200).json({ message: "Task updated successfully" });
        }
    });
};