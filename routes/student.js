import Student from "../models/Student.js";
import Parent from "../models/Parent.js";
import express from "express";
const route = express.Router();

//CREATE Student
route.post("/:parentid", async (req, res) => {
  const parentId = req.params.parentid;
  try {
    const newStudent = new Student(req.body);
    newStudent.parentId = parentId;
    await newStudent.save();
    await Parent.findByIdAndUpdate(parentId, {
      $push: {
        studentId: newStudent._id.toString(),
      },
    });
    res.status(200).send(newStudent);
  } catch (e) {
    res.status(500).send(e);
  }
});

// UPDATE Student
route.put("/:id", async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).send("student updated");
  } catch (e) {
    res.status(500).send(e);
  }
});

// Delete Student
route.delete("/:id/:parentid", async (req, res) => {
  const parentId = req.params.parentid;
  try {
    await Student.findByIdAndDelete(req.params.id);
    await Parent.findByIdAndUpdate(parentId, {
      $pull: {
        studentId: req.params.id,
      },
    });
    res.status(200).send("student deleted");
  } catch (e) {
    res.status(500).send(e);
  }
});

// Get All Student
route.get("/", async (req, res) => {
  try {
    const student = await Student.find({});
    res.status(200).send(student);
  } catch (e) {
    res.status(500).send(e);
  }
});

//GET Student with id
route.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.status(200).send(student);
  } catch (e) {
    res.status(500).send(e);
  }
});

//GET Student by parent id
route.get("/parent/:id", async (req, res) => {
  try {
    const student = await Student.find({ parentId: req.params.id });
    res.status(200).send(student);
  } catch (e) {
    res.status(500).send(e);
  }
});

export default route;
