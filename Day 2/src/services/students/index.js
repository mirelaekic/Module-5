const express = require("express");
const fs = require("fs");
const path = require("path");
const uniqID = require("uniqid");
const router = express.Router();


// GET

router.get("/", (req, res) => {
  const studentFilePath = path.join(__dirname, "students.json");
  const fileAsABuffer = fs.readFileSync(studentFilePath);
  const fileAsAString = fileAsABuffer.toString();
  const studentsArray = JSON.parse(fileAsAString);
  res.send(studentsArray);
});

// GET single user by ID 
router.get("/:id", (req, res) => {
  const studentFilePath = path.join(__dirname, "/students.json");
  const fileAsABuffer = fs.readFileSync(studentFilePath);
  const fileAsAString = fileAsABuffer.toString();
  const studentsArray = JSON.parse(fileAsAString);
  const idComingFromRequest = req.params.identifier;
  console.log(idComingFromRequest);
  const student = studentsArray.filter((student) => student.id === idComingFromRequest);
  console.log(student);
  res.send(student);
});

// POST new student

router.post("/", (req, res) => {
  const studentFilePath = path.join(__dirname, "students.json");
  const fileAsABuffer = fs.readFileSync(studentFilePath);
  const fileAsAString = fileAsABuffer.toString();
  const studentsArray = JSON.parse(fileAsAString);

  const newstudent = req.body;
  newstudent.ID = uniqID();
  console.log(newstudent);
  studentsArray.push(newstudent);
  console.log(studentsArray);

  fs.writeFileSync(studentFilePath, JSON.stringify(studentsArray))

  res.status(201).send({ id: newstudent.ID })
});

module.exports = router 