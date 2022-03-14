import './InfoPago.css'
import React from 'react';
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faReceipt} from '@fortawesome/free-solid-svg-icons';
import {faFile} from '@fortawesome/free-solid-svg-icons';
function InfoPago() {

    return (
        <div className="container">
           
            <div className='info nombre'>
                <h1 id="name">Fulanito muerto</h1>
            
                <div className='dato'>
                    <label id="form1">Tipo de pago: </label> <input className='input' type="text"></input>
                </div>

                <div className='dato'>
                    <label id="form2">Cuartel asignado:</label>
                    <select id="options" name="cuartel">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </select>
                </div>

                <div className='generador'>
                    <Button 
                    variant="contained" 
                    color="primary"
                    size="Large"
                    disableElevation>
                       <FontAwesomeIcon className='icono' icon={faReceipt} />
                        Recibo de pago 
                    </Button>

                    <Button 
                    id="Acta"
                    variant="contained"
                    color="secondary"
                    size="Large"
                    disableElevation>
                     <FontAwesomeIcon className='icono' icon={faFile} />
                    Acta de defunción</Button>
                </div>
            </div>
            <div>
            <FontAwesomeIcon icon="faReceip" />
            </div>
        </div>
    )
}
export default InfoPago;