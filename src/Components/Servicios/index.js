import React,{useRef} from "react";
import './Servicios.css';

function Servicios() {
    const InhyEx = useRef(null);
    const Construcción = useRef(null);
    const HorCre = useRef(null);
    const ServFun = useRef(null);

    const movetoInhyEx = () => InhyEx.current.scrollIntoView({ behavior: 'smooth' });
    const movetoConstrucción = () => Construcción.current.scrollIntoView({ behavior: 'smooth' });
    const movetoHorCre = () => HorCre.current.scrollIntoView({ behavior: 'smooth' });
    const movetoServFun = () => ServFun.current.scrollIntoView({ behavior: 'smooth' });

    return (
        <div id="Page">
            <div className="instructions_servicios">
                <img src="https://cdn-icons-png.flaticon.com/512/1311/1311144.png" height="100px" >
                </img>
                <p> A continuación puede observar la lista de todos los servicios del cementerio</p>
                {/* Los precios estan agrupados por */}
                <p>
                    Los precios están agrupados por:
                </p>
                <ul>
                    <li onClick={movetoInhyEx}>
                        Inhumación y exhumación de cadáveres y restos Primera/Segunda Sección del Panteón
                    </li>
                    <li onClick={movetoConstrucción}>
                        Construcción o instalación de monumentos o criptas
                    </li>
                    <li onClick={movetoHorCre} >
                        Horno crematorio
                    </li>
                    <li onClick={movetoServFun} >
                        Servicios funerarios
                    </li>
                </ul>
            </div>
            <div id="Servicios">
                <h1>Servicios</h1>
                {/* Tabla */}
                <div className="tabla-servicios">

                    <div className='rg-container' ref={InhyEx} >
                        <table className='rg-table' summary='Hed'>
                            <caption className='rg-header'>
                                <span className='rg-hed' >Inhumación y exhumación de cadáveres y restos Primera Sección del Panteón</span>
                            </caption>
                            <thead>
                                <tr>
                                    <th className='text '>Actividades</th>
                                    <th className='number '>Cuota Fija</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr className=''>
                                    <td className='text ' data-title='Actividades'>Refrendos por inhumación por año</td>
                                    <td className='number ' data-title='Cuota'>$183.00</td>
                                </tr>


                                <tr className=''>
                                    <td className='text ' data-title='Actividades'>Uso o disposición de nicho o Restero</td>
                                    <td className='number ' data-title='Cuota'>$6,804.00</td>
                                </tr>


                                <tr className=''>
                                    <td className='text ' data-title='Actividades'>Inhumación de restos áridos en fosa capilla o cripta</td>
                                    <td className='number ' data-title='Cuota'>$904.00</td>
                                </tr>


                                <tr className=''>
                                    <td className='text ' data-title='Actividades'>Exhumación</td>
                                    <td className='number ' data-title='Cuota'>$622.00</td>
                                </tr>


                                <tr className=''>
                                    <td className='text ' data-title='Actividades'>Re inhumación en fosa, capilla o cripta</td>
                                    <td className='number ' data-title='Cuota'>$622.00</td>
                                </tr>


                                <tr className='hide-mobile'>
                                    <td className='text ' data-title='Actividades'>Refrendos de nicho o Restero</td>
                                    <td className='number ' data-title='Cuota'>$110.00</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <div className='rg-container'>
                        <table className='rg-table' summary='Hed'>
                            <caption className='rg-header'>
                                <span className='rg-hed'>Inhumación y exhumación de cadáveres y restos Segunda Sección del Panteón</span>
                            </caption>
                            <thead>
                                <tr>
                                    <th className='text '>Actividades</th>
                                    <th className='number '>Cuota Fija</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr className=''>
                                    <td className='text ' data-title='Actividades'>Inhumación de cadáveres o restos por 7 años incluye losas y trabajos para sepulturas</td>
                                    <td className='number ' data-title='Cuota'>$1,918.00</td>
                                </tr>


                                <tr className=''>
                                    <td className='text ' data-title='Actividades'>Exhumación</td>
                                    <td className='number ' data-title='Cuota'>$622.00</td>
                                </tr>


                                <tr className=''>
                                    <td className='text ' data-title='Actividades'>Re inhumación en fosa, capilla y cripta</td>
                                    <td className='number ' data-title='Cuota'>$622.00</td>
                                </tr>


                                <tr className=''>
                                    <td className='text ' data-title='Actividades'>Refrendo por inhumación por 7 años</td>
                                    <td className='number ' data-title='Cuota'>$913.00</td>
                                </tr>


                                <tr className=''>
                                    <td className='text ' data-title='Actividades'>Uso o disposición de gaveta individual por 10 años para ataúd</td>
                                    <td className='number ' data-title='Cuota'>$6,859.00</td>
                                </tr>


                                <tr className='hide-mobile'>
                                    <td className='text ' data-title='Actividades'>Inhumación de cadáveres en gaveta individual por 10 años</td>
                                    <td className='number ' data-title='Cuota'>$904.00</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    <div className='rg-container' ref={Construcción} >
                        <table className='rg-table' summary='Hed'>
                            <caption className='rg-header'>
                                <span className='rg-hed'>Construcción o instalación de monumentos o criptas</span>
                            </caption>
                            <thead>
                                <tr>
                                    <th className='text '>Actividades</th>
                                    <th className='number '>Cuota Fija</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr className=''>
                                    <td className='text ' data-title='Actividades'>Permiso para la instalación o construcción de monumento</td>
                                    <td className='number ' data-title='Cuota'>$547.00</td>
                                </tr>


                                <tr className=''>
                                    <td className='text ' data-title='Actividades'>Permiso para construcción de capilla individual</td>
                                    <td className='number ' data-title='Cuota'>$959.00</td>
                                </tr>


                                <tr className=''>
                                    <td className='text ' data-title='Actividades'>Permiso para construcción de capilla familiar</td>
                                    <td className='number ' data-title='Cuota'>$1,370.00</td>
                                </tr>


                                <tr className=''>
                                    <td className='text ' data-title='Actividades'>Permiso para construcción o colocación de redondel</td>
                                    <td className='number ' data-title='Cuota'>$319.00</td>
                                </tr>


                                <tr className=''>
                                    <td className='text ' data-title='Actividades'>Permiso para construcción de cada gaveta</td>
                                    <td className='number ' data-title='Cuota'>$137.00</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <div className='rg-container' ref={HorCre}>
                        <table className='rg-table' summary='Hed'>
                            <caption className='rg-header'>
                                <span className='rg-hed'>Horno crematorio</span>
                            </caption>
                            <thead>
                                <tr>
                                    <th className='text '>Actividades</th>
                                    <th className='number '>Cuota Fija</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr className=''>
                                    <td className='text ' data-title='Actividades'>Permiso de cremación</td>
                                    <td className='number ' data-title='Cuota'>$904.00</td>
                                </tr>


                                <tr className=''>
                                    <td className='text ' data-title='Actividades'>Servicio de cremación</td>
                                    <td className='number ' data-title='Cuota'>$3,287.00</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <div className='rg-container'ref={ServFun} >
                        <table className='rg-table' summary='Hed'>
                            <caption className='rg-header'>
                                <span className='rg-hed'>Servicios Funerarios</span>
                            </caption>
                            <thead>
                                <tr>
                                    <th className='text '>Actividades</th>
                                    <th className='number '>Cuota Fija</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr className=''>
                                    <td className='text ' data-title='Actividades'>Servicio de gestoría</td>
                                    <td className='number ' data-title='Cuota'>$573.00</td>
                                </tr>


                                <tr className=''>
                                    <td className='text ' data-title='Actividades'>Recolección y traslado de restos (dentro del municipio de Pachuca)</td>
                                    <td className='number ' data-title='Cuota'>$559.00</td>
                                </tr>


                                <tr className=''>
                                    <td className='text ' data-title='Actividades'>Embalsamamiento</td>
                                    <td className='number ' data-title='Cuota'>$3,581.00</td>
                                </tr>


                                <tr className=''>
                                    <td className='text ' data-title='Actividades'>Arreglo estético</td>
                                    <td className='number ' data-title='Cuota'>$573.00</td>
                                </tr>


                                <tr className=''>
                                    <td className='text ' data-title='Actividades'>Renta de sala y equipo de velación</td>
                                    <td className='number ' data-title='Cuota'>$2,000.00</td>
                                </tr>


                                <tr className='hide-mobile'>
                                    <td className='text ' data-title='Actividades'>Renta de equipo de velación en domicilio (por 24 horas)</td>
                                    <td className='number ' data-title='Cuota'>$1,427.00</td>
                                </tr>


                                <tr className='hide-mobile'>
                                    <td className='text ' data-title='Actividades'>Venta de urna, nivel básico (Urna MDF barnizada)</td>
                                    <td className='number ' data-title='Cuota'>$800.00</td>
                                </tr>


                                <tr className='hide-mobile'>
                                    <td className='text ' data-title='Actividades'>Venta de urna, nivel medio (Urna de madera forrada en vinil)</td>
                                    <td className='number ' data-title='Cuota'>$1,100.00</td>
                                </tr>


                                <tr className='hide-mobile'>
                                    <td className='text ' data-title='Actividades'>Venta de urn, nivel alto (Urna de mármol)</td>
                                    <td className='number ' data-title='Cuota'>$1,400.00</td>
                                </tr>
                            </tbody>
                        </table>
                        <table className='rg-table' summary='Hed'>
                            <thead>
                                <tr>
                                    <th className='text '>Actividad</th>
                                    <th className='text '>Descripción</th>
                                    <th className='number '>Cuota fija</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr cll=''>
                                    <td className='text ' data-title='Actividad'>Venta de ataúd, nivel básico</td>
                                    <td className='text ' data-title='Descripcion'>Ataúd fabricado en MDF de 12 mm, con marco de pino de 20 mm, piso de madera de 12 mm y tres refuerzos. Tapizado en tela blanca y detalles plisados con opción de grabado de imagen religiosa</td>
                                    <td className='number ' data-title='Cuota fija'>$3,286.70</td>
                                </tr>


                                <tr className=''>
                                    <td className='text ' data-title='Actividad'>Venta de ataúd, nivel medio</td>
                                    <td className='text ' data-title='Descripcion'>Ataúd fabricado con enchapado de caobilla de 15 mm,con marcos, moldaduras en madera de pino de 20 mm de espesor, piso de madera de 12 mm y 3 refuerzos. Tapizado en satín blanco y detalles plisados con opción de grabado de imagen religiosa</td>
                                    <td className='number ' data-title='Cuota fija'>$4,900.00</td>
                                </tr>


                                <tr className=''>
                                    <td className='text ' data-title='Actividad'>Venta de ataúd, nivel alto</td>
                                    <td className='text ' data-title='Descripcion'>Ataúd fabricado con enchapado de caobilla con 2 tapas tipo domo, 1 fijo y 1 desmontable, duelas, molduras, pisos en madera de pino, con opción de grabado de imagen religiosa en domo</td>
                                    <td className='number ' data-title='Cuota fija'>$7,500.00</td>
                                </tr>


                                <tr className=''>
                                    <td className='text ' data-title='Actividad'>Venta de ataúd con tapa corrida</td>
                                    <td className='text ' data-title='Descripcion'>Ataúd forrado en tela, fabricado con madera de pino de 12 mm de espesor, piso de triplay de 15 mm y 3 refuerzos</td>
                                    <td className='number ' data-title='Cuota fija'>$1,600.00</td>
                                </tr>


                                <tr className=''>
                                    <td className='text ' data-title='Actividad'>Venta de ataúd con tapa tipo ventana</td>
                                    <td className='text ' data-title='Descripcion'>Ataúd fabricado con madera de pino de 12 mm de espesor, piso de triplay de 16 mm, zocio de 3 cm y 3 refuerzo. El domo de este cajon cuenta con dos tapas, una abatible y una fija</td>
                                    <td className='number ' data-title='Cuota fija'>$1,900.00</td>
                                </tr>


                                <tr className='hide-mobile'>
                                    <td className='text ' data-title='Actividad'>Venta de ataúd nivel Premium</td>
                                    <td className='text ' data-title='Descripcion'>Ataúd fabricado al 100% en madera de Banak y piso en madera de pino. Tapizado en interior con terciopelo capitoneado de color blanco o salmón y en su interior el tercio pelaje cuenta con un plisado de 3 hilos</td>
                                    <td className='number ' data-title='Cuota fija'>$12,000.00</td>
                                </tr>


                                <tr className='hide-mobile'>
                                    <td className='text ' data-title='Actividad'>Venta de ataúd infantil 50 cm</td>
                                    <td className='text ' data-title='Descripcion'>Ataúd de 50 cm fabricado con madera de pino de 12 mm de espesor y piso de triplay de 12 mm, tapizado en su interior  y exterior con satín o terciopelo blanco y detallado con flecos en los bordes plisados de la tela</td>
                                    <td className='number ' data-title='Cuota fija'>$700.00</td>
                                </tr>


                                <tr className='hide-mobile'>
                                    <td className='text ' data-title='Actividad'>Venta de ataúd infantil 70 cm</td>
                                    <td className='text ' data-title='Descripcion'>Ataúd de 70 cm fabricado con madera de pino de 12 mm de espesor y piso de triplay de 12 mm, tapizado en su interior  y exterior con satín o terciopelo blanco y detallado con flecos en los bordes plisados de la tela</td>
                                    <td className='number ' data-title='Cuota fija'>$800.00</td>
                                </tr>


                                <tr className='hide-mobile'>
                                    <td className='text ' data-title='Actividad'>Venta de ataúd infantil 80 cm</td>
                                    <td className='text ' data-title='Descripcion'>Ataúd de 80 cm fabricado con madera de pino de 12 mm de espesor y piso de triplay de 12 mm, tapizado en su interior y exterior con satin o terciopelo blanco  y detallado con flecos en los bordes plisados de tela</td>
                                    <td className='number ' data-title='Cuota fija'>$1,000.00</td>
                                </tr>


                                <tr className='hide-mobile'>
                                    <td className='text ' data-title='Actividad'>Venta de ataúd infantil 90 cm</td>
                                    <td className='text ' data-title='Descripcion'>Ataúd de 90 cm fabricado con madera de pino de 12 mm de espesor y piso de triplay de 12 mm, tapizado en su interior y exterior con satin o terciopelo blanco  y detallado con flecos en los bordes plisados de tela</td>
                                    <td className='number ' data-title='Cuota fija'>$1,100.00</td>
                                </tr>


                                <tr className='hide-mobile'>
                                    <td className='text ' data-title='Actividad'>Venta de ataúd infantil 100 cm</td>
                                    <td className='text ' data-title='Descripcion'>Ataúd de 100 cm fabricado con madera de pino de 12 mm de espesor y piso de triplay de 12 mm, tapizado en su interior y exterior con satin o terciopelo blanco  y detallado con flecos en los bordes plisados de tela</td>
                                    <td className='number ' data-title='Cuota fija'>$1,200.00</td>
                                </tr>


                                <tr className='hide-mobile'>
                                    <td className='text ' data-title='Actividad'>Venta de ataúd infantil 120 cm</td>
                                    <td className='text ' data-title='Descripcion'>Ataúd de 120 cm fabricado con madera de pino de 12 mm de espesor y piso de triplay de 12 mm, tapizado en su interior y exterior con satin o terciopelo blanco  y detallado con flecos en los bordes plisados de tela</td>
                                    <td className='number ' data-title='Cuota fija'>$1,300.00</td>
                                </tr>


                                <tr className='hide-mobile'>
                                    <td className='text ' data-title='Actividad'>Servicios Funerarios Paquete Básico</td>
                                    <td className='text ' data-title='Descripcion'>Renta de sala y equipo de velación, incluye insumos de cafetería y ataúd fabricado en MDF de 12 mm, con marco de pino de 20 mm y piso de madera de 12 mm y tres refuerzos, con tapizado de tela tafeta blanca y detalles plisados en tapa superior abatible con opción de grabado de imagen religiosa</td>
                                    <td className='number ' data-title='Cuota fija'>$7,798.00</td>
                                </tr>


                                <tr className='hide-mobile'>
                                    <td className='text ' data-title='Actividad'>Servicios Funerarios Paquete Mediano</td>
                                    <td className='text ' data-title='Descripcion'>Renta de sala y equipo de velación, incluye insumo de cafetería y ataúd fabricado con enchapado de caobilla de 15 mm, con marcos, moldura en madera de pino de 20 mm de espesor, piso de madera de 12 mm y 3 refuerzos, tapizado de interiores con satin blanco, con dos tapas, una interior abatible y una fija con opción de diseño de grabado de imagen religiosa</td>
                                    <td className='number ' data-title='Cuota fija'>$9,879.00</td>
                                </tr>


                                <tr className='hide-mobile'>
                                    <td className='text ' data-title='Actividad'>Servicios Funerarios Paquete Alto</td>
                                    <td className='text ' data-title='Descripcion'>Renta de sala y equipo de velación, incluye insumos de cafetería y ataúd fabricado tipo bóveda con enchapado, domo duelas, molduras y pisos de madera de pino, tapizado en interior con satín blanco y con un plisado de 3 hilos, en la tapa interior lleva un tapizado capitoneado con satín, cuenta con 2 tapas tipo domo, uno fijo y otro abatible con opción de diseño de grabado de imagen religiosa</td>
                                    <td className='number ' data-title='Cuota fija'>$17,327.00</td>
                                </tr>


                                <tr className='hide-mobile'>
                                    <td className='text ' data-title='Actividad'>Servicios Funerarios Paquete para bebe</td>
                                    <td className='text ' data-title='Descripcion'>Renta de sala y equipo de velación, incluye insumo en cafeteria y 1 ataúd infantil a elegir, de 50,70,80,90.100 o 120 centímetros, fabricado con madera de pino de 12 mm de espesor y piso de triplay de 12 mm, tapizado en su interior y exterior con satín o terciopelo blanco, con fleco en los bordes</td>
                                    <td className='number ' data-title='Cuota fija'>$4,244.00</td>
                                </tr>

                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Servicios;