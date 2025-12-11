// Autor: Charlotte Rojas Padilla
// Fecha: 11/12/2025
// Descripción: Store de Zustand para manejar la página de ventas y gestión de artículos.
// Incluye la gestión de estado para listar, agregar, actualizar y eliminar artículos,
// así como la apertura/cierre de modales y mensajes de notificación.

import type { MArticulo } from "./modelos/mArticulo";
import type { SActualizarArticulo } from "./modelos/sActualizarArticulo";
import type { SAgregarArticulo } from "./modelos/sAgregarArticulo";
import { servicioArticulo } from "./servicios/servicioArticulo";
import { create } from 'zustand';

type PaginaVentasState = {
  estadoCargando: 'sin-cargar' | 'cargando' | 'error' | 'cargado';
  estadoAgregarEditar: 'sin-cargar' | 'cargando' | 'error';
  tipoMensaje: 'error' | 'correcto' | 'alerta';
  Articulos: MArticulo[];
  modalAbiertoAgregarEditar: boolean;
  modalMensajesAbierto: boolean;
  modalBorrarAbierto: boolean;
  tituloModal: string;
  descripcion: string;
  id: number;
  codigo: string;
  nombre: string;
  precio: number;
  aplicaIVA: boolean;
  esEdicion: boolean;
  msjModal: string;
};

type PaginaVentasActions = {
  listarArticulos: () => Promise<void>;
  agregarArticulo: () => Promise<void>;
  actualizarArticulo: () => Promise<void>;
  eliminarArticulo: () => Promise<void>;
  establecerModalMensajesAbierto: (valor: boolean) => void;
  establecerModalBorrarAbiertoConfirmacion: (valor: boolean) => void;
  ArticuloAgregarEditar: () => void;
  establecerModalAgregarEditarAbierto: (ArticuloId?: number) => void;
  establecerModalAgregarEditarCerrar: () => void;
  establecerModalBorrarAbierto: (ArticuloId: number) => void;
  establecerNombre: (valor: string) => void;
  establecerCodigo: (valor: string) => void;
  establecerPrecio: (valor: number) => void;
  establecerDescripcion: (valor: string) => void;
  establecerAplicaIVA: (valor: boolean) => void;
  reiniciarEstado: () => void;
};

const estadoInicial: PaginaVentasState = {
  estadoCargando: 'sin-cargar',
  estadoAgregarEditar: 'sin-cargar',
  Articulos: [],
  modalAbiertoAgregarEditar: false,
  modalMensajesAbierto: false,
  modalBorrarAbierto: false,
  tituloModal: '',
  descripcion: '',
  nombre: '',
  precio: 0,
  id: 0,
  codigo: '',
  aplicaIVA: false,
  msjModal: '',
  esEdicion: false,
  tipoMensaje: 'alerta',
};


