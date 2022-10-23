import React from 'react';  
import PeriodoDataService from "../../services/PeriodoService";
import { Link } from 'react-router-dom';
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

    //eliminar un periodo por id dando alerta de confirmacion y error
    const deletePeriodo = (id) => {
      //poner alerta de confirmacion y error en caso de que no se pueda eliminar
        if(window.confirm("¿Está seguro que desea eliminar el periodo?")){
            PeriodoDataService.deletePeriodo(id)
            .then(response => {
                console.log(response.data);
                retrievePeriodos();
                alert("Periodo eliminado con éxito");

            })
            .catch(e => {
                console.log(e);
                alert("No se pudo eliminar el periodo");
            });
        }
    };
    

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
                                    <Link to={"/periodo/editar/" + periodo.id} className="btn btn-success"> Editar </Link>
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


