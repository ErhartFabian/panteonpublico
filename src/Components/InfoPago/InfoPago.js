import React, {useState, useEffect} from 'react';
import Boleta from './Boleta';
import DocPdf from './DocPdf';
import './css/InfoPago.css'
import axios from 'axios';
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faReceipt} from '@fortawesome/free-solid-svg-icons';
/*import Datepicker,{registerLocale} from 'react-datepicker' Componente fecha y hora */
/*import "react-datepicker/dist/react-datepicker.css";*/
/*import es from 'date-fns/locale/es'*/

/*registerLocale("es",es);*/

function InfoPago() {

    const [dataFosa, setDataFosa] = useState();
    const [dataResponsables, setDataResponsables] = useState();
    const [dataFinado, setDataFinado] = useState();

    const URLFosainfo = 'http://localhost:3001/panteon';


    // const URLDataFosa = 'https://panteonpachuca.herokuapp.com/api/test';
    // const URLResponsables = 'https://panteonpachuca.herokuapp.com/api/readResponsable';
    // const URLFinado = 'https://panteonpachuca.herokuapp.com/api/readFinado';

    // const responsablesFinados = {
    //     idFosa: 1234
    // };

    // useEffect(()=>{
    //     let i = 0;
    //     const GetData = async () => {
    //         try{
    //             const responseDataFosa = await axios.get(URLDataFosa);
    //             setDataFosa(responseDataFosa.data);
    //             const responseResponsables = await axios.post(URLResponsables, responsablesFinados);
    //             setDataResponsables(responseResponsables.data);
    //             const responseFinados = await axios.post(URLFinado, responsablesFinados);
    //             setDataFinado(responseFinados.data);
    //             console.log(i);
    //         }
    //         catch(error){
    //             console.error(error);
    //         }
    //     }
    //     i +=1 ;
    //     GetData();
    // },[]);

    // //Para acceder a los datos de la fosa
    // console.log(dataFosa[0]);
    // console.log(dataResponsables);
    // console.log(dataFinado);

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

    useEffect(()=>{
        // URLFosainfo += "?id=";
        const getData = async () => {
            try{
                const response = await axios.get(URLFosainfo);
                setDataFosa(response.data);
            }catch(error){
                console.log(error);
                alert('Esos datos no existn');
            }
        }
        getData();
    },[setBuscar])

    console.log('fosa:' + URLFosainfo);
    console.log(dataFosa);

    const [datosfosa,setDatosFosa] = useState({
        cuartel:"",
        lote:"",
        clase: "",
        fosa:"",
    });
    

    if(datosfosa.cuartel === ""){
            datosfosa.lote = "";
            datosfosa.clase =" ";
            datosfosa.fosa = ""
        }
    if(datosfosa.lote === ""){
            datosfosa.clase = "";
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
        if(datosfosa.cuartel === "cuartel 1" && datosfosa.lote === "1"
        && datosfosa.clase ==="clase 1" && datosfosa.fosa === "1"){
            setBuscar(true);
            setMsjerror(false);/*Ocultar mensaje de error */
        }
        else{
            setBuscar(false);
            setMsjerror(true);/*Ver mensaje de error */
        }    
    }

    
    return (
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
                    disabled = {disabledClase}
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
                    {buscar && mostrarOpciones ? <DocPdf/> : null}
                </div>

            </form>
            {verComprobante ? 
            <Boleta 
            cuartel = {dataFosa[1].cuartel}
            clase = {dataFosa[1].clase}
            finado = {dataFosa[1].finado}
            fosa = {dataFosa[1].Fosa}
            lote = {dataFosa[1].lote}
            adeudo = {dataFosa[1].adeudo}
            responsable = {dataFosa[1].responsable[0].nombre}
            /> : null}
        </div>
    )
}

export default InfoPago;