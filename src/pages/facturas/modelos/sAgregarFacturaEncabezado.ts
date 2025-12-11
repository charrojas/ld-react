import type { SDetalle } from "./sDetalle";
import type { SFacturaEncabezado } from "./sFacturaEncabezado";

// Autor: Charlotte Rojas Padilla
// Fecha: 11/12/2025
// Descripción: Interfaz de modelo de solicitud para enviar los datos necesarios al agregar una nueva factura, incluyendo encabezado y detalles.

export interface SAgregarFacturaEncabezado{
  facturaEncabezado: SFacturaEncabezado,
  detalles: SDetalle[]
}