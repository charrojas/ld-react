import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid, type GridColDef, type GridRowIdGetter, type GridValidRowModel, type GridToolbarProps, QuickFilter, QuickFilterControl, QuickFilterTrigger, QuickFilterClear } from '@mui/x-data-grid';

// Autor: Charlotte Rojas Padilla
// Fecha: 11/12/2025
// Descripción: Componente interface para mostrar tablas con paginación, búsqueda rápida y personalización de columnas.

interface TablaProps {
  id?: string;
  titulo: string;
  columnas: GridColDef[];
  registros: GridValidRowModel[];
  cargando?: boolean;
  customDatosId?: GridRowIdGetter;
  registrosPorPaginaOpciones?: number[];
  modeloPaginacion?: {
    paginaActual: number;
    registrosPorPaginaSeleccionado: number;
  };
}

function ToolbarVisual(props: { titulo?: string }) {
  const controlId = 'quick-filter-control';

  return (
    <Box
      sx={{
        p: 1,
        pb: 0,
        display: 'flex',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'hsl(220, 35%, 3%)'
      }}
    >
      <Typography variant="h6" gutterBottom>
        {props.titulo}
      </Typography>

      <QuickFilter defaultExpanded aria-label="Filtro rápido">
        <QuickFilterTrigger aria-label="Abrir filtro rápido" />
        <QuickFilterControl id={controlId} placeholder="Buscar..." aria-label="Buscar en la tabla" />
        <QuickFilterClear aria-label="Limpiar búsqueda rápida" />
      </QuickFilter>
    </Box>
  );
}


export const Tabla: React.FC<TablaProps> = (props) => {

  const CustomToolbar: React.FC<GridToolbarProps> = React.useCallback(
    (_gridToolbarProps) => {
      return <ToolbarVisual titulo={props.titulo} />;
    },
    [props.titulo]
  );

  return (
    <DataGrid
      rows={props.registros}
      columns={props.columnas}
      loading={props.cargando}
      initialState={{
        pagination: {
          paginationModel: props.modeloPaginacion
            ? {
                page: props.modeloPaginacion.paginaActual,
                pageSize: props.modeloPaginacion.registrosPorPaginaSeleccionado,
              }
            : { page: 0, pageSize: 25 },
        },
      }}
      pageSizeOptions={props.registrosPorPaginaOpciones ?? [25, 50, 100]}
      getRowId={props.customDatosId}
      slots={{ toolbar: CustomToolbar }}/>
  );
};


