// Autor: Charlotte Rojas Padilla
// Fecha: 11/12/2025
// Descripción: Servicio para interactuar con la API de Artículos.
// Incluye métodos para listar, agregar, actualizar y eliminar artículos.
// Axios para las solicitudes HTTP y MRespuesta como envoltorio de respuesta.

import axios from "axios";
import { MRespuesta } from "../../../modelos/mRespuesta";
import type { MArticulo } from "../modelos/mArticulo";
import type { MArticuloRespuesta } from "../modelos/mArticuloRespuesta";
import { Token } from "@mui/icons-material";
import type { SActualizarArticulo } from "../modelos/sActualizarArticulo";
import type { SAgregarArticulo } from "../modelos/sAgregarArticulo";

const { VITE_API_PORT_BACKEND_LD } = import.meta.env;
const END_POINT_BACKEND: string = `http://localhost:${VITE_API_PORT_BACKEND_LD}/api/Articulo/`;
const TOKEN = localStorage.getItem('token');

export const servicioArticulo = {

  /**
   * Lista todos los artículos registrados en el sistema.
   * @returns MRespuesta con un arreglo de artículos.
   */
  listarArticulos: async () => {
    let respuestaF: MRespuesta<MArticulo[]> = new MRespuesta<MArticulo[]>();
    try {
      await axios
        .get<MArticuloRespuesta>(`${END_POINT_BACKEND}ListarArticulos`, {
          headers: { Authorization: `Bearer ${Token}` },
        })
        .then((res) => {
          respuestaF.dato = res.data.dato;
          respuestaF.respuestaExitosa = true;
        });
      
    } catch (error: any) {
      respuestaF.mensaje = "Error al listar articulos";
      respuestaF.respuestaExitosa = false;
    }

    return respuestaF;
  },

  /**
   * Agrega un nuevo artículo al sistema.
   * @param solicitud Objeto con los datos del artículo a agregar.
   * @returns MRespuesta con el artículo creado.
   */
  agregarArticulo: async (solicitud: SAgregarArticulo) => {
    let respuestaF: MRespuesta<MArticulo> = new MRespuesta<MArticulo>();

    try {
      const respuesta: any = await axios
        .post<MArticuloRespuesta>(
          `${END_POINT_BACKEND}AgregarArticulo`,
          solicitud,
          { headers: { Authorization: `Bearer ${TOKEN}` } }
        )
        respuestaF.dato = respuesta.data.dato[0];
        respuestaF.respuestaExitosa = true;
    } catch (error: any) {
      respuestaF.mensaje = "Error al agregar articulo";
      respuestaF.respuestaExitosa = false;
    }

    return respuestaF;
  },

  /**
   * Actualiza un artículo existente.
   * @param solicitud Objeto con los datos actualizados del artículo.
   * @returns MRespuesta con el artículo actualizado.
   */
    actualizarArticulo: async (solicitud: SActualizarArticulo) => {
    let respuestaF: MRespuesta<MArticulo> = new MRespuesta<MArticulo>();

    try {
      const respuesta = await axios
        .put<MArticuloRespuesta>(
          `${END_POINT_BACKEND}ActualizarArticulo`,
          solicitud,
          { headers: { Authorization: `Bearer ${TOKEN}` } }
        )
        .then((res) => {
          respuestaF.dato = res.data.dato[0];
          respuestaF.respuestaExitosa = true;
        });
    } catch (error: any) {
       respuestaF.mensaje = "Error al actualizar el articulo";
      respuestaF.respuestaExitosa = false;
    }
    return respuestaF;
  },
  
  /**
   * Elimina un artículo del sistema.
   * @param id Identificador del artículo a eliminar.
   * @returns MRespuesta con el artículo eliminado.
   */
    eliminarArticulo: async (id: number) => {
    let respuestaF: MRespuesta<MArticulo> = new MRespuesta<MArticulo>();

    try {
      
      const respuesta = await axios
        .delete<MArticuloRespuesta>(
          `${END_POINT_BACKEND}BorrarArticulo?id=${id}`,
          { headers: { 'Content-Type': 'application/json' } }
        )
        .then((res) => {
          respuestaF.dato = res.data.dato[0];
          respuestaF.respuestaExitosa = true;
        })
        .catch((res) => {
           respuestaF.respuestaExitosa = false;
           respuestaF.mensaje = res.data.mensaje
          
        })
    } catch (error: any) {
      
      respuestaF.mensaje = "Error al eliminar el articulo";
      respuestaF.respuestaExitosa = false;
    }
    return respuestaF;
  },
};
