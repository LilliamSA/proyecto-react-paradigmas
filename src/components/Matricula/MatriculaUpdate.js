import React, {useState, useEffect} from "react"; 
import MatriculaDataService from "../../services/MatriculaService";
import PeriodoDataService from "../../services/PeriodoService";
import MateriaDataService from "../../services/MateriaService";
import PersonaDataService from "../../services/PersonaService"; 
import {useParams} from "react-router-dom";
import Select from "react-select";


 const MatriculaUpdate = () => {

        const {id} = useParams();
        const URL = "http://localhost:8080/matricula/"+id;

        const [matricula, setMatricula] = useState({}); //matricula es el nombre de la variable y setMatricula es el nombre de la funcion
        const [submitted, setSubmitted] = useState(false);//submitted es el nombre de la variable y setSubmitted es el nombre de la funcion
        const [setError] = useState(null);
        const [setIsLoaded] = useState(false);
        const [idPeriodo, setIdPeriodo] = useState(""); //que se actualice el valor de la identificacion
        const [idMateria, setIdMateria] = useState(""); //que se actualice el valor del idMateria
        const [idPersona, setIdPersona] = useState(""); //que se actualice el valor del idPersona
        const [periodos, setPeriodos] = useState([]);
        const [materias, setMaterias] = useState([]);
        const [personas, setPersonas] = useState([]);
        const [selectedOptionPeriodo, setSelectedOptionPeriodo] = useState(null);
        const [selectedOptionPersona, setSelectedOptionPersona] = useState(null);
        const [selectedOptionMateria, setSelectedOptionMateria] = useState(null);

        useEffect(() => {
            fetch(URL)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setMatricula(result);
                    setIdPeriodo(result.idPeriodo);
                    setIdMateria(result.idMateria);
                    setIdPersona(result.idPersona);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
        }, [URL]);  

        const updateMatricula = () => {
            var data = {
                idPeriodo: idPeriodo,
                idMateria: idMateria,
                idPersona: idPersona,
            };
            MatriculaDataService.update(id, data)
            .then(response => {
                setMatricula({
                    idPeriodo: response.data.idPeriodo,
                    idMateria: response.data.idMateria,
                    idPersona: response.data.idPersona,
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        }
        const home = () => {
            window.location.href = "/matricula/listar";
        }

     //retrievePeriodos

        React.useEffect(() => {
            retrievePeriodos();
        }, []);

        const retrievePeriodos = () => {
            PeriodoDataService.findByI()
            .then(response => {
                setPeriodos(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        };

        //retrieveMaterias

        React.useEffect(() => {
            retrieveMaterias();
        }, []);

        const retrieveMaterias = () => {
            MateriaDataService.findById()
            .then(response => {
                setMaterias(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        };

        //retrievePersonas

        React.useEffect(() => {
            retrievePersonas();
        }, []);

        const retrievePersonas = () => {
            PersonaDataService.findById()
            .then(response => {
                setPersonas(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        };


        const handleChangePeriodo= (selectedOptionPeriodo) => {
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
       
        const handleChangeMateria = (selectedOptionMateria) => {
            setSelectedOptionMateria(selectedOptionMateria);
            setIdMateria(selectedOptionMateria.value);
        };
        const handleChangePersona = (selectedOptionPersona) => {
            setSelectedOptionPersona(selectedOptionPersona);
            setIdPersona(selectedOptionPersona.value);
        };





        return (
            <div className="submit-form">
                {submitted ? (
                    <div>
                        <h4>La matricula se actualizo correctamente!</h4>
                        <button className="btn btn-success" onClick={home}>
                            Volver
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="edit-form">
                            <h4>Editar Matricula</h4>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="idPeriodo">Periodo Actual</label>
                                    <select
                                        type="text"
                                        className="form-control"
                                        id="idPeriodo"
                                        disabled
                                        value={matricula.idPeriodo}
                                    >
                                        {periodos.map((periodo) => (
                                            <option key={periodo.id} value={periodo.id}>
                                                {periodo.descripcion}
                                            </option>
                                        ))}
                                    </select>
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
                                    <label htmlFor="idMateria">Materia Actual</label>
                                    <select
                                        type="text"
                                        className="form-control"
                                        id="idMateria"
                                        disabled
                                        value={matricula.idMateria}
                                    >
                                        {materias.map((materia) => (
                                            <option key={materia.id} value={materia.id}>
                                                {materia.descripcion}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="idMateria">Materia</label>
                                    <Select
                                        value={selectedOptionMateria}
                                        onChange={handleChangeMateria}
                                        options={materias.map((materia) => ({   
                                            value: materia.id,
                                            label: materia.descripcion,
                                        }))}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="idPersona">Persona Actual</label>
                                    <select
                                        type="text"
                                        className="form-control"
                                        id="idPersona"
                                        disabled
                                        value={matricula.idPersona}
                                    >
                                        {personas.map((persona) => (
                                            <option key={persona.id} value={persona.id}>
                                                {persona.nombre}
                                            </option>
                                        ))}
                                    </select>
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
                            </form>          
                            <button onClick={updateMatricula} className="btn btn-success">
                                Actualizar
                            </button>
                            <button onClick={home} className="btn btn-danger">

                                Cancelar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        );
    };      

    export default MatriculaUpdate;