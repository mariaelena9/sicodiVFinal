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
import App from "../../App";
import AuthContext from "../../context/AuthContext";

const page = "";
// const [auth, handleAuth] = useContext(AuthContext);

class Menu extends Component{

    handleMenu(e) {
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
                            <p class="name">Manuela Michelle Salinas Tirado</p>
                            <br></br>
                            <p class="rol">Dirección Gral de Sistemas y Tec. informatica</p>
                        </div>
                        <hr/>

                        <ul>
                            <li><a id="/home" onClick={this.handleMenu}><AiIcons.AiFillHome/> Inicio</a></li>
                            <li><a id="/directory" onClick={this.handleMenu}><MdIcons.MdImportContacts/> Directorio</a></li>
                            <li><a id="/correspondence"  onClick={this.handleMenu}><ImIcons.ImFileText2/> Nueva Correspondencia</a></li>
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