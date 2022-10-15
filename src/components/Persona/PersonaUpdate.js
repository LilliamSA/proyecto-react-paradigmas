import React, { useState } from "react";
import PersonaDataService from "../../services/PersonaService";

//hacer metodo y formulario para actualizar una persona apartir del id que obtuve en el boton de editar en PersonaList
const PersonaUpdate = (props) => {
    const initialPersonaState = {
        id: null,
        identificacion: "",
        nombre: "",
    };
    const [persona, setPersona] = useState(initialPersonaState);
    const [submitted, setSubmitted] = useState(false);

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

    React.useEffect(() => {
        getPersona(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPersona({ ...persona, [name]: value });
    };

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

    //volver a persona list
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
                value={persona.identificacion}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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



