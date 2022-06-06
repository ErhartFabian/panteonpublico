import React, {useState} from 'react';
import './css/BusquedaMapa.css'
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faReceipt} from '@fortawesome/free-solid-svg-icons';
/*import Datepicker,{registerLocale} from 'react-datepicker' Componente fecha y hora */
/*import "react-datepicker/dist/react-datepicker.css";*/
/*import es from 'date-fns/locale/es'*/

/*registerLocale("es",es);*/

function BusquedaMapa() {

    const [msjerror,setMsjerror] =useState(false);
    const [disabledClase,setDisabledClase] = useState(true); //Componente para activar el campo clase
    const [disabledFosa,setDisabledFosa] = useState(true);//Componente para activar el campo fosa
    const [disabledLote,setDisabledLote] = useState(true);//Componente para activar el campo lote
    //Estados para saber si estan vacio los campos a llenar
    const [campocuartel,setCampoCuartel] = useState(""); 
    const [campolote,setCampoLote] = useState("");
    const [campoclase,setCampoClase] = useState("");
    const [campofosa,setCampoFosa] = useState("");

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
    
    const arrFosas = [
        {cuartel: "1", lote: "1", clase: "1", fosa: "1", coordenadas: [10.87, 12.76] },
        {cuartel: "1", lote: "2", clase: "2", fosa: "1", coordenadas: [11.45, 11.54] },
        {cuartel: "1", lote: "1", clase: "3", fosa: "1", coordenadas: [12.92, 10.54] },
        {cuartel: "1", lote: "2", clase: "4", fosa: "1", coordenadas: [10.76, 12.43] },
        {cuartel: "2", lote: "1", clase: "1", fosa: "1", coordenadas: [11.61, 11.14] },
        {cuartel: "2", lote: "2", clase: "2", fosa: "1", coordenadas: [12.71, 10.65] },
        {cuartel: "2", lote: "1", clase: "3", fosa: "1", coordenadas: [10.16, 12.65] },
        {cuartel: "2", lote: "2", clase: "4", fosa: "1", coordenadas: [11.56, 11.45] },
        {cuartel: "3", lote: "1", clase: "1", fosa: "1", coordenadas: [12.43, 10.13] },
        {cuartel: "3", lote: "2", clase: "2", fosa: "1", coordenadas: [10.12, 12.54] },
        {cuartel: "3", lote: "1", clase: "3", fosa: "1", coordenadas: [11.35, 11.64] },
        {cuartel: "3", lote: "2", clase: "4", fosa: "1", coordenadas: [12.86, 10.43] },
        {cuartel: "4", lote: "1", clase: "1", fosa: "1", coordenadas: [10.54, 12.47] },
        {cuartel: "4", lote: "2", clase: "2", fosa: "1", coordenadas: [11.72, 11.98] },
        {cuartel: "4", lote: "1", clase: "3", fosa: "1", coordenadas: [12.64, 10.55] },
        {cuartel: "4", lote: "2", clase: "4", fosa: "1", coordenadas: [10.51, 12.41] },
    ]

    const handleChange = e =>{
        setDatosFosa({
            ...datosfosa, 
            [e.target.name]:e.target.value,
        });
    }
    //Función que checara si se elimino un campo de inputs para habilitar o deshabilitar las opciones 
    function comprobardatos () {
        if(campocuartel === "completo" && campolote === "completo" && campoclase ==="completo" 
        && campofosa === "completo"){

            setMostrarOpciones(true);
        }
        else{
            setMostrarOpciones(false);
            setBuscar(false);
        }
    }

    const handleSubmit = e =>{
        e.preventDefault();
        handleChange(e);  
    }

    const selectclase = e =>{
        handleChange(e);
        if(datosfosa.cuartel !==""){
            setDisabledLote(false)
            setCampoCuartel("completo");
            comprobardatos()
        }
        else{
            setDisabledLote(true);
            setCampoCuartel("");
            comprobardatos();
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
        if(datosfosa.cuartel !== "" && datosfosa.lote !== ""
        && datosfosa.clase !== "" && datosfosa.fosa !== ""){
            setBuscar(true);
            setMsjerror(false);/*Ocultar mensaje de error */

            var fosaActual = arrFosas.find(function(post, index) {
                if(post.cuartel === datosfosa.cuartel && post.lote === datosfosa.lote &&
                    post.clase === datosfosa.clase && post.fosa === datosfosa.fosa) {
                        // alert("Elemento encontrado en posicion " + index);
                        return true;
                    }
            });

            if(fosaActual)
                alert("Las coordenadas son: " + fosaActual.coordenadas);
            else
                alert("La fosa no fue encontrada");
        }
        else{
            setBuscar(false);
            setMsjerror(true);/*Ver mensaje de error */
        }    
    }

    
    return (
        <div className="container">
            <form onSubmit={handleSubmit} className='informacion'>
                <h1 id="name">Buscar en el mapa</h1>
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
                    // disabled = {disabledLote}
                    className='input'
                    placeholder='Ingrese numero de lote' 
                    type="text" 
                    name="lote" 
                    value={datosfosa.lote}
                    onChange={handleChange}
                    onBlur={(e)=>{
                        handleChange(e);
                        if(datosfosa.lote !==""){
                            setDisabledClase(false);
                            setCampoLote("completo")
                            comprobardatos();
                        }
                        else{
                            setDisabledClase(true);
                            setCampoLote("");
                            comprobardatos();
                        }
                    }}
                    />
                </div>

                <div className='dato'>
                    <label htmlFor="nclase" id="labelclase" className='stylelabel'>Clase </label> 
                    <select
                    // disabled = {disabledClase}
                    id="selectclase"
                    className='inputselect' 
                    name="clase" 
                    onChange={handleChange}
                    onBlur={(e)=>{
                       
                        handleChange(e);
                        if(datosfosa.clase !==""){
                            setDisabledFosa(false);
                            setCampoClase("completo");
                            comprobardatos();
                        }
                        else{
                            setDisabledFosa(true);
                            setCampoClase("");
                            comprobardatos();
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
                    // disabled = {disabledFosa}
                    className='input'
                    placeholder='Ingrese el numero de fosa' 
                    type="number" 
                    name="fosa" 
                    value={datosfosa.fosa}
                    onChange={handleChange} 
                    onBlur={(e)=>{
                       
                        handleChange(e);
                        if(datosfosa.fosa !==""){
                            setCampoFosa("completo");
                            comprobardatos();
                        }
                        else{
                            setCampoFosa("");
                            comprobardatos();
                        }
                    }}
                    />
                </div>

                { msjerror && <div className="mensaje_error">
                    <p>
                        <b>Error:</b> Por favor, llena todos los campos.
                    </p>
                </div>}

                <div className="generador">
                    {/*boton de buscar fosa*/}
                    <Button
                    id="boton"
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="medium"
                    disableElevation
                    onClick={handleClick}
                    >
                        Buscar fosa 
                    </Button>
                </div>

            </form>
        </div>
    )
}

export default BusquedaMapa;