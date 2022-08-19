import Student from "../models/Student.js";
import express from "express";
const route = express.Router();

route.get("/:year/", async (req, res) => {
  try {
    const StudentList = await Student.find({
      academicYear: req.params.year,
    });
    const classList = StudentList.map((student) => {
      return student.class;
    });
    res.status(200).send([...new Set(classList)]);
  } catch (e) {
    res.status(500).send(e);
  }
});

route.get("/:year/students", async (req, res) => {
  try {
    const StudentList = await Student.find({
      academicYear: req.params.year,
    });
    res.status(200).send(StudentList);
  } catch (e) {
    res.status(500).send(e);
  }
});

route.get("/:year/:class", async (req, res) => {
  try {
    const studentList = await Student.find({
      academicYear: req.params.year,
      class: req.params.class,
    });
    res.status(200).send(studentList);
  } catch (e) {
    res.status(500).send(e);
  }
});

export default route;
