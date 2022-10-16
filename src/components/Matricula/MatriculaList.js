import MatriculaDataService from "../../services/MatriculaService";
import React from 'react';  

const MatriculaAdd = () => {

    //metodo para listar y una tabla
    const [matriculas, setMatriculas] = React.useState([]);
    const [currentMatricula, setCurrentMatricula] = React.useState(null);
    const [currentIndex, setCurrentIndex] = React.useState(-1);
    const [searchTitle, setSearchTitle] = React.useState("");


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
                            <th>Eliminar</th>
                            <th>Editar</th>

                        </tr>
                    </thead>
                    <tbody>
                        {matriculas.map((matricula, index) => (
                            <tr key={index}>
                                <td>{matricula.id}</td>
                                <td>{matricula.persona.nombre}</td>
                                <td>{matricula.materia.asignatura}</td>
                                <td>{matricula.periodo.descripcion}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => deleteMatricula(matricula.id)}>Eliminar</button>
                                </td>
                                <td>
                                    <button className="btn btn-primary">Editar</button>
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
