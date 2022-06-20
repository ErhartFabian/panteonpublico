import React from "react";
import "./MsjError.css";
import errorimg from "./404Panteon.png"

function MsjError(){
    return(
        <div className="backgnd">
            <img className="imgError" src={errorimg} alt="Imagen de error"></img>
            <div className="mensaje">
                <a className="enlaceInicio" href="/">Enlace para ir al inicio</a>
            </div>
        </div>
    );
}

export default MsjError;