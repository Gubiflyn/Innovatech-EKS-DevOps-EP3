import { Link } from "react-router-dom";
import Navbar from "../Layouts/Navbar";
import Footer from "../Layouts/Footer";

const productos = [
  {
    id: 1,
    nombre: "Notebook Lenovo ThinkPad",
    sku: "PROD-001",
    categoria: "Computación",
    stock: 12,
    estado: "Disponible",
  },
  {
    id: 2,
    nombre: "Mouse Logitech G203",
    sku: "PROD-002",
    categoria: "Periféricos",
    stock: 35,
    estado: "Disponible",
  },
];

export const Productos = () => {
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
                  Gestión de Productos
                </h1>
                <p className="text-gray-500 mt-2">
                  Listado de productos disponibles para el proceso de despacho.
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
                    <th className="p-3">Producto</th>
                    <th className="p-3">SKU</th>
                    <th className="p-3">Categoría</th>
                    <th className="p-3">Stock</th>
                    <th className="p-3 rounded-r-lg">Estado</th>
                  </tr>
                </thead>

                <tbody>
                  {productos.map((producto) => (
                    <tr
                      key={producto.id}
                      className="border-b border-gray-200 hover:bg-gray-100 transition-all duration-300"
                    >
                      <td className="p-3 font-semibold">{producto.id}</td>
                      <td className="p-3">{producto.nombre}</td>
                      <td className="p-3">{producto.sku}</td>
                      <td className="p-3">{producto.categoria}</td>
                      <td className="p-3">{producto.stock}</td>
                      <td className="p-3">
                        <span className="bg-teal-100 text-teal-700 font-bold px-3 py-1 rounded-full">
                          {producto.estado}
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