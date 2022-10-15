import React, { useState } from "react";
import MateriaDataService from "../../services/MateriaService";

const MateriaAdd = () => {
    //agregar una materia relacionandola con el periodo datos: id, cupos, descripcion, id_periodo
    const initialMateriaState = {
        id: null,
        cupos: "",
        descripcion: "",
        id_periodo: "",
    };
    const [materia, setMateria] = useState(initialMateriaState);
    const [submitted, setSubmitted] = useState(false);
    const [periodos, setPeriodos] = useState([]);
    const [periodo, setPeriodo] = useState(initialMateriaState);

    //obtener todos los periodos
    React.useEffect(() => {
        retrievePeriodos();
    }, []);

    //obtener todos los periodos
    const retrievePeriodos = () => {
        MateriaDataService.getAllPeriodos()
        .then(response => {
            setPeriodos(response.data);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    const saveMateria = () => {
        var data = {
        cupos: materia.cupos,
        descripcion: materia.descripcion,
        id_periodo: materia.id_periodo,
        };
    
        MateriaDataService.create(data)
        .then(response => {
            setMateria({
            id: response.data.id,
            cupos: response.data.cupos,
            descripcion: response.data.descripcion,
            id_periodo: response.data.id_periodo,
            });
            setSubmitted(true);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };
    const home = () => {
        window.location.href = "/";
    }

    return (
        <div className="submit-form">
        {submitted ? (
            <div>
            <h4>Materia agregada correctamente!</h4>
            <button className="btn btn-success" onClick={home}>
                Volver
            </button>
            </div>
        ) : (
            <div>
            <div className="form-group">
                <label htmlFor="cupos">Cupos</label>
                <input
                type="text"
                className="form-control"
                id="cupos"
                required
                value={materia.cupos}
                onChange={(e) => setMateria({ ...materia, cupos: e.target.value })}
                name="cupos"
                />
            </div>
            <div className="form-group">
                <label htmlFor="descripcion">Descripcion</label>
                <input
                type="text"
                className="form-control"
                id="descripcion"
                required
                value={materia.descripcion}
                onChange={(e) => setMateria({ ...materia, descripcion: e.target.value })}
                name="descripcion"
                />
            </div>
            <div className="form-group">
                <label htmlFor="id_periodo">Periodo</label>
                <select
                className="form-control"
                id="id_periodo"
                required
                value={materia.id_periodo}
                onChange={(e) => setMateria({ ...materia, id_periodo: e.target.value })}
                name="id_periodo"
                >
                {periodos.map((periodo) => (
                    <option key={periodo.id} value={periodo.id}>
                    {periodo.descripcion}
                    </option>
                ))}
                </select>
            </div>
            <button onClick={saveMateria} className="btn btn-success">
                Agregar
            </button>
            </div>
        )}
        </div>
    );
};

export default MateriaAdd;
        









