import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import QuienesSomos from "./pages/QuienesSomos";
import Contacto from "./pages/Contacto";
import RegistrarVehiculo from "./pages/RegistroVehiculo";
import ListarVehiculos from "./pages/ListarVehiculos";
import DetalleVehiculo from "./pages/DetalleVehiculo";
import PosiblesCompras from "./pages/PosiblesCompras";
import MenuInferior from "./components/MenuInferior";

function AppRoutes() {
  return (
    <Router>
      <div className="w-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quienes-somos" element={<QuienesSomos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/registroVehiculo" element={<RegistrarVehiculo />} />
          <Route path="/listarVehiculos" element={<ListarVehiculos />} />
          <Route path="/detalleVehiculo/:id" element={<DetalleVehiculo />} />
          <Route path="/posiblesCompras" element={<PosiblesCompras />} />
        </Routes>
        <MenuInferior />
      </div>
    </Router>
  );
}

export default AppRoutes;
