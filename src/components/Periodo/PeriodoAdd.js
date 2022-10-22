import React, { useState } from "react";
import PeriodoDataService from "../../services/PeriodoService";

const PeriodoAdd = () => {
  const initialPeriodoState = {
    id: null,
    descripcion: "",
  };
  const [descripcion, setDescripcion] = useState("");
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);
  const [input, setInput] = useState(false);
  const [errors, setErrors] = useState(false);

  const validar = () => {
    let regexDescripcion = /^[a-zA-Z0-9 ]+$/;
    if (descripcion === "") {
      return false;
    } else if (!regexDescripcion.test(descripcion)) {
      return false;
    }
    return true;
  };

  const validarForm = () => {
    //que acepte letras, numeros y espacios en blanco
    let regexDescripcion = /^[a-zA-Z0-9 ]+$/;

    let errors = {};

    if (descripcion === "") {
      errors.descripcion = "La descripcion es requerida";
    } else if (!regexDescripcion.test(descripcion)) {
      errors.descripcion = "La descripcion solo puede contener letras y numeros";
    }
    return errors;
  };

  const reset = () => {
    setSuccess(false);
    setErr(false);
    setInput(false);
    setErrors(false);
  };

  const savePeriodo = () => {
    reset();
    var data = {
      descripcion: descripcion,
    };
    if (validar()) {
      PeriodoDataService.create(data)
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
    window.location.href = "/periodo/listar";
  };

  return (
    <>
      <div className="submit-form">
        <div className="form-group">
          <label htmlFor="descripcion">Periodo</label>
          <input
            type="text"
            className="form-control"
            id="descripcion"
            required
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            name="descripcion"
            onBlur={() => setErrors(validarForm())}
          />
          {errors.descripcion && (
            <p className="text-danger">{errors.descripcion}</p>
          )}
        </div>
        <button onClick={savePeriodo} className="btn btn-success">
          Agregar
        </button>
      </div>
      {success && (
        <div className="alert alert-success" role="alert">
          Periodo agregado con éxito!
          <br />
          <button onClick={home} className="btn btn-warning">
            Volver
          </button>
        </div>
      )}
      {err && (
        <div className="alert alert-danger" role="alert">
          Error al agregar el periodo
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

export default PeriodoAdd;
