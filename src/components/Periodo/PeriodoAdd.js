import React, { useState } from "react";
import PeriodoDataService from "../../services/PeriodoService";

const PeriodoAdd = () => {
    const initialPeriodoState = {
        id: null,
        descripcion: "",
      
    };
    const [periodo, setPeriodo] = useState(initialPeriodoState);
    const [submitted, setSubmitted] = useState(false);

    const savePeriodo = () => {
        var data = {
        descripcion: periodo.descripcion,
        };

        PeriodoDataService.create(data)
        .then(response => {
            setPeriodo({
            id: response.data.id,
            descripcion: response.data.descripcion,
            });
            setSubmitted(true);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };
    const home = () => {
        window.location.href = "/periodo/listar";
    }

    return (
        <div className="submit-form">
        {submitted ? (
            <div>
            <h4>Periodo agregado correctamente!</h4>
            <button className="btn btn-success" onClick={home}>
                Volver
            </button>
            </div>
        ) : (
            <div>
            <div className="form-group">
                <label htmlFor="nombre">Descripcion</label>
                <input
                type="text"
                className="form-control"
                id="descripcion"
                required
                value={periodo.descripcion}
                onChange={(e) => setPeriodo({ ...periodo, descripcion: e.target.value })}
                name="descripcion"
                />
            </div>
            <button onClick={savePeriodo} className="btn btn-success">
                Agregar
            </button>
            </div>
        )}
        </div>
    );
};

export default PeriodoAdd;
      
    