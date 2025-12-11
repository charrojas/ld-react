// Autor: Charlotte Rojas Padilla
// Fecha: 11/12/2025
// Descripción: Modelo para agregar un nuevo artículo a la base de datos a través de la API.
// Contiene la información mínima requerida para crear un artículo.

export interface SAgregarArticulo {
  nombre: string;
  descripcion: string;
  precio: number;
  iva: boolean;
}