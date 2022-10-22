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

  const validar = () => {
    if (descripcion === "") {
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
          />
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
          Por favor llene todos los campos
        </div>
      )}
    </>
  );
};

export default PeriodoAdd;
