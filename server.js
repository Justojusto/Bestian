
const mongoose = require('mongoose');
const express = require('express');
const app = express();

app.use(express.json());

// Sample data
let students = [
    { id: 1, name: "John", course: "ICT", marks: 75 },
    { id: 2, name: "Mary", course: "Education", marks: 62 }
];

// Helper function to generate next ID
const getNextId = () => {
    return students.length > 0
        ? Math.max(...students.map(s => s.id)) + 1
        : 1;
};

// Helper function to calculate grade
const getGrade = (marks) => {
    if (marks >= 70) return "A";
    if (marks >= 60) return "B";
    if (marks >= 50) return "C";
    return "Fail";
};


// 📌 GET all students
app.get('/students', (req, res) => {
    res.json(students);
});


// 📌 GET single student
app.get('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
});


// 📌 POST add new student
app.post('/students', (req, res) => {
    const { name, course, marks } = req.body;

    if (!name || !course || marks === undefined) {
        return res.status(400).json({ message: "Name, course, and marks are required" });
    }

    const newStudent = {
        id: getNextId(),
        name,
        course,
        marks
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });
});


// 📌 PUT update student
app.put('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    const { name, course, marks } = req.body;

    if (name) student.name = name;
    if (course) student.course = course;
    if (marks !== undefined) student.marks = marks;

    res.json({
        message: "Student updated successfully",
        student
    });
});


// 📌 DELETE student
app.delete('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    students.splice(index, 1);

    res.json({ message: "Student deleted successfully" });
});


// 📌 GET student grade
app.get('/students/:id/grade', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    const grade = getGrade(student.marks);

    res.json({
        name: student.name,
        marks: student.marks,
        grade
    });
});


// 🚀 Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});