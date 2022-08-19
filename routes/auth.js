import Parent from "../models/Parent.js";
import bcrypt from "bcrypt";
import express from "express";
const route = express.Router();

//REGISTER
route.post("/register", async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt);

    const newParent = new Parent(req.body);
    await newParent.save();
    res.status(200).send(newParent);
  } catch (e) {
    res.status(500).send(e);
  }
});

//LOGIN
route.post("/login", async (req, res) => {
  try {
    const user = await Parent.findOne({ email: req.body.email });
    if (!user) return res.status(401).send("can't find user");
    const isPasswordCrt = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCrt) return res.status(403).send("wrong crendentials");
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

export default route;
