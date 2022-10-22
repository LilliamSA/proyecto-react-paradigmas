
 import React, {useState, useEffect} from "react"; 
 import PersonaDataService from "../../services/PersonaService";
 import {useParams} from "react-router-dom";


 const PersonaUpdate = () => {

        const {id} = useParams();
        const URL = "http://localhost:8080/persona/"+id;
        //traer la informacion de la persona por id seleccionada en la tabla
        const [success, setSuccess] = useState(false);
        const [err, setErr] = useState(false);
        const [input, setInput] = useState(false);
        const [idPersona, setIdPersona] = useState("");
        const [identificacion, setIdentificacion] = useState("");
        const [nombre, setNombre] = useState("");
        const [persona, setPersona] = useState({});
        const [isloaded , setIsLoaded] = useState(false);   
        const [error, setError] = useState(null);


        useEffect(() => {
            fetch(URL)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPersona(result);
                    setIdentificacion(result.identificacion);
                    setNombre(result.nombre);
                    setIdPersona(result.idPersona);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
        }, [URL]);

      
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

        const updatePersona = () => {
            reset();
            var data = {
                identificacion: identificacion,
                nombre: nombre,
            };
            if (validar()) {
                PersonaDataService.update(id, data)
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
        }
        

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
                    <button onClick={updatePersona} className="btn btn-success">
                        Actualizar
                    </button>
                </div>
                {success && (
                    <div className="alert alert-success" role="alert">
                        Persona actualizada correctamente
                        <br />
          <button onClick={home} className="btn btn-warning">
            Volver
          </button>
                        </div>
                )}
                {err && (
                    <div className="alert alert-danger" role="alert">
                        Error al actualizar persona
                        </div>
                )}
                {input && (
                    <div className="alert alert-danger" role="alert">
                        Por favor ingrese todos los campos
                        </div>
                )}
            </>
        );
    };

    export default PersonaUpdate;