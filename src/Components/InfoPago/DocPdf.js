import React, { useMemo, useRef } from "react";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { useReactToPrint } from "react-to-print";
import ayuntamiento from './imagenes/ayuntamiento.png';
import './css/boleta.css'

export default function DocPdf(props) {
    const printableRef = useRef(null);

    const handlePrint = useReactToPrint({
        documentTitle: "Ficha de pago",
        contentRef: printableRef,
    });

    return (
        <>
            <div>
                <Button
                    style={{
                        backgroundColor: '#259f48',
                        padding: '1.2em'
                    }}
                    type="button"
                    variant="contained"
                    color="secondary"
                    size="medium"
                    disableElevation
                    onClick={handlePrint}
                >
                    <FontAwesomeIcon className='icono' icon={faFile} />
                    Descargar Pdf
                </Button>

                <div style={{ display: "none" }}>
                    <div ref={printableRef}>
                        <ComponentToPrint
                            Print_cuartel={props.Campo_cuartel}
                            Print_clase={props.Campo_clase}
                            Print_lote={props.Campo_lote}
                            Print_fosa={props.Campo_fosa}
                            Print_responsable={props.Campo_titular}
                            Print_finado={props.Campo_finado}
                            Print_inhumacionFinado={props.Campo_inhumacionFinado}
                            Print_montos={props.Montos}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

function ComponentToPrint(props) {
    const adeudo = useMemo(() => {
        if (!Array.isArray(props.Print_montos)) {
            return '0.00';
        }

        const sumaAdeudos = props.Print_montos.reduce((acc, element) => {
            return Number(element.status) === 0 ? acc + Number(element.monto || 0) : acc;
        }, 0);

        return sumaAdeudos.toFixed(2);
    }, [props.Print_montos]);

    return (
        <div id="boleta">
            <div className="datos1">
                <div className="titulos">
                    <h2 id="Tboleta">Municipio de Pachuca de Soto - Secretaria de
                        Servicios Publicos Municipales
                    </h2>
                    <h3 id="Sboleta">Boleta de Anualidad Panteon Municipal</h3>
                </div>
                <div><img id="logo" src={ayuntamiento} alt="logo" /></div>
            </div>
            <div className="titular">
                <div id="datostitular">
                    <p className="Name_titular">Titular de la concesion: {props.Print_responsable}</p>
                    <p>Pachuca de Soto Hidalgo C.p 42039 </p>
                    <div> <p>R.F.C</p></div>
                </div>
                <div id="clave">
                    <p>Clave:</p>
                    <p>PM001997</p>
                </div>
            </div>
            <div>
                <h3 id="Tfosa">Informacion de la fosa</h3>
            </div>
            <div className="informacionfosa">
                <p>Cuartel: <b>{props.Print_cuartel}</b> </p>
                <p>Clase: <b>{props.Print_clase}</b> </p>
                <p>Lote: <b> {props.Print_lote}</b>  </p>
                <p>Fosa: <b>{props.Print_fosa}  </b> </p>
            </div>
            <div className="informacionfosa2">
                <div className="datosfosa">
                    <p>Tipo de construccion: </p>
                    <p>Capilla Individual</p>
                </div>
                <div className="datosfosa2">
                    <p id="Ultimapersona">Ultima persona inhumada:</p>
                    <div className="boxFinado">
                        <p>{props.Print_finado}</p>
                        <div><p>{props.Print_inhumacionFinado}</p></div>
                    </div>
                </div>
            </div>
            <h3 id="adeudos">Adeudos por Ejercicio Fiscal</h3>
            <table className="tabladatos">
                <thead>
                    <tr>
                        <th className="encabezados">Ejercicio</th>
                        <th className="encabezados">Monto</th>
                        <th className="encabezados">Concepto</th>
                        <th className="encabezados">Estatus</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.Print_montos === undefined ? null :
                            props.Print_montos.map((element, index) => {
                                return (
                                    <tr key={index}>
                                        <td className="columnafecha">{element.ano}</td>
                                        <td className="columna">{element.monto}</td>
                                        <td className="columna">{element.commet === null ? 'Indefinido' : element.commet}</td>
                                        <td className="columna">{Number(element.status) === 0 ? 'No pagado' : 'Pagado'}</td>
                                    </tr>
                                );
                            })
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="1"> Monto a pagar: </td>
                        <td bgColor="#EEEEEE" colSpan="4"> <b>${adeudo}</b></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
