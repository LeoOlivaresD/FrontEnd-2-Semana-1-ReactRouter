import { useEffect } from "react";

function Home() {
  // Forzar scroll al inicio cuando se monta el componente
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="d-flex justify-content-center align-items-center text-white"
      style={{
        backgroundImage: "url('https://eluniverso-el-universo-prod.web.arc-cdn.net/resizer/v2/TGYGHPP3LUD27ALSDOF4AYTJYE.jpg?auth=2aa779477e2e90a14a32ab6f65c1c3bfefc8a5f76f7e88e8296b5abcbe33c40e&width=2010&height=1340&smart=true&quality=70')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      ></div>

      <div className="text-center position-relative px-4" style={{ zIndex: 1 }}>
        <h1 className="display-3 fw-bold mb-3">Vehículos Express</h1>
        <p className="lead mb-4">
          Explora nuestra selección de autos nuevos y usados con confianza y estilo.
        </p>
        <div className="mt-4">
          <a href="#/listarVehiculos" className="btn btn-primary btn-lg me-2">
            Ver Inventario
          </a>
          <a href="#/registroVehiculo" className="btn btn-outline-light btn-lg">
            Registrar Vehículo
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;