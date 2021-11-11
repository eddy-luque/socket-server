import { Usuario } from "./usuario";
export class UsuarioLista {
  private lista: Usuario[] = [];

  constructor() {}

  // Agregar usuario
  public agregar(usuario: Usuario) {
    this.lista.push(usuario);
    console.log(this.lista);
    return usuario;
  }

  // Actualizar nombre
  public actualizarNombre(id: string, nombre: string) {
    for (let usuario of this.lista) {
      if (usuario.id === id) {
        usuario.nombre = nombre;
        break;
      }
    }
    console.log('======= nueva lista =======');
    console.log(this.lista);
  }

  // Obtener lista de usuarios
  public getLista() {
    // return this.lista;
    return this.lista.filter(usuario => usuario.nombre !== 'sin-nombre');
  }

  // Obtener informacion del usuario
  public getUsuario(id: string) {
    return this.lista.find((usuario) => usuario.id === id);
  }

  // Obtener todos los usuarios de una sala
  public getUsuariosSala(sala: string) {
    return this.lista.filter((usuario) => usuario.sala === sala);
  }

  // Eliminar usuario por el ID
  public eliminarUsuario(id: string) {
    const tempUsuario = this.getUsuario(id);
    this.lista = this.lista.filter((usuario) => usuario.id !== id);
    return tempUsuario;
  }
}
