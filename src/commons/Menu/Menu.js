//Imports
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import * as ImIcons from 'react-icons/im';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import Directorio from "../../components/Directory/Directorio";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './Menu.css';
import Correspondence from "../../components/Correspondence/Correspondence";
import App from "../../App";

const page = "";
class Menu extends Component{

    handleSubmit(e) {
        e.preventDefault();
        if(e.target.id == '/home'){
            ReactDOM.render(<App/>, document.getElementById('root'));
        } else if(e.target.id == '/directory'){
            ReactDOM.render(<Directorio/>, document.getElementById('root'));
        } else if(e.target.id == '/correspondence'){
            ReactDOM.render(<Correspondence/>, document.getElementById('root'));
        } else if(e.target.id == '/sent'){

        } else if(e.target.id == '/receipt'){

        } else if(e.target.id == '/history'){

        } else if(e.target.id == '/report'){

        }
        
    }

    render(){
        return(
            <Router className="contenido">
                    <nav className="izq">
                        <div className="infocuenta">
                            <ImIcons.ImUser/>
                            <p className="name">M Michelle Salinas Tirado</p>
                            <p className="rol">Dirección Gral de Sistemas y Tec. informatica</p>
                        </div>
                        <hr/>

                        <ul>
                            <li><a id="/home" onClick={this.handleSubmit}><AiIcons.AiFillHome/> Inicio</a></li>
                            <li><a id="/directory" onClick={this.handleSubmit}><MdIcons.MdImportContacts/> Directorio</a></li>
                            <li><a id="/correspondence"  onClick={this.handleSubmit}><ImIcons.ImFileText2/> Nueva Correspondencia</a></li>
                            <li><a onClick={this.handleSubmit}><ImIcons.ImBoxRemove/> Enviados</a></li>
                            <li><a onClick={this.handleSubmit}><ImIcons.ImBoxAdd/> Recibidos</a></li>
                            <li><a onClick={this.handleSubmit}><ImIcons.ImHistory/> Historico</a></li>
                            <li><a onClick={this.handleSubmit}><ImIcons.ImStatsDots/> Reportes</a></li>
                            <li><a><ImIcons.ImExit/> Salir</a></li>
                        </ul>
                    </nav>

                    <div id="root"></div>
            </Router>
        );
    }
}

export default Menu;