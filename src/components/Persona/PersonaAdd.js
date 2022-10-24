import React, { useState } from "react";
import PersonaDataService from "../../services/PersonaService";

const PersonaAdd = (props) => {
  const initialPersonaState = {
    id: null,
    identificacion: "",
    nombre: "",
  };

  //variables
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);
  const [input, setInput] = useState(false);
  const [identificacion, setIdentificacion] = useState("");
  const [nombre, setNombre] = useState("");
  const [errors, setErrors] = useState(false);

 //valida dando mensajes en los inputs
  const validacionesForm = () => { 
    let errors = {}; //sirve para guardar los errores
    //letras y numeros
    let regexIdentificacion = /^[a-zA-Z0-9]+$/;
    let regexNombre = /^[a-zA-Z ]+$/;

    if (identificacion === "") {
      errors.identificacion = "La identificacion es requerida";
    } else if (!regexIdentificacion.test(identificacion)) {
      errors.identificacion =
        "La identificacion solo puede contener letras y numeros";
    } else if (identificacion.length < 9) {
      errors.identificacion =
        "La identificacion debe tener al menos 9 caracteres";
    } else if (identificacion.length > 9) {
      errors.identificacion =
        "La identificacion debe tener maximo 9 caracteres";
    }

    if (nombre === "") {
      errors.nombre = "El nombre es requerido";
    } else if (!regexNombre.test(nombre)) {
      errors.nombre = "El nombre solo puede contener letras";
    }

    return errors;
  };
 
  //valida dando mensajes en el boton
  const validar = () => {
    let errors = {};
    //letras y numeros
    let regexIdentificacion = /^[a-zA-Z0-9]+$/;
    let regexNombre = /^[a-zA-Z ]+$/;
    if ((identificacion === "") | (nombre === "")) {
      return false;
    } else if (
      !regexIdentificacion.test(identificacion) | !regexNombre.test(nombre)
    ) {
      return false;
    } else if (identificacion.length < 9) {
      return false;
    } else if (identificacion.length > 9) {
      return false;
    }
    return true;
  };
 
  //limpiar los inputs
  const reset = () => {
    setSuccess(false); 
    setErr(false); 
    setInput(false);
    setErrors(false);
  };
  
  //crear la persona
  const savePersona = () => { 
    reset();
    var data = {
      identificacion: identificacion,
      nombre: nombre,
    };
    if (validar()) {
      PersonaDataService.create(data)
        .then((response) => {
          setSuccess(true);
        })
        .catch((e) => {
          setErr(true);
        });
    } else {
      setInput(true);
    }
  };

  const home = () => {
    window.location.href = "/persona/listar";
  };

  return (

    <div className="container mt-5">
      <h1 className="text-center mb-4">Formulario para agregar una persona</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="submit-form">
            <div className="form-group">
              <label htmlFor="identificacion">Identificación</label>
              <input
                type="text"
                className="form-control mt-2 mb-2"
                id="identificacion"
                required
                value={identificacion}
                onChange={(e) => setIdentificacion(e.target.value)}
                name="identificacion"
                onBlur={() => setErrors(validacionesForm())}
              />
              {errors.identificacion && (
                <p className="text-danger">{errors.identificacion}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                className="form-control mt-2 mb-2"
                id="nombre"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                name="nombre"
                onBlur={() => setErrors(validacionesForm())}
              />
              {errors.nombre && <p className="text-danger">{errors.nombre}</p>}
            </div>
          </div>

        </div>
        <div className="row justify-content-center mt-4 mb-4">
          <div className="col-md-6 text-center">
            <button onClick={savePersona} className="btn btn-success btn-lg">
              Agregar
            </button>
          </div>
        </div>
        <div className="row justify-content-center mt-4 mb-4">
          <div className="col-md-6 text-center">
            {
              success && (
                <div className="alert alert-success text-center" role="alert">
                  Persona agregada correctamente
                  <br />
                  <button onClick={home} className="btn btn-warning">
                    Volver
                  </button>
                </div>
              )
            }
            {
              err && (
                <div className="alert alert-danger text-center" role="alert">
                  Error al agregar persona
                </div>
              )
            }
            {
              input && (
                <div className="alert alert-danger text-center" role="alert">
                  Por favor llene todos los campos o revise sus datos
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>

  );
};

export default PersonaAdd;
