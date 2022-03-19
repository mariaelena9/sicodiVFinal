/* @HEADER */

//Import React library
import React, {useState} from "react";

//Import assets
import logoSicodi from '../../assets/SICODISinFondo.png'
import logoGob from '../../assets/logosgg.png';

//Import Styles
import header from './Header.css';


function Header(){
    return(
// NOTA: Aquí irá el codigo HTML (JSX) -> Todo deberá estar en un solo bloque como: <div> </div> | <body> </body>
//<Header> </Header> | <Footer> </Footer>
        <header>

            <div className="content">

                <div className="logoIzq">
                    <img src={logoSicodi} alt="SICODI"/>
                </div>

                <div className="leyendas">
                    <p> GOBIERNO DEL ESTADO DE NAYARIT  </p>
                    <p> SECRETARIA DE ADMINISITRACÓN Y FINANZAS </p>
                    <p> SISTEMA DE CORRESPONDENCIA DIGITAL </p>
                </div>

                <div className="logoDer">
                    <img src={logoGob} alt ='GOB'/>
                </div>

            </div>

        </header>
    );
}

export default Header;