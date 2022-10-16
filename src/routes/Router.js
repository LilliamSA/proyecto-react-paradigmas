import React from "react";
import {Route,Routes} from "react-router-dom";
import NavPrincipal from "../menu/NavPrincipal";
import ListarPersona from "../containers/PersonaContainer/ListarPersona";
import AgregarPersona from "../containers/PersonaContainer/AgregarPersona";
import AgregarPeriodo from "../containers/PeriodoContainer/AgregarPeriodo";
import ListarPeriodo from "../containers/PeriodoContainer/ListarPeriodo";
import AgregarMateria from "../containers/MateriaContainer/AgregarMateria";
import ListarMateria from "../containers/MateriaContainer/ListarMateria";
import ListarMatricula from "../containers/MatriculaContainer/ListarMatricula";
import AgregarMatricula from "../containers/MatriculaContainer/AgregarMatricula";





const Router = () => {
    return (
        <div>
            <NavPrincipal />
            <Routes>
            <Route exact path="/persona/listar" element = {<ListarPersona/>}/>
            <Route exact path="/persona/agregar" element = {<AgregarPersona/>}/>
            <Route exact path="/periodo/listar" element = {<ListarPeriodo/>}/>
            <Route exact path="/periodo/agregar" element = {<AgregarPeriodo/>}/>
            <Route exact path="/materia/agregar" element = {<AgregarMateria/>}/>
            <Route exact path="/materia/listar" element = {<ListarMateria/>}/>
            <Route exact path="/matricula/listar" element = {<ListarMatricula/>}/>
            <Route exact path="/matricula/agregar" element = {<AgregarMatricula/>}/>
      
        </Routes>

        </div>

        
    )
}

export default Router;