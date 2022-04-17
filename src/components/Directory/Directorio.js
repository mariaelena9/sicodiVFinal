/* @DIRECTORIO */

//Imports
import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from 'axios';
import Swal from 'sweetalert2';

//Iconos
import { IoChevronBackOutline } from "react-icons/io5";
import { FaUserTie } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { AiFillPhone } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { BsEnvelopeFill } from "react-icons/bs";
import { MdWork } from "react-icons/md";

//Componentes
import Header from "../../commons/Header/Header";
import Menu from "../../commons/Menu/Menu";
import Modal from './Modal.js';

class Directorio extends Component {
    //CONSTRUCTOR DEL COMPONENTE
    constructor() {
        super();
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    //FUNCIONES PARA EL CONTROL DE VENTANA MODAL
    showModal = (dato) => {
        this.setState({ show: true });
        axios.get(`http://localhost:3000/api/user/getuser/${dato}`).then(res => {
            this.setState({
                name: res.data.nombre,
                lastNameP: res.data.apPaterno,
                lastNameM: res.data.apMaterno,
                email: res.data.email,
                depa: res.data.cargo,
                phone: res.data.telefono
            });
        }).catch(error => {
            console.log(error.message);
        });
    };

    hideModal = () => {
        this.setState({ show: false });
    };
    //=============================================================

    //ARREGLO DE ESTADO, CONTIENE LAS VARIABLES Y ARREGLOS UTILIZADOS EN EL COMPONENTE
    state = {
        data: [],
        data2: [],
        dependencias: [],
        keyword: '',
        form: {
            idUsuario: '',
            name: '',
            lastNameP: '',
            lastNameM: '',
            email: '',
            depa: '',
            phone: '',
        },
        show: false,
    }

    componentDidMount() { //Se ejecutará al momento de montar el componente
        this.getUser();
        this.getDependencies();
    }

    //Función base para manipular un objeto formulario, ayuda a controlar las modificaciones
    handleChange = async (event) => {
        await this.setState({ keyword: event.target.value });
        this.state.data = this.state.data2.filter(user => user.nombre.toLowerCase().includes(this.state.keyword.toLowerCase()));
        this.getDependencies();
    }

    getUser = () => { //Consulta todos los usuarios de la BD
        axios.get("http://localhost:3000/api/user/getuser").then(res => {
            this.setState({ data: res.data });
            this.setState({ data2: res.data });
        }).catch(error => {
            console.log(error.message);
        });
    }

    getDependencies = () => { //Consulta todas las dependencias de la BD
        axios.get("http://localhost:3000/api/dependence/getdependence").then(res => {
            this.setState({ dependencias: res.data });
        }).catch(error => {
            console.log(error.message);
        });
    }

    change = (event) => { //Al cambiar el combobox consulta los usuarios filtrados por dependencia
        document.getElementById("keyword").value = "";
        axios.get(`http://localhost:3000/api/user/getUserByDep/${event.target.value}`).then(res => {
            if (res.data === 'Sin resultados') {
                Swal.fire({
                    title: 'Ups!',
                    text: 'No hay usuarios registrados en esta dependencia',
                    icon: 'warning',
                    showConfirmButton: true
                  })
                this.setState({ data: [] });
                this.setState({ data2: [] });
            } else {
                this.setState({ data: res.data });
                this.setState({ data2: res.data });
            }
        }).catch(error => {
            console.log(error.message);
        });
    }

    render() { //Renderiza los elementos gráficos del componente
        return (
            <div className="main">
                <Header />
                <div className="middle">
                    <Menu />
                    <div className="contentDirectory">
                        <Modal show={this.state.show} handleClose={this.hideModal}>
                            <div className="modalContent">
                                <div className="modalName">
                                    <p>{this.state.name} {this.state.lastNameP} {this.state.lastNameM}</p>
                                    <BsFillPersonFill />
                                </div>
                                <div className="modalEmail">
                                    <BsEnvelopeFill />
                                    <p>{this.state.email}</p>
                                </div>
                                <div className="modalPos">
                                    <MdWork />
                                    <p>{this.state.depa}</p>
                                </div>
                                <div className="modalPhone">
                                    <AiFillPhone />
                                    <p>{this.state.phone}</p>
                                </div>
                            </div>
                        </Modal>

                        <div className="direction">
                            <div className="headerDirectory">
                                <div className="buttonBack">
                                    <i><IoChevronBackOutline /></i>
                                    <p className="TitlePage">Directorio</p>
                                </div>

                                <div className="Search">
                                    <input type='text' placeholder="Busqueda..." name="keyword" id="keyword" onChange={this.handleChange}></input>
                                    <div className="icon-search"> <AiOutlineSearch /> </div>
                                </div>
                            </div>

                            <div className='directorio'>

                                <div className="filter">
                                    <p className="filter-text">Dependencia: </p>
                                    <select name="deps" id="depselect" valueChange onChange={this.change}>
                                        <option value="iddpto">Selecciona Dependencia</option>
                                        {this.state.dependencias.map(elemento => (
                                            <option onChange={this.change} key={elemento.iddependencia} value={elemento.iddependencia}>{elemento.nombre}</option>
                                        ))}
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
                                                    <p><b>{user.nombre} {user.apMaterno} {user.apPaterno}</b></p>
                                                </div>

                                                <div className="email-contact">
                                                    <p>{user.email}</p>
                                                </div>
                                            </div>

                                            <div className="img-message" onClick={() => this.showModal(user.idusuario)}> <MdEmail /></div>

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