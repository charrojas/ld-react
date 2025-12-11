import { Box, CircularProgress, DialogContent } from "@mui/material";
import Dialog from "@mui/material/Dialog";

// Autor: Charlotte Rojas Padilla
// Fecha: 11/12/2025
// Descripción: Componente interface para mostrar un modal de carga mientras se espera que termine una acción.

interface ModalCargando {
    cargando: boolean
}

export const ModalCargando = (props: ModalCargando) => {

    return (
        <Dialog open={props.cargando} maxWidth="md">
            <DialogContent>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 2
                    }}>
                    <CircularProgress />
                </Box>
            </DialogContent>
        </Dialog>
    );
}