export const usePaginaVentas = create<
  PaginaVentasState & PaginaVentasActions>((set, get) => ({
    ...estadoInicial,

    /**
     * Lista todos los artículos mediante el servicio de artículos.
     */
    listarArticulos: async () => {
      const respuesta = await servicioArticulo.listarArticulos();
      if (respuesta.respuestaExitosa) {
        set({
          Articulos: respuesta.dato,
          estadoCargando: 'cargado',
        });

      } else {
        set({ estadoCargando: 'error' });
      }
    },

    /**
   * Agrega un nuevo artículo utilizando los datos del store.
   */
    agregarArticulo: async () => {
      const { nombre, descripcion, precio, aplicaIVA, Articulos, listarArticulos } = get();

      const solicitud: SAgregarArticulo = {
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        iva: aplicaIVA,
      };

      set({ estadoAgregarEditar: 'cargando' });

      const respuesta = await servicioArticulo.agregarArticulo(solicitud);

      if (respuesta.respuestaExitosa) {
        const { establecerModalAgregarEditarCerrar } = get();
        listarArticulos();

        set({
          tipoMensaje: 'correcto',
          msjModal: "Se ha agregado con éxito el articulo",
          modalMensajesAbierto: true,
          estadoAgregarEditar: 'sin-cargar',
        });
        establecerModalAgregarEditarCerrar();
      } else {
        set({
          msjModal: respuesta.mensaje,
          tipoMensaje: 'error',
          modalMensajesAbierto: true,
          estadoAgregarEditar: 'sin-cargar',
        });
      }
    },

    /**
   * Actualiza un artículo existente con los datos actuales del store.
   */
    actualizarArticulo: async () => {
      const { id, codigo, nombre, descripcion, Articulos, aplicaIVA, precio,
      } = get();
      const solicitud: SActualizarArticulo = {
        id: id,
        codigo: codigo,
        nombre: nombre.trim(),
        descripcion: descripcion.toString().trim(),
        precio: precio,
        iva: aplicaIVA,
      };

      set({ estadoAgregarEditar: 'cargando' });
      const respuesta = await servicioArticulo.actualizarArticulo(solicitud);

      if (respuesta.respuestaExitosa) {
        const { establecerModalAgregarEditarCerrar } = get();
        const indiceDocumento = Articulos.findIndex(
          (art: any) => art.id === id
        );

        Articulos[indiceDocumento].nombre = nombre.trim();
        Articulos[indiceDocumento].descripcion = descripcion
          .toString()
          .trim();
        Articulos[indiceDocumento].precio = precio;
        Articulos[indiceDocumento].iva = aplicaIVA;

        set({
          Articulos: Articulos,
          tipoMensaje: 'correcto',
          msjModal: "Se ha actualizado con éxito el articulo",
          modalMensajesAbierto: true,
          estadoAgregarEditar: 'sin-cargar',
        });
        establecerModalAgregarEditarCerrar();
      } else {
        set({
          msjModal: respuesta.mensaje,
          tipoMensaje: 'error',
          modalMensajesAbierto: true,
          estadoAgregarEditar: 'sin-cargar',
        });
      }
    },

    /**
   * Elimina un artículo seleccionado.
   */
    eliminarArticulo: async () => {
      const { id, Articulos } = get();

      set({ estadoAgregarEditar: 'cargando' });
      const respuesta = await servicioArticulo.eliminarArticulo(id);

      if (respuesta.respuestaExitosa) {
        const articulosActualizados = Articulos.filter(
          (art: any) => art.id !== id
        );
        set({
          Articulos: articulosActualizados,
          tipoMensaje: 'correcto',
          msjModal: "Se ha eliminado con éxito el articulo",
          modalMensajesAbierto: true,
          estadoAgregarEditar: 'sin-cargar',
        });
      } else {
        set({
          msjModal: respuesta.mensaje,
          tipoMensaje: 'error',
          modalMensajesAbierto: true,
          estadoAgregarEditar: 'sin-cargar',
        });
      }
    },

    // Métodos de manejo de modales y estado de inputs
    establecerModalMensajesAbierto: (valor: boolean) => {
      set({ modalMensajesAbierto: valor });
    },

    establecerModalBorrarAbiertoConfirmacion: (valor: boolean) => {
      const { eliminarArticulo } = get();
      set({ modalBorrarAbierto: false });
      if (valor) {
        eliminarArticulo();
      }
    },

    ArticuloAgregarEditar: () => {
      const { esEdicion } = get();
      if (esEdicion) {
        const { actualizarArticulo } = get();
        actualizarArticulo();
      } else {
        const { agregarArticulo } = get();
        agregarArticulo();
      }
    },

    establecerModalAgregarEditarAbierto: (id?: number) => {
      if (id) {
        const { Articulos } = get();
        const Articulo = Articulos.find((art: any) => art.id === id);

        set({
          tituloModal: "Editar Articulo",
          modalAbiertoAgregarEditar: true,
          esEdicion: true,
          id: Articulo?.id,
          nombre: Articulo?.nombre,
          precio: Articulo?.precio,
          descripcion: Articulo?.descripcion,
          aplicaIVA: Articulo?.iva,
        });
      } else {
        set({
          tituloModal: "Agregar Articulo",
          modalAbiertoAgregarEditar: true,
          nombre: '',
          descripcion: '',
          precio: 0,
          aplicaIVA: false,
          esEdicion: false,
        });
      }
    },

    establecerModalAgregarEditarCerrar: () => {
      set({ modalAbiertoAgregarEditar: false });
    },
    establecerModalBorrarAbierto: (ArticuloId: number) => {
      set({ modalBorrarAbierto: true, id: ArticuloId });
    },
    establecerCodigo: (valor: string) => {
      set({ codigo: valor });
    },
    establecerNombre: (valor: string) => {
      set({ nombre: valor });
    },
    establecerAplicaIVA: (valor: boolean) => {
      set({ aplicaIVA: valor });
    },
    establecerDescripcion: (valor: string) => {
      set({ descripcion: valor });
    },
    establecerPrecio: (valor: number) => {
      set({ precio: valor });
    },
    reiniciarEstado: () => {
      set(estadoInicial);
    },
  }));

