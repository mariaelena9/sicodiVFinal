//Imports
import React, { Component } from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import ReactDOM from 'react-dom';

//Iconos
import * as ImIcons from 'react-icons/im';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';

//Componentes
import Directorio from "../../components/Directory/Directorio";
import Correspondence from "../../components/Correspondence/Correspondence";
import Inicio from "../../components/Home/Inicio";
import Loader from "../Loader/Loader";
import Sent from "../../components/Sent/Sent";
import Received from "../../components/Received/Received";

class Menu extends Component{

    //Función para controlar el funcionamiento del menú
    handleMenu(e) {
        e.preventDefault();
        console.log(e.target.id);
        if(e.target.id === '/home'){
            ReactDOM.render(<Inicio page="Inicio"/>, document.getElementById('root'));
        } else if(e.target.id === '/directory'){
            ReactDOM.render(<Directorio/>, document.getElementById('root'));
        } else if(e.target.id === '/correspondence'){
            ReactDOM.render(<Correspondence/>, document.getElementById('root'));
        } else if(e.target.id === '/sent'){
            ReactDOM.render(<Sent/>, document.getElementById('root'));
        } else if(e.target.id === '/receipt'){
            ReactDOM.render(<Received/>, document.getElementById('root'));
        } else if(e.target.id === '/history'){
            ReactDOM.render(<Inicio page="Historico"/>, document.getElementById('root'));
        } else if(e.target.id === '/report'){
            ReactDOM.render(<Inicio page="Reportes"/>, document.getElementById('root'));
        } else if(e.target.id === '/salir'){
            localStorage.clear();
            ReactDOM.render("", document.getElementById('menu'));
            ReactDOM.render(<Loader texto1="Cerrando sesión" type="logout" />, document.getElementById('root'));
        }    
    }

    render(){
        return(
            <Router className="contenido">

                    <div className="principal">
                    
                        {/* <div className="infocuenta__contenedor">
                            <div className="infocuenta">
                                <ImIcons.ImUser/>
                                <p className="name">{localStorage.getItem('userName')}</p>
                                <br></br>
                                <p className="rol">{localStorage.getItem('userCargo')}</p>
                            </div>
                            <hr/>
                        </div> */}

                    <div className="navegacion">
                        <nav className="nav__bar">
                        <ul className="menuss">
                            <li id="/home" onClick={this.handleMenu}>
                                <a>
                                    <span><AiIcons.AiFillHome/></span> 
                                    <span id="/home">Inicio</span>
                                </a>
                            </li>

                            <li id="/directory" onClick={this.handleMenu}>
                                <a>
                                    <span><MdIcons.MdImportContacts/></span>
                                    <span id="/directory">Directorio</span>
                                </a>
                            </li>
                            
                            <li id="/correspondence" onClick={this.handleMenu}>
                                <a>
                                    <span><ImIcons.ImFileText2/></span>
                                    <span id="/correspondence">Nueva Correspondencia</span>
                                </a>
                            </li>

                            <li id="/sent" onClick={this.handleMenu}>
                                <a>
                                    <span><ImIcons.ImBoxRemove/></span>
                                    <span id="/sent">Enviados</span>
                                </a>
                            </li>
                            
                            <li id="/receipt" onClick={this.handleMenu}>
                                <a>
                                    <span><ImIcons.ImBoxAdd/></span>
                                    <span id="/receipt">Recibidos</span>
                                </a>
                            </li>

                            <li id="/history" onClick={this.handleMenu}>
                                <a>
                                    <span><ImIcons.ImHistory/></span>
                                    <span id="/history">Historico</span>
                                </a>
                            </li>

                            {/* <li id="/report" onClick={this.handleMenu}>
                                <a>
                                    <span><ImIcons.ImStatsDots/></span>
                                    <span>Reportes</span>
                                </a>
                            </li> */}

                            <li id="/salir" onClick={this.handleMenu}>
                                <a>
                                    <span><ImIcons.ImExit/></span>
                                    <span id="/salir">Salir</span>
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

export default Menu;