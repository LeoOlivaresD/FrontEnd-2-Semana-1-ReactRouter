import { Link } from 'react-router-dom';

function MenuInferior() {
  return (
    <nav className="fixed-bottom bg-white border-top py-2 shadow-sm">
      <div className="container d-flex justify-content-around">
        <Link to="/" className="btn btn-outline-primary btn-sm">Inicio</Link>
        <Link to="/quienes-somos" className="btn btn-outline-primary btn-sm">Quiénes Somos</Link>
        <Link to="/contacto" className="btn btn-outline-primary btn-sm">Contacto</Link>
      </div>
    </nav>
  );
}
export default MenuInferior;
