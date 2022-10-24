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
    const [descripcion, setDescripcion] = useState("");
    const [cupos, setCupos] = useState("");
    const [idPeriodo, setIdPeriodo] = useState("");
    const [periodos, setPeriodos] = useState([]);
    const [success, setSuccess] = useState(false);
    const [err, setErr] = useState(false);
    const [input, setInput] = useState(false);
    const [errors, setErrors] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

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
        reset();
        var data = {
            descripcion: descripcion,
            cupos: cupos,
            idPeriodo: idPeriodo,
        };
        if (validar()) {
            MateriaDataService.create(data)
                .then(response => {
                    setSuccess(true);
                })
                .catch((e) => {
                    setErr(true);
                });
        } else {
            setInput(true);
        }
    };


    const home = () => {
        window.location.href = "/materia/listar";
    }

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        setIdPeriodo(selectedOption.value);
    };



    return (

        <div className="container mt-5">
            <h1 className="text-center mb-4">Formulario para agregar una materia</h1>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="submit-form"></div>
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
                        <label htmlFor="id_periodo">Periodo</label>
                        <Select

                            value={selectedOption}
                            onChange={handleChange}
                            id="id_periodo"
                            name="id_periodo mt-2 mb-2"
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
                    <button onClick={saveMateria} className="btn btn-success btn-lg">
                        Agregar
                    </button>
                </div>
            </div>
            <div className="row justify-content-center mt-4 mb-4">
                <div className="col-md-6 text-center">
                    {success && (
                        <div className="alert alert-success text-center" role="alert">
                            Materia agregada con éxito!
                            <br />
                            <button onClick={home} className="btn btn-warning">
                                Volver
                            </button>
                        </div>
                    )}
                    {err && (
                        <div className="alert alert-danger text-center" role="alert">
                            Error al agregar la materia
                        </div>
                    )}
                    {input && (
                        <div className="alert alert-danger text-center" role="alert">
                            Por favor llene todos los campos o revise sus datos
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default MateriaAdd;