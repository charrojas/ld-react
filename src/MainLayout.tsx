// Autor: Charlotte Rojas Padilla
// Fecha: 11/12/2025
// Descripción: Componente principal de layout para la aplicación.
// Contiene el sidebar lateral y un outlet para renderizar las páginas hijas.
// Además, integra el hook `useAutoLogout` para controlar el cierre automático de sesión

import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './componentes/Sidebar/sidebar';
import { useAutoLogout } from './hooks/useAutoLogout';

const MainLayout: React.FC = () => {
  const { ModalAdvertencia } = useAutoLogout(15*60*1000, 60*1000); // 15 min, advertencia 1 min

  return (
    <div style={{ display: 'flex', height: '100%',  width: '100%', backgroundColor: "hsl(220, 35%, 3%)" }}>
      <Sidebar />
      <main style={{ flex: 1 }}>
        <Outlet />
        <ModalAdvertencia />
      </main>
    </div>
  );
};

export default MainLayout;
