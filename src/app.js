import express from "express";
import path from "path";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import cookiesRouter from "./routes/cookies.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import fs from "fs";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { Server } from "socket.io";
import { readFileSync, writeFileSync } from "fs";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";

const app = express();
const PORT = 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://bohorquezbrian:coderhousecluster@coderhouse.to5l7.mongodb.net/base?retryWrites=true&w=majority&appName=Coderhouse",
      ttl: 15,
    }),
    secret: "secretCoder",
    resave: false,
    saveUninitialized: true,
  })
);

// Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

// Mongoose

const environment = async () => {
  await mongoose
    .connect(
      "mongodb+srv://bohorquezbrian:coderhousecluster@coderhouse.to5l7.mongodb.net/base?retryWrites=true&w=majority&appName=Coderhouse"
    )

    .then(() => {
      console.log("Conectado a la base de datos");
    })
    .catch((err) => {
      console.error("Error conectando a la base de datos", err);
    });
};

environment();

// Endpoints
app.use("/", productsRouter);
app.use("/", cartsRouter);
app.use("/", viewsRouter);
app.use("/", cookiesRouter);
app.use("/", sessionsRouter);

const httpServer = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

const socketServer = new Server(httpServer);
