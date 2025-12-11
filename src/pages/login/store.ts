// Autor: Charlotte Rojas Padilla
// Fecha: 11/12/2025
// Descripción: Store para la página de login utilizando Zustand. Maneja el estado de autenticación
// del usuario, credenciales, alertas de error, y estado de carga. Permite establecer usuario,
// credenciales, y controlar la sesión del usuario.  

import type { Usuario } from "./modelos/usuarios/mUsuario";
import type { sUsuario } from "./modelos/usuarios/sUsuario";
import { servicioLogIn } from "./servicios/servicioLogIn";
import { create } from 'zustand';

type PaginaLogInState = {
  usuario?: Usuario;
  credenciales?: sUsuario;
  alertErrorLogin: boolean;
  nombreUsuario: string,
  contraseniaUsuario: string,
  usuarioAutenticado: boolean
  estadoCargando: 'sin-cargar' | 'cargando' | 'error' | 'cargado';
};


type PaginaLogInActions = {
  establecerUsuario: (credenciales: sUsuario) => Promise<void>;
  establecerContraseniaUsuario: (valor: string) => void;
  establecerNombreUsuario: (valor: string) => void;
  establecerAlertErrorLogIn: (valor: boolean) => void;
  establecerAutenticado: (valor: boolean) => void;
};


const estadoInicial: PaginaLogInState = {
  estadoCargando: 'sin-cargar',
  alertErrorLogin: false,
  nombreUsuario: "",
  contraseniaUsuario: "",
  credenciales: { username: "", contrasenia: "" },

  usuarioAutenticado: !!localStorage.getItem("token"),

  usuario: localStorage.getItem("token")
    ? {
        id: Number(localStorage.getItem("id") || 0),
        username: localStorage.getItem("username") || "",
        nombre: localStorage.getItem("nombre") || "",
        apellido: localStorage.getItem("apellido") || "",
      }
    : undefined,
};


export const usePaginaLogIn = create<PaginaLogInState & PaginaLogInActions>((set, _get) => ({ ...estadoInicial,
 
     // Autentica al usuario con las credenciales ingresadas y actualiza el estado
    establecerUsuario: async (credenciales: sUsuario) => {
      set({ estadoCargando: 'cargando'})
      console.log(credenciales);
      const respuesta = await servicioLogIn.autenticarUsuario(credenciales);
      if (respuesta.respuestaExitosa) {
          set({
            usuario: respuesta.dato,
            alertErrorLogin: false,
            usuarioAutenticado: true,
            estadoCargando: 'cargado'
          });        
      } else {
        set({ alertErrorLogin: true, estadoCargando: 'error' })
      }
    },    

    // Actualiza el estado del nombre de usuario ingresado
    establecerNombreUsuario: (valor: string) => {
      set({ nombreUsuario: valor });
    },
    establecerContraseniaUsuario: (valor: string) => {
      set({ contraseniaUsuario: valor});
    },
    // Controla la visibilidad de la alerta de error en el login
    establecerAlertErrorLogIn: (valor: boolean) => {
      set({ alertErrorLogin: valor });
    },
    // Actualiza el estado de autenticación del usuario
    establecerAutenticado: (valor: boolean) => {
      set({ usuarioAutenticado: valor })
    }
  })
);