// Autor: Charlotte Rojas Padilla
// Fecha: 11/12/2025
// Descripción: Componente Ventas que permite listar, agregar, editar y eliminar artículos.
// Utiliza la store `usePaginaVentas` para manejar estado y acciones.
// Implementa una tabla de artículos con DataGrid, modales para agregar/editar,
// confirmación de eliminación, indicadores de carga y alertas de mensajes.

import { useEffect } from 'react';
import {
  Button,
  Checkbox,
  DialogActions,
  DialogTitle,
  FormControlLabel,
  TextField,
  DialogContent,
  Dialog,
  Typography,
  Container,
  Box,
  Grid
} from '@mui/material';
import * as Iconos from '@mui/icons-material';
import { GridActionsCellItem, type GridColDef } from '@mui/x-data-grid';
import { usePaginaVentas } from './store';
import { Tabla } from '../../componentes/Tabla/Tabla';
import { ModalConfirmacion } from '../../componentes/Modales/ModalConfirmacion/ModalConfirmacion';
import { ModalCargando } from '../../componentes/Modales/ModalCargando/ModalCargando';
import { Alerta } from '../../componentes/Modales/Alertas/Alertas';
import './Ventas.css';

export const Ventas = () => {

  const IVA: number = 0.13;

  const columns: GridColDef[] = [
    { field: 'codigo', headerName: 'Código', flex: 1, minWidth: 200 },
    { field: 'nombre', headerName: 'Nombre', flex: 1, minWidth: 120 },
    { field: 'descripcion', headerName: 'Descripción', flex: 1, minWidth: 150 },
    { field: 'precio', headerName: 'Precio', flex: 1, minWidth: 120 },

    {
      field: 'iva',
      headerName: 'IVA',
      flex: 1,
      minWidth: 120,
      renderCell(params: any) {
        return params.row.iva ? params.row.precio * IVA : 0;
      }
    },

    {
      field: 'total',
      headerName: 'Total',
      flex: 1,
      minWidth: 120,
      renderCell(params: any) {
        return params.row.iva
          ? params.row.precio * IVA + params.row.precio
          : params.row.precio;
      }
    },

    {
      field: 'actions',
      type: 'actions',
      flex: 1,
      minWidth: 120,
      getActions: (p: any) => [
        <GridActionsCellItem
          icon={<Iconos.Edit />}
          style={{ color: '#66b2ff' }}
          label="Editar"
          onClick={() => {
            establecerProductCode(p.row.codigo);
            establecerModalAgregarEditarAbierto(p.row.id);
          }}
        />,
        <GridActionsCellItem
          icon={<Iconos.Delete />}
          style={{ color: '#ff6666' }}
          label="Eliminar"
          onClick={() => establecerModalBorrarAbierto(p.row.id)}
        />
      ]
    }
  ];

  const articulos = usePaginaVentas((state) => state.Articulos);
  const estadoCargando = usePaginaVentas((state) => state.estadoCargando);
  const modalAbiertoAgregarEditar = usePaginaVentas((state) => state.modalAbiertoAgregarEditar);
  const modalBorrarAbierto = usePaginaVentas((state) => state.modalBorrarAbierto);
  const msjModal = usePaginaVentas((state) => state.msjModal);
  const tipoMensaje = usePaginaVentas((state) => state.tipoMensaje);
  const tituloModal = usePaginaVentas((state) => state.tituloModal);
  const nombrearticulo = usePaginaVentas((state) => state.nombre);
  const descripcionarticulo = usePaginaVentas((state) => state.descripcion);
  const precioarticulo = usePaginaVentas((state) => state.precio);
  const ivaarticulo = usePaginaVentas((state) => state.aplicaIVA);
  const estadoAgregarEditar = usePaginaVentas((state) => state.estadoAgregarEditar);
  const modalAbierto = usePaginaVentas((state) => state.modalMensajesAbierto);

  const establecerModalAgregarEditarAbierto = usePaginaVentas((state) => state.establecerModalAgregarEditarAbierto);
  const establecerModalAgregarEditarCerrar = usePaginaVentas((state) => state.establecerModalAgregarEditarCerrar);
  const establecerModalBorrarAbierto = usePaginaVentas((state) => state.establecerModalBorrarAbierto);
  const listararticulos = usePaginaVentas((state) => state.listarArticulos);
  const reiniciarEstado = usePaginaVentas((state) => state.reiniciarEstado);
  const establecerModalBorrarAbiertoConfirmacion = usePaginaVentas((state) => state.establecerModalBorrarAbiertoConfirmacion);
  const establecerModalMensajesAbierto = usePaginaVentas((state) => state.establecerModalMensajesAbierto);
  const establecerProductCode = usePaginaVentas((state) => state.establecerCodigo);
  const establecerNombre = usePaginaVentas((state) => state.establecerNombre);
  const establecerDescripcion = usePaginaVentas((state) => state.establecerDescripcion);
  const establecerPrecio = usePaginaVentas((state) => state.establecerPrecio);
  const establecerAplicaIVA = usePaginaVentas((state) => state.establecerAplicaIVA);
  const articuloAgregarEditar = usePaginaVentas((state) => state.ArticuloAgregarEditar);

  useEffect(() => {
    reiniciarEstado();
  }, [reiniciarEstado]);

  useEffect(() => {
    listararticulos();
  }, [listararticulos]);

  return (
    <div className='ventas-container'>
      <Container className='ventas-container'>

        <Box >
          <Grid container justifyContent="space-between" alignItems="center" mb={4}>
            <Typography className='titulo-pagina' variant="h5">
              Artículos para venta
            </Typography>

            <Button
              style={{
                background: "white",
                color: "black",
                textTransform: "none",
                fontWeight: "bold",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              startIcon={<Iconos.Add />}
              className="agregar-button"
              onClick={() => establecerModalAgregarEditarAbierto()}
            >
              Agregar
            </Button>

          </Grid>

          <div className='tabla' style={{ display: 'grid', height: 480, backgroundColor: 'hsl(220, 35%, 3%)' }}>
            <Tabla
              titulo="Lista de Artículos"
              columnas={columns}
              registros={articulos}
              cargando={estadoCargando === 'cargando'}
              customDatosId={(articulo: any) => articulo.id}
            />
          </div>
        </Box>

        <Dialog
          open={modalAbiertoAgregarEditar}
          onClose={() => establecerModalAgregarEditarCerrar()}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            style: {
              background: '#111827',
              color: 'white',
              borderRadius: 12,
              width: "430px",
              maxWidth: "90%",
            }
          }}
        >
          <DialogTitle sx={{ textAlign: "center" }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'white' }}>
              {tituloModal}
            </Typography>
          </DialogTitle>

          <DialogContent >
            <Box
              component="form"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                articuloAgregarEditar();
              }}
              sx={{
                display: "flex",
                gridTemplateColumns: "2fr 1fr 1fr min-content",
                gap: 1,
                alignItems: "center",
                width: "100%",
                margin: "0 auto",
                paddingX: 1,
                paddingTop: 2,

              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}

              >
                <Grid container spacing={2}
                  direction="column"
                  alignItems="stretch"
                  sx={{ width: "90%" }}>

                  <Grid item xs={12} className="mui-input-dark"> 
                    <TextField
                      required
                      fullWidth
                      label="Nombre del artículo"
                      value={nombrearticulo}
                      onChange={(e) => establecerNombre(e.target.value)}
                      className="mui-input-dark"
                      InputLabelProps={{ style: { color: '#9ca3af' } }}
                    />
                  </Grid>

                  <Grid item xs={12} className="mui-input-dark">
                    <TextField
                      required
                      fullWidth
                      label="Descripción del artículo"
                      value={descripcionarticulo}
                      onChange={(e) => establecerDescripcion(e.target.value)}
                      className="mui-input-dark"
                      InputLabelProps={{ style: { color: '#9ca3af' } }}
                    />
                  </Grid>

                  <Grid item xs={12} className="mui-input-dark">
                    <TextField
                      required
                      fullWidth
                      type="number"
                      label="Precio del artículo"
                      value={precioarticulo}
                      onChange={(e) => establecerPrecio(Number(e.target.value))}
                      className="mui-input-dark"
                      InputLabelProps={{ style: { color: '#9ca3af' } }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={ivaarticulo}
                          onChange={() => establecerAplicaIVA(!ivaarticulo)}
                          sx={{ color: '#66b2ff' }}
                        />
                      }
                      label="IVA aplica"
                      sx={{ color: 'white' }}
                    />
                  </Grid>
                </Grid>
              </Box>


              <button
                id="botonSubmitAgregarEditar"
                type="submit"
                style={{ display: 'none' }}
              >
              </button>
            </Box>
          </DialogContent>

          <DialogActions sx={{ padding: 2 }}>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item>
                <Button
                  startIcon={<Iconos.Cancel />}
                  variant="contained"
                  color="error"
                  onClick={() => establecerModalAgregarEditarCerrar()}
                >
                  Cancelar
                </Button>
              </Grid>

              <Grid item>
                <Button
                  startIcon={<Iconos.Save />}
                  variant="contained"
                  color="primary"
                  onClick={() => document.getElementById('botonSubmitAgregarEditar')?.click()}
                >
                  Guardar
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>

        <ModalConfirmacion
          abierto={modalBorrarAbierto}
          mensaje="Confirme si desea eliminar el artículo."
          onConfirmacion={() => establecerModalBorrarAbiertoConfirmacion(true)}
          onCancelacion={() => establecerModalBorrarAbiertoConfirmacion(false)}
        />

        <ModalCargando cargando={estadoAgregarEditar === 'cargando'} />

        <Alerta
          abierto={modalAbierto}
          tipo={tipoMensaje}
          mensaje={msjModal}
          onClose={() => establecerModalMensajesAbierto(false)}
        />

      </Container>
    </div>
  );
};
