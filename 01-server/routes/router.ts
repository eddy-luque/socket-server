import { Request, Response, Router } from "express";
import { Socket } from "socket.io";
import Server from "../classes/server";
import { usuariosConectados } from '../sockets/socket';

export const router = Router();
router.get("/mensajes", (req: Request, res: Response) => {
  res.json({
    ok: true,
    message: "Todo está bien !",
  });
});
router.post("/mensajes", (req: Request, res: Response) => {
  // Valores que se están enviando del postman
  const cuerpo = req.body.cuerpo;
  const de = req.body.de;

  const payload = {
    de,
    cuerpo,
  };
  const server = Server.instance;
  server.io.emit("mensaje-nuevo", payload);

  res.json({
    ok: true,
    cuerpo,
    de,
  });
});
router.post("/mensajes/:id", (req: Request, res: Response) => {
  // Valores que se están enviando del postman
  const cuerpo = req.body.cuerpo;
  const de = req.body.de;
  const id = req.params.id;

  const payload = {
    de,
    cuerpo,
  };

  const server = Server.instance;
  server.io.in(id).emit("mensaje-privado", payload);

  res.json({
    ok: true,
    cuerpo,
    de,
    id,
  });
});

// Obteler lista de ID de usuarios ...
router.get('/usuarios', async (req: Request, res: Response) => {
  const server = Server.instance;
  await server.io.fetchSockets()
  .then( (clients) => {
    const items:any[] = [];
    for (const socket of clients) {
      items.push(socket.id);
    }
    return res.json({
      ok: true,
      clientes: items,
    });
  }).catch( (err:any)=> {
    return res.json({
      ok : false,
      clientes: []
    })
  });
});

// Obtener lista de los ID + Nombre de usuarios
router.get('/usuarios/detalle', async (req: Request, res: Response) => {
    res.json({
      ok : true,
      clientes: usuariosConectados.getLista()
    })
});

export default router;
