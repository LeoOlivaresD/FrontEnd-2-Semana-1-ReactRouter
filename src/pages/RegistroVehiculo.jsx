import { useState } from "react";
import Cabecera from "../components/Header";
import { useVehiculos } from "../context/VehiculosContext";

function RegistrarVehiculo() {
  const { agregarVehiculo } = useVehiculos();

  const [form, setForm] = useState({
    marca: "",
    modelo: "",
    precio: "",
    año: "",
    descripcion: "",
  });

  const [errores, setErrores] = useState({});
  const [mostrarExito, setMostrarExito] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errores[e.target.name]) {
      setErrores({ ...errores, [e.target.name]: "" });
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!form.marca.trim()) {
      nuevosErrores.marca = "La marca es obligatoria";
    }

    if (!form.modelo.trim()) {
      nuevosErrores.modelo = "El modelo es obligatorio";
    }

    if (!form.precio.trim()) {
      nuevosErrores.precio = "El precio es obligatorio";
    } else if (isNaN(form.precio) || parseFloat(form.precio) <= 0) {
      nuevosErrores.precio = "El precio debe ser un número mayor a 0";
    }

    if (!form.año.trim()) {
      nuevosErrores.año = "El año es obligatorio";
    } else if (
      isNaN(form.año) ||
      parseInt(form.año) < 1900 ||
      parseInt(form.año) > new Date().getFullYear() + 1
    ) {
      nuevosErrores.año = `El año debe estar entre 1900 y ${
        new Date().getFullYear() + 1
      }`;
    }

    if (!form.descripcion.trim()) {
      nuevosErrores.descripcion = "La descripción es obligatoria";
    } else if (form.descripcion.trim().length < 5) {
      nuevosErrores.descripcion =
        "La descripción debe tener al menos 10 caracteres";
    }

    return nuevosErrores;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevosErrores = validarFormulario();

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    agregarVehiculo(form);
    setForm({ marca: "", modelo: "", precio: "", año: "", descripcion: "" });
    setErrores({});
    setMostrarExito(true);

    // Ocultar mensaje de éxito después de 3 segundos
    setTimeout(() => {
      setMostrarExito(false);
    }, 3000);
  };

  return (
    <div>
      <Cabecera title="Registro de Vehículo" />
      <div className="container mt-4">
        {mostrarExito && (
          <div
            className="alert alert-success alert-dismissible fade show"
            role="alert"
          >
            <strong>¡Éxito!</strong> El vehículo ha sido registrado
            correctamente.
            <button
              type="button"
              className="btn-close"
              onClick={() => setMostrarExito(false)}
            ></button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Marca *</label>
            <input
              name="marca"
              value={form.marca}
              onChange={handleChange}
              placeholder="Ej: Toyota, Honda, Ford..."
              className={`form-control ${errores.marca ? "is-invalid" : ""}`}
            />
            {errores.marca && (
              <div className="invalid-feedback">{errores.marca}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Modelo *</label>
            <input
              name="modelo"
              value={form.modelo}
              onChange={handleChange}
              placeholder="Ej: Corolla, Civic, F-150..."
              className={`form-control ${errores.modelo ? "is-invalid" : ""}`}
            />
            {errores.modelo && (
              <div className="invalid-feedback">{errores.modelo}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Precio *</label>
            <input
              name="precio"
              type="number"
              value={form.precio}
              onChange={handleChange}
              placeholder="Ej: 15000000"
              className={`form-control ${errores.precio ? "is-invalid" : ""}`}
            />
            {errores.precio && (
              <div className="invalid-feedback">{errores.precio}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Año *</label>
            <input
              name="año"
              type="number"
              value={form.año}
              onChange={handleChange}
              placeholder="Ej: 2020"
              className={`form-control ${errores.año ? "is-invalid" : ""}`}
            />
            {errores.año && (
              <div className="invalid-feedback">{errores.año}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Descripción *</label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              placeholder="Describe las características del vehículo (mínimo 10 caracteres)..."
              rows="4"
              className={`form-control ${
                errores.descripcion ? "is-invalid" : ""
              }`}
            />
            {errores.descripcion && (
              <div className="invalid-feedback">{errores.descripcion}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Registrar Vehículo
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistrarVehiculo;
