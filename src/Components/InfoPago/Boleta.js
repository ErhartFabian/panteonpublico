import React from "react";
import ayuntamiento from './imagenes/ayuntamiento.png';
import './css/boleta.css'
export default function Boleta(props) {
    console.log('En boleta: ' + props.responsable);

    return (
        <div id="boleta">
            <div className="datos1">
                <div className="titulos">
                    <h2 id="Tboleta">Municipio de Pachuca de Soto - Secretaria de
                    Servicios Públicos Municipales
                    </h2>
                    <h3 id="Sboleta">Boleta de Anualidad Panteon Municipal</h3>
                </div>
                <div className="titular">
                    <div id="datostitular">
                        <p>Titular de la concesión: <b>{props.responsable}</b> </p>
                        <p>Col. Santa Julia calle 5 de Mayo #113</p>
                        <p>Pachuca de Soto Hidalgo C.p 42039 </p>
                        <p>R.F.C</p>
                    </div>
                    <div id="clave">
                        <p>Clave:</p>
                        <p>PM001997</p>
                    </div>
                </div>
                <div id="clave">
                    <p>Clave:</p>
                    <p>PM001997</p>
                </div>
                <h3>Información de la fosa</h3>
                <div className="informacionfosa">
                    <p>Cuartel: <b>{props.cuartel}</b> </p>
                    <p>Clase: <b>{props.clase}</b> </p>
                    <p>Lote: <b>{props.lote}</b>  </p>
                    <p>Fosa: <b>{props.fosa}</b> </p>
                </div>
                <div className="informacionfosa2">
                    <div className="datosfosa">
                        <p>Tipo de construcción: </p>
                        <p>Capilla Individual</p>
                    </div>
                    <div className="datosfosa">
                        <p>Ultima persona inhumada:</p>
                        <p>{props.finado}</p>
                    </div>
                </div>
                <h3>Adeudos por Ejercicio Fiscal</h3>
                <table className="tabladatos">
                    <thead>
                        <tr>
                            <th className="encabezados">Ejercicio </th>
                            <th className="encabezados">Anualidad </th>
                            <th className="encabezados">Actualización </th>
                            <th className="encabezados">Multa </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="columnafecha">2020</td>
                            <td className="columna">$0</td>
                            <td className="columna">$0</td>
                            <td className="columna">$0</td>
                        </tr>

                        <tr>
                            <td className="columnafecha">2021</td>
                            <td className="datos4">$0</td>
                            <td className="datos4">$0</td>
                            <td className="datos4">$0</td>
                        </tr>

                        <tr>
                            <td className="columnafecha">2022</td>
                            <td className="columna">${props.adeudo}</td>
                            <td className="columna">$0</td>
                            <td className="columna">$0</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="1"> Monto a pagar: </td>
                            <td bgcolor="#EEEEEE" colSpan="4"> <b>${props.adeudo}.00 Ciento ochenta y tres pesos</b></td>
                        </tr>
                    </tfoot>
                </table>
                <div>
                    <h2>Referencia Bancaria</h2>
                </div>
            </div>
        </div>
    );
}
