import { useNavigate } from "react-router-dom";
import { useVehiculos } from "../context/VehiculosContext";
import Cabecera from "../components/Header";

function PosiblesCompras() {
  const navigate = useNavigate();
  const { vehiculosPosibleCompra, desmarcarVehiculo } = useVehiculos();

  const handleDesmarcar = (id) => {
    desmarcarVehiculo(id);
  };

  return (
    <div>
      <Cabecera title="Vehículos - Posibles Compras" />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Vehículos marcados: {vehiculosPosibleCompra.length}</h4>
          <button
            onClick={() => navigate("/listarVehiculos")}
            className="btn btn-secondary"
          >
            Volver al inventario
          </button>
        </div>

        {vehiculosPosibleCompra.length === 0 ? (
          <div className="alert alert-info">
            <h5>No hay vehículos marcados como posible compra</h5>
            <p>
              Ve al listado de vehículos y marca los que te interesen para
              verlos aquí.
            </p>
            <button
              onClick={() => navigate("/listarVehiculos")}
              className="btn btn-primary"
            >
              Ir al listado
            </button>
          </div>
        ) : (
          <div className="row">
            {vehiculosPosibleCompra.map((vehiculo) => (
              <div key={vehiculo.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="card-header bg-success text-white">
                    <h5 className="card-title mb-0">
                      {vehiculo.marca} {vehiculo.modelo}
                    </h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled">
                      <li className="mb-2">
                        <strong>Año:</strong> {vehiculo.año}
                      </li>
                      <li className="mb-2">
                        <strong>Precio:</strong> ${vehiculo.precio}
                      </li>
                      <li className="mb-2">
                        <strong>Descripción:</strong>
                        <p className="text-muted mt-1">
                          {vehiculo.descripcion}
                        </p>
                      </li>
                    </ul>
                  </div>
                  <div className="card-footer bg-transparent">
                    <button
                      onClick={() => handleDesmarcar(vehiculo.id)}
                      className="btn btn-warning w-100"
                    >
                      ✗ Desmarcar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PosiblesCompras;
