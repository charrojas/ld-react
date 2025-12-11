// Autor: Charlotte Rojas Padilla
// Fecha: 11/12/2025
// Descripción: Interfaz del modelo de solicitud que representa el detalle de un artículo al crear o enviar una factura.

export interface SDetalle {
  articuloId: number,
  cantidad: number,
  precio: number,
  iva: number,
  total: number
}