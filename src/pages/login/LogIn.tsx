// Autor: Charlotte Rojas Padilla
// Fecha: 11/12/2025
// Descripción: Componente de inicio de sesión. Permite al usuario ingresar su nombre de usuario
// y contraseña, envía las credenciales al store para autenticación y muestra alertas o carga
// mientras se valida la información. Redirige al usuario a "/home" si la autenticación es exitosa.

import { Alert, TextField, Typography, Box, Button, Container, Grid } from '@mui/material';
import * as Iconos from '@mui/icons-material';
import { usePaginaLogIn } from "./store";
import { Navigate } from "react-router-dom";
import { ModalCargando } from '../../componentes/Modales/ModalCargando/ModalCargando';
import './LogIn.css';

export const LogIn = () => {
  const alertErrorLogIn = usePaginaLogIn((state) => state.alertErrorLogin);
  const nombreUsuario = usePaginaLogIn((state) => state.nombreUsuario);
  const contraseniaUsuario = usePaginaLogIn((state) => state.contraseniaUsuario);
  const usuarioAutenticado = usePaginaLogIn((state) => state.usuarioAutenticado);
  const estadoCargando = usePaginaLogIn((state) => state.estadoCargando);
  const establecerUsuario = usePaginaLogIn((state) => state.establecerUsuario);
  const establecerNombreUsuario = usePaginaLogIn((state) => state.establecerNombreUsuario);
  const establecerContraseniaUsuario = usePaginaLogIn((state) => state.establecerContraseniaUsuario);

  const autenticarUsuario = () => {
    const credenciales = {
      username: nombreUsuario,
      contrasenia: contraseniaUsuario,
    };
    establecerUsuario(credenciales);
  };

  return (
    <div className="body2">
      
      <Container
        maxWidth="sm"
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          autenticarUsuario();
        }}
      >
        <Box className="login-card">

          <div className="card-header">
            <img src="src/assets/LDLogo.jpg" alt="Logo" className="card-header-logo" />
            <span className="card-header-text">Logical Data</span>
          </div>

          <Typography className="login-title">
            Iniciar Sesión
          </Typography>


          <Grid container spacing={2} direction="column">
            <Grid item>
              <Typography className="input-label">Digite su usuario</Typography>
              <TextField
                fullWidth
                required
                label=""
                onChange={(e) => establecerNombreUsuario(e.target.value)}
                className="mui-input-dark"
              />
            </Grid>

            <Grid item>
              <Typography className="input-label">Digite su contraseña</Typography>
              <TextField
                fullWidth
                required
                type="password"
                label="" 
                onChange={(e) => establecerContraseniaUsuario(e.target.value)}
                className="mui-input-dark"
              />
            </Grid>

            <Grid item>
              <Button style={ { backgroundColor: "white"
              } }
                variant="contained"
                type="submit"
                className="login-btn"
                endIcon={<Iconos.Login />}
              >
                Iniciar sesión
              </Button>
            </Grid>

            {alertErrorLogIn && (
              <Grid item>
                <Alert severity="error" className="login-error">
                  Usuario o contraseña incorrecta
                </Alert>
              </Grid>
            )}

            <ModalCargando cargando={estadoCargando === 'cargando'} />
          </Grid>
        </Box>

        {usuarioAutenticado && <Navigate to="/home" />}
      </Container>
    </div>
  );
};