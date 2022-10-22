import React, { useState } from "react";
import PersonaDataService from "../../services/PersonaService";

//metodos para agregar una persona
const PersonaAdd = (props) => {
  const initialPersonaState = {
    id: null,
    identificacion: "",
    nombre: "",
  };
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);
  const [input, setInput] = useState(false);
  const [identificacion, setIdentificacion] = useState("");
  const [nombre, setNombre] = useState("");
  const [errors, setErrors] = useState(false);
  
 const validacionesForm = () => {
    let errors = {};
    //letras y numeros
    let regexIdentificacion = /^[a-zA-Z0-9]+$/;
    let regexNombre = /^[a-zA-Z]+$/;

    if (identificacion === "") {
      errors.identificacion = "La identificacion es requerida";
    } else if (!regexIdentificacion.test(identificacion)) {
      errors.identificacion =
        "La identificacion solo puede contener letras y numeros";
    }else if (identificacion.length < 9) {
      errors.identificacion =
        "La identificacion debe tener al menos 9 caracteres";
    }else if (identificacion.length > 9) {
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
  
  const validar = () => {
    let errors = {};
    //letras y numeros
    let regexIdentificacion = /^[a-zA-Z0-9]+$/;
    let regexNombre = /^[a-zA-Z]+$/;
    if ((identificacion === "") | (nombre === "")) {
      return false;
    } else if (!regexIdentificacion.test(identificacion)) {
      return false;
    } else if (identificacion.length < 9) {
      return false;
    }else if (identificacion.length > 9) {
      return false;
    }
    return true;
  };
  const reset = () => {
    setSuccess(false);
    setErr(false);
    setInput(false);
    setErrors(false);
  };

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
        }
        )
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
    <>
      <div className="submit-form">
        <div className="form-group">
          <label htmlFor="identificacion">Identificación</label>
          <input
            type="text"
            className="form-control"
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
            className="form-control"
            id="nombre"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            name="nombre"
            onBlur={() => setErrors(validacionesForm())}
          />
          {errors.nombre && <p className="text-danger">{errors.nombre}</p>}

        </div>
        <button onClick={savePersona} className="btn btn-success">
          Agregar
        </button>
      </div>
      {success && (
        <div className="alert alert-success" role="alert">
          Persona agregada correctamente
          <br />
          <button onClick={home} className="btn btn-warning">
            Volver
          </button>
        </div>
      )}
      {err && (
        <div className="alert alert-danger" role="alert">
          Error al agregar persona
        </div>
      )}
      {input && (
        <div className="alert alert-danger" role="alert">
          Por favor llene todos los campos o revise sus datos
        </div>
      )}
    </>
  );
};

export default PersonaAdd;
