import React,{useState, useRef} from "react";
import './FormaContacto.css';
import emailjs from '@emailjs/browser';

function FormaContacto() {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

    emailjs.sendForm('service_ljg41tl', 'template_hsh9d4l', form.current, 'KFcgLyPohhWVvEG6y')
    .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
    e.target.reset();
  }
   /* cuando todos los datos este llenos al momento de hacer click en el boton se muestra un mensaje de exito */
   function handleSubmit(e) {
    e.preventDefault();
    if(form.current.checkValidity()){
      sendEmail(e);
        alert('Mensaje Enviado');
    }
    form.current.classList.add('was-validated');
  }

    return (
        <div className="area-form">
            <form id="form" ref={form} onSubmit={handleSubmit}>
                <h1>Contacto</h1>
                {/* Formulario */}
                    <div className="form-group">
                        <div id="top-form">
                            <div id="Nombre" className="form-element">
                                <input maxLength="60" type="text" className="form-control" className="input-group" id="nombre"  placeholder="Nombre" name="user_name"required/>
                            </div>
                            <div id="Email" className="form-element">
                                <input type="email" className="form-control" className="input-group" id="correo"  placeholder="Ingrese Correo" name="user_email" required/>
                            </div>
                            <div id="Numero" className="form-element">
                                <input maxLength="10" type="tel" className="form-control" className="input-group" id="numero-telefono" placeholder="Numero de Telefono" name="user_number" required/>
                            </div>
                        </div>
                        <div id="bottom-form">
                                <textarea maxLength="252" id="area-mensaje"  rows="3" placeholder="Mensaje" name="message" required></textarea>
                            
                            {/* boton de enviar */}
                            <button type="submit" className="enviar-button" value="Send">Enviar</button>
                        </div>
                        
                    </div>
                
            </form>
        </div>
    )
}

export default FormaContacto;