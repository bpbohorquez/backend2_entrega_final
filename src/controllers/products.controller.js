import Product from "../dao/classes/product.dao.js";

const productsService = new Product();

export const getProducts = async (req, res) => {
  let limitQuery = parseInt(req.query.limit);
  let pageQuery = parseInt(req.query.page);
  let categoryQuery = req.query.category;
  let sortQuery = req.query.sort;

  let result = await productsService.getProducts(
    limitQuery,
    pageQuery,
    categoryQuery,
    sortQuery
  );

  res.send({ status: "success", payload: result });
};

export const getProductById = async (req, res) => {
  let paramId = req.params.id;

  let result = await productsService.getProductById(paramId);

  res.send({ status: "success", payload: result });
};

export const createProducts = async (req, res) => {
  let { title, description, code, price, status, stock, category, thumbnails } =
    req.body;

  let result = await productsService.createProducts(
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails
  );

  res.send({ status: "success", payload: result });
};

export const updateProduct = async (req, res) => {
  let { id } = req.params;

  let productReplace = req.body;

  let result = await productsService.updateProduct(id, productReplace);

  res.send({ status: "success", payload: result });
};

export const deleteProduct = async (req, res) => {
  let { id } = req.params;

  let result = await productsService.deleteProduct(id);

  res.send({ status: "success", payload: result });
};
