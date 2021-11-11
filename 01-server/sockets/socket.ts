import SocketIO from "socket.io";
import { Socket } from "socket.io";
import { UsuarioLista } from "../classes/usuario-lista";
import { Usuario } from "../classes/usuario";

//  Lista de usuarios conectados...
export const usuariosConectados = new UsuarioLista();

export const conectarCliente = (cliente: Socket) => {
  const usuario = new Usuario(cliente.id);
  usuariosConectados.agregar(usuario);
};

// Desconectar cliente
export const desconectar = (cliente: Socket, io:SocketIO.Server) => {
  cliente.on("disconnect", () => {
    usuariosConectados.eliminarUsuario(cliente.id);
    io.emit('usuarios-activos', usuariosConectados.getLista());
  });
};

// Escuchar mensajes
export const mensaje = (cliente: Socket, io: SocketIO.Server) => {
  cliente.on("mensaje", (payload: { de: string; cuerpo: string }) => {
    io.emit("mensaje-nuevo", payload);
  });
};

// Consigurar usuario
export const configurarUsuario = (cliente: Socket, io: SocketIO.Server) => {
  cliente.on(
    "configurar-usuario",
    (payload: { nombre: string }, callBack: Function) => {
      // io.emit('mensaje-nuevo', payload);

      usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
      io.emit('usuarios-activos', usuariosConectados.getLista());

      callBack({
        ok: true,
        mensaje: `Usuario ${payload.nombre} ha sido configurado`,
      });
    }
  );
};

// Obtener usuarios
export const obtenerUsuarios = (cliente: Socket, io: SocketIO.Server) => {
  cliente.on(
    "obtener-usuarios", () => {
      // io.emit('usuarios-activos', usuariosConectados.getLista());
      io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
    }
  );
};