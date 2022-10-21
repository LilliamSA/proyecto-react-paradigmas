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

        const [selectedOptionPeriodo, setSelectedOptionPeriodo] = useState(null);
        const [selectedOptionPersona, setSelectedOptionPersona] = useState(null);
        const [selectedOptionMateria, setSelectedOptionMateria] = useState(null);
        const [matricula, setMatricula] = useState({});
        const [periodos, setPeriodos] = useState([]);
        const [materias, setMaterias] = useState([]);
        const [personas, setPersonas] = useState([]);
        const [submitted, setSubmitted] = useState(false);//submitted es el nombre de la variable y setSubmitted es el nombre de la funcion
        const [error, setError] = useState(null);
        const [isLoaded, setIsLoaded] = useState(false);
        const [idMateria, setIdMateria] = useState(""); //que se actualice el valor del idPersona
        const [idPeriodo, setIdPeriodo] = useState(""); //que se actualice el valor del idPersona
        const [idPersona, setIdPersona] = useState(""); //que se actualice el valor del idPersona
    
        useEffect(() => {
            fetch(URL)
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log("RESULT:", result);
                        setIsLoaded(true);
                        setMatricula(result);
                        setIdPeriodo(result.periodo);
                        setIdMateria(result.materia);
                        setIdPersona(result.persona);
                        
                    })
                .catch(result => {
                    console.log(result);
                })
        }, [URL]);
    
    
        const updateMatricula = () => {
            var data = {
                idPeriodo: idPeriodo.id,
                idMateria: idMateria.idM,
                idPersona: idPersona.idP,
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
        //retrievePeriodos
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
        };

        //retrievePersonas

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
        };
    
    
        const handleChange = (selectedOptionPeriodo) => {
            setSelectedOptionPeriodo(selectedOptionPeriodo);
            setIdPeriodo({ id: selectedOptionPeriodo.value});

            MateriaDataService.findAllByPeriodoId(selectedOptionPeriodo.value)
            .then(response => {
                setMaterias(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        }

        const handleChange1 = (selectedOptionMateria) => {
            setSelectedOptionMateria(selectedOptionMateria);
            setIdMateria({ idM: selectedOptionMateria.value});
        }

        const handleChange2 = (selectedOptionPersona) => {
            setSelectedOptionPersona(selectedOptionPersona);
            setIdPersona({ idP: selectedOptionPersona.value});
        }
    

    
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
                                value={selectedOptionPeriodo}
                                onChange={handleChange}
                                options={periodos.map((periodo) => ({
                                    value: periodo.id,
                                    label: periodo.descripcion,
                                }))}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="idmateria">Materia Actual</label>
                            <input
                                className="form-control"
                                id="idmateria"
                                disabled
                                value={idMateria.descripcion}
                            >
                            </input>
                            <input
                                className="form-control"
                                id="idmateria"
                                disabled
                                value={idMateria.idM}
                                name="idmateria"
                                hidden
                            >
                            </input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="idMateria">Materia</label>
                            <Select
                                value={selectedOptionMateria}
                                onChange={handleChange1}
                                options={materias.map((materia) => ({
                                    value: materia.id,
                                    label: materia.descripcion,
                                }))}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="idpersona">Persona Actual</label>
                            <input
                                className="form-control"
                                id="idpersona"
                                disabled
                                value={idPersona.nombre}
                            >
                            </input>
                            <input
                                className="form-control"
                                id="idpersona"
                                disabled
                                value={idPersona.idP}
                                name="idpersona"
                                hidden
                            >
                            </input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="idPersona">Persona</label>
                            <Select
                                value={selectedOptionPersona}
                                onChange={handleChange2}
                                options={personas.map((persona) => ({
                                    value: persona.id,
                                    label: persona.nombre,
                                }))}
                            />
                        </div>
                        <button onClick={updateMatricula} className="btn btn-success">
                            Actualizar
                        </button>
                    </div>
                )}
            </div>
        );
    };

    export default MatriculaUpdate;