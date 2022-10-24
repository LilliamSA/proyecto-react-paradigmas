import React, { useState } from "react";
import MateriaDataService from "../../services/MateriaService";
import MatriculaDataService from "../../services/MatriculaService";
import PeriodoDataService from "../../services/PeriodoService";
import PersonaDataService from "../../services/PersonaService";
import Select from "react-select";


const MatriculaAdd = () => {
    //al escoger un periodo se me carguen en un comobo-box las materias que estan en ese periodo
    const initialMatriculaState = {
        id: null,
        idMateria: "",
        idPeriodo: "",
        idPersona: "",
    };

    const [matricula, setMatricula] = useState(initialMatriculaState);
    const [periodos, setPeriodos] = useState([]);
    const [idPeriodo, setIdPeriodo] = useState("");
    const [idPersona, setIdPersona] = useState("");
    const [idMateria, setIdMateria] = useState("");

    const [selectedOptionPeriodo, setSelectedOptionPeriodo] = useState(null);
    const [selectedOptionMateria, setSelectedOptionMateria] = useState(null);
    const [selectedOptionPersona, setSelectedOptionPersona] = useState(null);
    const [materias, setMaterias] = useState([]);
    const [personas, setPersonas] = useState([]);
    const [cupo, setCupos] = useState({ value: "", error: "" });
    const [success, setSuccess] = useState(false);
    const [err, setErr] = useState(false);
    const [input, setInput] = useState(false);
    const [errors, setErrors] = useState(false);
    React.useEffect(() => {
        retrievePeriodos();
        retrievePersonas();
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

    const retrievePersonas = () => {
        PersonaDataService.getAll()
            .then(response => {
                setPersonas(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });

    };

    //validaciones
    const validar = () => {
        if (idPeriodo === "") {
            return false;
        } else if (idMateria === "") {
            return false;
        } else if (idPersona === "") {
            return false;
        }
        return true;


    };

    const validarForm = () => {

        let errors = {};

        if (idPeriodo === "") {
            errors.idPeriodo = "El espacio es requerido";
        }
        else if (idMateria === "") {
            errors.idMateria = "El espacio es requerido";
        }
        else if (idPersona === "") {
            errors.idPersona = "El espacio es requerido";
        }
        return errors;

    };

    const reset = () => {
        setSuccess(false);
        setErr(false);
        setInput(false);
        setErrors(false);
    };

    const saveMatricula = () => {
        reset();
        var data = {
            idMateria: idMateria,
            idPeriodo: idPeriodo,
            idPersona: idPersona,
        };

        if (validar()) {
            MatriculaDataService.create(data)
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
        window.location.href = "/matricula/listar";
    };

    const handleSelectChange = (selectedOptionPeriodo) => {
        setSelectedOptionPeriodo(selectedOptionPeriodo);
        setIdPeriodo(selectedOptionPeriodo.value);

        MateriaDataService.findAllByPeriodoId(selectedOptionPeriodo.value)
            .then(response => {
                setMaterias(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleSelectChange2 = (selectedOptionMateria) => {
        setSelectedOptionMateria(selectedOptionMateria);
        setIdMateria(selectedOptionMateria.value);
    };

    const handleSelectChange3 = (selectedOptionPersona) => {
        setSelectedOptionPersona(selectedOptionPersona);
        setIdPersona(selectedOptionPersona.value);
    };


    //metodo validar cupos de la materia seleccionada traer la info de los cupos y dar un mensaje de error si no hay cupos
    const validarCupos = () => {
        if (selectedOptionMateria != null) {
            if (selectedOptionMateria.cupo == 0) {
                return <div className="alert alert-danger" role="alert"> No hay cupos disponibles </div>;
            } else {
                return <div className="alert alert-success" role="alert"> Hay {selectedOptionMateria.cupo} cupos disponibles </div>;
            }
        };
    };


    return (

        <div className="container mt-5">
            <h1 className="text-center mb-4">Formulario para agregar una matricula</h1>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="submit-form"></div>
                    <div className="form-group">
                        <label htmlFor="idPeriodo">Periodo</label>
                        <Select
                            className="mt-2 mb-2"
                            value={selectedOptionPeriodo}
                            onChange={handleSelectChange}
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

                    <div className="form-group">
                        <label htmlFor="idMateria">Materia</label>
                        <Select
                            className="mt-2 mb-2"
                            value={selectedOptionMateria}
                            onChange={handleSelectChange2}
                            options={materias.map((materia) => ({
                                value: materia.id,
                                label: materia.descripcion,
                                cupo: materia.cupos,
                            }))}
                            onBlur={() => setErrors(validarForm())}
                        />
                        {errors.idMateria && (
                            <p className="text-danger">{errors.idMateria}</p>
                        )}

                        {validarCupos()}
                    </div>
                    <div className="form-group">
                        <label htmlFor="idPersona">Persona</label>
                        <Select
                            className="mt-2 mb-2"
                            value={selectedOptionPersona}
                            onChange={handleSelectChange3}
                            options={personas.map((persona) => ({
                                value: persona.id,
                                label: persona.nombre,

                            }))}
                            onBlur={() => setErrors(validarForm())}
                        />
                        {errors.idPersona && <p className="text-danger">{errors.idPersona}</p>}
                    </div>

                </div>
                <div className="row justify-content-center mt-4 mb-4">
                    <div className="col-md-6 text-center">
                        <button onClick={saveMatricula} className="btn btn-success btn-lg">
                            Registrar
                        </button>
                    </div>
                </div>
                <div className="row justify-content-center mt-4 mb-4">
                    <div className="col-md-6 text-center">
                        {success && (
                            <div className="alert alert-success text-center" role="alert">
                                Matricula exitosa!
                                <br />
                                <button onClick={home} className="btn btn-warning">
                                    Volver
                                </button>
                            </div>
                        )
                        }
                        {
                            err && (
                                <div className="alert alert-danger text-center" role="alert">
                                    Error, no se puede matricular un curso que no tiene cupos disponibles o ya se encuentra matriculado en la materia seleccionada
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

export default MatriculaAdd;
