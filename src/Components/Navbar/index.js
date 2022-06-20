import React from "react";
import "./Navbar.css";
import {
    Nav,
    NavLogo,
    NavLink,
    Bars,
    NavMenu,
} from "./NavbarElements";
import logoImg from './logoImg.png'

function Navbar() {

    return (
        <React.Fragment>
            <Nav className="nav">
                <NavLogo to= "/">
                    <img src={logoImg} id="logoImg" alt="logo" />
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