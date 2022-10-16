import React from 'react';  
import MateriaDataService from "../../services/PeriodoService";

const MateriaList = () => {
    //hacer una tabla con la lista de materias y las acciones de editar y eliminar
    const [materias, setMaterias] = React.useState([]);
    const [setCurrentMateria] = React.useState(null);
    const [setCurrentIndex] = React.useState(-1);
    //obtener todas las materias
    React.useEffect(() => {
        retrieveMaterias();
    }
    , []);
    //obtener todas las materias
    const retrieveMaterias = () => {
        MateriaDataService.getAll()
        .then(response => {
            setMaterias(response.data);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }
    const setActiveMateria = (materia, index) => {
        setCurrentMateria(materia);
        setCurrentIndex(index);
    }
    //remove materia by id con mensaje de confirmacion
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
    }
    const editMateria = (id) => {
        if (window.confirm("¿Está seguro que desea editar esta materia?")) {
            MateriaDataService.update(id)
            .then(response => {
                console.log(response.data);
                retrieveMaterias();
            })
            .catch(e => {
                console.log(e);
            });
        }
    }
    return(
        //una tabla con los datos de materia id, cupos, descripcion y la descripcion de periodo
        <div className="container">
            <div className="list row">
                <div className="col-md-12">
                    <h4>Lista de materias</h4>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Cupos</th>
                                <th>Descripcion</th>
                                <th>Periodo</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {materias.map((materia, index) => (
                                <tr key={index}>
                                    <td>{materia.id}</td>
                                    <td>{materia.cupos}</td>
                                    <td>{materia.descripcion}</td>
                                    <td>{materia.idPeriodo}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => editMateria(materia.id)}>Editar</button>
                                    </td>
                                    <td> <button className="btn btn-danger" onClick={() => deleteMateria(materia.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default MateriaList;
        

