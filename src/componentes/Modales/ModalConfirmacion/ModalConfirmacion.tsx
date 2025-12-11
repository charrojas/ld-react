import { Avatar, Box, Button, DialogContent, Grid, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import * as Iconos from '@mui/icons-material';

// Autor: Charlotte Rojas Padilla
// Fecha: 11/12/2025
// Descripción: Componente interface para mostrar un modal de confirmación con botones de aceptar y cancelar.

interface ModalConfirmacion{
  abierto: boolean;
  titulo?: string;
  mensaje?: string;
  textoBotonConfirmar?: string;
  textoBotonCancelar?: string;
  onConfirmacion: () => void;
  onCancelacion: () => void;
}

export const ModalConfirmacion = (props: ModalConfirmacion) => {
  let titulo: string = "Confirmar";
  let mensaje: string = "Desea realizar la acción";

  if (props.titulo) {
    titulo = props.titulo;
  }

  if (props.mensaje) {
    mensaje = props.mensaje;
  }

  return (
    <Dialog open={props.abierto} maxWidth='md'>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 2,
          }}
        >
          <Avatar sx={{ m: 1, mb: 2, bgcolor: 'blue' }}>
            <Iconos.QuestionMark />
          </Avatar>
          <Typography variant='h5' gutterBottom>
            {titulo}
          </Typography>
          <Typography variant='body1' textAlign='center'>
            {mensaje}
          </Typography>
          <Grid container spacing={2} justifyContent={'center'}>
            <Grid item>
              <Button
                style={{ marginTop: 20 }}
                onClick={props.onCancelacion}
                color='secondary'
                variant='contained'
              >
                <Typography>
                  {props.textoBotonCancelar
                    ? props.textoBotonCancelar
                    : "Cancelar"}
                </Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button
                style={{ marginTop: 20 }}
                onClick={props.onConfirmacion}
                color='primary'
                variant='contained'
              >
                <Typography>
                  {props.textoBotonConfirmar
                    ? props.textoBotonConfirmar
                    : "Confirmar"}
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
};