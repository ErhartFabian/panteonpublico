import React, {useState} from 'react';
import './css/InfoPago.css'
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faReceipt} from '@fortawesome/free-solid-svg-icons';
import Datepicker,{registerLocale} from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es'
import Comprobante from './Comprobante';
import DocPdf from './DocPdf';

registerLocale("es",es);

function InfoPago() {
    const [datospago,setDatospago] =useState({})
    const [verComprobante,setVerComprobante] = useState(false);

    const handleChange = e =>{
        setDatospago({
            ...datospago,
            [e.target.name]:e.target.value, 
        })
    }

    const[fecha,setFecha] = useState(new Date("2022", "01", "01"));

    const handleSubmit = e =>{
        e.preventDefault();
        setDatospago({
            ...datospago,
            [e.target.name]:e.target.value, 
        })
    }
    
    return (
        <div className="container">
            <form onSubmit={handleSubmit} className='informacion'>
                <h1 id="name">Comprobante de pago</h1>
                <div className='dato'>
                    <label htmlFor="idpago" id='pago'>Clave de pago </label> 
                    <input 
                    className='input'
                    placeholder='Ingrese clave de pago' 
                    type="text" 
                    name="idpago" 
                    value={datospago.idpago}
                    onChange={handleChange}
                    />
                </div>

                <div className='dato'>
                    <label htmlFor="idfosa" id='fosa'>Clave de fosa </label> 
                    <input 
                    className='input' 
                    type="text"
                    placeholder='Ingrese clave de fosa'
                    name="idfosa"
                    value={datospago.idfosa}
                    onChange={handleChange}
                    />
                </div>

                <div className='dato'>
                    <label  htmlFor='fecha' id="fechaPago" >Fecha de pago</label>
                    <div>
                    <Datepicker
                    className='datepicker'
                    selected={fecha}
                    onChange={(date: fecha) => setFecha(date)}
                    locale={es}
                    dateFormat="dd-MMMM-yyyy"/>
                    </div>
                </div>

                <div className='generador'>
                    <Button 
                    type="submit"
                    variant="contained" 
                    color="primary"
                    size="large"
                    disableElevation
                    onClick={()=>{
                        setVerComprobante(!verComprobante);
                    }}
                    >
                    <FontAwesomeIcon className='icono' icon={faReceipt} />
                        {verComprobante ? "Ocultar comprobante" : "Ver Comprobante"} 
                    </Button>
                    <DocPdf/>
                </div>
            </form>
            {verComprobante ? <Comprobante/> : null}
        </div>
    )
}
export default InfoPago;