import Cabecera from "../components/Header";
function Contacto() {
  return (
    <div className="container mt-5">
      <Cabecera title="Contáctanos" />
      <form className="p-4 border rounded shadow-sm bg-white">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-control" placeholder="Tu nombre" />
        </div>
        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input type="email" className="form-control" placeholder="correo@ejemplo.com" />
        </div>
        <div className="mb-3">
          <label className="form-label">Mensaje</label>
          <textarea className="form-control" rows="4" placeholder="Escribe tu mensaje aquí"></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-100">Enviar</button>
      </form>
    </div>
  );
}

export default Contacto;

