import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Slide,
  TextField,
  Typography
} from '@mui/material';
import { type TransitionProps } from '@mui/material/transitions';
import { GridActionsCellItem, GridCloseIcon, type GridColDef } from '@mui/x-data-grid';
import * as Iconos from '@mui/icons-material';

import { Tabla } from '../../componentes/Tabla/Tabla';
import { ModalCargando } from '../../componentes/Modales/ModalCargando/ModalCargando';
import { Alerta } from '../../componentes/Modales/Alertas/Alertas';
import { usePaginaFactura } from './store';
import './Facturas.css';

// Autor: Charlotte Rojas Padilla
// Fecha: 11/12/2025
// Descripción: Componente principal de la pantalla de facturación. Permite agregar productos a la factura, calcular totales, mostrar tabla de artículos y detalles de la factura, y generar el comprobante para imprimir.

// Configuración de transición para modales
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const Facturas = () => {

  const Articulos = usePaginaFactura((state) => state.Articulos);
  const Detalles = usePaginaFactura((state) => state.Detalles);
  const IVA = usePaginaFactura((state) => state.IVA);

  const estadoCargando = usePaginaFactura((state) => state.estadoCargando);
  const codigo = usePaginaFactura((state) => state.codigo);
  const nombre = usePaginaFactura((state) => state.nombre);
  const fecha = usePaginaFactura((state) => state.fecha);

  const modalAbierto = usePaginaFactura((state) => state.modalMensajesAbierto);
  const modalComprobanteAbierto = usePaginaFactura((state) => state.modalComprobanteAbierto);

  const totalFactura = usePaginaFactura((state) => state.totalFactura);
  const subTotalFactura = usePaginaFactura((state) => state.subTotalFactura);
  const tipoMensaje = usePaginaFactura((state) => state.tipoMensaje);
  const msjModal = usePaginaFactura((state) => state.msjModal);
  const ivaFactura = usePaginaFactura((state) => state.IVATotal);
  const facturaEncabezadoId = usePaginaFactura((state) => state.FacturaEncabezadoId);

  const agregarFacturaEncabezado = usePaginaFactura((state) => state.agregarFacturaEncabezado);
  const agregarDetalle = usePaginaFactura((state) => state.agregarDetalle);
  const eliminarDetalle = usePaginaFactura((state) => state.eliminarDetalle);
  const establecerCodigo = usePaginaFactura((state) => state.establecerCodigo);
  const establecerDetalles = usePaginaFactura((state) => state.establecerDetalles);
  const establecerProductoCantidad = usePaginaFactura((state) => state.establecerCantidad);

  const establecerModalComprobante = usePaginaFactura((state) => state.establecerModalComprobante);
  const establecerModalMensajesAbierto = usePaginaFactura((state) => state.establecerModalMensajesAbierto);

  const listarProductos = usePaginaFactura((state) => state.listarArticulos);
  const reiniciarEstado = usePaginaFactura((state) => state.reiniciarEstado);

  useEffect(() => { reiniciarEstado(); }, [reiniciarEstado]);
  useEffect(() => { listarProductos(); }, [listarProductos]);
  useEffect(() => { establecerDetalles(Detalles); }, [Detalles, establecerDetalles]);

  const columns: GridColDef[] = [
    {
      field: 'codigo',
      headerName: 'Código',
      flex: 1,
      minWidth: 200,
      renderCell(params: any) {
        return Articulos.find((art) => art.id === params.row.articuloId)?.codigo;
      }
    },
    {
      field: 'nombre',
      headerName: 'Nombre',
      flex: 1,
      minWidth: 150,
      renderCell(params: any) {
        return Articulos.find((art) => art.id === params.row.articuloId)?.nombre;
      }
    },
    {
      field: 'precio',
      headerName: 'Precio',
      flex: 1,
      minWidth: 120,
      renderCell(params: any) {
        return Articulos.find((art) => art.id === params.row.articuloId)?.precio;
      }
    },
    {
      field: 'iva',
      headerName: 'IVA',
      flex: 1,
      minWidth: 120,
      renderCell(params: any) {
        const cantidad = Detalles.find((d) => d.articuloId === params.row.articuloId)?.cantidad;
        const ivaBool = Articulos.find((a) => a.id === params.row.articuloId)?.iva;

        if (cantidad) {
          return ivaBool ? (params.row.precio * IVA * params.row.cantidad).toFixed(3) : 0;
        }
        return 0;
      }
    },
    {
      field: 'cantidad',
      headerName: 'Cantidad',
      flex: 1,
      minWidth: 120
    },
    {
      field: 'total',
      headerName: 'Total',
      flex: 1,
      minWidth: 140,
      renderCell(params: any) {
        const cantidad = Detalles.find((d) => d.articuloId === params.row.articuloId)?.cantidad;
        const ivaBool = Articulos.find((a) => a.id === params.row.articuloId)?.iva;

        if (cantidad) {
          const subtotal = Number(params.row.precio) * cantidad;
          return ivaBool ? (subtotal + subtotal * IVA).toFixed(3) : subtotal;
        }
        return 0;
      }
    },
    {
      field: 'actions',
      type: 'actions',
      flex: 1,
      minWidth: 100,
      getActions: (p: any) => [
        <GridActionsCellItem
          icon={<Iconos.Delete />}
          style={{ color: '#ff6666' }}
          label="ELIMINAR"
          onClick={() => eliminarDetalle(p.row.articuloId)}
        />
      ]
    }
  ];


  return (
    <div className="facturas-container">
      <Container className="facturas-container">

        <Typography className="titulo-pagina" variant="h5"> Facturación </Typography>

        <Grid container spacing={3} className="facturas-form">

          <Grid item xs={15} md={3}>
            <Typography className="input-label">Código</Typography>
            <FormControl className="codigo">
              <Select
                id="cod"
                value={codigo}
                onChange={(e) => establecerCodigo(e.target.value)}
              >
                {Articulos.map((art) => (
                  <MenuItem key={art.id} value={art.codigo}>
                    {art.codigo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={5}>
            <Typography className="input-label">Artículo</Typography>
            <TextField className='articulo' fullWidth value={nombre} disabled />
          </Grid>

          <Grid item xs={12} md={2}>
            <Typography className="input-label">Cantidad</Typography>
            <TextField
              fullWidth
              type="number"
              onChange={(e) => establecerProductoCantidad(Number(e.target.value))}
            />
          </Grid>

          <Grid item xs={12} md={3} sx={{ ml: "auto" }} display="flex" alignItems="flex-end" justifyContent="flex-end">
            <Button style={{
              background: "white",
              color: "black",
              textTransform: "none",
              fontWeight: "bold",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
              variant="contained"
              startIcon={<Iconos.Add />}
              className="btn-agregar"
              onClick={() => agregarDetalle()}
            >
              Agregar
            </Button>
          </Grid>
        </Grid>

        <div className='tabla' style={{ display: 'grid', height: 480, backgroundColor: 'hsl(220, 35%, 3%)', marginTop: 20 }}>
          <Tabla
            titulo="ARTÍCULOS"
            columnas={columns}
            registros={Detalles}
            cargando={estadoCargando === 'cargando'}
            customDatosId={(d) => d.articuloId}
          />
        </div>
        <Grid container justifyContent="space-between" alignItems="center" marginTop={2}>
          <Button
            variant="contained"

            startIcon={<Iconos.ShoppingBag />}
            className="btn-facturar"
            onClick={() => {
  if (Detalles.length === 0) {
    establecerModalMensajesAbierto(true);
    usePaginaFactura.setState({
      tipoMensaje: "error",
      msjModal: "No hay artículos agregados a la factura",
    });
    return;
  }

  agregarFacturaEncabezado();
}}

          >
            Facturar
          </Button>
          <Grid item xs={12} display="flex" justifyContent="flex-end" marginTop={3}>
            <Typography className="subtotal-label">
              Subtotal: <strong>{subTotalFactura}</strong>
            </Typography>
          </Grid>
        </Grid>

        <Typography className="total-label" display="flex" alignItems="flex-end" justifyContent="flex-end">
          Total: <strong className='total-strong'> {totalFactura}</strong>
        </Typography>


        <ModalCargando cargando={estadoCargando === 'cargando'} />

        <Alerta
          abierto={modalAbierto}
          tipo={tipoMensaje}
          mensaje={msjModal}
          onClose={() => establecerModalMensajesAbierto(false)}
        />


        <Dialog className='modalFactura'
          open={modalComprobanteAbierto}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => establecerModalComprobante(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              padding: 2,
              borderRadius: 3,
              backgroundColor: "#070711ff"
            }
          }}
        >
          <DialogTitle sx={{ m: 0, p: 2, position: 'relative' }}>
            <Box textAlign="center" mb={1}>
              <Typography variant="h5" fontWeight="bold">
                COMPROBANTE
              </Typography>

              <Typography variant="body2" color="textPrimary">
                Número: {facturaEncabezadoId}
              </Typography>
              <Typography variant="body2" color="textPrimary">
                Fecha: {fecha}
              </Typography>
              <Typography variant="body2" color="textPrimary">
                Usuario: {localStorage.getItem("username")}
              </Typography>
            </Box>

            <IconButton
              aria-label="cerrar"
              onClick={() => establecerModalComprobante(false)}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: 'grey.500',
              }}
            >
              <GridCloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent dividers sx={{ borderRadius: 2 }}>
            <Typography
              variant="h6"
              align="center"
              sx={{ mb: 2, color: 'white' }}
            >
              Detalle de Factura
            </Typography>

            <Box sx={{ borderRadius: 2, overflow: "hidden", border: "1px solid #202630" }}>

              <Grid container sx={{ background: "#465672", paddingY: 1, paddingX: 2 }}>
                {["Artículo", "Cant.", "Precio", "Total"].map((header, index) => (
                  <Grid
                    item
                    key={index}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      flexGrow: index === 0 ? 2 : 1,
                      flexBasis: 0,
                      borderRight: index < 3 ? "1px solid #0a0b0eff" : "none",
                      paddingLeft: 1,

                    }}
                  >
                    <Typography fontWeight="bold">{header}</Typography>
                  </Grid>
                ))}
              </Grid>


              {Detalles.map((detalle, i) => {
                const articulo = Articulos.find((a) => a.id === detalle.articuloId)?.nombre || "";

                return (
                  <Grid
                    container
                    key={i}
                    sx={{
                      borderTop: "1px solid #0a0b0eff",
                      textAlign: "left",
                      minHeight: "46px",
                      paddingX: 2
                    }}
                  >
                    <Grid item sx={{ display: "flex", justifyContent: "flex-start", flexGrow: 2, flexBasis: 0, alignItems: "center", borderRight: "1px solid #0a0b0eff", paddingLeft: 1 }}>
                      <Typography noWrap sx={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                        {articulo}
                      </Typography>
                    </Grid>

                    <Grid item sx={{ display: "flex", justifyContent: "flex-start", flexGrow: 1, flexBasis: 0, alignItems: "center", borderRight: "1px solid #0a0b0eff", paddingLeft: 1 }}>
                      <Typography>{detalle.cantidad}</Typography>
                    </Grid>

                    <Grid item sx={{ display: "flex", justifyContent: "flex-start", flexGrow: 1, flexBasis: 0, alignItems: "center", borderRight: "1px solid #0a0b0eff", paddingLeft: 1 }}>
                      <Typography>{detalle.precio.toFixed(2)}</Typography>
                    </Grid>

                    <Grid item sx={{ display: "flex", justifyContent: "flex-start", flexGrow: 1, flexBasis: 0, alignItems: "center", paddingLeft: 1 }}>
                      <Typography>{(detalle.cantidad * detalle.precio).toFixed(2)}</Typography>
                    </Grid>
                  </Grid>
                );
              })}
            </Box>


            <Box mt={3} textAlign="right">
              <Typography>IVA: {ivaFactura.toFixed(2)}</Typography>
              <Typography>Subtotal: {subTotalFactura.toFixed(2)}</Typography>
              <Typography variant="h6" fontWeight="bold">Total: {totalFactura.toFixed(2)}</Typography>
            </Box>
          </DialogContent>

          <DialogActions sx={{ display: "flex", justifyContent: "flex-start" }}>
            <Button className="btn-facturar" variant="contained" style={{ display: "flex", justifyContent: "right" }} color="secondary" onClick={() => window.print()}>
              Imprimir PDF
            </Button>

          </DialogActions>
        </Dialog>

      </Container>
    </div>
  );
};