import React from "react";
import {Route,Routes} from "react-router-dom";
import NavPrincipal from "../menu/NavPrincipal";
import ListarPersona from "../containers/PersonaContainer/ListarPersona";
import AgregarPersona from "../containers/PersonaContainer/AgregarPersona";
import UpdatePersona from "../containers/PersonaContainer/UpdatePersona";
import AgregarPeriodo from "../containers/PeriodoContainer/AgregarPeriodo";
import ListarPeriodo from "../containers/PeriodoContainer/ListarPeriodo";
import UpdatePeriodo from "../containers/PeriodoContainer/UpdatePeriodo";
import AgregarMateria from "../containers/MateriaContainer/AgregarMateria";
import ListarMateria from "../containers/MateriaContainer/ListarMateria";
import UpdateMateria from "../containers/MateriaContainer/UpdateMateria";
import ListarMatricula from "../containers/MatriculaContainer/ListarMatricula";
import AgregarMatricula from "../containers/MatriculaContainer/AgregarMatricula";
import UpdateMatricula from "../containers/MatriculaContainer/UpdateMatricula";





const Router = () => {
    return (
        <div>
            <NavPrincipal />
            <Routes>
            <Route exact path="/persona/listar" element = {<ListarPersona/>}/>
            <Route exact path="/persona/agregar" element = {<AgregarPersona/>}/>
            <Route exact path="/persona/editar/:id" element = {<UpdatePersona/>}/>
            <Route exact path="/periodo/listar" element = {<ListarPeriodo/>}/>
            <Route exact path="/periodo/agregar" element = {<AgregarPeriodo/>}/>
            <Route exact path="/periodo/editar/:id" element = {<UpdatePeriodo/>}/>
            <Route exact path="/materia/agregar" element = {<AgregarMateria/>}/>
            <Route exact path="/materia/listar" element = {<ListarMateria/>}/>
            <Route exact path="/materia/editar/:id" element = {<UpdateMateria/>}/>
            <Route exact path="/matricula/listar" element = {<ListarMatricula/>}/>
            <Route exact path="/matricula/agregar" element = {<AgregarMatricula/>}/>
            <Route exact path="/matricula/editar/:id" element = {<UpdateMatricula/>}/>
          
      
        </Routes>

        </div>

        
    )
}

export default Router;