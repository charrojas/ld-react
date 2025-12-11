import { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import { usePaginaLogIn } from "../pages/login/store";

// Autor: Charlotte Rojas Padilla
// Fecha: 11/12/2025
// Descripción: Hook para cerrar sesión automáticamente después de un tiempo de inactividad, mostrando un modal de advertencia antes de cerrar.

export const useAutoLogout = (timeout = 15 * 60 * 1000, warningTime = 60 * 1000) => {
  const establecerAutenticado = usePaginaLogIn(state => state.establecerAutenticado);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [logoutTimer, setLogoutTimer] = useState<number | null>(null);
  const [warningTimer, setWarningTimer] = useState<number | null>(null);

  const cerrarSesion = () => {
    localStorage.clear();               
    establecerAutenticado(false);      
  };

  const resetTimers = () => {
    if (modalAbierto) return; 

    if (warningTimer) window.clearTimeout(warningTimer);
    if (logoutTimer) window.clearTimeout(logoutTimer);

    const nuevoWarning = window.setTimeout(() => setModalAbierto(true), timeout - warningTime);
    const nuevoLogout = window.setTimeout(cerrarSesion, timeout);

    setWarningTimer(nuevoWarning);
    setLogoutTimer(nuevoLogout);
  };

  useEffect(() => {
    const eventos = ["mousemove", "keydown", "click"];
    eventos.forEach((evento) => window.addEventListener(evento, resetTimers));
    resetTimers();

    return () => {
      if (warningTimer) window.clearTimeout(warningTimer);
      if (logoutTimer) window.clearTimeout(logoutTimer);
      eventos.forEach((evento) => window.removeEventListener(evento, resetTimers));
    };
  }, [modalAbierto]);

  const continuarSesion = () => {
    setModalAbierto(false);
    resetTimers();
  };

    // Componente del modal de advertencia de inactividad
  const ModalAdvertencia = () => (
    <Dialog open={modalAbierto}>
      <DialogTitle>Inactividad detectada</DialogTitle>
      <DialogContent>
        <Typography>
          Su sesión cerrará automáticamente en 1 minuto por inactividad. ¿Desea continuar conectado?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={continuarSesion} color="primary" variant="contained">
          Continuar sesión
        </Button>
      </DialogActions>
    </Dialog>
  );

  return { ModalAdvertencia, cerrarSesion };
};
