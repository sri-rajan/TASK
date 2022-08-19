import Student from "../models/Student.js";
import express from "express";
const route = express.Router();

route.get("/:id/balance", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    // const fees = await student.fees.reduce((acc, curr) => {
    //   return acc + curr;
    // }, 0);
    res.status(200).send(student.fees);
  } catch (e) {
    res.status(500).send(e);
  }
});

route.get("/:id/history", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    const history = student.feesHistory;
    res.status(200).send(history[0] ? history : "no history");
  } catch (e) {
    res.status(500).send(e);
  }
});

route.put("/:id/pay", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student.fees.includes(req.body.fees))
      return res.status(401).send("fees amount don't match");
    await student.updateOne({
      $pull: { fees: req.body.fees },
      $push: { feesHistory: req.body.fees },
    });
    res.status(200).send(`fees paid ${req.body.fees}`);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Admin can only do
route.put("/:id/add", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    await student.updateOne({
      $push: { fees: req.body.fees },
    });
    res.status(200).send(`fees Added ${req.body.fees}`);
  } catch (e) {
    res.status(500).send(e);
  }
});

export default route;
