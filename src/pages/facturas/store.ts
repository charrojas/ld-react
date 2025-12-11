import { create } from 'zustand';
import type { MArticulo } from '../ventas/modelos/mArticulo';
import type { SFacturaEncabezado } from './modelos/sFacturaEncabezado';
import type { SDetalle } from './modelos/sDetalle';
import { servicioArticulo } from '../ventas/servicios/servicioArticulo';
import type { SAgregarFacturaEncabezado } from './modelos/sAgregarFacturaEncabezado';
import { servicioFacturaEncabezado } from './servicios/servicioFacturaEncabezado';

// Autor: Charlotte Rojas Padilla
// Fecha: 11/12/2025
// Descripción: Store de la página de facturación usando Zustand. Maneja los estados de artículos, detalles de factura, totales, IVA, modales y acciones para agregar/eliminar detalles y guardar la factura.

type PaginaFacturaState = {
    estadoCargando: 'sin-cargar' | 'cargando' | 'error' | 'cargado';
    estadoAgregar: 'sin-cargar' | 'cargando' | 'error';
    tipoMensaje: 'error' | 'correcto' | 'alerta';
    msjModal: string;
    Articulos: MArticulo[];
    FacturaEncabezado?: SFacturaEncabezado;
    FacturaEncabezadoId: number;
    Detalles: SDetalle[];
    fecha: string,
    modalMensajesAbierto: boolean;
    id: number;
    codigo: string;
    nombre: string;
    descripcion: string;
    precio: number;
    ArticuloIVA: number;
    aplicaIVA: boolean;
    cantidad: number;
    ArticuloSeleccionadoId: number;
    ArticuloSeleccionadoAplicaIVA: boolean;
    totalFactura: number;
    cantidadArticulos: number;
    IVATotal: number,
    subTotalFactura: number;
    IVA: number;
    modalComprobanteAbierto: boolean;
};

type PaginaFacturaActions = {

    listarArticulos: () => Promise<void>;
    agregarFacturaEncabezado: () => void;
    agregarDetalle: () => void;
    eliminarDetalle: (DetalleId: number) => void;
    establecerNombre: () => void;
    establecerCodigo: (valor: string) => void;
    establecerPrecio: (valor: number) => void;
    establecerDescripcion: (valor: string) => void;
    establecerIVA: (valor: number) => void;
    establecerArticuloSeleccionadoId: (valor: number) => void;
    establecerCantidad: (valor: number) => void;
    establecerDetalles: (Detalles: SDetalle[]) => void;
    calcularIVA: (Detalles: SDetalle[], Articulos: MArticulo[]) => number;
    establecerTotalFactura: () => void;
    establecerCantidadArticulosFactura: () => void;
    establecerArticuloSeleccionadoAplicaIVA: (artuctId: number) => void;
    establecerModalMensajesAbierto: (valor: boolean) => void;
    establecerModalComprobante: (valor: boolean) => void;

    reiniciarEstado: () => void;
};

const estadoInicial: PaginaFacturaState = {
    estadoCargando: 'sin-cargar',
    estadoAgregar: 'sin-cargar',
    tipoMensaje: 'alerta',
    Articulos: [],
    Detalles: [],
    fecha: '',
    modalMensajesAbierto: false,
    id: 0,
    codigo: '',
    nombre: '',
    descripcion: '',
    precio: 0,
    ArticuloIVA: 0,
    cantidad: 0,
    aplicaIVA: false,
    ArticuloSeleccionadoId: 0,
    totalFactura: 0,
    cantidadArticulos: 0,
    subTotalFactura: 0,
    IVATotal: 0,
    IVA: 0.13,
    ArticuloSeleccionadoAplicaIVA: false,
    msjModal: '',
    modalComprobanteAbierto: false,
    FacturaEncabezadoId: 0,
};

export const usePaginaFactura = create<
    PaginaFacturaState & PaginaFacturaActions
