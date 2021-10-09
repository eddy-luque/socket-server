import Server from './classes/server';
import router from "./routes/router";

import express from "express";
// import cors from "cors"; 
// const cors = require('cors');

const server  = Server.instance;

// BodyParser
server.app.use(express.json());
server.app.use(express.urlencoded({ extended: true }));

// Cors
// server.app.use(cors({ origin: true, credentials: true}));
// server.app.use(cors());




// Rutas del servicio
server.app.use("/", router);

server.start(() => {
  console.log(`Servidor corriendo en el puerto ${server.port}`);
});
