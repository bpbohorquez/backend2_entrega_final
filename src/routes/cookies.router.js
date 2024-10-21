import express from "express";
import { Router } from "express";
const router = Router();
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userModel from "../dao/models/user.model.js";

router.get("/setCookie", (req, res) => {
  res.cookie("coderCookie", "TEST COOKIE", { maxAge: 10000 }).send("Cookie");
});

router.get("/getCookie", (req, res) => {
  res.send(req.cookies);
});

router.get("/deleteCookie", (req, res) => {
  res.clearCookie("coderCookie").send("Cookie eliminada");
});

export default router;
