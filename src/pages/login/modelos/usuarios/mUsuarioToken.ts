// Autor: Charlotte Rojas Padilla
// Fecha: 11/12/2025
// Descripción: Modelo que representa la información de un usuario junto con su token de autenticación.

import type { Usuario } from "./mUsuario";

export interface MUsuarioToken {
  usuario: Usuario,
  token: string,
}