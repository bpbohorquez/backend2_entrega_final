import express from "express";
import { Router } from "express";
const router = Router();
import mongoose from "mongoose";
import session from "express-session";
import userModel from "../models/user.model.js";
import { authorization, createHash, passportCall } from "../utils.js";
import passport from "passport";
import jwt from "jsonwebtoken";

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

// **********************
// router.post("/sessions/register", async (req, res) => {
//   try {
//     const { first_name, last_name, email, age, password, cart, role } =
//       req.body;

//     const user = await userModel.create({
//       first_name,
//       last_name,
//       email,
//       age,
//       password: createHash(password),
//       cart,
//       role,
//     });

//     res.send({ status: "success", payload: user });

//     // res.redirect("/login");
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Error de registro");
//   }
// });
// *************************

router.post(
  "/sessions/register",
  passport.authenticate("register", { failureRedirect: "" }),
  async (req, res) => {
    res.send({ status: "success", message: "usuario registrado" });
  }
);

router.post("/sessions/login", (req, res) => {
  const { email, password } = req.body;
  if (email == "abc" && password == "abc") {
    let token = jwt.sign({ email, password, role: "user" }, "secretKey", {
      expiresIn: "24h",
    });
    res.send({ message: "Inicio de sesión exitoso", token });
  }
});

// .post(
//   "/sessions/login",
//   passport.authenticate("login", { failureRedirect: "" }),
//   async (req, res) => {
//     if (!req.user)
//       return res
//         .status(400)
//         .send({ status: "error", error: "Credenciales inválidas" });

//     req.session.user = {
//       first_name: req.user.first_name,
//       last_name: req.user.last_name,
//       email: req.user.email,
//       age: req.user.age,
//       cart: req.user.cart,
//       role: req.user.role,
//     };

//     res.send({ status: "success", payload: req.user });
//   }
// );

router.get(
  "/sessions/current",
  passportCall("jwt"),
  authorization("user"),
  (req, res) => {
    res.send(req.user);
  }
);

export default router;
