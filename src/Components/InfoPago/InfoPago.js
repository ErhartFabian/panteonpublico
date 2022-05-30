import React, {useState} from 'react';
import Boleta from './Boleta';
import DocPdf from './DocPdf';
import './css/InfoPago.css'
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faReceipt} from '@fortawesome/free-solid-svg-icons';
/*import Datepicker,{registerLocale} from 'react-datepicker' Componente fecha y hora */
/*import "react-datepicker/dist/react-datepicker.css";*/
/*import es from 'date-fns/locale/es'*/

/*registerLocale("es",es);*/

function InfoPago() {

    const [msjerror,setMsjerror] =useState(false);
    const [disabledClase,setDisabledClase] = useState(true); //Componente para activar el campo clase
    const [disabledFosa,setDisabledFosa] = useState(true);//Componente para activar el campo fosa
    const [disabledLote,setDisabledLote] = useState(true);//Componente para activar el campo lote

    /*Estado para mostrar y ocultar comprobante*/
    const [verComprobante,setVerComprobante] = useState(false);
     /*Estado para buscar el comprobante y habilitar los botones de ver y descargar del documento*/
    const [buscar, setBuscar] = useState(false);

    const [datosfosa,setDatosFosa] = useState({
        cuartel:"",
        clase:"",
        fosa:"",
        lote:"",
    });

    const handleChange = e =>{
        setDatosFosa({
            ...datosfosa, 
            [e.target.name]:e.target.value,
        });
    }

    const handleSubmit = e =>{
        e.preventDefault();
        handleChange(e);  
    }

    const selectclase = e =>{
        handleChange(e);
        if(datosfosa.cuartel !==""){
            setDisabledLote(false)
        }
        else{
            setDisabledLote(true);
        }
    }

    /*Componente que contiene los botones de visualizar y descargar documento */
    const Comprobante = ()=>{
        return(
            <div className='generador'>
            <Button 
             /*Habilitar boton*/
             disabled={!buscar}
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
        </div>
        );
    };

     /*Función que habilitara los botonees de ver y descargar del documento*/
    const  handleClick = () => {
        if(datosfosa.cuartel ==="cuartel 1" && datosfosa.clase ==="clase 2" 
        && datosfosa.fosa ==="48" && datosfosa.lote ==="50"){
            setBuscar(true);
            setMsjerror(false);/*Ocultar mensaje de error */
        }
        else{
            setBuscar(false);
            setMsjerror(true);/*Ver mensaje de error */
        }    
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className='informacion'>
                <h1 id="name">Comprobante de pago</h1>
                <div className='dato'>
                    <label htmlFor="ncuartel" className='stylelabel' id="labelcuartel">Cuartel </label> 
                    <select 
                    className='inputselect'
                    id="selectcuartel"
                    name="cuartel" 
                    onChange={handleChange}
                    onBlur={selectclase}
                    defaultValue={datosfosa.cuartel}>
                        <option value="">---</option>
                        <option value="cuartel 1">Cuartel 1</option>
                        <option value="cuartel 2">Cuartel 2</option>
                        <option value="cuartel 3">Cuartel 3</option>
                        <option value="cuartel 4">Cuartel 4</option>
                    </select>
                </div>

                <div className='dato'>
                    <label htmlFor="lote" id='labelote' className='stylelabel'>Lote </label> 
                    <input 
                    disabled = {disabledLote}
                    className='input'
                    placeholder='Ingrese numero de lote' 
                    type="text" 
                    name="lote" 
                    value={datosfosa.lote}
                    onChange={handleChange}
                    onBlur={(e)=>{
                        handleChange(e);
                        if(datosfosa.lote !==""){
                            setDisabledClase(false);}
                        else{
                            setDisabledClase(true);
                        }
                    }}
                    />
                </div>

                <div className='dato'>
                    <label htmlFor="nclase" id="labelclase" className='stylelabel'>Clase </label> 
                    <select
                    disabled = {disabledClase}
                    id="selectclase"
                    className='inputselect' 
                    name="clase" 
                    onChange={handleChange}
                    onBlur={(e)=>{
                        handleChange(e);
                        if(datosfosa.clase !==""){
                            setDisabledFosa(false);}
                        else{
                            setDisabledFosa(true);
                        }
                    }}
                    defaultValue={datosfosa.clase}>
                        <option value="">---</option>
                        <option value="clase 1">Clase 1</option>
                        <option value="clase 2">Clase 2</option>
                        <option value="clase 3">Clase 3</option>
                        <option value="clase 4">Clase 4</option>
                    </select>
                </div>

                <div className='dato'>
                    <label htmlFor="fosa" id='labelfosa' className='stylelabel'>Fosa </label> 
                    <input 
                    disabled = {disabledFosa}
                    className='input'
                    placeholder='Ingrese el numero de fosa' 
                    type="number" 
                    name="fosa" 
                    value={datosfosa.fosa}
                    onChange={handleChange} 
                    />
                </div>

                {/*<div className='dato'>
                    <label  htmlFor='fecha' id="fechaPago" >Fecha de pago</label>
                    <div>
                    <Datepicker
                    className='datepicker'
                    selected={fecha}
                    onChange={(date: fecha) => setFecha(date)}
                    locale={es}
                    dateFormat="dd-MMMM-yyyy"/>
                    </div>
                </div>*/}

                { msjerror && <div className="mensaje_error">
                    <p>
                        <b>Error:</b> No se encontro el comprobante correspondiente, por favor revise nuevamente los datos.
                    </p>
                </div>}

                <div className="generador">
                    {/*boton de buscar comprobante*/}
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
                    <Comprobante/>
                    {buscar ? <DocPdf/> : null}
                </div>

            </form>
            {verComprobante ? <Boleta/> : null}
        </div>
    )
}

export default InfoPago;