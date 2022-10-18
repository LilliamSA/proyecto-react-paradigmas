import React, {useState, useEffect} from "react"; 
 import PeriodoDataService from "../../services/PeriodoService";
 import {useParams} from "react-router-dom";


 const PeriodoUpdate = () => {

        const {id} = useParams();
        const URL = "http://localhost:8080/periodo/"+id;
        //traer la informacion de la persona por id seleccionada en la tabla

        const [periodo, setPeriodo] = useState({}); //persona es el nombre de la variable y setPersona es el nombre de la funcion
        const [submitted, setSubmitted] = useState(false);//submitted es el nombre de la variable y setSubmitted es el nombre de la funcion
        const [error, setError] = useState(null);
        const [isLoaded, setIsLoaded] = useState(false);
        const [descripcion, setDescripcion] = useState(""); //que se actualice el valor de la identificacion
        const [idPeriodo, setIdPeriodo] = useState(""); //que se actualice el valor del idPersona

        useEffect(() => {
            fetch(URL)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setPeriodo(result);
                    setDescripcion(result.descripcion);
                    setIdPeriodo(result.idPeriodo);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
        }, [URL]);



        const updatePeriodo = () => {
            var data = {
                id: idPeriodo,
                descripcion: descripcion,
            };
            PeriodoDataService.update(id, data)
            .then(response => {
                setPeriodo({
                    id: response.data.id,
                    descripcion: response.data.descripcion,
                    
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        }
        const home = () => {
            window.location.href = "/periodo/listar";
        }
        

        return (
            <div className="submit-form">
            {submitted ? (
                <div>
                <h4>Periodo actualizado correctamente!</h4>
                <button className="btn btn-success" onClick={home}>
                    Volver
                </button>
                </div>
            ) : (
                <div>
                <div className="form-group">
                    <label htmlFor="identificacion">Identificacion</label>
                    <input
                    type="text"
                    className="form-control"
                    id="identificacion"
                    required
                    disabled
                    value={id}
                    name="identificacion"

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
                <button onClick={updatePeriodo} className="btn btn-success">
                    Actualizar
                </button>
                </div>
            )}
            </div>
        );
    }
    export default PeriodoUpdate;
