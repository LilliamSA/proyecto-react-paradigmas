import MateriaDataService from "../../services/MateriaService";
import React from 'react';  

const MateriaList = () => {
    const [materias, setMaterias] = React.useState([]);
    const [currentMateria, setCurrentMateria] = React.useState(null);
    const [currentIndex, setCurrentIndex] = React.useState(-1);
    const [searchNombre, setSearchNombre] = React.useState("");

    React.useEffect(() => {
        retrieveMaterias();
    }, []);

    const retrieveMaterias = () => {
        MateriaDataService.getAll()
            .then((response) => {
                setMaterias(response.data);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const deleteMateria = (id) => {
        if (window.confirm("¿Está seguro que desea eliminar esta materia?")) {
            MateriaDataService.delete(id)
            .then(response => {
                console.log(response.data);
                retrieveMaterias();
            })
            .catch(e => {
                console.log(e);
            });
        }
    };

    //tabla de materias
    return (
        <div className="list row">
            <div className="col-md-12">
                <h4>Lista de materias</h4>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Asignatura</th>
                            <th>Cupos</th>
                            <th>Periodo</th>
                            <th>Eliminar</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {materias.map((materia, index) => (
                            <tr key={index}>
                                <td>{materia.id}</td>
                                <td>{materia.asignatura}</td>
                                <td>{materia.cupos}</td>
                                <td>{materia.periodo.descripcion}</td>
            
                                <td>
                                    <button className="btn btn-primary">Editar</button>
                                </td>
                                <td>
                                <button className="btn btn-danger" onClick={() => deleteMateria(materia.id)}>Eliminar</button>
                                </td>
                            
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MateriaList;