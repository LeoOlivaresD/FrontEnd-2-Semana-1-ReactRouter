import { VehiculosProvider } from "./context/VehiculosContext";
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <VehiculosProvider>
      <AppRoutes />
    </VehiculosProvider>
  );
}

export default App;
