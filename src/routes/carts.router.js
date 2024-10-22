import express from "express";
import { Router } from "express";
import { readFileSync, writeFileSync } from "fs";
import productModel from "../dao/models/producto.model.js";
import cartModel from "../dao/models/carrito.model.js";
import ticketModel from "../dao/models/ticket.model.js";
import {
  getCartById,
  getCarts,
  createCart,
  updateCart,
  updateCartProduct,
  deleteCart,
  deleteCartProduct,
  purchaseCart,
} from "../controllers/carts.controller.js";
import { authorization } from "../utils.js";

const router = Router();

// POST Crear carrito:
router.post("/carts", authorization("user"), createCart);

// GET Listar productos del carrito según id
router.get("/carts/:id", getCartById);

// GET traer todos los carritos
router.get("/carts/", getCarts);

// PUT Actualizar productos a un carrito
router.put(
  "/carts/:cid/product/:pid",
  authorization("user"),
  updateCartProduct
);

// PUT actualizar carrito
router.put("/carts/:cid", authorization("user"), updateCart);

// DELETE vaciar carrito:
router.delete("/carts/:id", authorization("user"), deleteCart);

// DELETE borrar producto de carrito
router.delete(
  "/carts/:cid/product/:pid",
  authorization("user"),
  deleteCartProduct
);

// POST purchase cart
router.post("/carts/:cid/purchase", authorization("user"), purchaseCart);

export default router;
