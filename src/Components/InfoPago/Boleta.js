import React from "react";
import ayuntamiento from './imagenes/ayuntamiento.png';
import './css/boleta.css'

export default function Boleta({campo_cuartel,campo_clase,campo_lote,campo_fosa}) {
    return (
        <div id="boleta">
        <div className="datos1">
            <div className="titulos">
                <h2 id="Tboleta">Municipio de Pachuca de Soto - Secretaria de
                Servicios Públicos Municipales
                </h2>
                <h3 id="Sboleta">Boleta de Anualidad Panteon Municipal</h3>
            </div>
            <div><img id="logo" src={ayuntamiento} alt="logo"/></div>
        </div>
        <div className="titular">
            <div id="datostitular">
                <p>Titular de la concesión: Juana Perez Hernández</p>
                <p>Col. Santa Julia calle 5 de Mayo #113</p>
                <p>Pachuca de Soto Hidalgo C.p 42039 </p>
                <div> <p>R.F.C</p></div>
            </div>
            <div id="clave">
                <p>Clave:</p>
                <p>PM001997</p>
            </div>
        </div>
        <div className="responsable2">
            <p>Segundo responsable: FERNANDO PÉREZ HERNÁNDEZ</p>
            <p>AV. Solidaridad, Col. Villa Aquiles Serdán #113 Pachuca de Soto, Hidalgo C.p 42039 R.F.C</p>
        </div>
        <div>
            <h3 id="Tfosa">Información de la fosa</h3>
        </div>
        <div className="informacionfosa">
        <p>Cuartel: <b>{campo_cuartel}</b> </p> 
        <p>Clase: <b>{campo_clase}</b> </p>
        <p>Lote: <b>{campo_lote} </b>  </p>
        <p>Fosa: <b>{campo_fosa}</b> </p>
        </div>
        <div className="informacionfosa2">
            <div className="datosfosa">
                <p>Tipo de construcción: </p>
                <p>Capilla Individual</p>
            </div>
            <div className="datosfosa2">
                <p id="Ultimapersona">Ultima persona inhumada:</p>
                <p>Finado Hérnandez Hernández</p>
                <div><p>01/Enero/2022</p></div>
            </div>
        </div>
        <h3 id="adeudos">Adeudos por Ejercicio Fiscal</h3>
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
                    <td className="columna">0</td>
                    <td className="columna">0</td>
                    <td className="columna">0</td>
                </tr>

                <tr>
                    <td className="columnafecha">2021</td>
                    <td className="datos4">0</td>
                    <td className="datos4">0</td>
                    <td className="datos4">0</td>
                </tr>

                <tr>
                    <td className="columnafecha">2022</td>
                    <td className="columna">0</td>
                    <td className="columna">0</td>
                    <td className="columna">0</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="1"> Monto a pagar: </td>
                    <td bgcolor="#EEEEEE" colSpan="4"> <b>$183.00 (Ciento ochenta y tres pesos 00/100 M.N</b></td>
                </tr>
            </tfoot>
        </table>
    </div>
    );
}