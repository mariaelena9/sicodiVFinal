/* @LOADER */

//Importación de React:
import React, { Fragment, useEffect } from "react"; //Importación del Hook {useEffect}

//Importación del DOM:
import ReactDOM from 'react-dom';

//Importación de Componentes:
import Menu from "../Menu/Menu";
import Inicio from "../../components/History/History";
import LoginPage from "../../pages/Login-Page";

//Impotación de recursos (logotipos):
import LogoNay from "../../assets/nayaritLogo.png";

//@Michelle: El Hook de efecto te permite llevar a cabo efectos secundarios en componentes funcionales. (Un hook no es más que una función).

//_Functional Component_ con props
function Loader(props) {
    useEffect(() => {
        const timer = setTimeout(() => {
            if (props.type == "login") {
                // <Menu />
                ReactDOM.render(<Menu />, document.getElementById('menu'));
                ReactDOM.render(<Inicio page="Inicio" />, document.getElementById('root'));
            } else if (props.type == "logout") {
                ReactDOM.render("", document.getElementById('menu'));
                ReactDOM.render(<LoginPage />, document.getElementById('root'));
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Fragment>
            <div className="loaderContent">
                <div className="leftSide">
                    <img className="nayaritLogo" src={LogoNay} alt="LogotipoNayarit" />
                </div>

                <div className="loader_rightSide">
                    <h2 className="firstText">{props.texto1} <span>{props.texto2}</span></h2>
                </div>
            </div>
        </Fragment>
    );
}

//Exportación de componente:
export default Loader;