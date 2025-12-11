// Autor: Charlotte Rojas Padilla
// Fecha: 11/12/2025
// Descripción: Interfaz que representa la respuesta del backend al autenticar un usuario.
// Incluye el estado de la respuesta, un mensaje descriptivo y el token del usuario en caso de éxito.

import type { MUsuarioToken } from "./mUsuarioToken";

export interface mAutenticacion {
  estadoRespuesta: number,
  mensaje: string,
  dato: MUsuarioToken
}