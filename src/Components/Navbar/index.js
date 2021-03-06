import React from "react";
import "./Navbar.css";
import {
    Nav,
    NavLogo,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./NavbarElements";
import logoImg from './logoImg.png'

function Navbar() {

    return (
        <React.Fragment>
            <Nav className="nav">
                <NavLogo to= "/">
                    <img src={logoImg} id="logoImg" />
                    <h2>Presidencia Municipal de Pachuca de Soto</h2>
                </NavLogo>
                
                <Bars />

                <NavMenu>
                    <NavLink
                        to="/"
                        activtestyle={{ color: '#bfbfbf' }}
                    >
                        Mapa Topográfico
                    </NavLink>
                   {/*  <NavLink
                        to="/Avisos"
                        activtestyle={{ color: '#bfbfbf' }}
                    >
                        Avisos
                    </NavLink> */}
                    <NavLink
                        to="/Servicios"
                        activtestyle={{ color: '#bfbfbf' }}
                    >
                        Servicios
                    </NavLink>
                    <NavLink
                        to="/InfoPago"
                        activtestyle={{ color: '#bfbfbf' }}
                    >
                        Información de Pago
                    </NavLink>
                    {/* <NavLink
                        to="/Busqueda"
                        activtestyle={{ color: '#bfbfbf' }}
                    >
                        Búsqueda
                    </NavLink> */}
                    <NavLink
                        to="/Contacto"
                        activtestyle={{ color: '#bfbfbf' }}
                    >
                        Contacto
                    </NavLink>
                </NavMenu>
            </Nav>
        </React.Fragment>
    );
}

export default Navbar;