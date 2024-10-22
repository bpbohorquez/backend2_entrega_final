import Cart from "../dao/classes/cart.dao.js";
import Product from "../dao/classes/product.dao.js";

const cartsService = new Cart();
const productsService = new Product();

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

export const purchaseCart = async (req, res) => {
  const now = new Date();

  let cartId = req.params.cid;

  let code = Date.now().toString(36) + Math.random().toString(36).substring(2);
  let purchase_datetime = `${now.getFullYear()}/${String(
    now.getMonth() + 1
  ).padStart(2, "0")}/${String(now.getDate()).padStart(2, "0")} ${String(
    now.getHours()
  ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
    now.getSeconds()
  ).padStart(2, "0")}`;
  let amount = 0;

  // Buscar carrito a comprar y email del cliente asociado al carrito
  let cart = await cartsService.getCartById(cartId);

  let purchaser = req.session.user.email;

  let leftProducts = [];

  // Validación cantidad y precio
  for (let i = 0; i < cart.products.length; i++) {
    let productID = cart.products[i].product;
    let product = await productsService.getProductById(productID);

    // Validación stock disponible
    if (cart.products[i].quantity > product.stock) {
      leftProducts.push(cart.products[i]);
    } else {
      amount = amount + product.price * cart.products[i].quantity;
      product.stock = product.stock - cart.products[i].quantity;

      // Actualizar stock del producto
      let productUpdated = await productsService.updateProduct(
        productID,
        product
      );
    }
  }

  // Actualizar carrito con los productos que no se pudieron comprar
  let newCart = await cartsService.updateCart(cartId, leftProducts);

  if (amount == 0) {
    res.status(400).send({
      status: "error",
      detail:
        "Ninguno de los productos agregados al carrito se encuentran disponibles para la cantidad ingresada",
      payload: { productosNoDisponibles: leftProducts },
    });
  } else {
    // Crear ticket de la compra
    let resultTicket = await cartsService.purchaseCart(
      code,
      purchase_datetime,
      amount,
      purchaser
    );

    res.send({ status: "success", payload: resultTicket });
  }
};
