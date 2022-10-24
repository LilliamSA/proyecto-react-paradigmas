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

    <div className="container mt-5">
      <h1 className="text-center mb-4">Formulario para agregar un periodo</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="submit-form"></div>
          <div className="submit-form">
            <div className="form-group">
              <label htmlFor="descripcion">Nombre del Periodo</label>
              <input
                type="text"
                className="form-control mt-2 mb-2"
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
          </div>

        </div>
        <div className="row justify-content-center mt-4 mb-4">
          <div className="col-md-6 text-center">
            <button onClick={savePeriodo} className="btn btn-success btn-lg">
              Agregar
            </button>
          </div>
        </div>
        <div className="row justify-content-center mt-4 mb-4">
          <div className="col-md-6 text-center">
            {
              success && (
                <div className="alert alert-success text-center" role="alert">
                  Periodo agregado con éxito!
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
                  Error al agregar el periodo
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

export default PeriodoAdd;
