import React, { useState, useEffect } from 'react';
import Boleta from './Boleta';
import DocPdf from './DocPdf';
//import './css/InfoPago.css'
import './css/Pago2.css'
import axios from 'axios';
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLessThanEqual, faReceipt} from '@fortawesome/free-solid-svg-icons';
import Loader from './Loader'

function InfoPago() {

    const [dataFosa, setDataFosa] = useState();
    const [fechaInhumacion, setFechaInhumacion] = useState();
    //Para no mostrar ficha de pago cuando no hay boleta
    const [vistaComprobante, setvistaComprobante] = useState(false);
    const [finadosArray, setFinadosArray] = useState([]);
    const [titularesArray, setTitularesArray] = useState([]);
    const [montos, setMontos] = useState();

    const [msjerror,setMsjerror] =useState(false); //Estado para habilitar el mensaje de error
    const [loading,setLoading] =useState(false);//Activar/desactivar el loading 
    const [disabledCuartel,setDisabledCuartel] = useState(false); //Estado para activar el campo cuartel
    const [disabledClase,setDisabledClase] = useState(true); //Estado para activar el campo clase
    const [disabledFosa,setDisabledFosa] = useState(true);//Estado para activar el campo fosa
    const [disabledLote,setDisabledLote] = useState(true);//Estado para activar el campo lote
    const [disableTitularFinado, setDisableTitularFinado] = useState(true);
    const [disableFichaPago, setDisableFichaPago] = useState(true);
    const [titular,setTitular] = useState("");
   
    const [Cuartel, setCuartel] = useState(""); //Estado para reiniciar el select cuartel
    const [data] = useState([1, 2, 3, 4]); //Valores cuartel

    const [Lote, setLote] = useState("");

    const [Clase, setClase] = useState(""); //Estado para reiniciar el select clase
    const [valorclase] = useState([1, 2, 3, 4, 5]); //valores clase

    const [Fosa,setFosa] = useState("");
    const [finadoSelect, setFinadoSelect] = useState("");
    const [nombreFinado, setNombreFinado] = useState("");

    //Estado para habilitar y deshabilitar los botones si el usario borra un dato de los campos
    const [mostrarOpciones, setMostrarOpciones] = useState(false);

    /*Estado para mostrar y ocultar comprobante*/
    const [verComprobante, setVerComprobante] = useState(false);
    /*Estado para buscar el comprobante y habilitar los botones de ver y descargar del documento*/
    const [buscar, setBuscar] = useState(false);

    

    const id = Cuartel + Clase + Lote + Fosa;
    //console.log(id);

    const URLFosainfo = 'https://panteonpachuca.herokuapp.com/api/getAllDataByFosa/' + id;


    const handleSubmit = e => {
        e.preventDefault();
    }

    
    /*Componente que contiene los botones de visualizar y descargar documento */
    const Comprobante = () => {
        return (
            <Button
                    /*Habilitar boton*/
                    //disabled={!buscar}
                    style = {{
                        display: buscar ? null : 'none'
                    }}
                    id="boton"
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="medium"
                    disableElevation
                    onClick={() => {
                        setVerComprobante(!verComprobante);
                    }}
            >
                    <FontAwesomeIcon className='icono' icon={faReceipt} />
                    {verComprobante && buscar ? "Ocultar ficha de pago" : "Ver ficha de pago"}
            </Button>
        );
    };

    /*useEffect para reiniciar los campos cada vez que un valor se quite */
    useEffect(()=>{
        
        if(Cuartel === ""){
            setLote('');
        }
        if (Lote === "") {
            setClase('');
        }
        if (Clase === "") {
            setFosa('');
        }
        if(Fosa === ""){
            setFinadoSelect('');
        }
        if(finadoSelect === ""){
            setTitular('');
        }
            
    },[Cuartel,Lote,Clase,Fosa])

    useEffect(()=>{
        if(Cuartel !=="" &&  Lote !=="" && Clase !==""
        && Fosa !==""){ //&& finadoSelect !== ""){
            setMostrarOpciones(true);
        }
        else {
            setBuscar(false);
            setMostrarOpciones(false)
        }

        if(titular !== "" && finadoSelect !== ""){
            setDisableFichaPago(false);
            setVerComprobante(false);
        }
        else{
            setDisableFichaPago(true);
        }

        if(titular !== "" || finadoSelect !== ""){
            setBuscar(false);
        }

    },[Cuartel, Lote, Clase, Fosa, titular, finadoSelect])


    function handleGenerarFicha(){
        //Para obtener la fecha corta de la inhumación
        let fechaCortaInhumacion;
        fechaCortaInhumacion = dataFosa[2][finadoSelect] === undefined ? 'No hay datos' : dataFosa[2][finadoSelect].dia_inhumacion.slice(0,10);
        setFechaInhumacion(fechaCortaInhumacion);

        let nombreFinado;
        nombreFinado = dataFosa[2][finadoSelect] === undefined ? 'No hay datos' : dataFosa[2][finadoSelect].nombre;
        setNombreFinado(nombreFinado);
        
        setBuscar(true);
    }


     /*Función que habilitara los botonees de ver y descargar del documento*/
    const  handleClick = () => {

        //Evita guardar el estado de ficha de pago cada que se no se regresa el valor de verComprobante
        setVerComprobante(false);

        async function getData(){
            setLoading(true);
            try {
                const response = await axios.get(URLFosainfo)
                console.log(response);
                if(response.status !== 200 || !response.data[0].length){
                    setMsjerror(true);
                    setLoading(false);
                    setBuscar(false);
                    setvistaComprobante(false)

                    setDisableTitularFinado(true);
                }else{
                    setDataFosa(response.data);
                    setLoading(false);
                    //setBuscar(true);
                    setMsjerror(false)
                    setvistaComprobante(true)
                    
                    if(response.data[2].length){
                        let finadosArr = response.data[2].map((finado) =>{
                            return finado.nombre ; 
                        })

                        setFinadosArray(finadosArr);
                    }

                    let titularesArr = response.data[1].map(titular => {
                        return titular.nombre
                    })

                    setTitularesArray(titularesArr);
                    setDisableTitularFinado(false);
                    setMontos(response.data[3]);

                }
            }catch(error){
                setvistaComprobante(false)
                setMsjerror(true);
                setLoading(false);
                setBuscar(false);
                setDisableTitularFinado(true);
            }
        }

        getData()
    }

    function handleReset(){
        setLote("");
        setFosa("");
        setvistaComprobante(false)
        setDisableTitularFinado(true);
    }


    return (
        <div className='container'>
            <div className="container-infopago">
            
                <div className="instructions-infopago">
                    <h2 className='instructions-title'>Información</h2>
                    {/* para obtener su comprobande de pago favor de introducir el cuartel, lote, clase y fosa asignados */}
                    <p>Para obtener su comprobante de pago favor de introducir el cuartel, lote, clase y fosa asignados.</p>
                </div>

                <div className='form-inforpago'>

                    <form onSubmit={handleSubmit} className='informacion'>
                        <h1 id="name" className='titulo'>Ficha de pago</h1>

                        <div className='dato'>
                            <label htmlFor="ncuartel" className='stylelabel' id="labelcuartel">Cuartel </label> 
                                <select 
                                    disabled={vistaComprobante}
                                    className='inputselect'
                                    id="selectcuartel"
                                    name="cuartel" 

                                    value={Cuartel}
                                    onChange={(e) => setCuartel(e.target.value)}
                                    onBlur={()=>{

                                        if( Cuartel !==""){
                                            setDisabledLote(false);
                                        }
                                        else{
                                            setDisabledLote(true);
                                            setDisabledClase(true);   
                                            setDisabledLote(true);     
                                        }
                                    }}
                                    >
                                     {/*Aplique un map para poder resetear el select */}
                                    <option value ="">---</option>
                                    {data && data.map((item, index) => {
                                        return <option key={index}>{item}</option>;
                                    })}
                                </select>
                        </div>
                                

                        <div className='dato'>
                            <label htmlFor="lote" id='labelote' className='stylelabel'>Lote </label> 
                            <input 
                                disabled = {vistaComprobante}
                                className='input'
                                placeholder='Ingrese número de lote' 
                                type="number" 
                                name="lote" 
                                value={Lote}
                                onChange={(e) => setLote(e.target.value)}
                                min="1"
                                onBlur={(e)=>{

                                    if(Lote !==""){
                                        setDisabledClase(false);                            
                                    }
                                    else{
                                        setDisabledClase(true);
                                    
                                        if(Clase !==""){
                                            setDisabledFosa(false);
                                        }
                                        else{
                                            setDisabledFosa(true);
                                        }
                                    }
                                    }
                                } 
                                />
                        </div>

                        <div className='dato'>
                            <label htmlFor="nclase" id="labelclase" className='stylelabel'>Clase </label> 
                            <select
                                disabled = {vistaComprobante}
                                id="selectclase"
                                className='inputselect' 
                                name="clase" 
                                value={Clase}
                                onChange={(e) => setClase(e.target.value)}
                                onBlur={(e)=>{
                                
                                    if(Clase !==""){
                                        setDisabledFosa(false);
                                    }
                                    else{
                                        setDisabledFosa(true);
                                    }
                                }}
                            >
                                    {/*Aplique un map para poder resetear el select */}
                                    <option  value="">---</option>
                                        {valorclase && valorclase.map((item, index) => {
                                            return <option key={index}>{item}</option>;
                                        })}
                                   
                            </select>
                        </div>

                        <div className='dato'>
                            <label htmlFor="fosa" id='labelfosa' className='stylelabel'>Fosa </label> 
                            <input 
                                disabled = {vistaComprobante}
                                className='input'
                                placeholder='Ingrese el número de fosa' 
                                type="number" 
                                min="1"
                                name="fosa" 
                                value={Fosa}
                                onChange={(e) => setFosa(e.target.value)}
                            />
                        </div>

                        <div 
                            className='dato'
                            style={{
                                display: disableTitularFinado ? 'none' : null
                            }}
                        >
                            <label htmlFor="finado" id="labelfinado" className='stylelabel'>Finado </label> 
                            <select
                                //disabled = {disableTitularFinado}
                                id="selectfinado"
                                className='inputselect' 
                                name="finado"   
                                onChange={(e) => setFinadoSelect(e.target.value)}
                            >

                            <option  value="" >---</option>
                            {
                                vistaComprobante ? finadosArray.length === 0 ? <option value="">No hay datos</option> :
                                    finadosArray.map((finado, index)=>{
                                    return <option key={index} value={index} >{finado}</option>
                                }) : null
                            }

                            </select>
                        </div>

                        <div 
                            className='dato'
                            style={{
                                display: disableTitularFinado ? 'none' : null
                            }}
                        >
                            <label htmlFor="Titular" id='labeltitular' className='stylelabel'>Titular</label> 
                            <select
                                id="Titular"
                                className="inputselect"
                                onChange={(e) => setTitular(e.target.value)}
                            >
                            <option  value="" >---</option>
                            {
                                vistaComprobante ? titularesArray.length === 0 ? <option value="">No hay datos</option> : 
                                    titularesArray.map((titular, index) => {
                                        return <option key={index} value={titular} >{titular}</option>
                                    }) : null
                            }
                            </select>
                        
                        </div>
                        
                        {loading && <Loader/>}
                        
                        { msjerror && <div className="mensaje_error">
                            <p>
                                <b>Error:</b> No se encontró el comprobante correspondiente, por favor revise nuevamente los datos.
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
                                style={{
                                    display: vistaComprobante ? 'none' : null
                                }}
                                onClick={handleClick}
                            >
                                Buscar Fosa 
                            </Button>

                            <Button
                                id="boton"
                                type="reset"
                                variant="contained"
                                color="primary"
                                size="medium"
                                disableElevation
                                style={{
                                    display: !vistaComprobante ? 'none' : null
                                }}
                                onClick={handleReset}
                            >
                                Buscar Nueva Ficha 
                            </Button>

                            <Button
                                disabled = {disableFichaPago}
                                id="boton"
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="medium"
                                disableElevation
                                onClick={handleGenerarFicha}
                            >
                                Generar Ficha de Pago 
                            </Button>
                            
                            <Comprobante disabled={!mostrarOpciones}/>
                            
                            {buscar && mostrarOpciones ? 

                            <DocPdf 
                                Campo_titular={titular}
                                Campo_cuartel = {Cuartel}
                                Campo_clase = {Clase}
                                Campo_lote = {Lote}
                                Campo_fosa = {Fosa}
                                Campo_finado = {nombreFinado}     
                                Campo_inhumacionFinado = {fechaInhumacion}
                                Montos = {montos}
                            /> : null}
                        </div>            
                    </form>
                </div>

            </div>
        
            <div className= 'vistacotenedor' style={{display: buscar ? null : 'none'}}>
                <div className='vista'>
                    {verComprobante && mostrarOpciones ? 
                    <Boleta 
                        campo_titular={titular}
                        campo_cuartel={Cuartel}
                        campo_clase ={Clase}
                        campo_lote={Lote}
                        campo_fosa={Fosa}
                        campo_finado = {nombreFinado}  
                        campo_inhumacionFinado = {fechaInhumacion}
                        Montos = {montos}
                    /> : null}
                </div>
            </div>
        </div>
    )
}

export default InfoPago;