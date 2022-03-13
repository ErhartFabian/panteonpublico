import React,{useState, useRef} from "react";
import './FormaContacto.css';
import emailjs from '@emailjs/browser';

function FormaContacto() {
    //imprimir el nomre de la persona en consola
    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
      emailjs.sendForm('service_y1w5vug', 'template_nmhx1uc', form.current, 'KFcgLyPohhWVvEG6y')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset();
    };
    
    

    return (
        <div className="area-form">
            <form id="form" ref={form} >
                <h1>Contacto</h1>
                {/* Formulario */}
                
                    <div className="form-group">
                        <div id="top-form">
                            <div id="Nombre" className="form-element">
                                <input maxlength="60" type="text" className="form-control" className="input-group" id="nombre"  placeholder="Nombre" name="user_name"/>
                            </div>

                            <div id="Email" className="form-element">
                                <input type="email" className="form-control" className="input-group" id="correo"  placeholder="Ingrese Correo" name="user_email" />
                            </div>

                            <div id="Numero" className="form-element">
                                <input maxlength="10" type="tel" className="form-control" className="input-group" id="numero-telefono" placeholder="Numero de Telefono" name="numero"/>
                            </div>

                        </div>

                        <div id="bottom-form">
                            
                                {/* <label htmlFor="Mensaje">Mensaje:</label> */}
                                <textarea maxlength="252" id="area-mensaje"  rows="3" placeholder="Mensaje" name="message"></textarea>
                            

                            {/* boton de enviar */}
                            <button type="submit" className="enviar-button" value="Send">Enviar</button>
                        </div>

                        
                    </div>
                 

                
            </form>

        </div>
    )
}

export default FormaContacto;