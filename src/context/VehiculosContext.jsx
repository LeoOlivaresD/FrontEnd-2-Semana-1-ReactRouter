import { createContext, useState, useContext, useEffect } from "react";

const VehiculosContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useVehiculos = () => {
  const context = useContext(VehiculosContext);
  if (!context) {
    throw new Error("useVehiculos debe usarse dentro de VehiculosProvider");
  }
  return context;
};

// Vehículos predeterminados
const vehiculosIniciales = [
  {
    id: 1,
    marca: "Toyota",
    modelo: "Corolla",
    precio: "15000000",
    año: "2020",
    descripcion: "Vehículo en excelente estado, con mantenciones al día. Motor 1.8L, transmisión automática, aire acondicionado."
  },
  {
    id: 2,
    marca: "Honda",
    modelo: "Civic",
    precio: "18000000",
    año: "2021",
    descripcion: "Sedán deportivo con tecnología avanzada, sistema de seguridad completo, pantalla táctil y cámara de reversa."
  },
  {
    id: 3,
    marca: "Chevrolet",
    modelo: "Cruze",
    precio: "14500000",
    año: "2019",
    descripcion: "Automóvil familiar espacioso, económico en consumo de combustible, ideal para la ciudad y carretera."
  },
  {
    id: 4,
    marca: "Mazda",
    modelo: "3",
    precio: "16500000",
    año: "2022",
    descripcion: "Diseño elegante y moderno, motor eficiente, sistema de infoentretenimiento de última generación."
  },
  {
    id: 5,
    marca: "Nissan",
    modelo: "Sentra",
    precio: "13500000",
    año: "2018",
    descripcion: "Vehículo confiable con bajo kilometraje, perfecto para quienes buscan calidad y economía."
  }
];

export const VehiculosProvider = ({ children }) => {
  // Cargar datos desde localStorage o usar vehículos iniciales
  const [vehiculosInventario, setVehiculosInventario] = useState(() => {
    const saved = localStorage.getItem("vehiculosInventario");
    if (saved) {
      const parsed = JSON.parse(saved);
      // Si no hay datos guardados o está vacío, usar vehículos iniciales
      return parsed.length > 0 ? parsed : vehiculosIniciales;
    }
    return vehiculosIniciales;
  });

  const [vehiculosPosibleCompra, setVehiculosPosibleCompra] = useState(() => {
    const saved = localStorage.getItem("vehiculosPosibleCompra");
    return saved ? JSON.parse(saved) : [];
  });

  // Guardar en localStorage cada vez que cambien los datos
  useEffect(() => {
    localStorage.setItem("vehiculosInventario", JSON.stringify(vehiculosInventario));
  }, [vehiculosInventario]);

  useEffect(() => {
    localStorage.setItem("vehiculosPosibleCompra", JSON.stringify(vehiculosPosibleCompra));
  }, [vehiculosPosibleCompra]);

  const agregarVehiculo = (vehiculo) => {
    const nuevoVehiculo = { ...vehiculo, id: Date.now() };
    setVehiculosInventario([...vehiculosInventario, nuevoVehiculo]);
  };

  const marcarComoPosibleCompra = (id) => {
    const vehiculo = vehiculosInventario.find((v) => v.id === id);
    if (vehiculo) {
      setVehiculosPosibleCompra([...vehiculosPosibleCompra, vehiculo]);
      setVehiculosInventario(vehiculosInventario.filter((v) => v.id !== id));
    }
  };

  const desmarcarVehiculo = (id) => {
    const vehiculo = vehiculosPosibleCompra.find((v) => v.id === id);
    if (vehiculo) {
      setVehiculosInventario([...vehiculosInventario, vehiculo]);
      setVehiculosPosibleCompra(vehiculosPosibleCompra.filter((v) => v.id !== id));
    }
  };

  const value = {
    vehiculosInventario,
    vehiculosPosibleCompra,
    agregarVehiculo,
    marcarComoPosibleCompra,
    desmarcarVehiculo,
  };

  return (
    <VehiculosContext.Provider value={value}>
      {children}
    </VehiculosContext.Provider>
  );
};