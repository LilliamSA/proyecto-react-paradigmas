import React, { useState, useEffect } from "react";
import MateriaDataService from "../../services/MateriaService";
import PeriodoDataService from "../../services/PeriodoService";
import { useParams } from "react-router-dom";
import Select from "react-select";

const MateriaUpdate = () => {

    const { id } = useParams();
    const URL = "http://localhost:8080/materia/" + id;
    //traer la informacion de la persona por id seleccionada en la tabla
    const [selectedOption, setSelectedOption] = useState(null);
    const [materia, setMateria] = useState({});
    const [periodos, setPeriodos] = useState([]);
    const [submitted, setSubmitted] = useState(false);//submitted es el nombre de la variable y setSubmitted es el nombre de la funcion
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [cupos, setCupos] = useState("");
    const [descripcion, setDescripcion] = useState(""); //que se actualice el valor de la identificacion
    const [idMateria, setIdMateria] = useState(""); //que se actualice el valor del idPersona
    const [idPeriodo, setIdPeriodo] = useState(""); //que se actualice el valor del idPersona

    useEffect(() => {
        fetch(URL)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("RESULT:", result);
                    setIsLoaded(true);
                    setMateria(result);
                    setIdMateria(result.idMateria);
                    setCupos(result.cupos);
                    setDescripcion(result.descripcion);
                    setIdPeriodo(result.periodo);
                })
            .catch(result => {
                console.log(result);
            })
    }, [URL]);


    const updateMateria = () => {
        var data = {
            id: idMateria,
            cupos: cupos,
            descripcion: descripcion,
            idPeriodo: idPeriodo.id,
        };
        MateriaDataService.update(id, data)
            .then(response => {
                setMateria({
                    id: response.data.id,
                    cupos: response.data.cupos,
                    descripcion: response.data.descripcion,
                    idPeriodo: response.data.idPeriodo,

                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    const home = () => {
        window.location.href = "/materia/listar";
    }

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


    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        setIdPeriodo({ id: selectedOption.value, descripcion: selectedOption.label });
    }

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>La materia se actualizo correctamente!</h4>
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
                            value={cupos}
                            onChange={(e) => setCupos(e.target.value)}
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
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            name="descripcion"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="idperiodo">Periodo Actual</label>
                        <input
                            className="form-control"
                            id="idperiodo"
                            disabled
                            value={idPeriodo.descripcion}
                        >
                        </input>
                        <input
                            className="form-control"
                            id="idperiodo"
                            disabled
                            value={idPeriodo.id}
                            name="idperiodo"
                            hidden
                        >
                        </input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="idPeriodo">Periodo</label>
                        <Select
                            value={selectedOption}
                            onChange={handleChange}
                            options={periodos.map((periodo) => ({
                                value: periodo.id,
                                label: periodo.descripcion,
                            }))}
                        />
                    </div>
                    <button onClick={updateMateria} className="btn btn-success">
                        Actualizar
                    </button>
                </div>
            )}
        </div>
    );
};





export default MateriaUpdate;
