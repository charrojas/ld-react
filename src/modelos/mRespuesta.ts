// Autor: Charlotte Rojas Padilla
// Fecha: 11/12/2025
// Descripción: Clase que encapsula la respuestas de la API, incluyendo éxito, mensaje y datos opcionales.

export class MRespuesta<T> {
  respuestaExitosa: boolean = false;
  mensaje: string = "";
  dato?: T;
}