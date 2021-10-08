import Server from "./classes/server";
import router from "./routes/router";
// import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

const server = new Server();

// server.app.use(bodyParser.urlencoded({extended:true}));
// server.app.use(bodyParser.json());
// BodyParser
server.app.use(express.json());
server.app.use(express.urlencoded({ extended: true }));

// Cors
server.app.use(cors({ origin: true, credentials: true }));

// Rutas del servicio
server.app.use("/", router);

server.start(() => {
  console.log(`Servidor corriendo en el puerto ${server.port}`);
});
