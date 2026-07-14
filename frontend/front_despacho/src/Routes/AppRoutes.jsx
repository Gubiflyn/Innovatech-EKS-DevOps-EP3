import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CrudAdmin } from "../componentes/CrudAdmin.jsx";
import { Usuarios } from "../componentes/Pages/Usuarios.jsx";
import { Productos } from "../componentes/Pages/Productos.jsx";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CrudAdmin />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/productos" element={<Productos />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;