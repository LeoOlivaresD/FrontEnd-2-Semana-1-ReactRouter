import { useEffect, useState } from "react";
import Cabecera from "../components/Header";
import { useVehiculos } from "../context/VehiculosContext";

function ListarVehiculos() {
  const { vehiculosInventario } = useVehiculos();
  const [filtro, setFiltro] = useState({
    tipo: "todos", // marca, precio, año, todos
    valor: "",
  });
  const [vehiculosFiltrados, setVehiculosFiltrados] = useState([]);

  // Actualizar vehículos filtrados cuando cambie el inventario o el filtro
  useEffect(() => {
    filtrarVehiculos();
  }, [vehiculosInventario, filtro]);

  const filtrarVehiculos = () => {
    let resultado = [...vehiculosInventario];

    if (filtro.tipo !== "todos" && filtro.valor.trim() !== "") {
      resultado = resultado.filter((vehiculo) => {
        const valorVehiculo = String(vehiculo[filtro.tipo]).toLowerCase();
        const valorBusqueda = filtro.valor.toLowerCase();
        return valorVehiculo.includes(valorBusqueda);
      });
    }

    setVehiculosFiltrados(resultado);
  };

  const handleFiltroChange = (e) => {
    setFiltro({ ...filtro, [e.target.name]: e.target.value });
  };

  const limpiarFiltro = () => {
    setFiltro({ tipo: "todos", valor: "" });
  };

  return (
    <div>
      <Cabecera title="Lista de Vehículos" />
      <div className="container mt-4">
        {/* Panel de filtros */}
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">Filtrar Vehículos</h5>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Filtrar por:</label>
                <select
                  name="tipo"
                  value={filtro.tipo}
                  onChange={handleFiltroChange}
                  className="form-select"
                >
                  <option value="todos">Todos</option>
                  <option value="marca">Marca</option>
                  <option value="modelo">Modelo</option>
                  <option value="precio">Precio</option>
                  <option value="año">Año</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Buscar:</label>
                <input
                  type="text"
                  name="valor"
                  value={filtro.valor}
                  onChange={handleFiltroChange}
                  placeholder="Ingrese el valor a buscar..."
                  className="form-control"
                  disabled={filtro.tipo === "todos"}
                />
              </div>
              <div className="col-md-2 d-flex align-items-end">
                <button
                  onClick={limpiarFiltro}
                  className="btn btn-secondary w-100"
                >
                  Limpiar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de vehículos */}
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Precio</th>
                <th>Año</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {vehiculosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    {vehiculosInventario.length === 0
                      ? "No hay vehículos registrados"
                      : "No se encontraron vehículos con ese filtro"}
                  </td>
                </tr>
              ) : (
                vehiculosFiltrados.map((v) => (
                  <tr key={v.id}>
                    <td>{v.marca}</td>
                    <td>{v.modelo}</td>
                    <td>${v.precio}</td>
                    <td>{v.año}</td>
                    <td>{v.descripcion}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListarVehiculos;
