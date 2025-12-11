// Autor: Charlotte Rojas Padilla
// Fecha: 11/12/2025
// Descripción: Modelo para actualizar un artículo existente en la API.
// Contiene la información completa del artículo que se desea modificar.

export interface SActualizarArticulo {
  id: number;
  codigo: string,
  nombre: string;
  descripcion: string;
  precio: number;
  iva: boolean;
}