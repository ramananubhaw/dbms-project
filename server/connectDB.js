import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.MYSQL_PASSWORD,
    database: "todolist"
});

db.connect((error) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log("Connected to MySQL server.");
})

export default db;