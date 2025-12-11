// Autor: Charlotte Rojas Padilla
// Fecha: 11/12/2025
// Descripción: Modelo que representa un artículo en el sistema.
// Incluye información básica como código, nombre, descripción, precio y si aplica IVA.

export interface MArticulo {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  precio: number;
  iva: boolean;
}