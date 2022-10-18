import React, { useState } from "react";
import PersonaDataService from "../../services/PersonaService";

//metodos para agregar una persona
const PersonaAdd = (props) => {
    const initialPersonaState = {
        id: null,
        identificacion: "",
        nombre: "",
    };
    const [persona, setPersona] = useState(initialPersonaState);
    const [submitted, setSubmitted] = useState(false);
     
    const savePersona = () => {
        var data = {
            
        identificacion: persona.identificacion,
        nombre: persona.nombre,
        };
    
        PersonaDataService.create(data)
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
    };
    const home = () => {
        window.location.href = "/persona/listar";
    }

    return (
        <div className="submit-form">
        {submitted ? (
            <div>
            <h4>Persona agregada correctamente!</h4>
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
                value={persona.identificacion}
                onChange={(e) => setPersona({ ...persona, identificacion: e.target.value })}
                name="identificacion"
                />
            </div>
            <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input
                type="text"
                className="form-control"
                id="nombre"
                //validar que el campo es requerido que sea string
                required
                value={persona.nombre}
                onChange={(e) => setPersona({ ...persona, nombre: e.target.value })}
                name="nombre"
                />
            </div>
            <button onClick={savePersona} className="btn btn-success">
                Agregar
            </button>
            </div>
        )}
        </div>
    );
};

export default PersonaAdd;