import React, { useState } from "react";
import MateriaDataService from "../../services/MateriaService";
import MatriculaDataService from "../../services/MatriculaService";
import PeriodoDataService from "../../services/PeriodoService";
import PersonaDataService from "../../services/PersonaService";
import Select from "react-select";


 //agregar una matricula que tenga los siguiente datos: id, idMateria, idPeriodo, idPersona mediante combo-boxes relacionandola con la entidad materia, periodo, persona

const MatriculaAdd = () => {
    const initialMatriculaState = {
        id: null,
        idMateria: "",
        idPeriodo: "",
        idPersona: "",
    };

    const [matricula, setMatricula] = useState(initialMatriculaState);
    const [submitted, setSubmitted] = useState(false);
    const [periodos, setPeriodos] = useState([]);
    const [materias, setMaterias] = useState([]);
    const [personas, setPersonas] = useState([]);

    //selectedoption para cada combo box
    const [selectedOptionPeriodo, setSelectedOptionPeriodo] = useState(null);
    const [selectedOptionMateria, setSelectedOptionMateria] = useState(null);
    const [selectedOptionPersona, setSelectedOptionPersona] = useState(null);



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

    React.useEffect(() => {
        retrievePersonas();
    }, []);

    const retrievePersonas = () => {
        PersonaDataService.getAll()
        .then(response => {
            setPersonas(response.data);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }
    React.useEffect(() => {
        retrieveMaterias();
    }, []);
    const retrieveMaterias = () => {
        MateriaDataService.getAll()
        .then(response => {
            setMaterias(response.data);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    const saveMatricula = () => {
        var data = {
            idMateria: matricula.idMateria,
            idPeriodo: matricula.idPeriodo,
            idPersona: matricula.idPersona
        };

      //HACER VALIDACIONES incluyendo el combo-box
        MatriculaDataService.create(data)
        .then(response => {
            setMatricula({
             
                idMateria: response.data.idMateria,
                idPeriodo: response.data.idPeriodo,
                idPersona: response.data.idPersona,
            });
            setSubmitted(true);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    const home = () => {
        window.location.href = "/matricula/listar";
    };

    const handleChangeMateria = (selectedOptionMateria) => {
        setSelectedOptionMateria(selectedOptionMateria);
        setMatricula({ ...matricula, idMateria: selectedOptionMateria.value });
    };

    const handleChangePeriodo = (selectedOptionPeriodo) => {
        setSelectedOptionPeriodo(selectedOptionPeriodo);
        setMatricula({ ...matricula, idPeriodo: selectedOptionPeriodo.value });
    };

    const handleChangePersona = (selectedOptionPersona) => {
        setSelectedOptionPersona(selectedOptionPersona);
        setMatricula({ ...matricula, idPersona: selectedOptionPersona.value });
    }

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>Matricula agregada correctamente!</h4>
                    <button className="btn btn-success" onClick={home}>
                        Volver
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="idMateria">Materia</label>
                        <Select
                            value={selectedOptionMateria}
                            onChange={handleChangeMateria}
                            options={materias.map((materia) => ({
                                value: materia.id,
                                label: materia.asignatura,
                            }))}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="idPeriodo">Periodo</label>
                        <Select
                            value={selectedOptionPeriodo}
                            onChange={handleChangePeriodo}
                            options={periodos.map((periodo) => ({
                                value: periodo.id,
                                label: periodo.descripcion,
                            }))}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="idPersona">Persona</label>
                        <Select
                            value={selectedOptionPersona}
                            onChange={handleChangePersona}
                            options={personas.map((persona) => ({
                                value: persona.id,
                                label: persona.nombre,
                            }))}
                        />
                    </div>
                            
                    <button onClick={saveMatricula} className="btn btn-success">

                        Agregar
                    </button>
                </div>
            )}
        </div>
    );
};

export default MatriculaAdd;





