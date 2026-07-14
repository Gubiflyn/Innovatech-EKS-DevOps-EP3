import { Link } from "react-router-dom";
import Navbar from "../Layouts/Navbar";
import Footer from "../Layouts/Footer";

const usuarios = [
  {
    id: 1,
    nombre: "Camila Torres",
    correo: "camila.torres@innovatech.cl",
    rol: "Administradora",
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "Felipe Delgado",
    correo: "felipe.delgado@innovatech.cl",
    rol: "Operador de despacho",
    estado: "Activo",
  },
];

export const Usuarios = () => {
  return (
    <div className="grid grid-cols-[auto_1fr] min-h-screen bg-gray-50">
      <div className="col-span-1">
        <Navbar />
      </div>

      <div className="overflow-y-auto p-6">
        <section className="mb-8">
          <div className="bg-white border border-gray-200 rounded-lg shadow p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Gestión de Usuarios
                </h1>
                <p className="text-gray-500 mt-2">
                  Listado de usuarios registrados en el sistema de despacho.
                </p>
              </div>

              <Link
                to="/"
                className="bg-teal-500 text-white font-bold px-5 py-2 rounded-xl hover:bg-teal-600 transition-all duration-300"
              >
                Volver al Dashboard
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-teal-500 text-white">
                    <th className="p-3 rounded-l-lg">ID</th>
                    <th className="p-3">Nombre</th>
                    <th className="p-3">Correo</th>
                    <th className="p-3">Rol</th>
                    <th className="p-3 rounded-r-lg">Estado</th>
                  </tr>
                </thead>

                <tbody>
                  {usuarios.map((usuario) => (
                    <tr
                      key={usuario.id}
                      className="border-b border-gray-200 hover:bg-gray-100 transition-all duration-300"
                    >
                      <td className="p-3 font-semibold">{usuario.id}</td>
                      <td className="p-3">{usuario.nombre}</td>
                      <td className="p-3">{usuario.correo}</td>
                      <td className="p-3">{usuario.rol}</td>
                      <td className="p-3">
                        <span className="bg-teal-100 text-teal-700 font-bold px-3 py-1 rounded-full">
                          {usuario.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};