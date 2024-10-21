import express from "express";
import { Router } from "express";
const router = Router();
import { readFileSync, writeFileSync } from "fs";
import productModel from "../dao/models/producto.model.js";
import mongoose from "mongoose";
import cartModel from "../dao/models/carrito.model.js";
import userModel from "../dao/models/user.model.js";

router.get("/", async (req, res) => {
  res.render("home");
});

router.get("/productsview", async (req, res) => {
  let pageQuery = parseInt(req.query.page);

  if (!pageQuery) {
    pageQuery = 1;
  }

  let products = await productModel.find().paginate({
    limit: 10,
    page: pageQuery,
  });

  products.prevLink = products.hasPrevPage
    ? `http://localhost:8080/productsview?page=${products.prevPage}`
    : "";

  products.nextLink = products.hasNextPage
    ? `http://localhost:8080/productsview?page=${products.nextPage}`
    : "";

  let productsObjects = await productModel
    .find()
    .lean()
    .limit(10)
    .skip((pageQuery - 1) * 10);
  products.productsObjects = productsObjects;

  res.render("productsview", { products });
});

router.get("/cartsview", async (req, res) => {
  let carts = await cartModel.find().lean();
  res.render("cartsview", { carts });
});

router.get("/productsview/:pid", async (req, res) => {
  let paramId = req.params.pid;

  let product = await productModel.findOne({ _id: paramId }).lean();

  res.render("singleproductview", { product });
});

// router.get("/profile", (req, res) => {
//   if (!req.session.user) {
//     return res.redirect("/login");
//   }

//   const { first_name, last_name, email, age, password, cart, role } =
//     req.session.user;
//   res.render("profile", {
//     first_name,
//     last_name,
//     email,
//     age,
//     cart,
//     role,
//   });
// });

router.get("/profile", (req, res) => {
  if (req.session.user) {
    res.render("profile", { user: req.session.user });
  } else {
    res.redirect("/login");
  }
});

router.get("/login", async (req, res) => {
  if (req.session.user) {
    res.redirect("/profile");
  } else {
    res.render("login");
  }
});

router.get("/register", (req, res) => {
  res.render("register");
});

export default router;
