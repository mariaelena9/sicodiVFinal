/* @HEADER */

//Imports
import React from "react";

//Recursos
import logoSicodi from '../../assets/SICODISinFondo.png'
import logoGob from '../../assets/logosgg.png';

function Header(){
    return(
        <header className="header">
            <div className="header__content">

                <div className="header__content--logoIzq">
                    <img src={logoSicodi} alt="logo-sicodi"/>
                </div>

                <div className="header__content--leyendas">
                    <p>Gobierno del estado de Nayarit  </p>
                    <p>Secretaría de Administración y Finanzas </p>
                    <p>Sistema de Correspondencia Digital</p>
                </div>

                <div className="header__content--logoDer">
                    <img src={logoGob} alt ='logo-gobierno'/>
                </div>

            </div>
        </header>
    );
}

export default Header;