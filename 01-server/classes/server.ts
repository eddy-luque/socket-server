import express from "express";
import { Server as wsServer } from "socket.io";
import http from "http";
import { SERVER_PORT } from "../global/enviroment";

import * as socket from '../sockets/socket';


export default class Server {
  private static _instance: Server;

  public port: number;
  public app: express.Application;
  // public io: wsServer.Server;
  
  // public io: any;
  public io : wsServer;


  private httpServer: http.Server;

  private constructor() {
    this.app = express();
    this.port = SERVER_PORT;
    this.httpServer = new http.Server(this.app);
    this.io = new wsServer(this.httpServer, {
      cors: { origin: "*", credentials: true },
    });
    this.escucharSockets();
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  private escucharSockets() {
    // console.log("Escuchando conexiones - sockets");
    this.io.on("connection", (cliente:any) => {
      // Conectar cliente
      socket.conectarCliente(cliente);


      // Configurar Usuario
      socket.configurarUsuario(cliente, this.io);
      
      //Mensajes
      socket.mensaje(cliente, this.io);
      
      //Desconectar 
      socket.desconectar(cliente);

    });
  }

  start(callback: Function) {
    this.httpServer.listen(this.port, callback());
    // this.app.listen(this.port,callback());
  }
}
