import React, {useEffect, useState} from "react";
import ayuntamiento from './imagenes/ayuntamiento.png';
import './css/boleta.css'

export default function Boleta(props) {

    const [adeudo, setAdeudo] = useState(0);
    
    useEffect(() => {

        let sumaAdeudos = 0; 
        
        props.Montos.forEach((element)=>{
            if ( element.status === 0){
                sumaAdeudos = sumaAdeudos + Number(element.monto);
            }
        })
            
        console.log(sumaAdeudos);
        setAdeudo(sumaAdeudos.toFixed(2));
    })

    console.log('Length montos: ' + props.Montos.length);
    return (
        <div id="boleta">
            <div className="datos1">
                <div className="titulos">
                    <h2 id="Tboleta">Municipio de Pachuca de Soto - Secretaria de
                    Servicios Públicos Municipales
                    </h2>
                    <h3 id="Sboleta">Boleta de Anualidad Panteón Municipal</h3>
                </div>
                <div><img id="logo" src={ayuntamiento} alt="logo"/></div>
            </div>
            <div className="titular">
                <div id="datostitular">
                    <p className="Name_titular">Titular de la concesión: {props.campo_titular}</p>
                    {/* <p>Col. Santa Julia calle 5 de Mayo #113</p> */}
                    <p>Pachuca de Soto Hidalgo C.p 42039 </p>
                    <div> <p>R.F.C</p></div>
                </div>
                <div id="clave">
                    <p>Clave:</p>
                    <p>PM001997</p>
                </div>
            </div>
            {/* <div className="responsable2">
                <p>Segundo responsable: FERNANDO PÉREZ HERNÁNDEZ</p>
                <p>AV. Solidaridad, Col. Villa Aquiles Serdán #113 Pachuca de Soto, Hidalgo C.p 42039 R.F.C</p>
            </div> */}
            <div>
                <h3 id="Tfosa">Información de la fosa</h3>
            </div>
            <div className="informacionfosa">
            <p>Cuartel: <b>{props.campo_cuartel}</b> </p> 
            <p>Clase: <b>{props.campo_clase}</b> </p>
            <p>Lote: <b>{props.campo_lote} </b>  </p>
            <p>Fosa: <b>{props.campo_fosa}</b> </p>
            </div>
            <div className="informacionfosa2">
                <div className="datosfosa">
                    <p>Tipo de construcción: </p>
                    <p>Capilla Individual</p>
                </div>
                <div className="datosfosa2">
                    <p id="Ultimapersona">Última persona inhumada:</p>
                    <div className="boxFinado">
                        <p>{props.campo_finado}</p>
                        <div><p>{props.campo_inhumacionFinado}</p></div>
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
                        props.Montos.map((element, index) => {
                            return (
                                <tr key={index}>
                                    <td className="columnafecha">{element.ano}</td>
                                    <td className="columna">{element.monto}</td>
                                    <td className="columna">{element.commet === null ? 'Indefinido' : element.commet}</td>
                                    <td className="columna">{element.status === 0 ? 'No pagado' : 'Pagado'}</td>
                                </tr>
                            );
                        })
                    }
                    {/* <tr>
                        <td className="columnafecha">{props.Montos[0].ano}</td>
                        <td className="columna">{props.Montos[0].monto}</td>
                        <td className="columna">{props.Montos[0].commet === null ? 'Indefinido' : props.Montos[0].commet}</td>
                        <td className="columna">{props.Montos[0].status === 0 ? 'No pagado' : 'Pagado'}</td>
                    </tr>  */}
                    {/* <tr>
                        <td className="columnafecha">2021</td>
                        <td className="datos4">$0</td>
                        <td className="datos4">$0</td>
                        <td className="datos4">$0</td>
                        </tr>
                    <tr>
                        <td className="columnafecha">2022</td>
                        <td className="columna"> ${props.adeudo == undefined  ? 0 : props.adeudo}</td>
                        <td className="columna">$0</td>
                        <td className="columna">$0</td>
                    </tr> */}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="1"> Monto a pagar: </td>
                        <td bgcolor="#EEEEEE" colSpan="4"> <b>${adeudo}</b></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}
