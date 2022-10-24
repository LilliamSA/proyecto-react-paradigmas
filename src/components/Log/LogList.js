import React, { useState, useEffect } from "react";
import LogDataService from "../../services/LogService";
import { Link } from "react-router-dom";
//crear una tabla
const LogList = () => {
  const [logs, setLogs] = useState([]);
  const [currentLog, setCurrentLog] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrieveLogs();
  }, []);

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

  return (
    //una tabla con los datos de la base de datos
    <div className="container mt-5">
      <h2 className="text-center mb-5">Lista de logs</h2>
      <div className="list row justify-content-center">
        <div className="col-md-6">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Id</th>
                <th>Metodo</th>
                <th>Fecha</th>
                <th>Transacción para</th>
              </tr>
            </thead>
            <tbody>
              {logs &&
                logs.map((log, index) => (
                  <tr key={index}>
                    <td>{log.id}</td>
                    <td>{log.metodo}</td>
                    <td>{log.fecha}</td>
                    <td>{log.transaccion}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default LogList;
