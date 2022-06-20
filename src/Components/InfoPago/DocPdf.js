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
                style={{
                    backgroundColor: '#259f48',
                    padding: '1.2em'
                }}
                type="submit"
                variant="contained" 
                color="secondary"
                size="medium"
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
                Print_montos = {props.Montos}
                ref={(el) => (componentRef = el)} />
          </div>
  
        </div>
      </>
    );
  }

class ComponentToPrint extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            adeudo: 0
        };
    }
    
    
    componentDidMount(){ 
        let sumaAdeudos = 0; 
        
        if(this.props.Print_montos !== undefined ){

            this.props.Print_montos.forEach((element)=>{
                if ( element.status === 0){
                    sumaAdeudos = sumaAdeudos + Number(element.monto);
                }
            })
            
            this.setState({adeudo: this.state.adeudo + sumaAdeudos});
        }
    }
   
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
                <p>Pachuca de Soto Hidalgo C.p 42039 </p>
                <div> <p>R.F.C</p></div>
            </div>
            <div id="clave">
                <p>Clave:</p>
                <p>PM001997</p>
            </div>
        </div>
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
                    <th className="encabezados">Ejercicio</th>
                    <th className="encabezados">Monto</th>
                    <th className="encabezados">Concepto</th>
                    <th className="encabezados">Estatus</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.props.Print_montos === undefined ? null : 
                    this.props.Print_montos.map((element, index) => {
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
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="1"> Monto a pagar: </td>
                    <td bgcolor="#EEEEEE" colSpan="4"> <b>${this.state.adeudo}</b></td>
                </tr>
            </tfoot>
        </table>
    </div>
      );
    }
  }
