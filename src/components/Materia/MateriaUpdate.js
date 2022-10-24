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
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [cupos, setCupos] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [idMateria, setIdMateria] = useState("");
    const [idPeriodo, setIdPeriodo] = useState("");
    const [success, setSuccess] = useState(false);
    const [err, setErr] = useState(false);
    const [input, setInput] = useState(false);
    const [errors, setErrors] = useState(false);


    //validaciones
    const validar = () => {
        let regexCupos = /^[0-9]+$/;
        let regexDescripcion = /^[a-zA-Z ]+$/;

        if (descripcion === "" || cupos === "") {
            return false;
        } else if (!regexCupos.test(cupos)) {
            return false;
        } else if (!regexDescripcion.test(descripcion)) {
            return false;
        } else if (idPeriodo === "") {
            return false;
        } else if (selectedOption === null) {
            return false;
        }

        return true;
    };

    const validarForm = () => {
        //que acepte letras, numeros y espacios en blanco
        let regexCupos = /^[0-9]+$/;
        let regexDescripcion = /^[a-zA-Z ]+$/;

        let errors = {};

        if (descripcion === "") {
            errors.descripcion = "La descripcion es requerida";
        } else if (!regexDescripcion.test(descripcion)) {
            errors.descripcion = "La descripcion solo puede contener letras";
        }

        if (cupos === "") {
            errors.cupos = "Los cupos son requeridos";
        } else if (!regexCupos.test(cupos)) {
            errors.cupos = "Los cupos solo pueden contener numeros";
        }

        if (idPeriodo === "") {
            errors.idPeriodo = "El periodo es requerido";
        } else if (selectedOption === null) {
            errors.idPeriodo = "El periodo es requerido";

        }

        return errors;

    };

    const reset = () => {
        setSuccess(false);
        setErr(false);
        setInput(false);
        setErrors(false);
    };

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
        reset();
        var data = {
            id: idMateria,
            cupos: cupos,
            descripcion: descripcion,
            idPeriodo: idPeriodo.id,
        };
        if (validar()) {
            MateriaDataService.update(id, data)
                .then(response => {
                    setSuccess(true);
                })
                .catch(e => {
                    setErr(true);
                });
        } else {
            setInput(true);
        }
    };

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
        setIdPeriodo({ id: selectedOption.value });
    }
    return (

        <div className="container mt-5">
            <h1 className="text-center mb-4">Formulario para actualizar una materia</h1>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="submit-form">
                        <div className="form-group">
                            <label htmlFor="cupos">Cupos</label>
                            <input
                                type="text"
                                className="form-control mt-2 mb-2"
                                id="cupos"
                                required
                                value={cupos}
                                onChange={(e) => setCupos(e.target.value)}
                                name="cupos"
                                onBlur={() => setErrors(validarForm())}
                            />
                            {errors.cupos && (
                                <p className="text-danger">{errors.cupos}</p>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="descripcion">Descripcion</label>
                            <input
                                type="text"
                                className="form-control mt-2 mb-2"
                                id="descripcion"
                                required
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)}
                                name="descripcion"
                                onBlur={() => setErrors(validarForm())}
                            />
                            {errors.descripcion && (
                                <p className="text-danger">{errors.descripcion}</p>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="idperiodo">Periodo Actual</label>
                            <input
                                className="form-control mt-2 mb-2"
                                id="idperiodo"
                                disabled
                                value={idPeriodo.descripcion}
                            >
                            </input>
                            <input
                                className="form-control mt-2 mb-2"
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
                                className="mt-2 mb-2"
                                value={selectedOption}
                                onChange={handleChange}
                                options={periodos.map((periodo) => ({
                                    value: periodo.id,
                                    label: periodo.descripcion,
                                }))}
                                onBlur={() => setErrors(validarForm())}
                            />
                            {errors.idPeriodo && (
                                <p className="text-danger">{errors.idPeriodo}</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mt-4 mb-4">
                    <div className="col-md-6 text-center">
                        <button onClick={updateMateria} className="btn btn-success btn-lg">
                            Actualizar
                        </button>
                    </div>
                </div>
                <div className="row justify-content-center mt-4 mb-4">
                    <div className="col-md-6 text-center">
                        {success && (
                            <div className="alert alert-success text-center" role="alert">
                                Materia actualizada con éxito!
                                <br />
                                <button onClick={home} className="btn btn-warning">
                                    Volver
                                </button>
                            </div>
                        )}
                        {
                            err && (
                                <div className="alert alert-danger text-center" role="alert">
                                    Error al actualizar la materia!
                                </div>
                            )
                        }
                        {
                            input && (
                                <div className="alert alert-danger text-center" role="alert">
                                    Por favor llene todos los campos o revise sus datos
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>

    );
};


export default MateriaUpdate;
