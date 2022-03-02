import React from "react";
import './FormaContacto.css';


function FormaContacto() {

    return (
        <div className="Header">
            <div id="form">
                <h1>Contacto</h1>
                {/* Formulario */}
                
                    <div className="form-group">
                        <div id="top-form">
                            <div id="Nombre" className="form-element">
                                <label htmlFor="nombre">Nombre:</label>
                                <input type="text" className="form-control" id="nombre" placeholder="Nombre"/>
                            </div>

                            <div id="Email" className="form-element">
                                <label htmlFor="exampleInputEmail">Dirección de Correo Electronico: </label>
                                <input type="email" className="form-control" id="exampleInputEmail"  placeholder="Ingrese Correo" />
                            </div>

                            <div id="Numero" className="form-element">
                                <label htmlFor="Numero de Telefono">Numero de Telefono:</label>
                                <input type="number" className="form-control" id="Numero de Telefono" placeholder="Numero de Telefono"/>
                            </div>

                        </div>

                        <div id="bottom-form">
                            <div id="Mensaje" className="form-element">
                                <label htmlFor="Mensaje">Mensaje:</label>
                                <textarea className="form-control" id="Mensaje" rows="3"></textarea>
                            </div>

                            {/* boton de enviar */}
                            <button type="submit" className="btn btn-primary">Enviar</button>
                        </div>

                        
                    </div>
                     
                

                
            </div>

        </div>
    )
}

export default FormaContacto;