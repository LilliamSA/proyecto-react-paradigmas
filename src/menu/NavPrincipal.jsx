import React from "react";
import { Link} from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
//hacer un menu desplegable con bootstrap dropdown y react router

const NavPrincipal = () => {
	  return (
	<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
	  <div className="container-fluid">
		<Link className="navbar-brand" to="/">
		 Sistema de matricula
		</Link>
		<button
		  className="navbar-toggler"
		  type="button"
		  data-bs-toggle="collapse"
		  data-bs-target="#navbarNavAltMarkup"
		  aria-controls="navbarNavAltMarkup"
		  aria-expanded="false"
		  aria-label="Toggle navigation"
		>
		  <span className="navbar-toggler-icon"></span>
		</button>
		<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
		  <div className="navbar-nav">
			<Link className="nav-link active" aria-current="page" to="/">
			  Inicio
			</Link>
			<div className="nav-item dropdown">
			  <a
				className="nav-link dropdown-toggle"
				href="#"
				id="navbarDropdownMenuLink"
				role="button"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			  >
				Gestión de matricula
			  </a>
			  <ul
				className="dropdown-menu"
				aria-labelledby="navbarDropdownMenuLink"
			  >
				<li>
				  <Link className="dropdown-item" to="/matricula/agregar">
					Matricular
				  </Link>
				</li>
				<li>
				  <Link className="dropdown-item" to="/matricula/listar">
					Ver matriculas
				  </Link>
				</li>
			  </ul>
			</div>
			<div className="nav-item dropdown">
			  <a
				className="nav-link dropdown-toggle"
				href="#"
				id="navbarDropdownMenuLink"
				role="button"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			  >
				Gestion Administrativa
			  </a>
			  <ul
				className="dropdown-menu"
				aria-labelledby="navbarDropdownMenuLink"
			  >
				<li>
					Periodo
				  <ul className="dropdown sub-menu">
				  <Link className="dropdown-item" to="/periodo/agregar">
					Agregar nuevo periodo
					</Link>
					<Link className="dropdown-item" to="/periodo/listar">
					Listar Periodos
					</Link>
				</ul>
				</li>
				<li>
					Materia
				  <ul className="dropdown sub-menu">
				  <Link className="dropdown-item" to="/materia/agregar">
					Agregar nuevo materia
					</Link>
					<Link className="dropdown-item" to="/materia/listar">
					Listar Materias
					</Link>
				</ul>
				</li>
				<li>
					Persona
				  <ul className="dropdown sub-menu">
				  <Link className="dropdown-item" to="/persona/agregar">
					Agregar nueva persona
					</Link>
					<Link className="dropdown-item" to="/persona/listar">
					Listar personas
					</Link>
				</ul>
				</li>
			  </ul>
			</div>
			<div className="nav-item dropdown">
			  <a
				className="nav-link dropdown-toggle"
				href="#"
				id="navbarDropdownMenuLink"
				role="button"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			  >
				Administración de la Base de Datos
			  </a>
			  <ul
				className="dropdown-menu"
				aria-labelledby="navbarDropdownMenuLink"
			  >
				<li>
				  <Link className="dropdown-item" to="/log/listar">
					Ver logs
				  </Link>
				</li>
			  </ul>
			</div>
		  </div>
		</div>
	  </div>
	</nav>
  );
};

export default NavPrincipal;






