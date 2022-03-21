/* @DIRECTORIO */

//Imports
import React, { Component } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import Sidebar from "../../commons/Sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import style from './Directorio.css'
import '../../App.css';
import { FaUserTie } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import axios from 'axios';
import Header from "../../commons/Header/Header";
import ReactDOM from "react-dom";
import Login from '../Login/LoginForm';
import Menu from "../../commons/Menu/Menu";
import Modal from './Modal.js';

class Directorio extends Component {
    constructor() {
        super();
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    state = {
        data: [],
        form: {
            idUsuario: '',
            nombre: '',
            apellido: '',
            correo: '',
        },
        show: false,
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
            <div className="main">
                <Header />
                <div className="middle">
                    <Menu />
                    <div className="contentDirectory">
                        <Modal show={this.state.show} handleClose={this.hideModal}>
                            <p>Modal</p>
                        </Modal>
                        <div className="direction">

                            <div className='directorio'>

                                <div className="buttonBack">
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

                                <br />

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

                                            <div className="img-message" onClick={this.showModal}> <MdEmail /></div>

                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Directorio;
// ReactDOM.render(<Directorio/>);