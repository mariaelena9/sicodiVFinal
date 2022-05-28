/* @MENÚ */

//Importación de React:
import React, { Component } from "react"; //Importación de [Component]

//Importación del DOM:
import ReactDOM from 'react-dom';

//Importación de Router, para navegar entre enlaces y/o componentes distintos, sin perder la interfaz
import { BrowserRouter as Router } from 'react-router-dom';

//Importación de iconos:
import * as ImIcons from 'react-icons/im';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import * as RiIcons from 'react-icons/ri';
import * as GrIcons from 'react-icons/gr';

//Importación de componentes:
import Directorio from "../../components/Directory/Directorio";
import Correspondence from "../../components/Correspondence/Correspondence";
import Inicio from "../../components/History/History";
import Loader from "../Loader/Loader";
import Sent from "../../components/Sent/Sent";
import Received from "../../components/Received/Received";
import Tracking from "../../components/Tracking/Tracking";
import Home from "../../components/Home/Home";
import Users from "../../components/Users/Users";
import History from "../../components/History/History";

//_Class Component_
class Menu extends Component {

    /*@Michelle: [e.preventDefault] cancela el evento si este es cancelable, 
    sin detener el resto del funcionamiento del evento, es decir, puede ser llamado de nuevo.*/

    //Función para controlar el funcionamiento del menú
    handleMenu(e) {
        e.preventDefault();
        if (e.target.id === '/home') {
            ReactDOM.render(<Home/>, document.getElementById('root'));
        } else if (e.target.id === '/directory') {
            ReactDOM.render(<Directorio/>, document.getElementById('root'));
        } else if (e.target.id === '/correspondence') {
            ReactDOM.render(<Correspondence/>, document.getElementById('root'));
        } else if (e.target.id === '/sent') {
            ReactDOM.render(<Sent/>, document.getElementById('root'));
        } else if (e.target.id === '/receipt') {
            ReactDOM.render(<Received/>, document.getElementById('root'));
        } else if (e.target.id === '/history') {
            ReactDOM.render(<History/>, document.getElementById('root'));
        } else if (e.target.id === '/users') {
            ReactDOM.render(<Users/>, document.getElementById('root'));
        } else if (e.target.id === '/salir') {
            localStorage.clear();
            ReactDOM.render("", document.getElementById('menu'));
            ReactDOM.render(<Loader texto1="Cerrando sesión" type="logout" />, document.getElementById('root'));
        }
    }

    render() {
        return (
            <Router>
                <div className="principal">
                    <div className="navegacion">
                        <nav className="nav__bar">
                            <ul className="menuss">

                                {/* Inicio */}
                                <li id="/home" onClick={this.handleMenu}>
                                    <a id="/home">
                                        <span><AiIcons.AiFillHome /></span>
                                        <span className="menuText" id="/home">Inicio</span>
                                    </a>
                                </li>

                                {/* Directorio */}
                                
                                <li id="/directory" onClick={this.handleMenu}>
                                    <a id="/directory">
                                        <span><MdIcons.MdImportContacts /></span>
                                        <span className="menuText" id="/directory">Directorio</span>
                                    </a>
                                </li>

                                {/* Correspondencia */}
                                <li id="/correspondence" onClick={this.handleMenu}>
                                    <a id="/correspondence">
                                        <span><ImIcons.ImFileText2 /></span>
                                        <span className="menuText" id="/correspondence">Correspondencia</span>
                                    </a>
                                </li>

                                {/* Enviados */}
                                <li id="/sent" onClick={this.handleMenu}>
                                    <a id="/sent">
                                        <span><ImIcons.ImBoxRemove /></span>
                                        <span className="menuText" id="/sent">Enviados</span>
                                    </a>
                                </li>

                                {/* Recibidos */}
                                <li id="/receipt" onClick={this.handleMenu}>
                                    <a id="/receipt">
                                        <span><ImIcons.ImBoxAdd /></span>
                                        <span className="menuText" id="/receipt">Recibidos</span>
                                    </a>
                                </li>

                                {/* ADMINISTRADOR */}

                                {/* Historico */}
                                <li id="/history" onClick={this.handleMenu}>
                                    <a id="/history">
                                        <span><ImIcons.ImHistory /></span>
                                        <span className="menuText" id="/history">Historico</span>
                                    </a>
                                </li>

                                {/* Usuarios */}
                                <li id="/users" onClick={this.handleMenu}>
                                <a id="/users">
                                    <span><RiIcons.RiUserSettingsFill/></span>
                                    <span className="menuText" id="/users">Usuarios</span>
                                </a>
                                </li>

                                {/* Documents */}
                                <li id="/" onClick={this.handleMenu}>
                                <a>
                                    <span><GrIcons.GrDocumentPdf/></span>
                                    <span>Documentos</span>
                                </a>
                                </li>

                                {/* Salir */}
                                <li key="exit" id="/salir" onClick={this.handleMenu}>
                                    <a id="/salir" >
                                        <span id="/salir"><ImIcons.ImExit /></span>
                                        <span className="menuText" id="/salir">Salir</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </Router>
        );
    }
}

//Exportación del Componente:
export default Menu;