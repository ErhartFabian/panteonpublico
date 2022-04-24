import React from "react";
import './css/comprobante.css'
import logo from './imagenes/logo.jpg';
import QR from './imagenes/QR.png';

function Comprobante(){
    return(
        <div id="comprobante">
            <div className="datos1">
                <div>
                    <img id ="logo" src={logo} alt="logoHgo" />
                </div>
                <div className="emisor">
                    <h4>Emisor</h4>
                    <br></br>
                    <p>Gobierno del estado de Hidalgo</p>
                    <p>Plaza Júarez s/n, Col Centro, C.P 42000</p>
                    <p>RFC:GEH690116NV7</p>
                    <p>Regimen Fiscal: Persona moral con fines no lucrativos</p>
                </div>

                <div>
                    <table className="tablas">
                        <tbody>
                        <tr>
                            <td>
                                <h3>Comprobante Fiscal</h3>
                                FACING - 27973000
                            </td>
                        </tr>
                        <tr>
                            <td><h3>Fecha de emisión</h3>
                            19 - Marzo - 2022
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        
            <div className="datos2">
                <div>
                    <h3>
                    Receptor del comprobante Fiscal
                    </h3>
                <br></br>
                <p>RFC: SDN8501014D2</p>
                <p>Nombre: Macias Guerra Victoria </p>
                <p>Pachuca de soto CP. 42000 </p>
                <br></br>
                </div>

                <div>
                    <h3>Folio Fiscal</h3>
                    <p>23FCD9E-715D-421C-BCA5-73CC0511EDE7</p>
                    <br></br>
                    <h3>No.Certificado Fiscal</h3>
                    <p>0000100000403723650</p>
                    <br></br>
                    <h3>No.Serie Certificado SAT</h3>
                    <p>0000100000404523650</p>
                </div>
            </div>
            
            <div className="tabla1">
                <table className="tabladatos">
                <thead>
                    <tr className="fila">
                        <th className="encabezados">cantidad</th>
                        <th className="encabezados">Unidad </th>
                        <th className="encabezados">Descripción </th>
                        <th className="encabezados">Precio </th>
                        <th className="encabezados">Importe</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan="6"><font size="1"><br></br></font></td>
                    </tr>
                </tbody>
                <tbody>
                    <tr className="filainfo">
                        <td className="celda">1</td>
                        <td className="celda">Uno</td>
                        <td className="celda">Inhumación de restos áridos en fosa capilla o cripta </td>
                        <td className="celda">$904.00</td>
                        <td className="celda">$904.00</td>
                    </tr>
                    <tr>
                        <td className="celda">1</td>
                        <td className="celda">Uno</td>
                        <td className="celda">Exhumación </td>
                        <td className="celda">$622.00</td>
                        <td className="celda">$622.00</td>
                    </tr>
                    <tr className="filainfo">
                        <td className="celda">1</td>
                        <td className="celda">Uno</td>
                        <td className="celda">Refrendos por inhumación por año</td>
                        <td className="celda">$183.00</td>
                        <td className="celda">$183.00</td>
                    </tr>
                </tbody>
                </table>
            </div>
            <div className="tabla2">
                <table className="desglose">
                <thead>
                    <tr className="fila">
                        <th className="encabezados"colSpan="10" align="right">Importe</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Importe con letras: Mil setecientos nueve</td>
                        <td className="montos">Subtotal: 1,709.00</td>
                    </tr>
                    <tr className="filainfo">
                        <td>Moneda: MXN</td>
                        <td className="montos">Total: 1,709.00</td>
                    </tr>
                    <tr>
                        <td>Forma de pago: 01</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Metodo de pago: Efectivo</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Fecha de pago: 19 - Marzo - 2022</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Referencia: 923456765456</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Lugar de expedición: 42000</td>
                        <td></td>
                    </tr>
                </tbody>
                </table>
            </div>
            <div className="tablascadenas">
                <table className="sellos">
                <thead>
                    <tr className="fila">
                        <th className="encabezados" colSpan="10">Cadena original del complemento de Certificación Digital del SAT</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                        ELFx2fNec42DI2mhmjs2VqsCgTxKqCM4k/0MbVU7V/RcaxTv/OYDAybcDzaHbwgUB6gObJxVeqPCfayX0cnbrNAViOOnuMvmwUc
                        </td>
                    </tr>
                </tbody>
                </table>
            </div>

            <div className="tablascadenas">
                <table className="sellos">
                <thead>
                    <tr className="fila">
                        <th className="encabezados" colSpan="10">Sello Digital del CFDI</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                        PSAoq9Sz0+eW1Os8WHkeMv2rZQJNSke7DgLXezSuTDeA2N3A8sAm44Uvw1U5SARi166+LGljPeZSA7U9rAsdFtrRPMI5ajqCQqyF
                        </td>
                    </tr>
                </tbody>
                </table>
            </div>
            
            <div className="tablascadenas">
                <table className="sellos">
                <thead>
                    <tr className="fila">
                        <th className="encabezados" colSpan="10">Sello Digital del SAT</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                        ||1.1|42E28140-A411-437D-A108-BDD059214C13|2021-12-17T00:36:47|DET080304395|ELFx2fNec42DI2mhmjs2VqsCgTxKqCM4k/0MbVU7V
                        </td>
                    </tr>
                </tbody>
                </table>
            </div>         
            <img src={QR} width="300px" height="300px" alt="Codigo Qr" />
        </div>
    );
}
export default Comprobante;