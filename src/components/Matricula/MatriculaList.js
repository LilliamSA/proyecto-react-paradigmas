import MatriculaDataService from "../../services/MatriculaService";
import React from 'react';  
import { Link } from 'react-router-dom';

const MatriculaAdd = () => {

    //metodo para listar y una tabla
    const [matriculas, setMatriculas] = React.useState([]);



    React.useEffect(() => {
        retrieveMatriculas();
    }
    , []);

    const retrieveMatriculas = () => {
        MatriculaDataService.getAll()
        .then(response => {
            setMatriculas(response.data);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    const deleteMatricula = (id) => {
        if (window.confirm("¿Está seguro que desea eliminar esta matricula?")) {
            MatriculaDataService.delete(id)
            .then(response => {
                console.log(response.data);
                retrieveMatriculas();
            })
            .catch(e => {
                console.log(e);
            });
        }
    };

    return (

        <div className="list row">
            <div className="col-md-12">
                <h4>Lista de matriculas</h4>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Estudiante</th>
                            <th>Materia</th>
                            <th>Periodo</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                          

                        </tr>
                    </thead>
                    <tbody>
                        {matriculas.map((matricula, index) => (
                            <tr key={index}>
                                <td>{matricula.id}</td>
                                <td>{matricula.persona.nombre}</td>
                                <td>{matricula.materia.descripcion}</td>
                                <td>{matricula.periodo.descripcion}</td>
                                <td>
                                <Link to={"/matricula/editar/" + matricula.id} className="btn btn-success"> Editar </Link>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteMatricula(matricula.id)}>Eliminar</button>
                                </td>
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MatriculaAdd;
