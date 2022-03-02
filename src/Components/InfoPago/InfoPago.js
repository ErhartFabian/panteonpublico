
import './InfoPago.css'
function InfoPago() {

    return (
        <div className="container">
            <div className="header">
                <nav className='nav'>
                    <a href='#' className='logo nav-link'>Logo</a>
                    <h2 className='title nav-link'>Información de pago</h2>
                    <ul className='nav-menu'>
                        <li className='nav-menu-item'>
                            <a href='#' className='nav-menu-link nav-link'>Mapa topográfico</a>
                        </li>
                        <li className='nav-menu-item'>
                            <a href='#' className='nav-menu-link nav-link'>Información de pago</a>
                            </li> 
                        <li className='nav-menu-item'>
                            <a href='#'  className='nav-menu-link nav-link'>Búsqueda</a>
                        </li> 
                        <li className='nav-menu-item'>
                            <a href='#' className='nav-menu-link nav-link'>Contacto</a>
                        </li>  
                    </ul>
                </nav>
            </div>
            <div className='info'>
            <h1 id="name">Nombre del fallecido</h1>
            
            <div className='dato'>
                <label>Tipo de pago </label> <input type="text"></input>
            </div>

            <div className='dato'>
                <label>Cuartel asignado:</label><input type="text"></input>
            </div>

            <div className='dato'>
                <button> Recibo de pago </button>
                <button>Acta de defunción</button>
            </div>
            </div>
        </div>
    )
}

export default InfoPago;