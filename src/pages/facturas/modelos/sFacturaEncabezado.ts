// Autor: Charlotte Rojas Padilla
// Fecha: 11/12/2025
// Descripción: Interfaz del modelo de solicitud que representa los datos del encabezado de una factura al crear o enviar una nueva factura.

export interface SFacturaEncabezado {
  id?: number,
  usuarioId: number,
  fecha: Date,
  total: number,
  cantidadArticulos: number
}