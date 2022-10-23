import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const inicio = () => {

    return (

        <div className="container">
            <div className="row text-center mt-5">
                <div className="col-md-12">
                    <h1>Bienvenido al Sistema de Matricula!</h1>
                </div>
            </div>

            <div className="row d-flex justify-content-center mt-3">
                <div className="col-9">

                    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="img1.png" class="d-block w-100 h-50" alt="..." />
                            </div>
                            <div class="carousel-item">
                                <img src="img2.png" class="d-block w-100 h-50" alt="..." />
                            </div>
                            <div class="carousel-item">
                                <img src="img3.png" class="d-block w-100 h-50" alt="..." />
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>

                </div>
            </div>

        </div>

    )

};

export default inicio;