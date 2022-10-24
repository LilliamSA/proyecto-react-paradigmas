import React, { useState, useEffect } from "react";
import LogDataService from "../../services/LogService";
import ReactPaginate from 'react-paginate';
//crear una tabla
const LogList = () => {
  const [logs, setLogs] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

 
  const logsPerPage = 8;
  const pagesVisited = pageNumber * logsPerPage;

  const displayLogs = logs
    .slice(pagesVisited, pagesVisited + logsPerPage)
    .map((log) => {
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

  const pageCount = Math.ceil(logs.length / logsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
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
            previousLabel={"Anterior"}
            nextLabel={"Siguiente"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </div>
      </div>
    </div>
  );
};




export default LogList;