// Autor: Charlotte Rojas Padilla
// Fecha: 11/12/2025
// Descripción: Componente principal de la aplicación React.
// Renderiza la página de inicio de sesión y sirve como contenedor
// base para futuras rutas y layouts.

import './App.css';
import { LogIn } from './pages/login/LogIn';

function App() {
  return (
    <div className="app-container">
      <LogIn />
    </div>
  );
}

export default App;
