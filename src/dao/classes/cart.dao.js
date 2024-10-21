import cartModel from "../models/carrito.model.js";

export default class Cart {
  getCarts = async () => {
    try {
      let cart = await cartModel.find().populate("products.product");

      return cart;
    } catch (error) {
      console.log(error);

      return null;
    }
  };

  getCartById = async (cartId) => {
    try {
      let cart = await cartModel
        .findOne({ _id: cartId })
        .populate("products.product");

      return cart;
    } catch (error) {
      console.log(error);

      return null;
    }
  };

  createCart = async (products) => {
    try {
      let result = await cartModel.create(products);
      return result;
    } catch (error) {
      console.log(error);

      return null;
    }
  };

  updateCart = async (cartId, productArray) => {
    try {
      let cartUpdate = await cartModel.findOne({ _id: cartId });

      cartUpdate.products = productArray;

      let result = await cartModel.updateOne({ _id: cartId }, cartUpdate);

      return result;
    } catch (error) {
      console.log(error);

      return null;
    }
  };
}
