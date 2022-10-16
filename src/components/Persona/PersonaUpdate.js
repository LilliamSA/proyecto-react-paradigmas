import React, { useState } from "react";
import PersonaDataService from "../../services/PersonaService";

const PersonaUpdate = (props) => {

//obtener el id de la persona
const id = props.match.params.id;
const initialPersonaState = {
    id: null,
    identificacion: "",
    nombre: "",
};


const [persona, setPersona] = useState(initialPersonaState);
const [submitted, setSubmitted] = useState(false);
//obtener la persona por id
const getPersona = (id) => {
    PersonaDataService.get(id)
    .then(response => {
        setPersona(response.data);
        console.log(response.data);
    })
    .catch(e => {
        console.log(e);
    });
};
// traer los datos de la persona en base al id

//actualizar la persona
const updatePersona = () => {
    PersonaDataService.update(persona.id, persona)
    .then(response => {
        console.log(response.data);
        setSubmitted(true);
    })
    .catch(e => {
        console.log(e);
    });
};
//obtener la persona por id
React.useEffect(() => {
    getPersona(id);
}, [id]);
//metodo para volver a la pagina principal
const home = () => {
    window.location.href = "/";
}
//formulario para actualizar una persona
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
            required
            value={persona.nombre}
            onChange={(e) => setPersona({ ...persona, nombre: e.target.value })}
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
};

export default PersonaUpdate;



