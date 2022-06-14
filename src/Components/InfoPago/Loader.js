import React from 'react'
import './css/Loader.css'

const Loader=()=>{
    return(
        <div>
            <h5>Buscando</h5>
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
    );
}
export default Loader;