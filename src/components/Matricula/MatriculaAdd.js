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
    
        if (selectedOptionPeriodo === null || selectedOptionMateria === null || selectedOptionPersona === null) {
            return false;
        }
        return true;

   
    };

    const validarForm = () => {
  
        let errors = {};

        if (idPeriodo === "") {
            errors.idPeriodo = "El periodo es requerido";
        }
        if (idMateria === "") {
            errors.idMateria = "La materia es requerida";
        }
        if (idPersona === "") {
            errors.idPersona = "La persona es requerida";
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
        }else{
            return <div className="alert alert-success" role="alert"> Hay {selectedOptionMateria.cupo} cupos disponibles </div>;
        }
    };
    };

               
    return (
        <>
            <div>
            <div className="submit-form"></div>
                    <div className="form-group">
                        <label htmlFor="idPeriodo">Periodo</label>
                        <Select
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
                            value={selectedOptionPersona}
                            onChange={handleSelectChange3}
                            options={personas.map((persona) => ({
                                value: persona.id,
                                label: persona.nombre,
        
                            }))}
                            onBlur={()=>setErrors(validarForm())}
                        />
                        {errors.idPersona && <p className="text-danger">{errors.idPersona}</p>}
                    </div>

                    <button onClick={saveMatricula} className="btn btn-success">
                        Registrar
                    </button>
                </div>
 {success && (
    <div className="alert alert-success" role="alert">
      Matricula exitosa!
      <br />
      <button onClick={home} className="btn btn-warning">
        Volver
      </button>
    </div>
  )}
  {err && (
    <div className="alert alert-danger" role="alert">
      Error al hacer la matricula
    </div>
  )}
  {input && (
    <div className="alert alert-danger" role="alert">
      Por favor llene todos los campos o revise sus datos
    </div>
  )}
        </>
    );
};

export default MatriculaAdd;
