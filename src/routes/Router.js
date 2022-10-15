import React from "react";
import {Route,Routes} from "react-router-dom";
import NavPrincipal from "../menu/NavPrincipal";
import ListarPersona from "../components/Persona/PersonaList";
import AgregarPersona from "../components/Persona/PersonaAdd";
import UpdatePersona from "../components/Persona/PersonaUpdate";


const Router = () => {
    return (
        <div>
            <NavPrincipal />
            <Routes>
            <Route exact path="/persona/listar" element = {<ListarPersona/>}/>
            <Route exact path="/persona/agregar" element = {<AgregarPersona/>}/>
            <Route exact path="/persona/actualizar" element = {<UpdatePersona/>}/>
      
        </Routes>

        </div>

        
    )
}

export default Router;