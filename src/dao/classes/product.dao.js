import productModel from "../models/producto.model.js";
import mongoose from "mongoose";

export default class Product {
  getProducts = async (
    limitQuery = 10,
    pageQuery = 1,
    categoryQuery = null,
    sortQuery = null
  ) => {
    try {
      if (sortQuery == "asc") {
        sortQuery = "price";
      }

      if (sortQuery == "desc") {
        sortQuery = "-price";
      }

      let products;

      if (sortQuery) {
        if (categoryQuery) {
          products = await productModel
            .find({ category: categoryQuery })
            .paginate({
              sort: sortQuery,
              limit: limitQuery,
              page: pageQuery,
            });
        } else {
          products = await productModel.find().paginate({
            sort: sortQuery,
            limit: limitQuery,
            page: pageQuery,
          });
        }
      } else {
        if (categoryQuery) {
          products = await productModel
            .find({ category: categoryQuery })
            .paginate(
              { category: "Category_A" },
              {
                limit: limitQuery,
                page: pageQuery,
              }
            );
        } else {
          products = await productModel.find().paginate({
            limit: limitQuery,
            page: pageQuery,
          });
        }
      }

      return products;
    } catch (error) {
      console.log(error);

      return null;
    }
  };

  getProductById = async (paramId) => {
    try {
      let product = await productModel.findOne({ _id: paramId });

      return product;
    } catch (error) {
      console.log(error);

      return null;
    }
  };

  createProducts = async (
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails
  ) => {
    try {
      let result = await productModel.create({
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
      });

      return result;
    } catch (error) {
      console.log(error);

      return null;
    }
  };

  updateProduct = async (id, productReplace) => {
    try {
      let result = await productModel.updateOne({ _id: id }, productReplace);

      return result;
    } catch (error) {
      console.log(error);

      return null;
    }
  };

  deleteProduct = async (id) => {
    try {
      let result = await productModel.deleteOne({ _id_: id });

      return result;
    } catch (error) {
      console.log(error);

      return null;
    }
  };
}
