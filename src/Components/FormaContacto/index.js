import React, { useState, useRef, useEffect } from "react";
import './FormaContacto.css';
import emailjs from '@emailjs/browser';

function FormaContacto() {
    const form = useRef();
    const [mensajeEnviado, setMensajeEnviado] = useState(false);
    const [showElement, setShowElement] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            process.env.REACT_APP_EMAILJS_SERVICE_ID,
            process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
            form.current,
            process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        )
            .then((result) => {
                console.log('Email enviado:', result.text);
                setMensajeEnviado(true);
            })
            .catch((error) => {
                console.error('Error al enviar email:', error);
                setErrorMessage('Error al enviar el mensaje');
            });
    }
    useEffect(() => {
        let timeoutId;
        if (showElement) {
            timeoutId = setTimeout(() => {
                setShowElement(false);
            }, 3000);
        }
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [showElement]);

    function handleSubmit(e) {
        e.preventDefault();
        setErrorMessage('');
        if (form.current.checkValidity()) {
            sendEmail(e);
            setShowElement(true);
        }
        form.current.classList.add('was-validated');
    }

    return (
        <div className="area-form">
            <div className="instructions_contacto">
                <h2>¿Tienes alguna duda?</h2>
                <label>
                    Llena el siguiente formulario y nos pondremos en contacto contigo.
                </label>
                <p>
                   Escribe tu duda, comentario o sugerencia.
                </p>
            </div>
            <form className="form" id="form" ref={form} onSubmit={handleSubmit}>
                <h2 className="form__title">Contacto</h2>

                <div className="form__container">
                    <div className="form__group">
                        <input type="text" id="nombre" maxLength={50} className="form__input" placeholder=" " name="user_name" required aria-label="Nombre completo" />
                        <label htmlFor="nombre" className="form__label">Nombre</label>
                        <span className="form__line"></span>
                    </div>
                    <div className="form__group">
                        <input type="email" id="correo" maxLength={64} className="form__input" placeholder=" " name="user_email" required aria-label="Correo electrónico" />
                        <label htmlFor="correo" className="form__label">Correo</label>
                        <span className="form__line"></span>
                    </div>
                    <div className="form__group">
                        <input type="tel" maxLength={10} id="numero-telefono" className="form__input" placeholder=" " name="user_number" pattern="[0-9]*" required aria-label="Número de teléfono" />
                        <label htmlFor="numero-telefono" className="form__label">Número de teléfono</label>
                        <span className="form__line"></span>
                    </div>
                    <div className="form__group">
                        <textarea id="area-mensaje" maxLength={160} className="form__input" placeholder=" " name="message" required aria-label="Mensaje"></textarea>
                        <label htmlFor="area-mensaje" className="form__label">Mensaje</label>
                        <span className="form__line"></span>
                    </div>
                    <button type="submit" className="form__submit">Enviar</button>
                </div>
                {(mensajeEnviado || errorMessage) && showElement && (
                    <div className={mensajeEnviado ? 'mensaje-enviado' : 'mensaje-error'} role="alert">
                        {mensajeEnviado && <p>✓ Mensaje enviado correctamente</p>}
                        {errorMessage && <p>✗ {errorMessage}</p>}
                    </div>
                )}

            </form>
        </div>
    )
}

export default FormaContacto;