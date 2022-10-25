import React, { useState, useEffect } from "react";
import LogDataService from "../../services/LogService";
import ReactPaginate from 'react-paginate';
//crear una tabla
const LogList = () => {
  const [logs, setLogs] = useState([]);
  const [pageNumber, setPageNumber] = useState(0); //sirve para la paginacion de la tabla de logs 

 
  const logsPerPage = 8;//asigna el numero de logs que se mostraran por pagina
  const pagesVisited = pageNumber * logsPerPage; //hace la multiplicacion para saber cuantos logs se mostraran por pagina

  const displayLogs = logs //se crea una variable para mostrar los logs
  //pagesVisited es para que se muestren los logs de la pagina anterior
  //pagesVisited+logsPerPage es para que se muestren los logs de la pagina siguiente
    .slice(pagesVisited, pagesVisited + logsPerPage)//el slice
    .map((log) => {//se crea un map para mostrar los logs
      return (
        <tr key={log.id}> 
          <td>{log.id}</td>
          <td>{log.fecha}</td>
          <td>{log.metodo}</td>
          <td>{log.transaccion}</td>
        </tr>
      );
    }
  );

  //se crea una variable para saber cuantas paginas se necesitan para mostrar todos los logs
  const pageCount = Math.ceil(logs.length / logsPerPage);

  const changePage = ({ selected }) => {//se crea una funcion para cambiar de pagina
    setPageNumber(selected);//se asigna el numero de pagina
  }

  useEffect(() => {
    retrieveLogs();
  }
  , []);

  const retrieveLogs = () => {
    LogDataService.getAll()
      .then((response) => {
        setLogs(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  //tabla de logs
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5">Lista de logs</h2>
      <div className="list row justify-content-center">
        <div className="col-md-12">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Id</th>
                <th>Fecha</th>
                <th>Método</th>
                <th>Transacción</th>
              </tr>
            </thead>
            <tbody>
              {displayLogs}
            </tbody>
          </table>
          <ReactPaginate className="pagination 
          justify-content-center"
            previousLabel={"Anterior"} //texto del boton anterior
            nextLabel={"Siguiente"} //texto del boton siguiente
            pageCount={pageCount} //numero de paginas
            onPageChange={changePage} //funcion para cambiar de pagina
            containerClassName={"paginationBttns"}//clase para los botones de paginacion
            previousLinkClassName={"previousBttn"}//clase para el boton anterior
            nextLinkClassName={"nextBttn"}//clase para el boton siguiente
            disabledClassName={"paginationDisabled"}//clase para deshabilitar el boton
            activeClassName={"paginationActive"}
          />
        </div>
      </div>
    </div>
  );
};




export default LogList;