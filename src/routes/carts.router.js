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
} from "../controllers/carts.controller.js";

const router = Router();

// POST Crear carrito:
// router.post("/carts", async (req, res) => {
//   let { products } = req.body;

//   try {
//     let result = await cartModel.create({
//       products,
//     });

//     res.send({ status: "success", payload: result });
//   } catch (error) {
//     console.error(error);
//   }
// });

router.post("/carts", createCart);

// GET Listar productos del carrito según id

router.get("/carts/:id", getCartById);

// GET traer todos los carritos

router.get("/carts/", getCarts);

// PUT Actualizar productos a un carrito

// router.put("/carts/:cid/product/:pid", async (req, res) => {
//   let productId = req.params.pid;
//   let cartId = req.params.cid;

//   try {
//     let cartUpdate = await cartModel.findOne({ _id: cartId });

//     cartUpdate.products.push({ product: productId });

//     let result = await cartModel.updateOne({ _id: cartId }, cartUpdate);

//     res.send({ status: "success", payload: result });
//   } catch (error) {
//     console.error(error);
//   }
// });

router.put("/carts/:cid/product/:pid", updateCartProduct);

// PUT actualizar carrito
// router.put("/carts/:cid", async (req, res) => {
//   let cartId = req.params.cid;
//   let productArray = req.body.products;

//   try {
//     let cartUpdate = await cartModel.findOne({ _id: cartId });

//     cartUpdate.products = productArray;

//     let result = await cartModel.updateOne({ _id: cartId }, cartUpdate);

//     res.send({ status: "success", payload: result });
//   } catch (error) {
//     console.error(error);
//   }
// });

router.put("/carts/:cid", updateCart);

// DELETE carrito:
// router.delete("/carts/:id", async (req, res) => {
//   let { cartId } = req.params;

//   try {
//     let cartUpdate = await cartModel.findOne({ _id: cartId });

//     cartUpdate.products = [];

//     let result = await cartModel.updateOne({ _id: cartId }, cartUpdate);

//     res.send({ status: "success", payload: result });
//   } catch (error) {
//     console.error(error);
//   }
// });

router.delete("/carts/:id", deleteCart);

// DELETE borrar producto de carrito

// router.delete("/carts/:cid/product/:pid", async (req, res) => {
//   let productId = req.params.pid;
//   let cartId = req.params.cid;

//   try {
//     let cartUpdate = await cartModel.findOne({ _id: cartId });

//     cartUpdate.products = cartUpdate.products.filter(
//       (p) => p.product != productId
//     );

//     let result = await cartModel.updateOne({ _id: cartId }, cartUpdate);
//     res.send({ status: "success", payload: result });
//   } catch (error) {
//     console.error(error);
//   }
// });

router.delete("/carts/:cid/product/:pid", deleteCartProduct);

// POST purchase cart
router.post("/carts/:cid/purchase", async (req, res) => {
  let cartId = req.params.cid;

  try {
    let cart = await cartModel
      .findOne({ _id: cartId })
      .populate("products.product");

    // let result = await ticketModel.create({
    //   code: code,
    //   purchase_datetime:,
    //   amount:,
    //   purchaser: req.user.email
    // });

    res.send({ status: "success", payload: cart });
  } catch (error) {
    console.error(error);
  }
});

export default router;
