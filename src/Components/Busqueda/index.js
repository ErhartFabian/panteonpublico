import React from "react";
import './Busqueda.css';

function Busqueda () {
    return (
        // <div className="SearchBox">
        //     <h2 className="title">Búsqueda del Panteón</h2>
        // </div>
        //Usar un form para que funcione la búsqueda 
        <div className="table_container">
            <div className="search_box">
                <input className="search_input" value={'Buscar'}/>
                <button className="search_button" type="submit">Lupa</button>
            </div>

            <div className="filters">
                <div className="cuartel_filter">
                    <button className="cuartel_button">Cuartel</button>
                </div>
                <div className="clase_filter">
                    <button className="clase_button">Clase</button>
                </div>
                <div className="fosa_filter">
                    <button className="fosa_button">Fosa</button>
                </div>
            </div>
        </div>

    )
}

export default Busqueda;

