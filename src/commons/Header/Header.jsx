/* @HEADER */

//Importación de React:
import React, { Fragment } from "react"; //Importación de Fragment [Contenedor General]

//Importación de iconos para react:
import * as ImIcons from 'react-icons/im';

//Importación del DOM:
import ReactDOM from 'react-dom';

//Importación de recursos (logotipos)
import logoSicodi from '../../assets/SICODISinFondo.png'
import logoGob from '../../assets/logosgg.png';

//_Functional Component_ 
function Header() {
    return (
        <Fragment>
            <div className="header">

                {/* Información Estatica */}
                <div className="header__content">

                    <div className="header__content--logoIzq">
                        <img src={logoSicodi} alt="logo-sicodi" />
                    </div>

                    <div className="header__content--leyendas">
                        <p>Gobierno del estado de Nayarit  </p>
                        <p>Secretaría de Administración y Finanzas </p>
                        <p>Sistema de Correspondencia Digital</p>
                    </div>

                    <div className="header__content--logoDer">
                        <img src={logoGob} alt='logo-gobierno' />
                    </div>
                </div>
            </div>

            {/* Información Dinamica para el usuario logeado */}

            {/*@Michelle: El objeto [localStorage] almacena los datos sin fecha de caducidad. */}
            {
                localStorage.getItem('auth') === "true" ?
                    <div className="infocuenta__contenedor">
                        <div className="info-cuenta">
                            <ImIcons.ImUser />
                            <p className="name">{localStorage.getItem('userName')}</p>
                            <p className="rol">{localStorage.getItem('userCargo')}</p>
                        </div>
                    </div>
                    :
                    ""
            }
        </Fragment>
    );
}

//Función timer para el usuario
function tick() {
    ReactDOM.render(<Header />, document.getElementById('header'));
}

setInterval(tick, 1000);

//Exportación del componente:
export default Header;