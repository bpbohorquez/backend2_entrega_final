import express from "express";
import { Router } from "express";
const router = Router();
import mongoose from "mongoose";
import session from "express-session";
import userModel from "../models/user.model.js";

router.get("/session", (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    let a = "Session counter: " + req.session.counter;
    res.send(a);
  } else {
    req.session.counter = 1;
    res.send("Bienvenido");
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      res.clearCookie("connect.sid");
      res.send("Sesión cerrada correctamente");
    } else {
      res.send({ status: "Error al hacer logout", body: err });
    }
  });
});

router.post("/sessions/register", async (req, res) => {
  try {
    const { first_name, last_name, email, age, password, cart, role } =
      req.body;

    const user = new userModel({
      first_name,
      last_name,
      email,
      age,
      password,
      cart,
      role,
    });
    await user.save();

    res.redirect("/login");
  } catch (error) {
    res.status(500).send("Error de registro");
  }
});

export default router;
