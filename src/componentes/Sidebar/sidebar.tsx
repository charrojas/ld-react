import './sidebar.css';
import React from "react";
import { NavLink } from "react-router-dom";
import Inventory2Icon from '@mui/icons-material/Inventory2';
import { usePaginaLogIn } from '../../pages/login/store';


// Autor: Charlotte Rojas Padilla
// Fecha: 11/12/2025
// Descripción: Componente de la barra lateral con enlaces de navegación(Ventas/Facturación) y botón para cerrar sesión.

const Sidebar: React.FC = () => {

  const establecerAutenticado = usePaginaLogIn(state => state.establecerAutenticado);

  const cerrarSesion = () => {
    localStorage.clear();
    establecerAutenticado(false); 
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="brand">
          <div className="logo"></div>
          <span className="brand-name">Logical Data</span>
        </div>
      </div>

      <nav className="nav">
        <NavLink
          to="/Ventas"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <Inventory2Icon className="nav-icon" />
          <span className="nav-text">Ventas</span>
        </NavLink>

        <NavLink
          to="/facturacion"
          className={({ isActive }) =>
            `nav-item ${isActive ? "active" : ""}`
          }
        >
          <span className="nav-icon">🧾</span>
          <span className="nav-text">Facturación</span>
        </NavLink>
      </nav>

      <div className="sidebar-bottom">
        <button onClick={cerrarSesion} className="logout-btn">
          Cerrar sesión
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;