>((set, get) => ({
    ...estadoInicial,

    // Listar todos los artículos disponibles
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

    // Agregar la factura con sus detalles al backend
    agregarFacturaEncabezado: async () => {
        const { Detalles, Articulos, totalFactura, cantidadArticulos, calcularIVA } = get();

        const fechaActual: Date = new Date();
        const fechaString = fechaActual.toISOString()
        let FacturaEncabezado: SFacturaEncabezado = {
            usuarioId: Number(localStorage.getItem('id')),
            fecha: new Date(fechaString),
            cantidadArticulos: cantidadArticulos,
            total: totalFactura,
        };

        let solicitud: SAgregarFacturaEncabezado = {
            facturaEncabezado: FacturaEncabezado,
            detalles: Detalles,
        };

        set({ estadoCargando: 'cargando' });
        const respuesta = await servicioFacturaEncabezado.agregarFacturaEncabezado(solicitud);

        var ivatotal = calcularIVA(Detalles, Articulos)

        if (respuesta.respuestaExitosa) {
            set({
                FacturaEncabezado: respuesta.dato,
                FacturaEncabezadoId: respuesta.dato?.id,
                IVATotal: ivatotal,
                fecha: fechaActual.toDateString(),
                estadoCargando: 'cargado',
                tipoMensaje: 'correcto',
                msjModal: "Guardando la Factura con éxito.",
                modalMensajesAbierto: true,
            });

        } else {
            set({ estadoCargando: 'error', modalMensajesAbierto: true, tipoMensaje: 'error', msjModal: "Error al guardar la factura.", });
        }
    },

    // Agregar un detalle de artículo a la factura
    agregarDetalle: () => {
        const { Detalles, Articulos, cantidad, codigo, IVA, establecerDetalles, establecerTotalFactura, establecerCantidadArticulosFactura } = get();
        let Articulo = Articulos.find((art) => art.codigo === codigo);

        if (Articulo) {
            let Detalle: SDetalle = {
                cantidad: cantidad,
                articuloId: Articulo.id,
                precio: Articulo?.precio,
                iva: Articulo?.iva
                    ? (Articulo?.precio ?? 0) * cantidad * IVA
                    : 0,
                total: Articulo?.precio * cantidad
            };

            if (Detalles.find((art) => art.articuloId === Articulo?.id)) {
                const nuevosDetalles = Detalles.filter(
                    (Detalle) => Detalle.articuloId !== Articulo?.id
                );
                const DetallesActualizados = [...nuevosDetalles, Detalle];

                establecerDetalles(DetallesActualizados);
            } else {
                const DetallesActualizados = [...Detalles, Detalle];
                establecerDetalles(DetallesActualizados);
            }
        }

        establecerTotalFactura();
        establecerCantidadArticulosFactura();

    },
    
    // Calcular el IVA de los detalles de la factura
    calcularIVA(Detalles: SDetalle[], Articulos: MArticulo[]): number {
        let totalIVA = 0;

        Detalles.forEach((Detalle) => {
            const Articulo = Articulos.find((art) => art.id === Detalle.articuloId);
            if (Articulo) {
                const subtotal = Detalle.cantidad * Detalle.precio;
                totalIVA += subtotal * 0.13;
            }
        });

        return totalIVA;
    },

    eliminarDetalle: (DetalleId: number) => {
        const { Detalles, establecerDetalles, establecerTotalFactura } = get();
        const nuevosDetalles = Detalles.filter((Detalle) => Detalle.articuloId !== DetalleId);

        establecerDetalles(nuevosDetalles);
        establecerTotalFactura();
    },

    establecerNombre: () => {
        const { Articulos, codigo } = get();

        let Articulo = Articulos.find((art) => art.codigo === codigo);
        set({ nombre: Articulo?.nombre });
    },

    establecerCodigo: (valor: string) => {
        const { establecerNombre } = get();
        set({ codigo: valor });

        establecerNombre();
    },

    establecerPrecio: (valor: number) => {
        set({ precio: valor });
    },

    establecerDescripcion: (valor: string) => {
        set({ descripcion: valor });
    },

    establecerIVA: (valor: number) => {
        set({ ArticuloIVA: valor });
    },

    establecerArticuloSeleccionadoId: (valor: number) => {
        set({ ArticuloSeleccionadoId: valor });
    },

    establecerCantidad: (valor: number) => {
        set({ cantidad: valor });
    },

    establecerDetalles: (Detalles: SDetalle[]) => {
        set({ Detalles: Detalles });
    },

    establecerCantidadArticulosFactura: () => {
        const { Detalles } = get();
        let cantidadArticulos = 0;

        Detalles.forEach((Detalle) => {
            cantidadArticulos = cantidadArticulos + Detalle.cantidad
        });

        set({ cantidadArticulos: cantidadArticulos });
    },

    establecerArticuloSeleccionadoAplicaIVA: (artuctId: number) => {
        const { Articulos } = get();
        let Articulo = Articulos.find((art) => art.id === artuctId);
        if (Articulo) {
            set({ ArticuloSeleccionadoAplicaIVA: Articulo.iva });
        }
    },

    establecerModalMensajesAbierto: (valor: boolean) => {
        const { tipoMensaje } = get();
        set({ modalMensajesAbierto: valor });

        if (!valor && tipoMensaje != 'error' ) {
            set({ modalComprobanteAbierto: true })
        }
    },

    establecerModalComprobante: (valor: boolean) => {
        const { reiniciarEstado } = get();
        set({ modalComprobanteAbierto: valor })

        if (!valor) {
            set({ reiniciarEstado })
        }
    },

    reiniciarEstado: () => {
        set(estadoInicial);
    },

    establecerTotalFactura: () => {
        const { Detalles, IVA, Articulos } = get();
        let total = 0;
        let subTotal = 0;
        Detalles.forEach((Detalle) => {
            let Articulo = Articulos.find(
                (art) => art.id === Detalle.articuloId
            );
            subTotal += Detalle.precio * Detalle.cantidad;
            if (Articulo?.iva) {
                let DetalleIva = Detalle.precio * Detalle.cantidad * IVA;
                total += Detalle.precio * Detalle.cantidad + DetalleIva;
            } else {
                total += Detalle.precio * Detalle.cantidad;
            }
        });
        set({ totalFactura: total, subTotalFactura: subTotal });
    },

}));
