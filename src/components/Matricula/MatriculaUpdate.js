import React, { useState, useEffect } from "react";
import MatriculaDataService from "../../services/MatriculaService";
import PeriodoDataService from "../../services/PeriodoService";
import MateriaDataService from "../../services/MateriaService";
import PersonaDataService from "../../services/PersonaService";
import { useParams } from "react-router-dom";
import Select from "react-select";

const MatriculaUpdate = () => {
  const { id } = useParams();
  const URL = "http://localhost:8080/matricula/" + id;

  const [selectedOptionPeriodo, setSelectedOptionPeriodo] = useState(null);
  const [selectedOptionPersona, setSelectedOptionPersona] = useState(null);
  const [selectedOptionMateria, setSelectedOptionMateria] = useState(null);
  const [matricula, setMatricula] = useState({});
  const [periodos, setPeriodos] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [personas, setPersonas] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [idMateria, setIdMateria] = useState("");
  const [idPeriodo, setIdPeriodo] = useState("");
  const [idPersona, setIdPersona] = useState("");
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);
  const [input, setInput] = useState(false);
  const [errors, setErrors] = useState(false);

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((result) => {
        console.log("RESULT:", result);
        setIsLoaded(true);
        setMatricula(result);
        setIdPeriodo(result.periodo);
        setIdMateria(result.materia);
        setIdPersona(result.persona);
      })
      .catch((result) => {
        console.log(result);
      });
  }, [URL]);

  //validaciones
  const validar = () => {
    if (idPeriodo === "" || idMateria === "" || idPersona === "") {
      return false;
    }
    else if (selectedOptionPeriodo === null || selectedOptionMateria === null || selectedOptionPersona === null) {
        return false;
    }
    return true;
  };

  const validarForm = () => {
    let errors = {};

    if (idPeriodo === "") {
      errors.idPeriodo = "El periodo es requerido";
    }else if (selectedOptionPeriodo === null) {
        errors.idPeriodo = "El periodo es requerido";
    }

    if (idMateria === "") {
      errors.idMateria = "La materia es requerida";
    }else if (selectedOptionMateria === null) {
        errors.idMateria = "La materia es requerida";
    }

    if (idPersona === "") {
        errors.idPersona = "La persona es requerida";
    }else if (selectedOptionPersona === null) {
        errors.idPersona = "La persona es requerida";
    }

    return errors;
  };

  const reset = () => {
    setSuccess(false);
    setErr(false);
    setInput(false);
    setErrors(false);
  };

  const updateMatricula = () => {
    reset();
    var data = {
      idPeriodo: idPeriodo.id,
      idMateria: idMateria.idM,
      idPersona: idPersona.idP,
    };
    if (validar()) {
        MatriculaDataService.update(id, data)
        .then((response) => {
            setSuccess(true);
            console.log(response.data);
        })
        .catch((e) => {
            setErr(true);
            console.log(e);
        });
    } else {
        setErrors(true);
        setInput(true);
    }
    };

  const home = () => {
    window.location.href = "/matricula/listar";
  };

  React.useEffect(() => {
    retrievePeriodos();
  }, []);

  const retrievePeriodos = () => {
    PeriodoDataService.getAll()
      .then((response) => {
        setPeriodos(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  //retrievePeriodos
  React.useEffect(() => {
    retrieveMaterias();
  }, []);

  const retrieveMaterias = () => {
    MateriaDataService.getAll()
      .then((response) => {
        setMaterias(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //retrievePersonas

  React.useEffect(() => {
    retrievePersonas();
  }, []);

  const retrievePersonas = () => {
    PersonaDataService.getAll()
      .then((response) => {
        setPersonas(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleChange = (selectedOptionPeriodo) => {
    setSelectedOptionPeriodo(selectedOptionPeriodo);
    setIdPeriodo({ id: selectedOptionPeriodo.value });

    MateriaDataService.findAllByPeriodoId(selectedOptionPeriodo.value)
      .then((response) => {
        setMaterias(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleChange1 = (selectedOptionMateria) => {
    setSelectedOptionMateria(selectedOptionMateria);
    setIdMateria({ idM: selectedOptionMateria.value });
  };

  const handleChange2 = (selectedOptionPersona) => {
    setSelectedOptionPersona(selectedOptionPersona);
    setIdPersona({ idP: selectedOptionPersona.value });
  };

  const validarCupos = () => {
    if (selectedOptionMateria != null) {
      if (selectedOptionMateria.cupo == 0) {
        return (
          <div className="alert alert-danger" role="alert">
            {" "}
            No hay cupos disponibles{" "}
          </div>
        );
      } else {
        return (
          <div className="alert alert-success" role="alert">
            {" "}
            Hay {selectedOptionMateria.cupo} cupos disponibles{" "}
          </div>
        );
      }
    }
  };

  return (
    <>
      <div className="submit-form">
        <div className="form-group">
          <label htmlFor="idperiodo">Periodo Actual</label>
          <input
            className="form-control"
            id="idperiodo"
            disabled
            value={idPeriodo.descripcion}
          ></input>
          <input
            className="form-control"
            id="idperiodo"
            disabled
            value={idPeriodo.id}
            name="idperiodo"
            hidden
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="idPeriodo">Periodo</label>
          <Select
            value={selectedOptionPeriodo}
            onChange={handleChange}
            options={periodos.map((periodo) => ({
              value: periodo.id,
              label: periodo.descripcion,
            }))}
            onBlur={() => setErrors(validarForm())}
          />
          {errors.idPeriodo && (
            <p className="text-danger">{errors.idPeriodo}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="idmateria">Materia Actual</label>
          <input
            className="form-control"
            id="idmateria"
            disabled
            value={idMateria.descripcion}
          ></input>
          <input
            className="form-control"
            id="idmateria"
            disabled
            value={idMateria.idM}
            name="idmateria"
            hidden
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="idMateria">Materia</label>
          <Select
            value={selectedOptionMateria}
            onChange={handleChange1}
            options={materias.map((materia) => ({
              value: materia.id,
              label: materia.descripcion,
              cupo: materia.cupos,
            }))}
            onBlur={() => setErrors(validarForm())}
          />
          {errors.idMateria && (
            <p className="text-danger">{errors.idMateria}</p>
          )}

          {validarCupos()}
        </div>
        <div className="form-group">
          <label htmlFor="idpersona">Persona Actual</label>
          <input
            className="form-control"
            id="idpersona"
            disabled
            value={idPersona.nombre}
          ></input>
          <input
            className="form-control"
            id="idpersona"
            disabled
            value={idPersona.idP}
            name="idpersona"
            hidden
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="idPersona">Persona</label>
          <Select
            value={selectedOptionPersona}
            onChange={handleChange2}
            options={personas.map((persona) => ({
              value: persona.id,
              label: persona.nombre,
            }))}
            onBlur={() => setErrors(validarForm())}
          />
          {errors.idPersona && (
            <p className="text-danger">{errors.idPersona}</p>
          )}
        </div>
        <button onClick={updateMatricula} className="btn btn-success">
          Actualizar
        </button>
      </div>
      {success && (
        <div className="alert alert-success" role="alert">
          Actualización exitosa!
          <br />
          <button onClick={home} className="btn btn-warning">
            Volver
          </button>
        </div>
      )}
      {err && (
        <div className="alert alert-danger" role="alert">
          Error, no se puede matricular un curso que no tiene cupos disponibles
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

export default MatriculaUpdate;
