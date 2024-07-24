import express from "express";
import { Router } from "express";
const router = Router();
import { readFileSync, writeFileSync } from "fs";

// Get todos los productos
router.get("/products", (req, res) => {
  let data = readFileSync("productos.json", "utf8");

  const products = JSON.parse(data);

  let limit = parseInt(req.query.limit);

  if (limit) {
    res.json(products.slice(0, limit));
  } else {
    res.json(products);
  }
});

// Get producto por ID
router.get("/products/:id", (req, res) => {
  let data = readFileSync("productos.json", "utf8");

  const products = JSON.parse(data);

  const paramId = parseInt(req.params.id);

  const product = products.find((p) => p.id === paramId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Producto no encontrado" });
  }
});

// POST agregar nuevos productos

router.post("/products", (req, res) => {
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = req.body;

  let data = readFileSync("productos.json", "utf8");

  const products = JSON.parse(data);

  const id = products.length + 1;

  const newProduct = {
    id,
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails: req.body.thumbnails ?? [],
  };

  products.push(newProduct);

  writeFileSync("productos.json", JSON.stringify(products, null, 2));

  res.json(newProduct);
});

// PUT actualizar información de producto
router.put("/products/:id", (req, res) => {
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = req.body;

  let data = readFileSync("productos.json", "utf8");

  let products = JSON.parse(data);

  const paramId = parseInt(req.params.id);

  let product = products.find((p) => p.id === paramId);

  if (product) {
    const id = paramId;

    const updatedProduct = {
      id,
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails: req.body.thumbnails ?? [],
    };

    product = updatedProduct;
    writeFileSync("productos.json", JSON.stringify(products, null, 2));
    res.json(product);
  } else {
    res.status(404).json({ message: "Producto no encontrado" });
  }
});

// DELETE Eliminar producto
router.delete("/products/:id", (req, res) => {
  let data = readFileSync("productos.json", "utf8");

  let products = JSON.parse(data);

  const paramId = parseInt(req.params.id);

  products = products.filter((p) => p.id !== paramId);

  writeFileSync("productos.json", JSON.stringify(products, null, 2));
  res.json({ message: `Producto con id ${paramId} eliminado correctamente` });
});

export default router;
