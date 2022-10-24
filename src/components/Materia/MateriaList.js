import MateriaDataService from "../../services/MateriaService";
import React from 'react';
import { Link } from 'react-router-dom';
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
        //poner alerta de confirmacion y error en caso de que no se pueda eliminar
        if (window.confirm("¿Está seguro de eliminar la materia?")) {
            MateriaDataService.deleteMateria(id)
                .then(response => {
                    console.log(response.data);
                    retrieveMaterias();
                    alert("Materia eliminada con éxito");
                })
                .catch(e => {
                    console.log(e);
                    alert("No se pudo eliminar la materia, verifique que no tenga matriculas asociadas");
                });
        }

    };


    //tabla de materias
    return (
        <div className="container mt-5">

            <h2 className="text-center mb-5">Lista de materias</h2>

            <div className="list row justify-content-center">
                <div className="col-md-12">

                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Asignatura</th>
                                <th>Cupos</th>
                                <th>Periodo</th>
                                <th>Editar</th>
                                <th>Eliminar</th>

                            </tr>
                        </thead>
                        <tbody>
                            {materias.map((materia, index) => (
                                <tr key={index}>
                                    <td>{materia.id}</td>
                                    <td>{materia.descripcion}</td>
                                    <td>{materia.cupos}</td>
                                    <td>{materia.periodo.descripcion}</td>

                                    <td>
                                        <Link to={"/materia/editar/" + materia.id} className="btn btn-success"> Editar </Link>
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
        </div>
    );
};

export default MateriaList;