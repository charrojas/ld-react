import axios from "axios";
import { MRespuesta } from "../../../modelos/mRespuesta";
import type { MFacturaRespuesta } from "../modelos/mFacturaRespuesta";
import type { SAgregarFacturaEncabezado } from "../modelos/sAgregarFacturaEncabezado";
import type { SFacturaEncabezado } from "../modelos/sFacturaEncabezado";

// Autor: Charlotte Rojas Padilla
// Fecha: 11/12/2025
// Descripción: Servicio para manejar las solicitudes HTTP relacionadas con el encabezado de facturas, incluyendo agregar una nueva factura.

const { VITE_API_PORT_BACKEND_LD } = import.meta.env;
const END_POINT_BACKEND: string = `http://localhost:${VITE_API_PORT_BACKEND_LD}/api/Factura/`;

// Función para agregar un encabezado de factura junto con sus detalles
export const servicioFacturaEncabezado = {
    agregarFacturaEncabezado: async (solicitud: SAgregarFacturaEncabezado) => {
        let respuestaFinal: MRespuesta<SFacturaEncabezado> = new MRespuesta<SFacturaEncabezado>();

        try {
            console.log(END_POINT_BACKEND)
            console.log(solicitud)

            await axios
                .post<MFacturaRespuesta>(`${END_POINT_BACKEND}AgregarFacturaEncabezado`, solicitud, {
                    headers: { 'Content-Type': 'application/json' }
                })
                .then((res) => {
                    respuestaFinal.dato = res.data.dato;
                    respuestaFinal.respuestaExitosa = true;
                })
                .catch(error => {
                    console.error('Error en la solicitud:', error);
                });

        } catch (error: any) {
            respuestaFinal.mensaje = "Error al guardar la factura";
            respuestaFinal.respuestaExitosa = false;
        }
        return respuestaFinal;
    },
}