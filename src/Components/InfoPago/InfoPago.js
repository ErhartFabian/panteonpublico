import React, {useState, useEffect} from 'react';
import Boleta from './Boleta';
import DocPdf from './DocPdf';
import './css/InfoPago.css'
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faReceipt} from '@fortawesome/free-solid-svg-icons';
import Loader from './Loader'
import { getValue } from '@testing-library/user-event/dist/utils';

function InfoPago() {

    const [msjerror,setMsjerror] =useState(false); //Estado para habilitar el mensaje de error
    const [loading,setLoading] =useState(false);//Activar/desactivar el loading 
    const [disabledCuartel,setDisabledCuartel] = useState(true); //Estado para activar el campo cuartel
    const [disabledClase,setDisabledClase] = useState(true); //Estado para activar el campo clase
    const [disabledFosa,setDisabledFosa] = useState(true);//Estado para activar el campo fosa
    const [disabledLote,setDisabledLote] = useState(true);//Estado para activar el campo lote

    const [Titular,setTitular] = useState('');
   
    const [Cuartel, setCuartel] = useState(""); //Estado para reiniciar el select cuartel
    const [data] = useState([1, 2, 3, 4]); //Valores cuartel

    const [Lote, setLote] = useState("");

    const [Clase, setClase] = useState(""); //Estado para reiniciar el select clase
    const [valorclase] = useState([1, 2, 3, 4]); //valores clase

    const [Fosa,setFosa] = useState("");

    //Estado para habilitar y deshabilitar los botones si el usario borra un dato de los campos
    const [mostrarOpciones,setMostrarOpciones] = useState (false);

    /*Estado para mostrar y ocultar comprobante*/
    const [verComprobante,setVerComprobante] = useState(false);
     /*Estado para buscar el comprobante y habilitar los botones de ver y descargar del documento*/
    const [buscar, setBuscar] = useState(false);

    /*const [datosfosa,setDatosFosa] = useState({
        //cuartel:"",
        lote:"",
        //clase: "", 
        fosa:"",
    });*/

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

    /*const handleChange = e =>{
        setDatosFosa({
            ...datosfosa, 
            [e.target.name]:e.target.value,
        });
    }*/
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

    const handleSubmit = e =>{
        e.preventDefault();
    }

    const enablecuartel = e =>{
        if(Titular !==""){
            setDisabledCuartel(false);
        }
        else{
            setDisabledCuartel(true);
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

    /*useEffect para reiniciar los campos cada vez que un valor se quite */
    useEffect(()=>{
        if(Titular === ""){
            setCuartel('');
        }
        if(Cuartel === ""){
            setLote('');
        }
        if(Lote === ""){
            setClase('');
        }
        if(Clase === ""){
            setFosa('');
        }
       
    },[Titular,Cuartel,Lote,Clase])

    useEffect(()=>{
        if(Titular !=="" && Cuartel !=="" &&  Lote !=="" && Clase !==""
        && Fosa !==""){
            setMostrarOpciones(true);
        }
        else{
            setBuscar(false);
            setMostrarOpciones(false)
        }
    },[Titular, Cuartel, Lote, Clase, Fosa])

    //Loader
    /*useEffect(()=>{
        setLoading(true);
    },[buscar])*/
    
     /*Función que habilitara los botonees de ver y descargar del documento*/
    const  handleClick = () => {
        setLoading(true)
        if(Titular !=="" && Cuartel !== "" && Lote !== ""
        && Clase !=="" && Fosa !== ""){
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
                    <label htmlFor="Titular" id='labeltitular' className='stylelabel'>Titular</label> 
                    <input 
                    className='input'
                    placeholder='Ingrese nombre de titular' 
                    type="text" 
                    name="Titular" 
                    value={Titular}
                    onChange={onlyLetters}
                    onBlur={enablecuartel}
                    />
                </div>

                <div className='dato'>
                    <label htmlFor="ncuartel" className='stylelabel' id="labelcuartel">Cuartel </label> 
                    <select 
                    disabled={disabledCuartel}
                    className='inputselect'
                    id="selectcuartel"
                    name="cuartel" 
                    value={Cuartel}
                    onChange={(e) => setCuartel(e.target.value)}
                    onBlur={(e)=>{
                        
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
                        {/*<option value="">---</option>
                        <option value="1">Cuartel 1</option>
                        <option value="2">Cuartel 2</option>
                        <option value="3">Cuartel 3</option>
                        <option value="4">Cuartel 4</option>*/}
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
                    value={Lote}
                    onChange={(e) => setLote(e.target.value)}
                    min="1"
                    onKeyPress={preventMinus}
                    onBlur={(e)=>{
                        
                        if(Lote !==""){
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
                    placeholder='Ingrese el numero de fosa' 
                    type="number" 
                    min="1"
                    name="fosa" 
                    value={Fosa}
                    onChange={(e) => setFosa(e.target.value)}
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
                    Campo_titular={Titular}
                    Campo_cuartel = {Cuartel}
                    Campo_clase = {Clase}
                    Campo_lote = {Lote}
                    Campo_fosa = {Fosa}     
                    /> : null}
                </div>            
            </form>
        </div>
        <div className= 'vistacotenedor'>
        <div className='vista'>
            {verComprobante && mostrarOpciones ? 
            <Boleta 
            campo_titular={Titular}
            campo_cuartel={Cuartel}
            campo_clase ={Clase}
            campo_lote={Lote}
            campo_fosa={Fosa}
            /> : null}
        </div>
        </div>
    </div>
    )
}

export default InfoPago;