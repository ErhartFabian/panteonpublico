import React, {useState} from 'react';
import Boleta from './Boleta';
import DocPdf from './DocPdf';
import './css/InfoPago.css'
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faReceipt} from '@fortawesome/free-solid-svg-icons';
import Datepicker,{registerLocale} from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es'


registerLocale("es",es);

function InfoPago() {
    const [clavepago,setClavepago] =useState("");
    const[fecha,setFecha] = useState(new Date("2022", "01", "01"));
    const [verComprobante,setVerComprobante] = useState(false);
    const [status, setStatus] =useState('');
    const [mostrar, setMostrar] = useState(false);

    const Buscar = ()=>{
        return(
            <div className='generador'>
            <Button 
            id="boton"
            type="submit"
            variant="contained" 
            color="primary"
            size="medium"
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
        );
    };

    const handleChange = e =>{
        setClavepago(e.target.value);
    }

    const handleSubmit = e =>{
        e.preventDefault();
        let emptyVal;

        if(e.target.value === ""){
            emptyVal = true;
        }
        
        if(emptyVal === true){
            alert("Por favor llene los datos");
        }

        else{
            setStatus('complete');
        }
    }

    const  handleClick = () => {
        setMostrar(true);
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className='informacion' value={status}>
                <h1 id="name">Comprobante de pago</h1>
                <div className='dato'>
                    <label htmlFor="idpago" id='pago'>Clave de pago </label> 
                    <input 
                    className='input'
                    placeholder='Ingrese clave de pago' 
                    type="text" 
                    name="clavepago" 
                    value={clavepago}
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
                <div className="generador">
                    <Button
                    id="boton"
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="medium"
                    disableElevation
                    onClick={handleClick}
                    >
                        Buscar comprobante 
                    </Button>
                    {mostrar ? <Buscar/> : null}

                </div>
            </form>
            {verComprobante ? <Boleta/> : null}
        </div>
    )
}

export default InfoPago;