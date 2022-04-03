import React, {useState} from 'react';
import './InfoPago.css'
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faReceipt} from '@fortawesome/free-solid-svg-icons';
import Datepicker,{registerLocale} from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es'

registerLocale("es",es);

function InfoPago() {
    const [datospago,setDatospago] =useState({})

    const handleChange = e =>{
        setDatospago({
            ...datospago,
            [e.target.name]:e.target.value, 
        })
    }

    const[fecha,setFecha] = useState(new Date("2022", "01", "01"));

    const handleSubmit = e =>{
        let emptyVal=false;
        e.preventDefault();
        setDatospago({
            ...datospago,
            [e.target.name]:e.target.value, 
        })
        if(e.target.value===" "){
            emptyVal=true;
        }
        if(emptyVal === true)
        {
            alert("Complete todos los datos");
        }
        else{
            alert("Datos enviados");
        }
    }
    return (
        <div className="container">
           
            <form onSubmit={handleSubmit} className='informacion'>
                <h1 id="name">Ficha de pago</h1>

                <div className='dato'>
                    <label htmlfor="idpago" id='pago'>Clave de pago </label> 
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
                    <label htmlfor="idfosa" id='fosa'>Clave de fosa </label> 
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
                    <label  htmlfor='fecha' id="fechaPago" >Fecha de pago</label>
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
                    disableElevation>
                       <FontAwesomeIcon className='icono' icon={faReceipt} />
                        Descargar recibo de pago 
                    </Button>
                </div>
            </form>
        </div>
    )
}
export default InfoPago;