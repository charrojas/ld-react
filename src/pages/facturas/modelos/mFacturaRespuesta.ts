import type { MFacturaEncabezado } from "./mFacturaEncabezado";

// Autor: Charlotte Rojas Padilla
// Fecha: 11/12/2025
// Descripción: Interfaz para estandarizar la respuesta de una factura, incluyendo estado, mensaje y los datos del encabezado.

export interface MFacturaRespuesta {
  estadoRespuesta: number;
  mensaje: string;
  dato: MFacturaEncabezado;
}