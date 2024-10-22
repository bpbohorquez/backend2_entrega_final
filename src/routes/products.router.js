import express from "express";
import { Router } from "express";
import { readFileSync, writeFileSync } from "fs";
import productModel from "../dao/models/producto.model.js";
import mongoose from "mongoose";
import {
  getProducts,
  getProductById,
  createProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";
import { authorization } from "../utils.js";

const router = Router();

// Get todos los productos

// router.get("/products", async (req, res) => {
//   let limitQuery = parseInt(req.query.limit);
//   let pageQuery = parseInt(req.query.page);
//   let categoryQuery = req.query.category;
//   let sortQuery = req.query.sort;

//   if (!limitQuery) {
//     limitQuery = 10;
//   }

//   if (!pageQuery) {
//     pageQuery = 1;
//   }

//   if (sortQuery == "asc") {
//     sortQuery = "price";
//   } else if (sortQuery == "desc") {
//     sortQuery = "-price";
//   } else {
//   }

//   try {
//     if (sortQuery) {
//       if (categoryQuery) {
//         let products = await productModel
//           .find({ category: categoryQuery })
//           .paginate({
//             sort: sortQuery,
//             limit: limitQuery,
//             page: pageQuery,
//           });

//         res.send({ status: "success", payload: products });
//       } else {
//         let products = await productModel.find().paginate({
//           sort: sortQuery,
//           limit: limitQuery,
//           page: pageQuery,
//         });

//         res.send({ status: "success", payload: products });
//       }
//     } else {
//       if (categoryQuery) {
//         let products = await productModel
//           .find({ category: categoryQuery })
//           .paginate(
//             { category: "Category_A" },
//             {
//               limit: limitQuery,
//               page: pageQuery,
//             }
//           );

//         res.send({ status: "success", payload: products });
//       } else {
//         let products = await productModel.find().paginate({
//           limit: limitQuery,
//           page: pageQuery,
//         });
//         res.send({ status: "success", payload: products });
//       }
//     }
//   } catch (error) {
//     console.error(error);
//   }
// });

router.get("/products", getProducts);

// Get producto por ID

// router.get("/products/:id", async (req, res) => {
//   let paramId = req.params.id;

//   try {
//     let product = await productModel.findOne({ _id: paramId });
//     res.send({ status: "success", payload: product });
//   } catch (error) {
//     console.error(error);
//   }
// });

router.get("/products/:id", getProductById);

// POST agregar nuevos productos

// router.post("/products", async (req, res) => {
//   let { title, description, code, price, status, stock, category, thumbnails } =
//     req.body;

//   try {
//     let result = await productModel.create({
//       title,
//       description,
//       code,
//       price,
//       status,
//       stock,
//       category,
//       thumbnails,
//     });

//     res.send({ status: "success", payload: result });
//   } catch (error) {
//     console.error(error);
//   }
// });

router.post("/products", authorization("admin"), createProducts);

// PUT actualizar información de producto

// router.put("/products/:id", async (req, res) => {
//   let { id } = req.params;

//   let productReplace = req.body;

//   try {
//     let result = await productModel.updateOne({ _id: id }, productReplace);
//     res.send({ status: "success", payload: result });
//   } catch (error) {
//     console.error(error);
//   }
// });

router.put("/products/:id", authorization("admin"), updateProduct);

// DELETE Eliminar producto

// router.delete("/products/:id", async (req, res) => {
//   let { id } = req.params;

//   try {
//     let result = await productModel.deleteOne({ _id_: id });

//     res.send({ status: "success", payload: result });
//   } catch (error) {
//     console.error(error);
//   }
// });

router.delete("/products/:id", authorization("admin"), deleteProduct);

export default router;
