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
            <Nav>
                <NavLogo to= "/">
                    <img src={logoImg} id="logoImg" />
                </NavLogo>
                <Bars />

                <NavMenu>
                    <NavLink
                        to="/"
                        activtestyle={{ color: 'black' }}
                    >
                        Mapa Topográfico
                    </NavLink>
                    <NavLink
                        to="/about"
                        activtestyle={{ color: 'black' }}
                    >
                        Avisos
                    </NavLink>
                    <NavLink
                        to="/contact"
                        activtestyle={{ color: 'black' }}
                    >
                        Información de Pago
                    </NavLink>
                    <NavLink
                        to="/signin"
                        activtestyle={{ color: 'black' }}
                    >
                        Sign In
                    </NavLink>
                    <NavLink
                        to="/more"
                        activtestyle={{ color: 'black' }}
                    >
                        More
                    </NavLink>
                    <NavBtn>
                        <NavBtnLink to="/sign-up">Sign up</NavBtnLink>
                    </NavBtn>
                </NavMenu>
            </Nav>
        </React.Fragment>
    );
}

export default Navbar;