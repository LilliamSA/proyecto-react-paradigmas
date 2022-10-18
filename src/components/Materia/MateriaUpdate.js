import React, {useState, useEffect} from "react"; 
import MateriaDataService from "../../services/MateriaService";
import PeriodoDataService from "../../services/PeriodoService";
import {useParams} from "react-router-dom";
import Select from "react-select";
const MateriaUpdate = () => {

    const {id} = useParams();
    const URL = "http://localhost:8080/materia/"+id;

    

    //traer la informacion de la materia por id seleccionada en la tabla y hacer metodos para actualizar el periodo

    const [materia, setMateria] = useState({}); //persona es el nombre de la variable y setPersona es el nombre de la funcion
    const [submitted, setSubmitted] = useState(false);//submitted es el nombre de la variable y setSubmitted es el nombre de la funcion
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [cupos, setCupos] = useState(""); //que se actualice el valor de la identificacion
    const [descripcion, setDescripcion] = useState(""); //que se actualice el valor de la identificacion
    const [idMateria, setIdMateria] = useState(""); //que se actualice el valor del idPersona
    const [idPeriodo, setIdPeriodo] = useState(""); //que se actualice el valor del idPersona
    const [periodos, setPeriodos] = useState([]); //que se actualice el valor del idPersona

    useEffect(() => {
        fetch(URL)
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setMateria(result);
                setCupos(result.cupos);
                setDescripcion(result.descripcion);
                setIdMateria(result.idMateria);
                setIdPeriodo(result.idPeriodo);
            },

            (error) => {

                setIsLoaded(true);
                setError(error);
            }
        )
    }, [URL]);

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



    const updateMateria = () => {
        var data = {
            id: idMateria,
            cupos: cupos,
            descripcion: descripcion,
            idPeriodo: idPeriodo,
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
    };

const home = () => {
    window.location.href = "/materia/listar";
}
    const handleInputChange = event => {
        const {name, value} = event.target;
        setMateria({...materia, [name]: value});
    };

    const handleInputChangePeriodo = event => {
        const {value} = event.target;
        setIdPeriodo(value);
    };

    const handleInputChangeCupos = event => {
        const {value} = event.target;
        setCupos(value);
    };

    const handleInputChangeDescripcion = event => {
        const {value} = event.target;
        setDescripcion(value);
    };

    const handleInputChangeIdMateria = event => {
        const {value} = event.target;
        setIdMateria(value);
    };

    const handleInputChangeIdPeriodo = event => {
        const {value} = event.target;
        setIdPeriodo(value);
    };

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        setIdPeriodo(selectedOption.value);
    };

    return (
        <div>
            {submitted ? (
                <div>
                    <h4>La materia se actualizo correctamente!</h4>
                    <button className="btn btn-success" onClick={home}>
                        Volver
                    </button>
                </div>
            ) : (
                <div>
                    <div className="edit-form">
                        <h4>Materia</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="idMateria">Id Materia</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="idMateria"
                                    required
                                    disabled
                                    value={id}
                                    onChange={handleInputChangeIdMateria}
                                    name="idMateria"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cupos">Cupos</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cupos"
                                    required
                                    value={cupos}
                                    onChange={handleInputChangeCupos}
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
                                    onChange={handleInputChangeDescripcion}
                                    name="descripcion"
                                />
                            </div>
                            <div className="form-group">    
                                <label htmlFor="idP">Periodo Actual</label>
                                <select
                                    className="form-control"
                                    id="idP"
                                    disabled
                                    value={idPeriodo}
                                    name="idP"
                                >
                                    {periodos &&
                                        periodos.map((periodo, index) => (
                                            <option key={index} value={periodo.idPeriodo}>
                                                {periodo.descripcion}
                                            </option>
                                        ))}
                                </select>
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
                        </form>
                        <button onClick={updateMateria} className="btn btn-success">
                            Actualizar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

}

export default MateriaUpdate;
                           


                                









                            



                                    