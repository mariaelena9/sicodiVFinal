/* @CORRESPONDENCIA */

//Importación de React:
import React, { Component, Fragment } from "react"; //Importación de Component

//Importación del DOM:
import ReactDOM from 'react-dom';

//Importación de recursos (iconos):
import { BiLinkExternal } from "react-icons/bi";
import { ImDisplay } from "react-icons/im";

//Importación de componentes:
import Graficas from "./Tipos/Graficas";
import Reportes from "./Tipos/Reportes"

//_Class Component_
class History extends Component {

    /* @Michelle: componentDidMount()es un hook que se invoca justo después de que se haya montado un componente de React, 
        es decir, después del primer ciclo de vida de render().
    */

    async showComponent(name) {
        switch (name) {
            case "showGraficas":
                ReactDOM.render(<Graficas/>, document.getElementById('root'));
                break;
            case "showReportes":
                ReactDOM.render(<Reportes />, document.getElementById('root'));
                break;
            default:
                break;
        }
    }

    render() {
        return (
            <Fragment>
                <div className="correspondencecontent">
                    <div className="buttonBack">
                        <p className="TitlePage">Historico</p>
                    </div>

                    <br />

                    <div className="formatodiv">

                        <button className="btnFisica btnGraficas" onClick={() => this.showComponent("showGraficas")}>
                            
                            Graficas
                            <BiLinkExternal />
                        </button>

                        <button className="btnDigital btnReportes" onClick={() => this.showComponent("showReportes")}>
                            
                            Reportes
                            <BiLinkExternal />
                        </button>

                    </div>
                </div>
            </Fragment>
        );
    }
}

// Exportación de componente
export default History;