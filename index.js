const mysql = require("mysql");
const express = require("express");
var app = express();

var sqlcon = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "laravel",
    port: 4000,
    multipleStatements: true,
});

sqlcon.connect((err) => {
    if (!err) {
        console.log("Success");
    } else {
        console.log("Failed: " + err);
    }
});

app.listen(5000, () => console.log("Server started at PORT 5000"));


app.get("/", (req, res) => {
    res.send("Welcome to Student management System using Node Js CRUD...");
});

//Select operation for student information
app.get("/std", (req, res) => {
    sqlcon.query("select * from students", (err, rows, fields) => {
        if (!err) {
            res.send({ data: rows });
        } else {
            console.log(err);
        }
    });
});

//Select operation for specific student 
app.get("/std/:id", (req, res) => {
    sqlcon.query(
        "select * from students where id=?",
        [req.params.id],
        (err, rows, fields) => {
            if (!err) {
                res.send({ data: rows });
            } else {
                console.log(err);
            }
        });
});

//Insert Data to Student from Student Information System
app.use(express.json()); // This line enables JSON request body parsing
app.post("/stdins", (req, res) => {
    const std = req.body; // Get the student data from the request body

    // Create the SQL query with placeholders (?)
    const insertQuery = "INSERT INTO students (name, email, enrollNO) VALUES (?, ?, ?)";

    sqlcon.query(
        insertQuery,
        [
            std.name,
            std.email,
            std.enrollNO
        ],
        (err, result) => {
            if (!err) {
                res.send("Data Inserted Successfully");
            } else {
                console.log(err);
                res.status(500).send("Failed to insert data");
            }
        }
    );
});

//Update Data to Student from Database
app.put("/std/upt/:id", (req, res) => {
    let std = req.body;
    sqlcon.query(
        "update students set name=?, email=?, enrollNO=? where id=?",
        [std.name, std.email, std.enrollNO, req.params.id],
        (err, rows, fields) => {
            if (!err) {
                res.send("Data Updated Successfully");
            } else {
                console.log(err);
            }
        }
    );
});

    //Delete a specific student from Student Information System
    app.delete("/std/del/:id", (req, res) => {
        let delQuery = "delete from students where id = ? ";
        sqlcon.query(delQuery, [req.params.id], (err, rows, fields) => {
            if (!err) {
                res.send("Student informations deleted successfully !");
            } else {
                res.send(err); 
            }
        })
    })