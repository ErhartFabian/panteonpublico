import React, {useState, useEffect} from 'react';
import Boleta from './Boleta';
import DocPdf from './DocPdf';
import './css/InfoPago.css'
import axios from 'axios';
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faReceipt} from '@fortawesome/free-solid-svg-icons';
import Loader from './Loader'

function InfoPago() {

    const [dataFosa, setDataFosa] = useState();
    const [fechaInhumacion, setFechaInhumacion] = useState();
    //Para no mostrar ficha de pago cuando no hay boleta
    const [vistaComprobante, setvistaComprobante] = useState(false);
    const [finadosArray, setFinadosArray] = useState([]);
    const [titularesArray, setTitularesArray] = useState([]);
    

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
    const [valorclase] = useState([1, 2, 3, 4]); //valores clase

    const [Fosa,setFosa] = useState("");
    const [finadoSelect, setFinadoSelect] = useState("");
    const [nombreFinado, setNombreFinado] = useState("");

    //Estado para habilitar y deshabilitar los botones si el usario borra un dato de los campos
    const [mostrarOpciones,setMostrarOpciones] = useState (false);

    /*Estado para mostrar y ocultar comprobante*/
    const [verComprobante,setVerComprobante] = useState(false);
     /*Estado para buscar el comprobante y habilitar los botones de ver y descargar del documento*/
    const [buscar, setBuscar] = useState(false);

    // const [datosfosa, setDatosFosa] = useState({
    //     cuartel:"",
    //     lote:"",
    //     clase: "", 
    //     fosa:"",
    // });

    /*if(Titular === ""){
        datosfosa.lote = "";
        datosfosa.fosa = ""
    }*/
   
    /*if(datosfosa.cuartel === ""){
            datosfosa.lote = "";
            datosfosa.fosa = ""
        }*/
    
    /*if(datosfosa.clase === ""){
        datosfosa.fosa = "";
    }*/

    // const handleChange = e =>{
    //     setDatosFosa({
    //         ...datosfosa, 
    //         [e.target.name]:e.target.value,
    //     });
    // }

    /*Permitir solo letras*/
    const onlyLetters = e =>{
        const result = e.target.value.replace(/[^a-zA-ZÁ-ÿ\s]/gi, '');
        setTitular(result);
    }
    /*Prevenir valores menores que 0 */
    const preventMinus = (e) => {
        if (e.code === 'Minus') {
            e.preventDefault();
        }
    };

    const id = Cuartel + Clase + Lote + Fosa;
        //console.log(id);

    const URLFosainfo = 'https://panteonpachuca.herokuapp.com/api/getAllDataByFosa/' + id;
        


    const handleSubmit = e =>{
        e.preventDefault();
    }

    //  Ya no es necesario
    // const enablecuartel = e =>{
    //     if(Cuartel !==""){
    //         setDisabledCuartel(false);
    //     }
    //     else{
    //         setDisabledCuartel(true);
    //         setDisabledLote(true);
    //         setDisabledClase(true);   
    //         setDisabledLote(true);     
    //     }
    // }
    
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
                {verComprobante &&  buscar ? "Ocultar ficha de pago" : "Ver ficha de pago"} 
            </Button>
        </div>
        );
    };

    /*useEffect para reiniciar los campos cada vez que un valor se quite */
    useEffect(()=>{
        // if(Titular === ""){
        //     setCuartel('');
        // }
        if(Cuartel === ""){
            setLote('');
        }
        if(Lote === ""){
            setClase('');
        }
        if(Clase === ""){
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
        //Titular !=="" &&
        if(Cuartel !=="" &&  Lote !=="" && Clase !==""
        && Fosa !==""){ //&& finadoSelect !== ""){
            setMostrarOpciones(true);
        }
        else{
            setBuscar(false);
            setMostrarOpciones(false)
        }

        if(titular !== "" && finadoSelect !== ""){
            setDisableFichaPago(false);
        }
        else{
            setDisableFichaPago(true);
        }


    },[Cuartel, Lote, Clase, Fosa, titular, finadoSelect])

    //Loader
    /*useEffect(()=>{
        setLoading(true);
    },[buscar])*/


    console.log("vistaComprobante: " + vistaComprobante);
    

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
            try{
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
                    
                    let finadosArr = response.data[2].map((finado) =>{
                        return finado.nombre ; 
                    })

                    let titularesArr = response.data[1].map(titular => {
                        return titular.nombre
                    })

                    setFinadosArray(finadosArr);
                    setTitularesArray(titularesArr);
                    setDisableTitularFinado(false);

                    console.log('response data[2]: ' + response.data[2]);
                    console.log(fechaInhumacion);
                    console.log(finadosArray);
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
        console.log(fechaInhumacion);
        console.log(finadosArray);
    }



    return (
        <div>
            <div className="container-infopago">
            <div className="instrutions-infopago">
                <h2>Ficha de Pago</h2>
                {/* para obtener su comprobande de pago favor de introducir el cuartel, lote, clase y fosa asignados */}
                <p>Para obtener su comprobante de pago favor de introducir el cuartel, lote, clase y fosa asignados</p>
            </div>
            <form onSubmit={handleSubmit} className='informacion'>
                <h1 id="name">Ficha de pago</h1>

                <div className='dato'>
                    <label htmlFor="ncuartel" className='stylelabel' id="labelcuartel">Cuartel </label> 
                    <select 
                    disabled={disabledCuartel}
                    className='inputselect'
                    id="selectcuartel"
                    name="cuartel" 
                    value={Cuartel}
                    onChange={(e) => setCuartel(e.target.value)}
                    //onBlur={enablecuartel}
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
                    disabled = {disabledLote}
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
                    disabled = {disabledClase}
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
                        {/*<option value="">---</option>
                        <option value="1">Clase 1</option>
                        <option value="2">Clase 2</option>
                        <option value="3">Clase 3</option>
                        <option value="4">Clase 4</option>*/}
                    </select>
                </div>

                <div className='dato'>
                    <label htmlFor="fosa" id='labelfosa' className='stylelabel'>Fosa </label> 
                    <input 
                    disabled = {disabledFosa}
                    className='input'
                    placeholder='Ingrese el número de fosa' 
                    type="number" 
                    min="1"
                    name="fosa" 
                    value={Fosa}
                    onChange={(e) => setFosa(e.target.value)}
                    onKeyPress={preventMinus}
                    />
                </div>

                <div className='dato'>
                    <label htmlFor="finado" id="labelfinado" className='stylelabel'>Finado </label> 
                    <select
                        disabled = {disableTitularFinado}
                        id="selectfinado"
                        className='inputselect' 
                        name="finado"   
                        onChange={(e) => setFinadoSelect(e.target.value)}
                    >
                        <option  value="" >---</option>
                        {
                            vistaComprobante ? finadosArray === undefined ? <option>No hay datos</option> :
                                finadosArray.map((finado, index)=>{
                                return <option key={index} value={index} >{finado}</option>
                            }) : null
                        }
                        
                    </select>
                </div>

                <div className='dato'>
                    <label htmlFor="Titular" id='labeltitular' className='stylelabel'>Titular</label> 
                    <select
                        disabled = {disableTitularFinado}
                        id="Titular"
                        className="inputselect"
                        onChange={(e) => setTitular(e.target.value)}
                    >
                        <option  value="" >---</option>
                        {
                            vistaComprobante ? titularesArray === undefined ? <option>No hay datos</option> : 
                                titularesArray.map((titular, index) => {
                                    return <option key={index} value={titular} >{titular}</option>
                                }) : null
                        }
                    </select>
                    {/* <input 
                    className='input'
                    placeholder='Ingrese nombre de titular' 
                    type="text" 
                    name="Titular" 
                    value={Titular}
                    onChange={onlyLetters}
                    onBlur={enablecuartel}
                    /> */}
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
                        onClick={handleClick}
                    >
                        Buscar Fosa 
                    </Button>
                    <Button
                        disabled = {disableFichaPago}
                        style = {{
                            display: !disableFichaPago ? null : 'none'
                        }}
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
                        //Por si no hay finados en la fosa
                        Campo_finado = {nombreFinado}     
                        Campo_inhumacionFinado = {fechaInhumacion}
                    /> : null}
                </div>            
            </form>
        </div>
        <div className= 'vistacotenedor' style={{display: vistaComprobante ? null : 'none'}}>
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
                /> : null}
            </div>
        </div>
    </div>
    )
}

export default InfoPago;