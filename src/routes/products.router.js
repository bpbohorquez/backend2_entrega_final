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
router.get("/products", getProducts);

// Get producto por ID
router.get("/products/:id", getProductById);

// POST agregar nuevos productos
router.post("/products", authorization("admin"), createProducts);

// PUT actualizar información de producto
router.put("/products/:id", authorization("admin"), updateProduct);

// DELETE Eliminar producto
router.delete("/products/:id", authorization("admin"), deleteProduct);

export default router;
