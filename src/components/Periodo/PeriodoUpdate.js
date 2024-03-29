import React, { useState, useEffect } from "react";
import PeriodoDataService from "../../services/PeriodoService";
import { useParams } from "react-router-dom";

const PeriodoUpdate = () => {
  const { id } = useParams(); //obtenemos el id del periodo a editar
  const URL = "http://localhost:8080/periodo/" + id; //url para obtener el periodo por id
  

  const [periodo, setPeriodo] = useState({});
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [idPeriodo, setIdPeriodo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);
  const [input, setInput] = useState(false);
  const [errors, setErrors] = useState(false);

  const validarForm = () => {
    let errors = {};
    //letras y numeros y espacios en blanco
    let regexDescripcion = /^[a-zA-Z0-9 ]+$/;

    if (descripcion === "") {
      errors.descripcion = "La descripcion es requerida";
    } else if (!regexDescripcion.test(descripcion)) {
      errors.descripcion = "La descripcion solo puede contener letras y numeros";
    }

    return errors;
  };

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPeriodo(result);
          setDescripcion(result.descripcion);
          setIdPeriodo(result.idPeriodo);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [URL]);

  const validar = () => {
    let regexDescripcion = /^[a-zA-Z0-9 ]+$/;
    if (descripcion === "") {
      return false;
    } else if (!regexDescripcion.test(descripcion)) {
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

  const updatePeriodo = () => {
    reset();
    var data = {
      id: idPeriodo,
      descripcion: descripcion,
    };
    if (validar()) {
      PeriodoDataService.update(id, data)
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
      <h1 className="text-center mb-4">Formulario para actualizar un periodo</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="submit-form">
            <div className="form-group">
              <label htmlFor="identificacion">Identificacion</label>
              <input
                type="text"
                className="form-control"
                id="identificacion"
                required
                disabled
                value={id}
                name="identificacion"
              />
            </div>
            <div className="form-group">
              <label htmlFor="descripcion">Descripcion</label>
              <input
                type="text"
                className="form-control"
                id="descripcion"
                required
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                name="descripcion"
                onBlur={() => setErrors(validarForm())}/>
              {errors.descripcion && (
                <p className="text-danger">{errors.descripcion}</p>
              )}
            </div>
          </div>
          <div className="row justify-content-center mt-4 mb-4">
            <div className="col-md-6 text-center">
              <button onClick={updatePeriodo} className="btn btn-success btn-lg">
                Actualizar
              </button>
            </div>
          </div>
          <div className="row justify-content-center mt-4 mb-4">
            <div className="col-md-6 text-center">
              {success && (
                <div className="alert alert-success" role="alert">
                  Periodo actualizado correctamente
                  <br />
                  <button onClick={home} className="btn btn-warning">
                    Volver
                  </button>
                </div>
              )}
              {err && (
                <div className="alert alert-danger" role="alert">
                  Error al actualizar el periodo
                </div>
              )}
              {input && (
                <div className="alert alert-danger" role="alert">
                  Por favor ingrese todos los campos
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PeriodoUpdate;
