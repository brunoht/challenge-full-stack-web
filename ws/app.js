const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

require('./models/student');
const Student = mongoose.model('Student');

const app = express();
app.use(express.json())

// Middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
    app.use(cors());
    next();
})

mongoose.connect('mongodb://localhost/ws_grupoa', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then( () => {
    console.log("Successfully connected to MongoDB")
}).catch((err) => {
    console.log("Error: could not connect to MongoDB")
})

app.get("/", (req, res) => {
    return res.send({
        routes: [
            { method: "GET", url: "/api/v1/student", params: null, description: "List all students." },
            { method: "GET", url: "/api/v1/student/{id}", params: { id: "student id" }, description: "Show a student."},
            { method: "POST", url: "/api/v1/student", params: null, description: "Create a student."},
            { method: "PUT", url: "/api/v1/student/{id}", params: { id: "student id" }, description: "Update a student."},
            { method: "DELETE", url: "/api/v1/student/{id}", params: { id: "student id" }, description: "Delete a student."},
        ]
    })
})

app.get("/api/v1/student", (req, res) => {
    Student.find({}).then((students) => {
        return res.json(students);
    }).catch((err) => {
        return res.status(400).json({
            status: "error",
            message: err.message
        })
    })
})

app.get("/api/v1/student/:id", (req, res) => {
    Student.findOne({_id:req.params.id}).then((student) => {
        return res.json(student);
    }).catch((err) => {
        return res.status(400).json({
            status: "error",
            message: err.message
        })
    })
})

app.post("/api/v1/student",(req, res) => {
    let data = req.body;
    console.log(data);
    const student = Student.create(data, (err) => {
        if(err) {
            return res.status(400).json({
                status: "error",
                message: err.message
            })
        }

        return res.status(400).json({
            status: "success",
            message: "Student successfully created"
        })
    })
})

app.put("/api/v1/student/:id", (req, res) => {
    const student = Student.updateOne({_id: req.params.id}, req.body, (err) => {
        if(err) return status(400).json({
            status: "error",
            message: err.message
        });
        return res.json({
            status: "success",
            message: "Student successfully updated"
        })
    })
})

app.delete("/api/v1/student/:id", (req, res) => {
    const student = Student.deleteOne({_id: req.params.id}, (err) => {
        if(err) return res.status(400).json({
            status: "error",
            message: err.message
        })
    })

    return res.json({
        status: "success",
        message: "Student successfully deleted"
    })
})

app.listen(8080, ()=>{
    console.log("Server started on port 8080: http://localhost:8080")
})