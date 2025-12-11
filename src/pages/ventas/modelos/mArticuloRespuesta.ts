// Autor: Charlotte Rojas Padilla
// Fecha: 11/12/2025
// Descripción: Modelo de respuesta para la obtención de artículos desde la API.
// Contiene el estado de la respuesta, un mensaje informativo y un arreglo de artículos.

import type { MArticulo } from "./mArticulo";

export interface MArticuloRespuesta {
  estadoRespuesta: number;
  mensaje: string;
  dato: MArticulo[];
}