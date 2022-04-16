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

class Menu extends Component{

    //Función para controlar el funcionamiento del menú
    handleMenu(e) {
        e.preventDefault();
        if(e.target.id === '/home'){
            ReactDOM.render(<Inicio/>, document.getElementById('root'));
        } else if(e.target.id === '/directory'){
            ReactDOM.render(<Directorio/>, document.getElementById('root'));
        } else if(e.target.id === '/correspondence'){
            ReactDOM.render(<Correspondence/>, document.getElementById('root'));
        } else if(e.target.id === '/sent'){

        } else if(e.target.id === '/receipt'){

        } else if(e.target.id === '/history'){

        } else if(e.target.id === '/report'){

        } else if(e.target.id === '/salir'){
            localStorage.clear();
            ReactDOM.render(<Loader texto1="Cerrando sesión" type="logout" />, document.getElementById('root'));
        }    
    }

    render(){
        return(
            <Router className="contenido">
                    <nav className="izq">
                        <div className="infocuenta">
                            <ImIcons.ImUser/>
                            <p className="name">{localStorage.getItem('userName')}</p>
                            <br></br>
                            <p className="rol">{localStorage.getItem('userCargo')}</p>
                        </div>
                        <hr/>

                        <ul>
                            <li key="home"><a id="/home" onClick={this.handleMenu}><AiIcons.AiFillHome/> Inicio</a></li>
                            <li key="directory"><a id="/directory" onClick={this.handleMenu}><MdIcons.MdImportContacts/> Directorio</a></li>
                            <li key="correspondence"><a id="/correspondence" onClick={this.handleMenu}><ImIcons.ImFileText2/> Nueva Correspondencia</a></li>
                            <li key="sent"><a id="/" onClick={this.handleMenu}><ImIcons.ImBoxRemove/> Enviados</a></li>
                            <li key="receipt"><a id="/" onClick={this.handleMenu}><ImIcons.ImBoxAdd/> Recibidos</a></li>
                            <li key="history"><a id="/" onClick={this.handleMenu}><ImIcons.ImHistory/> Historico</a></li>
                            <li key="report"><a id="/" onClick={this.handleMenu}><ImIcons.ImStatsDots/> Reportes</a></li>
                            <li key="exit"><a id="/salir" onClick={this.handleMenu}><ImIcons.ImExit/> Salir</a></li>
                        </ul>
                    </nav>

                    <div id="root"></div>
            </Router>
        );
    }
}

export default Menu;