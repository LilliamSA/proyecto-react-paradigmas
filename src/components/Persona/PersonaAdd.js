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

  const validar = () => {
    if ((identificacion === "") | (nombre === "")) {
      return false;
    } else {
      return true;
    }
  };
  const reset = () => {
    setSuccess(false);
    setErr(false);
    setInput(false);
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
          />
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
          />
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
          Por favor llene todos los campos
        </div>
      )}
    </>
  );
};

export default PersonaAdd;
