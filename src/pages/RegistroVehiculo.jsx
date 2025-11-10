import { useState } from "react";
import Cabecera from "../components/Header";
import { useVehiculos } from "../context/VehiculosContext";
import { getMarcas, getModelos, getAnios } from "../vehiculosData";

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
    const { name, value } = e.target;
    
    // Si cambia la marca, resetear el modelo
    if (name === "marca") {
      setForm({ ...form, marca: value, modelo: "" });
    } else {
      setForm({ ...form, [name]: value });
    }
    
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errores[name]) {
      setErrores({ ...errores, [name]: "" });
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!form.marca) {
      nuevosErrores.marca = "Debes seleccionar una marca";
    }

    if (!form.modelo) {
      nuevosErrores.modelo = "Debes seleccionar un modelo";
    }

    if (!form.precio.trim()) {
      nuevosErrores.precio = "El precio es obligatorio";
    } else if (isNaN(form.precio) || parseFloat(form.precio) <= 0) {
      nuevosErrores.precio = "El precio debe ser un número mayor a 0";
    }

    if (!form.año) {
      nuevosErrores.año = "Debes seleccionar un año";
    }

    if (!form.descripcion.trim()) {
      nuevosErrores.descripcion = "La descripción es obligatoria";
    } else if (form.descripcion.trim().length < 10) {
      nuevosErrores.descripcion = "La descripción debe tener al menos 10 caracteres";
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

    setTimeout(() => {
      setMostrarExito(false);
    }, 3000);
  };

  return (
    <div>
      <Cabecera title="Registro de Vehículo" />
      <div className="container mt-4 mb-5 pb-5">
        {mostrarExito && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            <strong>¡Éxito!</strong> El vehículo ha sido registrado correctamente.
            <button
              type="button"
              className="btn-close"
              onClick={() => setMostrarExito(false)}
            ></button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Marca *</label>
            <select
              name="marca"
              value={form.marca}
              onChange={handleChange}
              className={`form-select ${errores.marca ? "is-invalid" : ""}`}
            >
              <option value="">Seleccione una marca</option>
              {getMarcas().map((marca) => (
                <option key={marca} value={marca}>
                  {marca}
                </option>
              ))}
            </select>
            {errores.marca && (
              <div className="invalid-feedback">{errores.marca}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Modelo *</label>
            <select
              name="modelo"
              value={form.modelo}
              onChange={handleChange}
              className={`form-select ${errores.modelo ? "is-invalid" : ""}`}
              disabled={!form.marca}
            >
              <option value="">
                {form.marca ? "Seleccione un modelo" : "Primero seleccione una marca"}
              </option>
              {form.marca && getModelos(form.marca).map((modelo) => (
                <option key={modelo} value={modelo}>
                  {modelo}
                </option>
              ))}
            </select>
            {errores.modelo && (
              <div className="invalid-feedback">{errores.modelo}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Precio (CLP) *</label>
            <input
              name="precio"
              type="number"
              value={form.precio}
              onChange={handleChange}
              placeholder="Ej: 15000000"
              className={`form-control ${errores.precio ? "is-invalid" : ""}`}
              min="1"
            />
            {errores.precio && (
              <div className="invalid-feedback">{errores.precio}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Año *</label>
            <select
              name="año"
              value={form.año}
              onChange={handleChange}
              className={`form-select ${errores.año ? "is-invalid" : ""}`}
            >
              <option value="">Seleccione un año</option>
              {getAnios().map((anio) => (
                <option key={anio} value={anio}>
                  {anio}
                </option>
              ))}
            </select>
            {errores.año && (
              <div className="invalid-feedback">{errores.año}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Descripción *</label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              placeholder="Describe las características del vehículo (mínimo 5 caracteres)..."
              rows="4"
              className={`form-control ${errores.descripcion ? "is-invalid" : ""}`}
            />
            {errores.descripcion && (
              <div className="invalid-feedback">{errores.descripcion}</div>
            )}
            <small className="text-muted">
              {form.descripcion.length}/10 caracteres mínimos
            </small>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            <i className="bi bi-plus-circle me-2"></i>
            Registrar Vehículo
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistrarVehiculo;