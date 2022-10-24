import React from "react";
import { Link } from "react-router-dom";
import PersonaDataService from "../../services/PersonaService";

const PersonaList = (props) => {

  //consts que sirven para guardar los datos de la persona
  const [personas, setPersonas] = React.useState([]);
  const [setCurrentPersona] = React.useState(null);
  const [setCurrentIndex] = React.useState(-1);

  //obtener todas las personas
  React.useEffect(() => { //se ejecuta cuando se carga la pagina
    retrievePersonas();
  }, []);

  //obtener todas las personas
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
  const setActivePersona = (persona, index) => {
    setCurrentPersona(persona);
    setCurrentIndex(index);
  };
 
  //eliminar una persona
  const deletePersona = (id) => {
    if (window.confirm("¿Está seguro que desea eliminar esta persona?")) {
      PersonaDataService.deletePersona(id)
        .then((response) => {
          console.log(response.data);
          retrievePersonas();
          alert("Persona eliminada con éxito");
        })
        .catch((e) => {
          console.log(e);
          alert(
            "No se pudo eliminar la persona, verifique que no tenga matriculas asociadas"
          );
        });
    }
  };
 
  //tabla de personas
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5">Lista de personas</h2>
      <div className="list row justify-content-center">
        <div className="col-md-12">
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
                  <tr key={index}>
                    <td>{persona.id}</td>
                    <td>{persona.identificacion}</td>
                    <td>{persona.nombre}</td>
                    <td>
                      <Link to={"/persona/editar/" + persona.id} className="btn btn-success">Editar</Link>
                    </td>
                    <td>
                      <button className="btn btn-danger" onClick={() => deletePersona(persona.id)}>Eliminar</button>
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
