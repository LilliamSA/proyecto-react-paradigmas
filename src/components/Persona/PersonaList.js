//hacer una tabla con la lista de personas
import React from 'react';  
import PersonaDataService from '../../services/PersonaService';





//crear una tabla
const PersonaList = (props) => {
    const [personas, setPersonas] = React.useState([]);
    const [setCurrentPersona] = React.useState(null);
    const [setCurrentIndex] = React.useState(-1);
    //obtener todas las personas
    React.useEffect(() => {
        retrievePersonas();
    }, []);
    //obtener todas las personas
    const retrievePersonas = () => {
        PersonaDataService.getAll()
        .then(response => {
            setPersonas(response.data);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };
    const setActivePersona = (persona, index) => {
        setCurrentPersona(persona);
        setCurrentIndex(index);
    };
    //remove persona by id con mensaje de confirmacion
    const deletePersona = (id) => {
        if (window.confirm("¿Está seguro que desea eliminar esta persona?")) {
            PersonaDataService.delete(id)
            .then(response => {
                console.log(response.data);
                retrievePersonas();
            })
            .catch(e => {
                console.log(e);
            });
        }
    };

    const editPersona = (id) => {
        props.history.push(`/persona/${id}`);
    };
    return(
      //una tabla con los datos de la base de datos
      <div className="container">
        <div className="list row">
            <div className="col-md-12">
                <h4>Lista de personas</h4>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Identificacion</th>
                            <th>Nombre</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {personas &&
                            personas.map((persona, index) => (
                                <tr
                                    onClick={() => setActivePersona(persona, index)}
                                    key={index}
                                >
                                    <td>{persona.id}</td>
                                    <td>{persona.identificacion}</td>
                                    <td>{persona.nombre}</td>
                                    <td>
                                        <button
                                        //redirigir a la pagina del formulario para editar usando el id de la persona seleccionada usando window.location
                                            className="btn btn-primary"
                                            onClick={() => window.location.href=`/persona/PersonaUpdate/${persona.id}`}

                                        >
                                            Editar
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => deletePersona(persona.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    );
};
                            

export default PersonaList;