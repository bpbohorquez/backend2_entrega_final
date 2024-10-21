import Cart from "../dao/classes/cart.dao.js";

const cartsService = new Cart();

export const getCarts = async (req, res) => {
  let result = await cartsService.getCarts();

  res.send({ status: "success", payload: result });
};

export const getCartById = async (req, res) => {
  let cartId = req.params.id;
  let result = await cartsService.getCartById(cartId);

  res.send({ status: "success", payload: result });
};

export const createCart = async (req, res) => {
  let products = req.body;
  let result = await cartsService.createCart(products);

  res.send({ status: "success", payload: result });
};

export const updateCart = async (req, res) => {
  let cartId = req.params.cid;
  let productArray = req.body.products;

  let result = await cartsService.updateCart(cartId, productArray);

  res.send({ status: "success", payload: result });
};

export const updateCartProduct = async (req, res) => {
  let productId = req.params.pid;
  let cartId = req.params.cid;

  let result = await cartsService.updateCartProduct(productId, cartId);

  res.send({ status: "success", payload: result });
};

export const deleteCart = async (req, res) => {
  let cartId = req.params.id;

  let result = await cartsService.deleteCart(cartId);

  res.send({ status: "success", payload: result });
};

export const deleteCartProduct = async (req, res) => {
  let productId = req.params.pid;
  let cartId = req.params.cid;

  let result = await cartsService.deleteCartProduct(productId, cartId);

  res.send({ status: "success", payload: result });
};
