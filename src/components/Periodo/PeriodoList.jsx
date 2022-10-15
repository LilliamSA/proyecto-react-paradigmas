import React from "react";

function PeriodoList() {
  return (
    <div className="container">
        <h1 class="text-center">CRUD Alumnos</h1>
        <div className="row">
            <div className="col-8">
                <h3>Lista de los periodos</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Editar</th>
                            <th scope="col">Borrar</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>id_periodo</td>
                            <td>descripcion</td>
                            <td>
                                <button className="btn btn-primary">Editar</button>
                            </td>
                            <td>
                                <button className="btn btn-danger">Eliminar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
        </div>
    </div>
    );
}
export default PeriodoList;