import React, { useState, useEffect } from "react";
import PersonaDataService from "../../services/PersonaService";
import { useParams } from "react-router-dom";

const PersonaUpdate = () => {
  
  const { id } = useParams(); //obtiene el id de la url
  const URL = "http://localhost:8080/persona/" + id; //url para obtener la persona por id


  //traer la informacion de la persona por id seleccionada en la tabla
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);
  const [input, setInput] = useState(false);
  const [idPersona, setIdPersona] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [nombre, setNombre] = useState("");
  const [persona, setPersona] = useState({});
  const [isloaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState(false);

  //valida dando mensajes en los inputs
  const validacionesForm = () => {
    let errors = {};
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


  useEffect(() => { //se ejecuta cuando se carga la pagina
    fetch(URL) //obtiene la persona por id
      .then((res) => res.json()) //convierte la respuesta a json
      .then( //se ejecuta cuando la respuesta es exitosa
        (result) => { //result es el json
          setIsLoaded(true); //indica que la respuesta fue exitosa
          setPersona(result);
          setIdentificacion(result.identificacion); 
          setNombre(result.nombre); 
          setIdPersona(result.idPersona); 
        },
        (error) => { //se ejecuta cuando la respuesta es erronea
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [URL]);

  const reset = () => { //limpia los inputs
    setSuccess(false);
    setErr(false);
    setInput(false);
    setErrors(false);
  };
  
  //valida los inputs
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
 
  //actualiza la persona
  const updatePersona = () => {
    reset();
    var data = { //una variable con la informacion de la persona
      identificacion: identificacion,
      nombre: nombre,
    };
    if (validar()) { //si los datos son validos
      PersonaDataService.update(id, data) 
        .then((response) => { //se ejecuta cuando la respuesta es exitosa
          setSuccess(true);
        })
        .catch((e) => {
          setErr(true); //se ejecuta cuando la respuesta es erronea
        });
    } else {
      setInput(true); //si los datos no son validos muestra un mensaje
    }
  };

  const home = () => {
    window.location.href = "/persona/listar";
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Formulario para actualizar una persona</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="submit-form">
            <div className="submit-form">
              <div className="form-group">
                <label htmlFor="identificacion">Identificación</label>
                <input
                  type="text"
                  className="form-control mb-2 mt-2"
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
                  className="form-control mb-2 mt-2"
                  id="nombre"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  name="nombre"
                  onBlur={() => setErrors(validacionesForm())}/>
                {errors.nombre && <p className="text-danger">{errors.nombre}</p>}
              </div>
            </div>
          </div>
          <div className="row justify-content-center mt-4 mb-4">
            <div className="col-md-6 text-center">
              <button onClick={updatePersona} className="btn btn-success btn-lg">
                Actualizar
              </button>
            </div>
          </div>
          <div className="row justify-content-center mt-4 mb-4">
            <div className="col-md-6 text-center">
              {success && (
                <div className="alert alert-success text-center" role="alert">
                  Persona actualizada correctamente
                  <br />
                  <button onClick={home} className="btn btn-warning">
                    Volver
                  </button>
                </div>
              )}
              {err && ( 
                <div className="alert alert-danger text-center" role="alert">
                  Error al actualizar persona
                </div>
              )}
              {input && (
                <div className="alert alert-danger text-center" role="alert">
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
export default PersonaUpdate;
