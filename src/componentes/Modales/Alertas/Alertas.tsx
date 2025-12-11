import { Avatar, Box, Button, DialogContent, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import * as Iconos from '@mui/icons-material';
import type { JSX } from "react";


// Autor: Charlotte Rojas Padilla
// Fecha: 11/12/2025
// Descripción: Componente interface para mostrar alertas con diferentes tipos y un botón para cerrar.

interface Alerta {
    abierto: boolean,
    tipo: "correcto" | "alerta" | "error",
    titulo?: string,
    mensaje?: string,
    textoBoton?: string,
    onClose: () => void
}

export const Alerta = (props: Alerta) => {

    let colorIcono: String;
    let icono: JSX.Element;
    let titulo: string;
    let mensaje: string;

    switch (props.tipo) {
        case "correcto":
            colorIcono = "green";
            icono = <Iconos.CheckCircle></Iconos.CheckCircle>;
            titulo = "CORRECTO";
            mensaje = "Se completó la acción de forma correcta.";
            break;
        case "alerta":
            colorIcono = "blue";
            icono = <Iconos.Error></Iconos.Error>;
            titulo = "ALERTA";
            mensaje = "ALERTA";
            break;
        case "error":
            colorIcono = "red";
            icono = <Iconos.Cancel></Iconos.Cancel>;
            titulo = "ERROR";
            mensaje = "Ocurrió un error al ejecutar la acción.";
            break;
    };

    if (props.titulo) {
        titulo = props.titulo;
    }

    if (props.mensaje) {
        mensaje = props.mensaje;
    }

    return (
        <Dialog open={props.abierto} maxWidth="md" onClose={props.onClose}>
            <DialogContent>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 2
                    }}>
                    <Avatar sx={{ m: 1, mb: 2, bgcolor: colorIcono.toString() }}>
                        {icono}
                    </Avatar>
                    <Typography variant="h5" gutterBottom>
                        {titulo}
                    </Typography>
                    <Typography variant="body1" textAlign="center">
                        {mensaje}
                    </Typography>
                    <Button style={{marginTop: 20}} onClick={props.onClose}>
                      <Typography>{props.textoBoton ? props.textoBoton : "ACEPTAR"}</Typography>
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
}