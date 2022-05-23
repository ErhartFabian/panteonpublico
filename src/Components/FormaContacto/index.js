import React, { useState, useRef } from "react";
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
        if (form.current.checkValidity()) {
            sendEmail(e);
            alert('Mensaje Enviado');
        }
        form.current.classNameList.add('was-validated');
    }

    return (
        <div className="area-form">
            <form className="form" id="form" ref={form} onSubmit={handleSubmit}>
                <h2 className="form__title">Contacto</h2>

                <div className="form__container">
                    <div className="form__group">
                        <input type="text" id="nombre" className="form__input" placeholder=" " name="user_name"required />
                            <label htmlFor="nombre" className="form__label">Nombre</label>
                            <span className="form__line"></span>
                    </div>
                    <div className="form__group">
                        <input type="email" id="correo" className="form__input" placeholder=" " name="user_email" required/>
                            <label htmlFor="correo" className="form__label">Email</label>
                            <span className="form__line"></span>
                    </div>
                    <div className="form__group">
                        <input type="text" id="numero-telefono" className="form__input" placeholder=" " name="user_number" required/>
                            <label htmlFor="numero-telefono" className="form__label">Numero de telefono</label>
                            <span className="form__line"></span>
                    </div>
                    <div className="form__group">
                        <textarea type="text" id="area-mensaje" className="form__input" placeholder=" " name="message" maxLength={150} required></textarea>
                            <label htmlFor="area-mensaje" className="form__label">Mensaje</label>
                            <span className="form__line"></span>
                    </div>
                    <button type="submit" className="form__submit" value="Send">Enviar</button>
                </div>
            </form>
            
        </div>
    )
}

export default FormaContacto;