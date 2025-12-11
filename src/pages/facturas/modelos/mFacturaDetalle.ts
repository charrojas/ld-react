// Autor: Charlotte Rojas Padilla
// Fecha: 11/12/2025
// Descripción: Interfaz que representa el detalle de una factura, incluyendo producto, cantidad, precio e impuestos.

export interface MFacturaDetalle {
  id: number,
  ordenId: number,
  productoId: number,
  cantidad: number,
  precio: number,
  iva: boolean,
  total: number,
}


