const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/testdb")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

const studentSchema = new mongoose.Schema({
    name: String,
    course: String
});

const Student = mongoose.model("Student", studentSchema);

const newStudent = new Student({
    name: "John",
    course: "ICT"
});

newStudent.save();