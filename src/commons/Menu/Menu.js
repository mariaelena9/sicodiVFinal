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
import Inicio from "../../components/Home/Inicio";

const page = "";
class Menu extends Component{

    handleSubmit(e) {
        e.preventDefault();
        if(e.target.id=='/directory'){
            ReactDOM.render(<Directorio/>, document.getElementById('root'))
        } else if(e.target.id=='/correspondence'){
            ReactDOM.render(<Correspondence/>, document.getElementById('root'))
        }else if(e.target.id=='/inicio'){
            ReactDOM.render(<Inicio/>, document.getElementById('root'))
        }
        
    }

    render(){
        return(
            <Router className="contenido">
                    <nav className="izq">
                        <div class="infocuenta">
                            <ImIcons.ImUser/>
                            <p class="name">Manuela Michelle Salinas Tirado</p>
                            <br></br>
                            <p class="rol">Dirección Gral de Sistemas y Tec. informatica</p>
                        </div>
                        <hr/>

                        <ul>
                            <li><a id="/inicio" onClick={this.handleSubmit}><AiIcons.AiFillHome/> Inicio</a></li>
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