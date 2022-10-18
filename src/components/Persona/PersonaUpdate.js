
 import React, { useState, useEffect} from "react";
 import PersonaDataService from "../../services/PersonaService";
 import {useParams} from "react-router-dom";
 import axios from "axios";
import { findAllByAltText } from "@testing-library/react";

 const PersonaUpdate = (props) => {

        const {id} = useParams();
        const URL = "http://localhost:8080/api/persona/"+id;
        //traer la informacion de la persona por id seleccionada en la tabla

        const [persona, setPersona] = useState({});
        const [submitted, setSubmitted] = useState(false);
        const [error, setError] = useState(null);
        const [isLoaded, setIsLoaded] = useState(false);
        const [identificacion, setIdentificacion] = useState("");
        const [nombre, setNombre] = useState("");
        const [idPersona, setIdPersona] = useState("");

        useEffect(() => {
            axios.get(URL)
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPersona(result.data);
                    setIdPersona(result.data.id);
                    setIdentificacion(result.data.identificacion);
                    setNombre(result.data.nombre);
                   
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
        }
        ,[]);
        const updatePersona = () => {
            var data = {
                id: idPersona,
                identificacion: identificacion,
                nombre: nombre,
            };
            PersonaDataService.update(id, data)
            .then(response => {
                setPersona({
                    id: response.data.id,
                    identificacion: response.data.identificacion,
                    nombre: response.data.nombre,
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        }
        const home = () => {
            window.location.href = "/persona/listar";
        }
        return (
            <div className="submit-form">
            {submitted ? (
                <div>
                <h4>Persona actualizada correctamente!</h4>
                <button className="btn btn-success" onClick={home}>
                    Volver
                </button>
                </div>
            ) : (
                <div>
                <div className="form-group">
                    <label htmlFor="identificacion">Identificacion</label>
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
            )}
            </div>
        );
    }
    export default PersonaUpdate;

        