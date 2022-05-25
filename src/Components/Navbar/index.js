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
                <NavLogo to= "/Home">
                    <img src={logoImg} id="logoImg" />
                </NavLogo>
                <Bars />

                <NavMenu>
                    <NavLink
                        to="/Mapa"
                        activtestyle={{ color: '#bfbfbf' }}
                    >
                        Mapa Topográfico
                    </NavLink>
                    <NavLink
                        to="/Avisos"
                        activtestyle={{ color: '#bfbfbf' }}
                    >
                        Avisos
                    </NavLink>
                    <NavLink
                        to="/InfoPago"
                        activtestyle={{ color: '#bfbfbf' }}
                    >
                        Información de Pago
                    </NavLink>
                    <NavLink
                        to="/Busqueda"
                        activtestyle={{ color: '#bfbfbf' }}
                    >
                        Búsqueda
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