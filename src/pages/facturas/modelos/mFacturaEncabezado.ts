import type { MFacturaDetalle } from "./mFacturaDetalle";

// Autor: Charlotte Rojas Padilla
// Fecha: 11/12/2025
// Descripción: Interfaz que representa el encabezado de una factura, incluyendo información del usuario, fecha, total y los detalles de los productos.
export interface MFacturaEncabezado {
  facturaEncabezado: number;
  usuarioId: number,
  id: number;
  fecha: Date;
  cantidadArticulos: number;
  total: number;
  items: MFacturaDetalle[];
}