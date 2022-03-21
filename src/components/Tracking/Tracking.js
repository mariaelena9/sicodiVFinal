/* @DIRECTORIO */

//Imports
import React, { Component } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import Sidebar from "../../commons/Sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import style from './Tracking.css'
import '../../App.css';
import { FaUserTie } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineMore } from "react-icons/ai";
import { BsCheckSquareFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import axios from 'axios';
import Header from "../../commons/Header/Header";
import ReactDOM from "react-dom";
import Login from '../Login/LoginForm'

class Tracking extends Component {
    state = {
        data: [],
        form: {
            idUsuario: '',
            nombre: '',
            apellido: '',
            correo: '',
            dependencia: '',
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

                            <div className='tracking'>

                                <div className="buttonBack">
                                    <i><IoChevronBackOutline /></i>
                                    <p className="TitlePage">Seguimiento</p>
                                </div>

                                <div className='seguimiento'>
                                    <div className="numOficio">
                                        <h2>No. Oficio: </h2>
                                        {/* <p><b>{user.nombre} {user.apellido}</b></p> */}
                                    </div>

                                    <div className="data">
                                        <div className="status">
                                            <div className="enviado">
                                                <div className="img-check"> <BsCheckSquareFill /> </div>
                                                <div className="detalle-enviado">
                                                    <p>Enviado el </p>
                                                    {/* <p><b>{user.nombre} {user.apellido}</b></p> */}
                                                    <p>Prioridad Alta</p>
                                                </div>
                                            </div>

                                            <div className="line">
                                                <div> <AiOutlineMore /> </div>
                                            </div>

                                            <div className="proceso">
                                                <div className="img-check"> <BsCheckSquareFill /> </div>
                                                <div className="detalle-proceso">
                                                    <p>En proceso </p>
                                                    {/* <p><b>{user.nombre} {user.apellido}</b></p> */}
                                                </div>
                                            </div>

                                            <div className="line">
                                                <div> <AiOutlineMore /> </div>
                                            </div>

                                            <div className="archivado">
                                                <div className="img-check"> <BsCheckSquareFill /> </div>
                                                <div className="detalle-proceso">
                                                    <p>Archivado</p>
                                                    {/* <p><b>{user.nombre} {user.apellido}</b></p> */}
                                                </div>
                                            </div>
                                        </div>


                                        <div className="info-gral">
                                            <div className="remitente">
                                                <p><b>Enviado por:</b></p>
                                                {/* <p><b>{user.nombre} {user.apellido}</b></p> */}
                                                <p><b>Desde:</b></p>
                                                {/* <p><b>{user.nombre} {user.apellido}</b></p> */}
                                            </div>

                                            <div className="destinatario">
                                                <p><b>Enviado a:</b></p>
                                                {/* <p><b>{user.nombre} {user.apellido}</b></p> */}
                                                <p><b>Departamento:</b></p>
                                                {/* <p>{user.dependencia} {user.dependencia}</p> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}

export default Tracking;
// ReactDOM.render(<Directorio/>);