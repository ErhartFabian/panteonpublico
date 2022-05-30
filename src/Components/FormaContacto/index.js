import React, { useState, useRef, useEffect } from "react";
import './FormaContacto.css';
import emailjs from '@emailjs/browser';

function FormaContacto() {
    const form = useRef();
    //useState para el mensaje de enviado correctamente
    const [mensajeEnviado, setMensajeEnviado] = useState(false);
    const [showElement, setShowElement] = useState(false);

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
            setMensajeEnviado(true);
            setShowElement(true);
            setTimeout(function () {
                setShowElement(false);
            }, 3000);
        }
        form.current.classNameList.add('was-validated');
    }

    return (
        <div className="area-form">
            <div className="instructions_contacto">
                <h2>¿Tienes alguna duda?</h2>
                <p>
                    Favor llena el siguiente formulario y nos pondremos en contacto contigo.
                </p>
                <p>
                    En la sección de mensaje siéntete libre de escribir cualquier duda, comentario o sugerencia.
                </p>
            </div>
            <form className="form" id="form" ref={form} onSubmit={handleSubmit}>
                <h2 className="form__title">Contacto</h2>

                <div className="form__container">
                    <div className="form__group">
                        <input type="text" id="nombre" className="form__input" placeholder=" " name="user_name" required />
                        <label htmlFor="nombre" className="form__label">Nombre</label>
                        <span className="form__line"></span>
                    </div>
                    <div className="form__group">
                        <input type="email" id="correo" className="form__input" placeholder=" " name="user_email" required />
                        <label htmlFor="correo" className="form__label">Correo</label>
                        <span className="form__line"></span>
                    </div>
                    <div className="form__group">
                        <input type="text" id="numero-telefono" className="form__input" placeholder=" " name="user_number" required />
                        <label htmlFor="numero-telefono" className="form__label">Numero de teléfono</label>
                        <span className="form__line"></span>
                    </div>
                    <div className="form__group">
                        <textarea type="text" id="area-mensaje" className="form__input" placeholder=" " name="message" maxLength={150} required></textarea>
                        <label htmlFor="area-mensaje" className="form__label">Mensaje</label>
                        <span className="form__line"></span>
                    </div>
                    <button type="submit" className="form__submit" value="Send">Enviar</button>
                </div>
                {showElement ? (
                    <div  className={mensajeEnviado ? 'mensaje-enviado' : 'mensaje-enviado-oculto'}>
                        {mensajeEnviado && (
                            <p>Mensaje enviado correctamente</p>
                        )}
                    </div>
                ) : (
                    <div> </div>
                )}{" "}

            </form>
        </div>
    )
}

export default FormaContacto;