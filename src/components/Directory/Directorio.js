/* @DIRECTORIO */

//Imports
import React, { Component } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import Sidebar from "../../commons/Sidebar/Sidebar";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import style from './Directorio.css'
import '../../App.css';
import { FaUserTie } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import axios from 'axios';
import Header from "../../commons/Header/Header";
import  ReactDOM from "react-dom";
import Login from '../Login/LoginForm'

class Directorio extends Component {
    state = {
        data: [],
        form: {
            idUsuario: '',
            nombre: '',
            apellido: '',
            correo: '',
        }
    }

    componentDidMount() { //Se ejecutará al momento de montar el componente
        this.getUser();
    }

    getUser = () => {
        axios.get("http://localhost:3000/api/user/getuser").then(Response => {
            this.setState({ data: Response.data });
        }).catch(error => {
            console.log(error.message);
        });
    }

    render() {
        return (
            <Router className="main">
                <Header />
                <div className="middle">
                    <Sidebar />

                    <div className="contentDirectory">

                        <div className="direction">

                            <div className='directorio'>

                                <div className="back">
                                    <i><IoChevronBackOutline/></i>
                                    <p className="TitlePage">Directorio</p>
                                </div>

                                <div className="Search">
                                    <input type='text' placeholder="Busqueda..." name="name" id="name" ></input>
                                    <div className="icon-search"> <AiOutlineSearch /> </div>
                                </div>

                                <div className="filter">
                                    <p className="filter-text">Filtrar por dependencia: </p>
                                    <select name="pets" id="pet-select">
                                        <option value="">Selecciona Dependencia</option>
                                        <option value="">Despacho Ejecutivo</option>
                                        <option value="">Secretaria de Educación Pública</option>
                                    </select>
                                </div>
                                
                                <br/>

                                {this.state.data.map(user => {
                                    return (
                                        <div className='Tarjeta'>

                                            <div className="img-contact">
                                                <FaUserTie />
                                            </div>

                                            <div className="info-contact">
                                                <div className="name-contact">
                                                    <p><b>{user.nombre} {user.apellido}</b></p>
                                                </div>

                                                <div className="id-contact">
                                                    <p>{user.correo}</p>
                                                </div>
                                            </div>

                                            <div className="img-message"> <MdEmail /></div>

                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

            </Router>
        )
    }
}

export default Directorio;
// ReactDOM.render(<Directorio/>);