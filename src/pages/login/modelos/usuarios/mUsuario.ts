// Autor: Charlotte Rojas Padilla
// Fecha: 11/12/2025
// Descripción: Interfaz que representa a un usuario del sistema con sus datos básicos de identificación y acceso.

export interface Usuario {
  id: number,
  nombre: string
  apellido: string,
  username: string,
  contrasenia?: string
}