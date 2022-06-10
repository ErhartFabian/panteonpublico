import React, {useState, useEffect} from 'react';
import Boleta from './Boleta';
import DocPdf from './DocPdf';
import './css/InfoPago.css'
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faReceipt} from '@fortawesome/free-solid-svg-icons';
import Loader from './Loader'
import { getValue } from '@testing-library/user-event/dist/utils';


/*import Datepicker,{registerLocale} from 'react-datepicker' Componente fecha y hora */
/*import "react-datepicker/dist/react-datepicker.css";*/
/*import es from 'date-fns/locale/es'*/

/*registerLocale("es",es);*/

function InfoPago() {

    const [msjerror,setMsjerror] =useState(false);
    const [loading,setLoading] =useState(false);
    const [disabledClase,setDisabledClase] = useState(true); //Componente para activar el campo clase
    const [disabledFosa,setDisabledFosa] = useState(true);//Componente para activar el campo fosa
    const [disabledLote,setDisabledLote] = useState(true);//Componente para activar el campo lote

    //Estado para habilitar y deshabilitar los botones si el usario borra un dato de los campos
    const [mostrarOpciones,setMostrarOpciones] = useState (false);

    /*Estado para mostrar y ocultar comprobante*/
    const [verComprobante,setVerComprobante] = useState(false);
     /*Estado para buscar el comprobante y habilitar los botones de ver y descargar del documento*/
    const [buscar, setBuscar] = useState(false);

    const [datosfosa,setDatosFosa] = useState({
        cuartel:"",
        lote:"",
        clase: "",
        fosa:"",
    });

    if(datosfosa.cuartel === ""){
            datosfosa.lote = "";
           
            datosfosa.fosa = ""
        }

    if(datosfosa.lote === ""){
            
            datosfosa.fosa = "";
        }
    
    if(datosfosa.clase === ""){
        datosfosa.fosa = "";
    }

    const handleChange = e =>{
        setDatosFosa({
            ...datosfosa, 
            [e.target.name]:e.target.value,
        });
    }
    /*Prevenir valores menores que 0 */
    const preventMinus = (e) => {
        if (e.code === 'Minus') {
            e.preventDefault();
        }
    };
    
    //Función que checara si se elimino un campo de inputs para habilitar o deshabilitar las opciones 
    /*function comprobardatos () {
        if(campocuartel === "completo" && campolote === "completo" && campoclase ==="completo" 
        && campofosa === "completo"){
            setMostrarOpciones(true);
        }
        else{
            setMostrarOpciones(false);
            setBuscar(false);
        }
    }*/

    const handleSubmit = e =>{
        e.preventDefault();
        handleChange(e);  
    }

    const selectclase = e =>{
        handleChange(e);
        if(datosfosa.cuartel !==""){
            setDisabledLote(false);
        }
        else{
            setDisabledLote(true);
            setDisabledClase(true);   
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
                {verComprobante &&  buscar ? "Ocultar comprobante" : "Ver Comprobante"} 
            </Button>
        </div>
        );
    };
    
    useEffect(()=>{
        if(datosfosa.cuartel!=="" && datosfosa.lote!=="" && datosfosa.clase!==""
        && datosfosa.fosa !==""){
            setMostrarOpciones(true);
        }
        else{
            setBuscar(false);
            setMostrarOpciones(false)
        }
    },[datosfosa.cuartel,datosfosa.lote,datosfosa.clase,datosfosa.fosa])

    //Loader
    /*useEffect(()=>{
        setLoading(true);
    },[buscar])*/
    
     /*Función que habilitara los botonees de ver y descargar del documento*/
    const  handleClick = () => {
        setLoading(true)
        if(datosfosa.cuartel !== "" && datosfosa.lote !== ""
        && datosfosa.clase !=="" && datosfosa.fosa !== ""){
            setBuscar(true);
            setMsjerror(false);/*Ocultar mensaje de error */
            setLoading(false);
        }
        else{
            setLoading(false);
            setBuscar(false);
            setMsjerror(true);/*Ver mensaje de error */
        }    
    }

    
    return (
        <div >
        <div className="container-infopago">
            <div className="instrutions-infopago">
                <h2>Comprobante de Pago</h2>
                {/* para obtener su comprobande de pago favor de introducir el cuartel, lote, clase y fosa asignados */}
                <p>Para obtener su comprobante de pago favor de introducir el cuartel, lote, clase y fosa asignados</p>
            </div>
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
                        <option value="1">Cuartel 1</option>
                        <option value="2">Cuartel 2</option>
                        <option value="3">Cuartel 3</option>
                        <option value="4">Cuartel 4</option>
                    </select>
                </div>

                <div className='dato'>
                    <label htmlFor="lote" id='labelote' className='stylelabel'>Lote </label> 
                    <input 
                    disabled = {disabledLote}
                    className='input'
                    placeholder='Ingrese numero de lote' 
                    type="number" 
                    name="lote" 
                    value={datosfosa.lote}
                    onChange={handleChange}
                    min="1"
                    onKeyPress={preventMinus}
                    onBlur={(e)=>{
                        handleChange(e);
                        if(datosfosa.lote !==""){
                            setDisabledClase(false);                            
                        }
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
                            setDisabledFosa(false);
                        }
                        else{
                            setDisabledFosa(true);
                            
                            
                        }
                    }}
                    defaultValue={datosfosa.clase}>
                        <option value="">---</option>
                        <option value="1">Clase 1</option>
                        <option value="2">Clase 2</option>
                        <option value="3">Clase 3</option>
                        <option value="4">Clase 4</option>
                    </select>
                </div>

                <div className='dato'>
                    <label htmlFor="fosa" id='labelfosa' className='stylelabel'>Fosa </label> 
                    <input 
                    disabled = {disabledFosa}
                    className='input'
                    placeholder='Ingrese el numero de fosa' 
                    type="number" 
                    min="1"
                    name="fosa" 
                    value={datosfosa.fosa}
                    onChange={handleChange} 
                    onKeyPress={preventMinus}
                    />
                </div>
                {loading && <Loader/>}
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
                    <Comprobante disabled={!mostrarOpciones}/>
                    {buscar && mostrarOpciones ? 
                    <DocPdf 
                    Campo_cuartel = {datosfosa.cuartel}
                    Campo_clase = {datosfosa.clase}
                    Campo_lote = {datosfosa.lote}
                    Campo_fosa = {datosfosa.fosa}                
                    /> : null}
                </div>            
            </form>
        </div>
        <div className= 'vistacotenedor'>
        <div className='vista'>
            {verComprobante && mostrarOpciones ? 
            <Boleta 
            campo_cuartel={datosfosa.cuartel}
            campo_clase ={datosfosa.clase}
            campo_lote={datosfosa.lote}
            campo_fosa={datosfosa.fosa}
            /> : null}
        </div>
        </div>
    </div>
    )
}

export default InfoPago;