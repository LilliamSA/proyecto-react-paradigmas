import React from "react";

function PeriodoAdd() {
    return (
        <div className="container">
            <div className="col-4">
                <h3>Formulario de Periodos</h3>
                <form>
                    <div className="form-group">
                        <label>Identificacion</label>
                        <input type="text" className="form-control" placeholder="Nombre" />
                    </div>
                    <div className="form-group">
                        <label>Descripcion</label>
                        <input type="text" className="form-control" placeholder="Apellido" />
                    </div>
                </form>
                <div className="row">
                    <div className="col-12">
                        <br></br>
                        <button className="btn btn-success">Agregar Alumno</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PeriodoAdd;