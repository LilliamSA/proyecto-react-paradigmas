import React, { useState } from "react";
import MateriaDataService from "../../services/MateriaService";
import PeriodoDataService from "../../services/PeriodoService";
import Select from "react-select";

const MateriaAdd = () => {
    //agregar una materia que tenga los siguiente datos: id, cupos, materia, id_periodo mediante un combo-box relacionandola con la entidad periodo
    const initialMateriaState = {
        id: null,
        descripcion: "",
        cupos: "",
        idPeriodo: "",
    };
    const [materia, setMateria] = useState(initialMateriaState);
    const [submitted, setSubmitted] = useState(false);
    const [periodos, setPeriodos] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([]);

    React.useEffect(() => {
        retrievePeriodos();
    }, []);

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

    const saveMateria = () => {
        var data = {
            descripcion: materia.descripcion,
            cupos: materia.cupos,
            idPeriodo: materia.idPeriodo,
        };

      //HACER VALIDACIONES incluyendo el combo-box
        MateriaDataService.create(data)
        .then(response => {
            setMateria({
                id: response.data.id,
                descripcion: response.data.descripcion,
                cupos: response.data.cupos,
                idPeriodo: response.data.idPeriodo,
            });
            setSubmitted(true);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    const home = () => {
        window.location.href = "/materia/listar";
    }

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        setMateria({ ...materia, idPeriodo: selectedOption.value });
    };



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
                <label htmlFor="id_periodo">Periodo</label>
                <Select

                    value={selectedOption}
                    onChange={handleChange}
                    id="id_periodo"
                    name="id_periodo"
                    options={periodos.map((periodo) => ({
                        value: periodo.id,
                        label: periodo.descripcion,
                    }))}
                />
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