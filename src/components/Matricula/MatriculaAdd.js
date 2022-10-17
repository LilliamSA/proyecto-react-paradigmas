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
    const [submitted, setSubmitted] = useState(false);
    const [periodos, setPeriodos] = useState([]);
    const [selectedOptionPeriodo, setSelectedOptionPeriodo] = useState(null);
    const [selectedOptionMateria, setSelectedOptionMateria] = useState(null);
    const [selectedOptionPersona, setSelectedOptionPersona] = useState(null);

    const [options, setOptions] = useState([]);
    const [materias, setMaterias] = useState([]);
    const [personas, setPersonas] = useState([]);

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

    const saveMatricula = () => {
        var data = {
            idMateria: matricula.idMateria,
            idPeriodo: matricula.idPeriodo,
            idPersona: matricula.idPersona,
        };

        //HACER VALIDACIONES incluyendo el combo-box
        MatriculaDataService.create(data)
        .then(response => {

            setMatricula({
                id: response.data.id,
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

    const newMatricula = () => {
        setMatricula(initialMatriculaState);
        setSubmitted(false);
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        setMatricula({ ...matricula, [name]: value });
    };

    const handleSelectChange = (selectedOptionPeriodo) => {
        setSelectedOptionPeriodo(selectedOptionPeriodo);
        setMatricula({ ...matricula, idPeriodo: selectedOptionPeriodo.value });
        console.log(`Option selected:`, selectedOptionPeriodo);
        console.log(`Option selected:`, selectedOptionPeriodo.value);
        console.log(`Option selected:`, matricula.idPeriodo);
       
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
        setMatricula({ ...matricula, idMateria: selectedOptionMateria.value });
        console.log(`Option selected:`, selectedOptionMateria);
        console.log(`Option selected:`, selectedOptionMateria.value);
        console.log(`Option selected:`, matricula.idMateria);
    };

    const handleSelectChange3 = (selectedOptionPersona) => {
        setSelectedOptionPersona(selectedOptionPersona);
        setMatricula({ ...matricula, idPersona: selectedOptionPersona.value });
        console.log(`Option selected:`, selectedOptionPersona);
        console.log(`Option selected:`, selectedOptionPersona.value);
        console.log(`Option selected:`, matricula.idPersona);
    };

    const optionsPeriodo = periodos.map((periodo) => ({
        value: periodo.id,
        label: periodo.nombre,
    }));
    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>Matricula registrada exitosamente!</h4>
                    <button className="btn btn-success" onClick={home}>
                        Volver
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="idPeriodo">Periodo</label>
                        <Select
                            value={selectedOptionPeriodo}
                            onChange={handleSelectChange}
                            options={periodos.map((periodo) => ({
                                value: periodo.id,
                                label: periodo.descripcion,
                            }))}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="idMateria">Materia</label>
                        <Select

                            value={selectedOptionMateria}
                            onChange={handleSelectChange2}
                            options={materias.map((materia) => ({
                                value: materia.id,
                                label: materia.descripcion,
                            }))}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="idPersona">Persona</label>
                        <Select
                            value={selectedOptionPersona}
                            onChange={handleSelectChange3}
                            options={personas.map((persona) => ({
                                value: persona.id,
                                label: persona.nombre,
                            }))}
                        />
                    </div>

                    <button onClick={saveMatricula} className="btn btn-success">
                        Registrar
                    </button>
                </div>
            )}
        </div>
    );
}


export default MatriculaAdd;




   


                   

        
      
