import React from 'react';  
import PeriodoDataService from "../../services/PeriodoService";

const PeriodoList = () => {

    const [periodos, setPeriodos] = React.useState([]);

     //obtener todas los periodos
     React.useEffect(() => {
        retrievePeriodos();
    }, []);

    //obtener todas los periodos
    const retrievePeriodos = () => {
        PeriodoDataService.getAll()
        .then(response => {
            setPeriodos(response.data);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    //remove periodo by id con mensaje de confirmacion
    const deletePeriodo = (id) => {
        if (window.confirm("¿Está seguro que desea eliminar este periodo?")) {
            PeriodoDataService.delete(id)
            .then(response => {
                console.log(response.data);
                retrievePeriodos();
            })
            .catch(e => {
                console.log(e);
            });
        }
    }

    //metodo que redirija a PeriodoUpdate para usar el formulario

    return(
        <div className="container">
            <div className="list row">
                <div className="col-md-12">
                    <h4>Lista de periodos</h4>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Periodo</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {periodos.map((periodo, index) => (
                                <tr key={index}>
                                    <td>{periodo.id}</td>
                                    <td>{periodo.descripcion}</td>
                                    <td>
                                        <button className="btn btn-primary">Editar</button>
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => deletePeriodo(periodo.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PeriodoList;


