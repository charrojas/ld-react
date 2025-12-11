// Autor: Charlotte Rojas Padilla
// Fecha: 11/12/2025
// Descripción: Configuración de rutas de la aplicación utilizando React Router.
// Definiendo rutas públicas y privadas, utilizando el componente `PrivateRoute` para
// proteger páginas que requieren autenticación. Se integra con el layout principal `MainLayout`.

import { createBrowserRouter } from 'react-router-dom';
import { LogIn } from '../pages/login/LogIn';
import { Home } from '../pages/home/Home';
import { Ventas } from '../pages/ventas/Ventas';
import MainLayout from '../MainLayout';
import { Facturas } from '../pages/facturas/Facturas';
import { PrivateRoute } from '../componentes/PrivateRoute/PrivateRoute';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LogIn />,
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <PrivateRoute><Home /></PrivateRoute> },
      { path: 'home', element: <PrivateRoute><Home /></PrivateRoute> },
      { path: 'ventas', element: <PrivateRoute><Ventas /></PrivateRoute> },
      { path: 'facturacion', element: <PrivateRoute><Facturas /></PrivateRoute> },
    ],
  },
]);

