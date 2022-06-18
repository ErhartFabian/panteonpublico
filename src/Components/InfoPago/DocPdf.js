import React, { useRef } from "react";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFile} from '@fortawesome/free-solid-svg-icons';
import ReactToPrint from "react-to-print";
import ayuntamiento from './imagenes/ayuntamiento.png';
import './css/boleta.css'

export default function DocPdf (props) {
    let componentRef = useRef();
    return (
      <>
        <div>
          {/* button to trigger printing of target component */}
          <ReactToPrint
            documentTitle="Ficha de pago"
            trigger={() => 
            <Button
            type="submit"
            variant="contained" 
            color="secondary"
            size="large"
            disableElevation
            ><FontAwesomeIcon className='icono' icon={faFile}/>Descargar Pdf</Button>
            }
            content={() => componentRef}
          />
  
          <div style={{ display: "none" }}>
              <ComponentToPrint 
                Print_cuartel = {props.Campo_cuartel}
                Print_clase = {props.Campo_clase}
                Print_lote = {props.Campo_lote}
                Print_fosa = {props.Campo_fosa}
                Print_responsable = {props.Campo_titular}
                Print_finado = {props.Campo_finado}
                Print_inhumacionFinado = {props.Campo_inhumacionFinado}
                ref={(el) => (componentRef = el)} />
          </div>
  
        </div>
      </>
    );
  }

class ComponentToPrint extends React.Component {
    render() {
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
                <p className="Name_titular">Titular de la concesión: {this.props.Print_responsable}</p>
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
        <p>Cuartel: <b>{this.props.Print_cuartel}</b> </p> 
        <p>Clase: <b>{this.props.Print_clase}</b> </p>
        <p>Lote: <b> {this.props.Print_lote}</b>  </p>
        <p>Fosa: <b>{this.props.Print_fosa}  </b> </p>
        </div>
        <div className="informacionfosa2">
            <div className="datosfosa">
                <p>Tipo de construcción: </p>
                <p>Capilla Individual</p>
            </div>
            <div className="datosfosa2">
                <p id="Ultimapersona">Última persona inhumada:</p>
                <div className="boxFinado">
                    <p>{this.props.Print_finado}</p>
                    <div><p>{this.props.Print_inhumacionFinado}</p></div>
                </div>
            </div>
        </div>
        <h3 id="adeudos">Adeudos por Ejercicio Fiscal</h3>
        <table className="tabladatos">
            <thead>
                <tr>
                    <th className="encabezados">Ejercicios </th>
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
                    <td bgcolor="#EEEEEE" colSpan="4"> <b>$0.00</b></td>
                </tr>
            </tfoot>
        </table>
    </div>
      );
    }
  }
