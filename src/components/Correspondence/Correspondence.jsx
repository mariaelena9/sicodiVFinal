/* @CORRESPONDENCIA */

//Importación de React:
import React, { Component, Fragment } from "react"; //Importación de Component

//Importación del DOM:
import ReactDOM from 'react-dom';

//Importación de recursos (iconos):
import { ImPencil2 } from "react-icons/im";
import { ImDisplay } from "react-icons/im";

//Importación de componentes:
import Digital from "./Formato/Digital";
import Fisica from "./Formato/Fisica"

//_Class Component_
class Correspondence extends Component {

/* @Michelle: componentDidMount()es un hook que se invoca justo después de que se haya montado un componente de React, 
    es decir, después del primer ciclo de vida de render().
*/

    async showComponent(name) {
        switch (name) {
            case "showDigital":
                ReactDOM.render(<Digital/>, document.getElementById('root'));
                break;
            case "showFisica":
                ReactDOM.render(<Fisica/>, document.getElementById('root'));
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <Fragment>
                <div className="body">
                    <div className="correspondencecontent">
                        <div className="buttonBack">
                            <p className="TitlePage">Nueva Correspondencia</p>
                        </div>
                        
                        <br />

                        <div className="formatodiv">

                            <button className="btnFisica" onClick={() => this.showComponent("showFisica")}>
                                <ImPencil2/>
                                Física
                            </button>

                            <button className="btnDigital" onClick={() => this.showComponent("showDigital")}>
                                <ImDisplay/>
                                Digital
                            </button>
                            
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

// Exportación de componente
export default Correspondence;