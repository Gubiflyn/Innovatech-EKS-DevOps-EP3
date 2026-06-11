import { NavLink } from "react-router-dom";

function Navbar() {
  const linkBase =
    "block font-bold py-2 px-3 hover:bg-teal-700 rounded transition-all duration-300";

  const linkClass = ({ isActive }) =>
    isActive ? `${linkBase} bg-teal-700` : linkBase;

  return (
    <nav className="rounded-xl w-[250px] min-h-[880px] bg-teal-600 text-white sticky top-0 p-4 m-4">
      <NavLink to="/" className="block">
        <h2 className="text-xl font-bold mb-8">Despacho Dashboard</h2>
      </NavLink>

      <ul className="space-y-3">
        <li>
          <NavLink to="/usuarios" className={linkClass}>
            Usuarios
          </NavLink>
        </li>

        <li>
          <NavLink to="/productos" className={linkClass}>
            Productos
          </NavLink>
        </li>

        <li>
          <a href="#" className={linkBase}>
            Configuración
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;