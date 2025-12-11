// Autor: Charlotte Rojas Padilla
// Fecha: 11/12/2025
// Descripción: Servicio encargado de la autenticación de usuarios. Envía las credenciales al backend
// y devuelve la información del usuario junto con el token de sesión. Al autenticar correctamente,
// almacena los datos del usuario en localStorage para mantener la sesión.

import axios from "axios";
import type { mAutenticacion } from "../modelos/usuarios/mAutenticacion";
import { MRespuesta } from "../../../modelos/mRespuesta";
import type { Usuario } from "../modelos/usuarios/mUsuario";
import type { sUsuario } from "../modelos/usuarios/sUsuario";

const { VITE_API_PORT_BACKEND_LD } = import.meta.env;
const END_POINT_BACKEND: string = `http://localhost:${VITE_API_PORT_BACKEND_LD}/api/Usuario/`;

export const servicioLogIn = {

  autenticarUsuario: async (credenciales: sUsuario) => {
    let respuestaFinal: MRespuesta<Usuario> = new MRespuesta<Usuario>();
    try {
      await axios
        .post<mAutenticacion>(`${END_POINT_BACKEND}AutenticarUsuario`, credenciales)
        .then((res) => {
          respuestaFinal.dato = res.data.dato.usuario;
          respuestaFinal.respuestaExitosa = true;

          // Almacenar datos del usuario en localStorage para mantener la sesión
          localStorage.setItem('token', res.data.dato.token);
          localStorage.setItem('id', res.data.dato.usuario.id.toString());
          localStorage.setItem('username', res.data.dato.usuario.username);
          localStorage.setItem('nombre', res.data.dato.usuario.nombre);
          localStorage.setItem('apellido', res.data.dato.usuario.apellido);

        });
    } catch (error: any) {

      respuestaFinal.mensaje = "Erro al autenticarse";
      respuestaFinal.respuestaExitosa = false;
    }
    return respuestaFinal;
  },
};
