import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import "bootstrap/dist/css/bootstrap.min.css";
ReactDOM.render(
 <BrowserRouter>
 <Router />
 </BrowserRouter>,
 document.getElementById("root")
);
